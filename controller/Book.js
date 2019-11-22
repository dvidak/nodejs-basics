let models = require('../config/config');
let Book = models.Book;

exports.getAll = function (req, res) {
    models.Book.findAll({}).then((result) => {
        res.status(200).send(result);
    });
};

exports.getBookById = function(req,res){
    models.Book.findOne({
        where : {
            id : req.params.id
        }
    }).then( book => { 
        if(book){
            res.status(200).send({
                data: book,
                message: 'Book fetched',
                statusCode: '200',
                statusType: 'success'
            });
        } else {
            res.status(404).send({
                statusCode: 404,
                message: 'Book with given id does not exist',
                statusType: 'error'
            })
        }
    }).catch(err => { 
        res.status(404).send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        })
    });
}

exports.getAllBooksByUser = function (req, res) {
    models.Book.findAll({
        where: {
            borrowedBy: req.params.userId,
        },
    }).then((result) => {
        res.status(200).send(result);
    });
};

exports.createBook = function(req, res) {
    var new_book = new Book(req.body);
    new_book.save()
            .then( book => { 
                res.status(200).send({
                    data: book,
                    message: 'Book created',
                    statusCode: '201',
                    statusType: 'success'
                });
            })                                              
            .catch( err => { 
                res.status(400).send({
                    statusCode: 404,
                    message: err.message,
                    statusType: 'error'
                })
            });
};

exports.deleteBook = function(req,res){
    Book.destroy({
        where: {
            id: req.params.id
        }
    }).then( deleted => { 
        if(deleted != 0){
            res.status(204).send({
                message: 'Book deleted',
                statusCode: '204',
                statusType: 'success'
            })
        } else {
            res.status(404).send({
                message: 'Book does not exist',
                statusCode: '404',
                statusType: 'failed'
            })
        }
    }).catch(err => {
        res.status(400).send({
            statusCode: 400,
            message: err.message,
            statusType: 'error'
        })
    });
};

exports.updateBook = function(req,res){
    Book.update({
            title: req.body.title
            },{
            where: {
                id: req.params.id
            }
    }).then(updated => { 
        if(updated !=0 ){
            res.status(201).send({
                data: updated,
                message: 'Book updated successfully',
                statusCode: '201',
                statusType: 'success'
            })
        }
    }).catch(err => {
        res.status(404).send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        })
    });
};
