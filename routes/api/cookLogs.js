const express = require("express");
const router = express.Router();

//Load Validation
//const validateProfileInput = require("../../validation/profile");

//Load CookLog model
const CookLog = require("../../models/CookLog");
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
router.get("/all", (req, res) => {
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

module.exports = router;
