const Article = require('../models/article');
const fetch = require('node-fetch');

exports.getHomePage = async(req, res, next) => {
    await Article.getAll().then(articles => {
        res.render('home', { articles: articles, user: localStorage.getItem('user') });
    })
    // res.render('home');
}

exports.seeArticle = async (req, res, next) => {
    const article = await Article.getAll().then(articles => {
        return articles.find((nt) => nt._id == req.params.articleId)
    })
    // console.log(localStorage.getItem('user'));
    res.render('see', { article: article, user: localStorage.getItem('user'), edit_link: `/edit/${req.params.articleId}` , delete_link: `/delete/${req.params.articleId}` } );
}

exports.writeArticle = async (req, res, next) => {
    if (localStorage.getItem('user')) {
        res.render('write');
    } else {
        const coverImage = await fetch(`https://source.unsplash.com/600x600/?travel`).then((response) => response.url);
        res.render('signin', { coverImage: coverImage });
    }
}

exports.postArticle = (req, res, next) => {
    const article = new Article(req.body.title, req.body.coverImage, req.body.content);
    // console.log(article);
    article.saveArticle();
    res.redirect('/');
}

exports.editArticle = async (req, res, next) => {
    if (localStorage.getItem('user')) {
        const article = await Article.getAll().then(articles => {
            return articles.find((nt) => nt._id == req.params.articleId)
        })
        res.render('edit', { article: article } );
    } else {
        const coverImage = await fetch(`https://source.unsplash.com/600x600/?travel`).then((response) => response.url);
        res.render('signin', { coverImage: coverImage });
    }
    
}

exports.updateArticle = async (req, res, next) => {
    const articleId = req.body.articleId;
    const title = req.body.title;
    const coverImage = req.body.coverImage;
    const content = req.body.content;

    await Article.updateArticle(articleId, title, coverImage, content);
    res.redirect('/articles/' + articleId);
}

exports.deleteArticle = (req, res, next) => {
    // const articleId = req.params.id;
    Article.deleteArticle(req.params.id);
    res.redirect('/');
}

exports.signInPage = async (req, res, next) => {
    const coverImage = await fetch(`https://source.unsplash.com/600x600/?travel`).then((response) => response.url);
    res.render('signin', { coverImage: coverImage });
}