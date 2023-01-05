const express = require("express");
const app = express.Router();
const auth = require("../../middleware/auth");
const multer = require("multer");

const img = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|webp|JPG|PNG|JPEG|jpeg|WEBP)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});

// Recipe Model
const Recipe = require("../../models/Recipe");

app.get(`/`, (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;
  const category = req.query.category;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  Recipe.find().then((recipes) => {
    const filterRecipes = recipes.filter((item) => {
      if (category) {
        return item.category === category;
      } else {
        return item;
      }
    });
    if (page || limit) {
      const result = {
        totalRecipeCount: filterRecipes.length,
      };

      result.result = filterRecipes.slice(startIndex, endIndex);
      return res.json(result);
    } else {
      const result = {
        totalRecipeCount: recipes.length,
      };

      result.result = recipes;
      return res.json(result);
    }
  });
});

app.get(`/:id`, (req, res) => {
  const id = req.params.id;
  let details;
  if (id.length > 3) {
    details = { _id: id };
  } else {
    details = { id: id };
  }
  Recipe.findOne(details, (err, item) => {
    if (err) {
      res.send(err);
    } else {
      res.send(item);
    }
  });
});

app.get("/recipes-user/:idUser", (req, res) => {
  const userId = req.params.idUser;

  Recipe.find().then((recipes) => {
    const userRecipes = recipes.filter(
      (item) => item.CreatedByUserId === userId
    );

    if (userRecipes.length > 0) {
      res.json(userRecipes);
    } else {
      res.json("Nothing");
    }
  });
});

app.get(`/edit-recipe/:id`, (req, res) => {
  const id = req.params.id;
  let details;
  if (id.length > 3) {
    details = { _id: id };
  } else {
    details = { id: id };
  }
  Recipe.findOne(details, (err, item) => {
    if (err) {
      res.send(err);
    } else {
      res.send(item);
    }
  });
});

app.post(`/`, img.single("img"), async (req, res) => {
  // let newRecipe;
  // res.json(newRecipe, 'newRecipe');

  const recipeModel = new Recipe({
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    CreatedByUserId: req.body.userId,
    img: req.file.buffer,
    likes: req.body.likes,
  });

  // recipeModel.img = req.file.buffer;

  try {
    recipeModel.save().then((recipe) => {
      res.send(recipe);
      res.send("Recipes is uploaded Success!");
    });
  } catch (e) {
    res.send("Errors!!!", e);
  }
});

app.put(`/update-recipe/:id`, async (req, res) => {
  const { id } = req.params;

  let recipe = await Recipe.findByIdAndUpdate(id, req.body);

  return res.status(202).send({
    error: false,
    recipe,
  });
});

// app.put(`/update-recipe-likes/:id`, async (req, res) => {
//   const { id } = req.params;
//   let recipe = await Recipe.findByIdAndUpdate(id, req.body);

//   return res.status(202).send({
//     error: false,
//     recipe,
//   });
// });

app.delete(`/:id`, (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => res.json("Recipe deleted"))
    .catch((err) => res.status(400).json("Error: " + err));

  // const idRecipe = { 'id': id};
  // Recipe.findByIdAndDelete(id)
  //     .then(recipe => recipe.remove().then(() => res.json({ success: true })))
  //     .catch(err => res.status(404).json({ success: false }));
});

module.exports = app;
