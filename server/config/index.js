/* globals module */
'use strict';

const connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: "mongodb://localhost:27017/blogDb"
}

module.exports = {
    connectionString: connectionStrings[process.env.NODE_ENV || "development"],
    port: process.env.PORT || 3001
};