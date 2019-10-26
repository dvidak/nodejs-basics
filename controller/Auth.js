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
            success: false,
            message: err.message
        });
    })
};

exports.register = function (req, res){
    return authService.getUserByUsername(req.body.username || '')
    .then(exists => {
        if (exists){
            return res.send({
                success: false,
                message: 'Neuspjesna'
            });
        }
        var user = {
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, config.saltRounds),
        }
    
        return authService.addUser(user).then(() => 
            res.send({ success: true })
        ); 
    });
};