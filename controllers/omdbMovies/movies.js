const DBManager = require('../../helpers/db-manager');
const rp = require('request-promise');
const request = require('request')
const async = require('async');

const countNoOfMovie = async (req, res) => {
    let connection;
    let condition;
    try {
        if(req.body && req.body.genre && req.body.year) {
            condition = `type = '${req.body.genre}' and year='${req.body.year}'`
        } else {
            throw 'Please provide genre and year';
        }
        connection = await DBManager.getNodeConnection();
        let totalMovies = await global.models.OmdbMovies.countMovies(connection, condition);
       
        connection.release();
        connection = null;
        return res.status(200).send(totalMovies);
    } catch(e) {
        global.log.error(`Error while count total movies by year and type...${e}`);
        if(connection) {
            connection.release();
            connection = null;
        }
        return res.status(500).send({data : e});
    }
}


const getMovies = async (req,res) => {
   let connection;
    try {
        if(req.body && req.body.genre && req.body.year && req.body.name) {
            condition = `type = '${req.body.genre}' and year='${req.body.year}' and title like '%${req.body.name}%'`
        } else {
            throw 'Please provide genre and year and name of movie';
        }
        connection = await DBManager.getNodeConnection();
        let movies = await global.models.OmdbMovies.getMovies(connection, condition);
       
        if(connection) {
            connection.release();
            connection = null;
        }

        return res.status(200).send(movies);
    } catch(e) {
        global.log.error(`Error while get movies...${e}`);
        if(connection) {
            connection.release();
            connection = null;
        }
        res.status(500).send({data: e});
    }
}

const fetchOmdbMoviesFeedIntoDB = async (req,res) => {
    let connection;
    try {
        connection = await DBManager.getNodeConnection();
        
        let title = req.query.title;

        let [result1,result2] = await Promise.all([await getOmdbMovieData(title, 2019),await getOmdbMovieData(title, 2020)]);
        
        result1 = result1.concat(result2);
        
        connection.beginTransaction();
        let bulkCreate = await global.models.OmdbMovies.bulkCreate(connection, result1);
        connection.commit();
    
        if(connection) {
            connection.release();
            connection = null;    
        }
       
        return res.status(200).send({ data : "Successfull!!!" });
                
    } catch(e) {
        global.log.error(`Error while fetch data from omdb apis...${e}`);
        if(connection) {
            connection.rollback();
            connection.release();
            connection = null;
        }
        return res.status(500).send({'data' : e});
    }
}

const getOmdbMovieData = async (title,year) => {
    try{
        let totalPages=1;
        let finalResult = [];


        let options = {
            method: "GET",
            uri: `http://www.omdbapi.com/?s=${title}&apikey=${global.CONFIG.omdb.apiKey}&y=${year}&page=1`,
            body: {
                action: "json_data"
            },
            json: true
        };

        const data = await rp(options);

        data.Search.forEach((objectOfSearch) => {
            finalResult.push(objectOfSearch);
        });

        totalPages = Math.ceil(data.totalResults/10);

        let arrayOfUrls = [];
        for(let i=2; i<= totalPages; i++ ) {
            options = {
                method: "GET",
                uri: `http://www.omdbapi.com/?s=${title}&apikey=${global.CONFIG.omdb.apiKey}&y=${year}&page=${i}`,
                body: {
                    action: "json_data"
                },
                json: true
            };
            arrayOfUrls.push(await rp(options));
        }  
            
        let dataOfAllUrls = await Promise.all(arrayOfUrls);
            
        dataOfAllUrls.forEach((dataOfUrl) => {
            dataOfUrl.Search.forEach((objectOfSearch) => {
                            finalResult.push(objectOfSearch);
            });
        });
        return finalResult;
    } catch(e) {
        throw e;
    }
}

module.exports.fetchOmdbMoviesFeedIntoDB = fetchOmdbMoviesFeedIntoDB;
module.exports.countNoOfMovie = countNoOfMovie;
module.exports.getMovies = getMovies;