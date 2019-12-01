const express = require('express');
const router = express.Router();
const verifyToken = require('../service/VerifyToken');

const authController = require('../controller/Auth');
const bookController = require('../controller/Book');
const userController = require('../controller/Users');

router.get('/books',verifyToken, bookController.getAll);
router.get('/books/:id',verifyToken, bookController.getBookById);
router.post('/books',verifyToken, bookController.createBook);
router.delete('/books/:id',verifyToken, bookController.deleteBook);
router.put('/books/:id',verifyToken, bookController.updateBook);

router.post('/login', authController.login);
router.post('/users', authController.register);

router.get('/users',verifyToken, userController.getAll)
router.get('/users/:id',verifyToken,userController.getUserById);
router.get('/users/:userId/books',verifyToken, bookController.getAllBooksByUser);
router.delete('/users/:id',verifyToken, userController.deleteUser);
router.put('/users/:id',verifyToken,userController.updateUser);

router.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;
