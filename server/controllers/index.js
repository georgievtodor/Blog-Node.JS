/* globals require module __dirname */
'use strict';

const path = require('path'),
    fs = require('fs');

module.exports = ({ data }) => {
    let controllers = [];

    fs.readdirSync(__dirname)
        .filter(file => file.includes('-controller'))
        .forEach(ctrlr => {
            let currentController = require(path.join(__dirname, ctrlr))({ data });

            let controllerName = ctrlr.substring(0, ctrlr.indexOf('-controller'));

            controllers[controllerName] = currentController;
        });

    return controllers;
}