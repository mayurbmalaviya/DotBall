const app = require(`express`)();
const fs = require(`fs`);
const path = require(`path`);
const body_parser = require('body-parser');


app.use(body_parser.json());


let setupRoutes = () => {
	fs.readdirSync('./controllers').filter(function (file) {
		let stats = fs.statSync(global.ROOT_PATH + '/controllers/' + file);
		return (file.indexOf('.') !== 0 && stats.isDirectory());
	}).forEach(function (file) {
        //console.log(`file : ${file}`);
		let tmpRoute = require('./controllers/' + file);
		tmpRoute(app);
	});
}

let initModels = () => {
    global.models = {};
    fs.readdirSync(global.ROOT_PATH + '/models').filter((file) => {
        let stats = fs.statSync(global.ROOT_PATH + '/models/' + file);
        return (!stats.isDirectory());
    }).forEach((file) => {
        const model = require('./models/' + file);
        global.models[model.name] = model;
    });
}

setupRoutes();
initModels();

module.exports = app;