let ENVIRONMENT = process.env.NODE_ENV;
if(ENVIRONMENT === '' || ENVIRONMENT === undefined) {
    ENVIRONMENT = 'development';
}
global.ENVIRONMENT = ENVIRONMENT;
global.CONFIG = require('../config/environments/' + ENVIRONMENT + '.js');
global.ROOT_PATH = `${__dirname}/..`;
global.log = require(`./logger`);
