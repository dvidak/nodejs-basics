const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var models = require('../config/config');
var config =  require('../config/env');
var Users = models.Users;

exports.authenticate = params => {
    return Users.findOne({
        where: {
            username: params.username
        },
        raw: true
   }).then(user => {
        if (!user)
            throw new Error('Authentication failed. User not found.');
        if (!bcrypt.compareSync(params.password || '', user.password))
            throw new Error('Authentication failed. Wrong password.');
        
        const payload = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            id: user.id,
        };
        var token = jwt.sign(payload, config.secret, {expiresIn: '10h'});
        
        const loginData = {
            id : user.id,
            token: token
        }

        return loginData;
    });
};

exports.getUserByUsername = username => Users.findOne({
    where: {
        username
    }
});

exports.addUser = user => Users.create(user);