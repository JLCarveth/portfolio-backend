/**
 * Contains Application configuration settings
 * 
 */
const config = require('./config.json');

module.exports = {
    "populateEnvironment" : function () {
        for (let key in config) {
            process.env[key] = config[key];
        }
    }
}