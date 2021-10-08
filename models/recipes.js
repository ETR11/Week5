const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let recipeSchema = new Schema ({
    name: String,
    ingredients: String,
    instructions: String
});

module.exports = mongoose.model("Recipe", recipeSchema);