# Assignment to fetch movie record from [omdb api](http://www.omdbapi.com/)
------------------------------------------------------
## How to setup this project after clone ?
* npm install
* Add **username,password** of database in development config file
* Add your **omdb api key** in development config file
* create database with **dotball** name in Mysql
* create table with **movies** name in dotball database with below field : 
  - Id(auto increment),
  - Title(TEXT)
  - Year(VARCHAR(25))
  - imdbID(VARCHAR(25))
  - Type(VARCHAR(25))
  - Poster(TEXT)
 * There are 3 apis : 
  - API to show movies count by genre and year
    - **POST**  localhost:3000/v1/omdb/countMovies  
      - body : {
                "genre":"movie",
                "year":"2019"
              }
    
  - API to get movie by genre, year, name
    - **POST**  localhost:3000/v1/omdb
      - body : {
                "name" : "Batman",
                "genre":"movie",
                "year":"2019"
                }
   
  - API to feed data to DB from OMDB API (Only Movie from Year 2019-20)
    - **GET** localhost:3000/v1/omdb?title=batman
