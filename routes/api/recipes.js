const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
const validateRecipeInput = require("../../validation/recipe");

//Load Profile model
const Recipe = require("../../models/Recipe");
//Load User model
const User = require("../../models/User");

//@route GET api/recipe/test
// @desc Tests recipe route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "recipes works" }));

// @ route  GET api/recipes/myRecipes
// @desc    get current user's recipes
// @access  private
router.get(
  "/myRecipes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    Recipe.find({ user: req.user.id })
      .populate("user", ["name", "avatar"]) //we connected users collection into profile
      .then(recipes => {
        if (!recipes) {
          errors.recipes = "There are no recipes for this user";
          return res.status(404).json(errors);
        }
        res.json(recipes);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET api/recipes/all
// @desc get all recipes
//@access Public
router.get("/all", (req, res) => {
  const errors = {};
  Recipe.find()
    .populate("user", ["name", "avatar"]) //we connected users collection into recipe
    .then(recipes => {
      if (!recipes) {
        errors.norecipes = "There are no receipes";
        return res.status(404).json(errors);
      }
      res.json(recipes);
    })
    .catch(err => res.status(404).json({ recipes: "there are no recipes" }));
});

// @ route  GET api/recipe/
// @desc    get current user's recipes  getMyRecipes()
// @access  private
router.get(
  "/myRecipes",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    Recipe.find({ user: req.user.id })
      .populate("user", ["name", "avatar"]) //we connected users collection into profile
      .then(recipe => {
        if (!recipe) {
          errors.recipe = "There are no recipes for this user";
          return res.status(404).json(errors);
        }
        res.json(recipe);
      })
      .catch(err => res.status(404).json(err));
  }
);

/*router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );
});*/

// @ route  GET api/recipe/:id
// @desc    get current user's recipes by recipeId
// @access  private
router.get(
  "/myRecipe/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    Recipe.findById(req.params.id)
      .then(recipe => res.json(recipe))
      .catch(err =>
        res.status(404).json({ norecipefound: "No recipe with that id" })
      );
  }
);

//@route POST api/recipe
//@desc create recipe or edit recipe
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRecipeInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    //get fields
    const recipeFields = {};
    recipeFields.user = req.user.id; //includes the avatar, name, email
    recipeFields.recipeName = req.body.recipeName;
    if (req.body.directions1) recipeFields.directions1 = req.body.directions1;
    if (req.body.directions2) recipeFields.directions2 = req.body.directions2;
    if (req.body.recipeURL) recipeFields.recipeURL = req.body.recipeURL;
    if (req.body.suggestedTemp)
      recipeFields.suggestedTemp = req.body.suggestedTemp;
    if (req.body.suggestedTime)
      recipeFields.suggestedTime = req.body.suggestedTime;
    if (req.body.suggestedWood)
      recipeFields.suggestedWood = req.body.suggestedWood;

    Recipe.findOne({ recipeName: req.body.recipeName }).then(recipe => {
      if (recipe) {
        //update recipe
        Recipe.findOneAndUpdate(
          { user: req.user.id },
          { $set: recipeFields },
          { new: true }
        ).then(recipe => res.json(recipe));
      } else {
        //create recipe

        //check if recipe exists
        Recipe.findOne({ recipeName: recipeFields.recipeName }).then(recipe => {
          if (recipe) {
            errors.recipeName = "that recipe already exists";
            res.status(400).json(errors);
          }
          //save recipe
          new Recipe(recipeFields).save().then(recipe => res.json(recipe));
        });
      }
    });
  }
);

module.exports = router;
