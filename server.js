const body_parser = require('body-parser');
require('./helpers/globals');
require('dotenv').config();

const PORT = process.env.PORT || global.CONFIG.server.port;

const app = require('./app');


const server = app.listen(PORT, () => {
    console.log(`${PORT} is ready to listen`);    
});

  

let handle = () => {
    server.close((err) => {
        console.log(`server terminated`);
        if(err) {
            console.log(`Error while closing server`);
        }
        process.exit(0);
    });
}

process.on('message', (message) => {
    if(message === 'restart')
    handle();
});

process.on('SIGINT',handle);
process.on('uncaughtException', (e) => {
    console.log(`uncaght Exceptions`);
    handle();
});