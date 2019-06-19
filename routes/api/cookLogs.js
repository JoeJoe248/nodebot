const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Validation
//const validateProfileInput = require("../../validation/profile");

//Load CookLog model
const CookLog = require("../../models/CookLog");
//Load CookEvent model
const CookEvent = require("../../models/CookEvent");
//Load CookEventCookLog model
const CookEventCookLog = require("../../models/CookEventCookLog");
//Load User model
const User = require("../../models/User");
//Load Profile model
const Profile = require("../../models/Profile");

//@route GET api/cookLog/test
//@desc Tests cookLog route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "cookLog works" }));

//@route GET api/cookLog/all
// @desc get all profile
//@access Public
router.get("/myCookLog", (req, res) => {
  const errors = {};
  CookLog.find()
    .then(cookLogs => {
      if (!cookLogs) {
        errors.nocooklogs = "There are no cooklogs";
        return res.status(404).json(errors);
      }
      res.json(cookLogs);
    })
    .catch(err => res.status(404).json({ cookLogs: "there are no cooklogs" }));
});

// @ route  GET api/cookLog/myCookLog/:devicId
// @desc    get current user's cook log by device id
// @access  private
router.get(
  "/myCookLog/:deviceId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookLog.findById({ deviceId: req.params.deviceId })
      .then(cookLog => {
        if (!cookLog) {
          errors.cookLog = "There are no cook logs for this device/user";
          return res.status(404).json(errors);
        }
        res.json(cookLog);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @ route  GET api/cookLog/cookLogToday
// @desc    get cookLog data for today
// @access  private
router.get(
  "/cookLogToday",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    //find the cookLog items for the last 24 hours
    CookLog.find({
      cookDate: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1))
      }
    })
      .then(cookLog => {
        if (!cookLog) {
          errors.cookLog = "There are no cook logs today";
          return res.status(404).json(errors);
        }
        res.json(cookLog);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @ route  GET api/cookLog/cookLogActivate
// @desc    get cookLog data for today
// @access  private
router.get(
  "/cookLogActivate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    //find the cookLog items for the last 24 hours
    //db.collection.find().limit(1).sort({$natural:-1})
    CookLog.find({
      cookDate: {
        $lt: new Date(),
        $gte: new Date(new Date().setDate(new Date().getDate() - 1)) //may need to limit this to last 2 minutes
      },
      user: "tempUser"
    })
      .limit(1)
      .sort({ $natural: -1 })
      .then(cookLog => {
        if (!cookLog) {
          errors.cookLog = "There are no cook logs for this user today";
          return res.status(404).json(errors);
        }
        //add other logic here to call the other Mongo actions
        res.json(cookLog);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
