# Assignment to fetch movie record from [omdb api](http://www.omdbapi.com/)
------------------------------------------------------
## How to setup this project after clone ?
* npm install
* Add **username,password** of database in development config file
* Add your **omdb api key** in development config file
* create database with **dotball** name and table with **movies** in Mysql : 
* **CREATE DATABASE dotball;**

* **CREATE TABLE movies
  (id INT(11) primary key,
  Title text,
  Year varchar(25),
  imdbID varchar(25),
  Type varchar(25),
  Poster text);**

 * There are 3 api call which I have mention in collection : 
  - Import Postman collection from link : https://www.getpostman.com/collections/0832a53782af89905790