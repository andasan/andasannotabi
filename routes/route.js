const express = require('express');
const controller = require('../controllers/controller');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/', controller.getHomePage);
router.get('/articles/:articleId', controller.seeArticle);

router.get('/write', controller.writeArticle);
router.post('/write', controller.postArticle);

router.get('/edit/:articleId', controller.editArticle);
router.post('/update', controller.updateArticle);

router.get('/signin', controller.signInPage);
router.post('/signin', userController.signin);
router.get('/logout', userController.logout);

router.get('/delete/:id', controller.deleteArticle);

router.post('/newcomment', controller.writeComment);

module.exports = router;