const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./routes/route');
const database = require('./util/database');

//----- Setups -----------
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//----- Middlewares-------
app.use(parser.urlencoded({ extended: false }));
app.use(router);

app.use(express.static('./public'));

const port = process.env.PORT || 8000;


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "views", "home.ejs"));
});

//----- Server starts-----
// app.listen(3000);
database.mongoConnect(() => {
    app.listen(port);
});