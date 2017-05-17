'use strict';

const LocalStrategy = require('passport-local'),
    hashing = require('../../utilities/encryptor');

module.exports = (passport, data) => {
    const authStrategy = new LocalStrategy(
        (username, password, done) => {
            // TODO
    })
}