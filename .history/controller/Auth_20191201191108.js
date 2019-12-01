const config =  require('../config/config');
const bcrypt = require('bcryptjs');
const authService = require('../service/auth');


exports.login = function (req, res){     
    return authService.authenticate(req.body).then(loginData => {
        res.send({
            success: true,
            id: loginData.id,
            token: loginData.token
        });
    }).catch(err => {
        res.send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        });
    })
};

exports.register = function (req, res){
    if (JSON.stringify(req.body) == "{}") {
        return res.status(400).json({ Error: "Registration request body is empty" });
    }
    
    if (!req.body.email || !req.body.username || !req.body.password) {
        return res.status(400).json({ Error: "Missing fields for registration" });
    }

    return authService.getUserByUsername(req.body.username || '')
    .then(exists => {
        if (exists){
            return res.send({
                statusCode: 404,
                message: 'User already exists',
                statusType: 'error'
            });
        }

        var user = {
            id: req.body.id,
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, config.saltRounds),
        }
    
        return authService.addUser(user).then(() => 
            res.send({
                statusCode: 201,
                message: 'User created',
                statusType: 'success'
            })
        ); 
    });
};