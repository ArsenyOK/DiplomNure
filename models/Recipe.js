const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: Buffer,
  },
  CreatedByUserId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Ingredients: [],
  instructions: [],
});

module.exports = Recipe = mongoose.model("recipes", recipeSchema);
