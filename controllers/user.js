const User = require('../models/user');
// const Article = require('../models/article');

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

exports.signin = async (req, res, next) => {
    // const articles = await Article.getAll();
    const user = await User.getAll().then(users => {
        return users.find((user) => user.email == req.body.email && user.password == req.body.password)
    })
    if (user) {
        res.redirect("/")
        // res.render("home", {user:user, articles: articles});
        localStorage.setItem('user', JSON.stringify(user));
        console.log("CHECK: ",localStorage.getItem('user'));
        toastr.success("Logged in Successfully");
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