const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles')


router.post('/articles', articlesController.getFiltered);

exports.routes = router;