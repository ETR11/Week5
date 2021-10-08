const bp = require("body-parser");
const express = require("express");
const recipePage = express();
const path = require("path");

recipePage.use(bp.json());
recipePage.use(bp.urlencoded({extended: true}));
//recipePage.use(express.static(path.join(__dirname, "stuff")));

let recipes = [
    {"name": "ooo", "instructions": ["Something", "Anything"], "ingredients": ["Thing1", "Thing2", "Thing3"]},
    {"name": "aaa", "instructions": ["Everything", "Nothing"], "ingredients": ["Item", "Key item", "Common item"]}
];

let requestedDish;

recipePage.get("/recipe/:food", (req, res) => {
    requestedDish = res.req.params.food;
    res.sendFile(path.join(__dirname, "stuff/Index.html"));
})

recipePage.get("/dish", (req, res) => {
    for(let i = 0; i<recipes.length; i++) {
        if (recipes[i].name == requestedDish) {
            res.json(recipes[i]);
        }
    }
})

recipePage.post("/recipe/", (req, res) => {
    recipes.push(req.body);
})

recipePage.listen(1234);
