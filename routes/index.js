const express = require('express');
const router = express.Router();
const verifyToken = require('../service/VerifyToken');

const authController = require('../controller/Auth');
const bookController = require('../controller/Book');
const userController = require('../controller/Users');


router.post('/login', authController.login);

router.get('/books', bookController.getAll);
router.get('/books/:userId', bookController.getAllByUser);
router.post('/books', bookController.createBook);
router.delete('/books/:bookId', bookController.deleteBook);
router.put('/books/:bookId', bookController.updateBook);

router.get('/users', userController.getAll)
router.post('/users', authController.register);
router.get('/users/:userId',userController.getUserById);
router.delete('/users/:username', userController.deleteUser);
router.put('/users/:userId', userController.updateUser);

module.exports = router;
