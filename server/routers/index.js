/* globals require module __dirname */
'use strict';

const fs = require('fs'),
    path = require('path');

module.exports = ({ app, controllers, uploadBlogImage }) => {
    fs.readdirSync('./server/routers')
        .filter(x => x.includes('-router'))
        .forEach(file => {
            require(path.join(__dirname, file))({ app, controllers, uploadBlogImage })
        });

    app.get('*', (req, res) => {
        res.status(404).redirect('/');
    })
}