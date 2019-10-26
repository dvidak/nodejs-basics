var models = require('../config/config');
var Users = models.Users;

exports.getAll = function (req, res) {
    models.Users.findAll({}).then( users => {
            res.status(200).send(users)
        }).catch(err => {
            res.status(400).send({
                statusCode: 404,
                message: err.message,
                statusType: 'error'
            })
        });
}

exports.getUserById = function(req,res){
    models.Users.findOne({
        where : {
            id : req.params.userId
        }
    }).then( user => { 
        if(user){
            res.status(200).send({
                data: user,
                message: 'User fetched',
                statusCode: '200',
                statusType: 'success'
            });
        }
       throw err;
    }).catch(err => { 
        res.status(404).send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        })
    });
}

exports.deleteUser = function (req,res){
    Users.destroy({
        where: {
            username: req.params.username
        }
    }).then( deleted => { 
        if(deleted != 0){
            res.status(204).send({
                data: deleted,
                message: 'User deleted successfully',
                statusCode: '204',
                statusType: 'success'
            })
        }
        throw err;
    }).catch(err => {
        res.status(400).send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        })
    });
}

exports.updateUser = function (req,res){
    Users.update({
            username: req.body.username
        },{
            where: { 
                id: req.params.userId 
            }
    }).then( updated => { 
        if(updated !=0 ){
            res.status(201).send({
                data: updated,
                message: 'User updated successfully',
                statusCode: '201',
                statusType: 'success'
            })
        }
        throw err;
    }).catch(err => {
        res.status(404).send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        })
    });
};



