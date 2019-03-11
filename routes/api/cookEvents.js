const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");

//Load Validation
const validateCookEventInput = require("../../validation/cookEvent");

//Load CookEvent model
const CookEvent = require("../../models/CookEvent");
//Load Recipe model
const Recipe = require("../../models/Recipe");
//Load User model
const User = require("../../models/User");
//load Profile model
const Profile = require("../../models/Profile");

//@route GET api/cookEvent/test
// @desc Tests cookEvent route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "cookEvent works" }));

// @ route  GET api/cookEvents/myCookEvents
// @desc    get current user's recipes  getMyRecipes()
// @access  private
router.get(
  "/myCookEvents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEvent.find({ user: req.user.id })
      .populate("user", ["name", "avatar"]) //we connected users collection into profile
      .then(cookEvents => {
        if (!cookEvents) {
          errors.cookEvents = "There are no cook events for this user";
          return res.status(404).json(errors);
        }
        res.json(cookEvents);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/cookEvent
//@desc create cookEvent or edit cookEvent
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCookEventInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    //get fields
    const cookEventFields = {};
    //const cookEventState = req.body.cookState;
    //const dateToday = moment(new Date());
    cookEventFields.user = req.user.id; //includes the avatar, name, email
    //cookEventFields.recipeName = req.Recipe.recipeName;
    cookEventFields.recipeId = req.body.recipeId;
    cookEventFields.recipeName = req.body.recipeName;
    cookEventFields.deviceId = req.body.deviceId;
    if (req.body.meatType) cookEventFields.meatType = req.body.meatType;
    if (req.body.meatWeight) cookEventFields.meatWeight = req.body.meatWeight;
    if (req.body.totalCookTime)
      cookEventFields.totalCookTime = req.body.totalCookTime;
    if (req.body.minutesPerPound)
      cookEventFields.minutesPerPound = req.body.minutesPerPound;
    if (req.body.cookRating) cookEventFields.cookRating = req.body.cookRating;
    if (req.body.ovenTemp) cookEventFields.ovenTemp = req.body.ovenTemp;
    if (req.body.cookState) cookEventFields.cookState = req.body.cookState;
    if (req.body.cookState) cookEventFields.activeInd = req.body.activeInd;

    CookEvent.findOne({
      user: req.user.id,
      recipeName: req.body.recipeName,
      activeInd: req.body.activeInd
    }).then(cookEvent => {
      if (cookEvent) {
        //update cookEvent
        CookEvent.findOneAndUpdate(
          {
            user: req.user.id,
            recipeName: req.body.recipeName,
            activeInd: req.body.activeInd
          },
          { $set: cookEventFields },
          { new: true }
        ).then(cookEvent => res.json(cookEvent));
      } else {
        //create create cookEvent
        new CookEvent(cookEventFields)
          .save()
          .then(cookEvent => res.json(cookEvent));
      }
    });
  }
);

module.exports = router;
