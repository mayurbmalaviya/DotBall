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
 * There are 3 api call which I have mention in collection : 
  - Import Postman collection from link : https://www.getpostman.com/collections/0832a53782af89905790