const express = require('express');
const bookController = require('../controller/book.controller');
const bookController = require('../controller/book.controller');

const router = express.Router();
const bookController = new bookController();

router.get('/', bookController.getAll.bind(bookController));


