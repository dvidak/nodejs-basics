var models = require('../config/config');
var Book = models.Book;

exports.getAll = function (req, res) {
    models.Book.findAll({}).then((result) => {
        res.status(200).send(result);
    });
};

exports.getAllByUser = function (req, res) {
    models.Book.findAll({
        where: {
            borrowedBy: req.params.userId,
        },
    }).then((result) => {
        res.status(200).send(result);
    });
};

exports.createBook = function(req, res) {
    console.log(req.body);
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
            id: req.params.bookId
        }
    }).then( deleted => { 
        res.status(200).send({
                data: book,
                message: 'Book deleted',
                statusCode: '200',
                statusType: 'success'
        })
    }).catch(err => {
        res.status(400).send({
            statusCode: 404,
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
                id: req.params.bookId
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
        throw err;
    }).catch(err => {
        res.status(404).send({
            statusCode: 404,
            message: err.message,
            statusType: 'error'
        })
    });
};
