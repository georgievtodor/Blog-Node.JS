/* globals require module __dirname */
'use strict';

module.exports = ({ mongoose, fs, path }) => {
    let models = [];

    fs.readdirSync(__dirname)
        .filter(model => model.includes('-model'))
        .forEach(model => {
            const currentModel = require(path.join(__dirname, model))({ mongoose });

            const modelName = model.substring(0, model.indexOf('-model'));

            models[modelName] = currentModel;
        });

    return models;
}