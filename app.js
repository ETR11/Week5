var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const bp = require("body-parser");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(bp.json());
app.use(bp.urlencoded({extended: true}));
//recipePage.use(express.static(path.join(__dirname, "stuff")));

let recipes = [
    {"name": "Pizza", "instructions": ["Something", "Anything"], "ingredients": ["Thing1", "Thing2", "Thing3"]},
    {"name": "Pasta", "instructions": ["Everything", "Nothing"], "ingredients": ["Item", "Key item", "Common item"]}
];

let requestedDish;

app.get("/recipe/:food", (req, res) => {
    recipes[0].name = res.req.params.food;
    requestedDish = recipes[0].name;
    res.json(recipes[0]);
})

app.get("/", (req, res) => {
    //requestedDish = "Pizza";
    res.sendFile(path.join(__dirname, "stuff/Index.html"));
})

app.get("/dish", (req, res) => {
    for(let i = 0; i<recipes.length; i++) {
        if (recipes[i].name == requestedDish) {
            res.json(recipes[i]);
        }
    }
})

app.post("/recipe/", (req, res) => {
    recipes.push(req.body);
    res.json(req.body);
})

module.exports = app;
