/* globals module require */
'use strict';

const mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path');

module.exports = ({ config }) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);
    const data = {};

    const models = require('./../models')({ mongoose, fs, path });

    fs.readdirSync(__dirname)
        .filter(x => x.includes('-data'))
        .forEach(f => {
            const dataModule = require(path.join(__dirname, f))({ models });
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });
    
    return data;
}