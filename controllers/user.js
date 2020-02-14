const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

exports.signin = async (req, res, next) => {
    const articles = await Article.getAll();
    const comments = await Comment.getAll();
    const user = await User.getAll().then(users => {
        return users.find((user) => user.email == req.body.email && user.password == req.body.password)
    })
    if (user) {
        // res.redirect("/")
        localStorage.setItem('user_logged', 'Successfully Logged In')
        let userLoggedValue = localStorage.getItem('user_logged');

        res.render("home", {user:user, articles: articles, comments: comments, login_success: userLoggedValue});
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.removeItem('user_logged');
    } else {
        res.send({
            msg: "User doesn't exsist"
        });
    }
}

exports.logout = (req, res, next) => {
    localStorage.clear();
    res.redirect('/');
}