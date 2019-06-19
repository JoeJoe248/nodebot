const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;
const passport = require("passport");

//Load Validation
const validateCookEventCookLogs = require("../../validation/cookEventCookLogs");

//Load CookEventCookLog model
const CookEventCookLog = require("../../models/CookEventCookLog");
//Load CookLog model
const CookLog = require("../../models/CookLog");
//Load CookEvent model
const CookEvent = require("../../models/CookEvent");
//Load CookEventCookLogHistory model
const CookEventCookLogHistory = require("../../models/CookEventCookLogHistory");
//Load User model
const User = require("../../models/User");
//Load Profile model
const Profile = require("../../models/Profile");

//@route GET api/cookEventCookLogs/test
//@desc Tests cookEventCookLogs route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "cookEventCookLogs works" }));

//@route GET api/cookEventCookLogs/myCookEvents/:cookEventId
//@desc gets the deviceIds for a given cookEvent
//@access Private
router.get(
  "/myCookEvents/:cookEventId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEventCookLog.distinct("deviceId", {
      //cookEventId: "5d02efe7d3035c7500c9dfdf"
      cookEventId: req.params.cookEventId
    })
      //CookEventCookLog.find({ cookEventId: "5d02efe7d3035c7500c9dfdf" })
      .then(deviceIds => {
        if (!deviceIds) {
          errors.deviceIds = "There are devices for this cook event";
          return res.status(404).json(errors);
        }
        console.log("deviceIds: ", deviceIds);
        CookLog.find({ deviceId: { $in: deviceIds } }).then(cookLogs => {
          if (!cookLogs) {
            errors.cookLogs = "There are not cooklogs for these deviceIds";
            return res.status(404).json(errors);
          }
          res.json(cookLogs);
        });
        //res.json(deviceIds);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET api/cookEventCookLogs/archiveMyCookEventCookLog/:cookEventId
//@desc archives cookEventCookLog data and ties it to a cookEventId and UserId
//@access Private
router.get(
  "/archiveMyCookEventCookLog/:cookEventId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEventCookLog.distinct("deviceId", {
      //cookEventId: "5d02efe7d3035c7500c9dfdf"
      cookEventId: req.params.cookEventId
    })
      //CookEventCookLog.find({ cookEventId: "5d02efe7d3035c7500c9dfdf" })
      .then(deviceIds => {
        if (!deviceIds) {
          errors.deviceIds = "There are no devices for this cook event";
          return res.status(404).json(errors);
        }
        console.log("deviceIds: ", deviceIds);
        CookLog.find({ deviceId: { $in: deviceIds } }).then(cookLogs => {
          if (!cookLogs) {
            errors.cookLogs = "There are no cooklogs for these deviceIds";
            return res.status(404).json(errors);
          }
          res.json(cookLogs);
          CookEvent.findOneAndUpdate(
            {
              _id: ObjectID(req.params.cookEventId)
            },
            { $set: { cookLog: cookLogs } },
            { new: true }
          ).then(cookLogs => res.json(cookLogs));
          CookEvent.findOneAndUpdate(
            {
              _id: ObjectID(req.params.cookEventId)
            },
            { $set: { archiveInd: true } },
            { new: true }
          ).then(cookLogs => res.json(cookLogs));
          CookEvent.findOneAndUpdate(
            {
              _id: ObjectID(req.params.cookEventId)
            },
            { $set: { archiveIndDate: new Date() } },
            { new: true }
          ).then(cookLogs => res.json(cookLogs));
        });
        //res.json(deviceIds);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route GET api/cookEventCookLogs/archiveMyCookEventCookLog/:cookEventId
//@desc archives cookEventCookLog data and ties it to a cookEventId and UserId
//@access Private
router.get(
  "/unarchiveMyCookEventCookLog/:cookEventId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEvent.findOneAndUpdate(
      {
        _id: ObjectID(req.params.cookEventId)
      },
      { $set: { cookLog: [] } },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));

    CookEvent.findOneAndUpdate(
      {
        _id: ObjectID(req.params.cookEventId)
      },
      { $set: { archiveInd: false } },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));

    CookEvent.findOneAndUpdate(
      {
        _id: ObjectID(req.params.cookEventId)
      },
      { $set: { archiveIndDate: null } },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));
  }
);

module.exports = router;
