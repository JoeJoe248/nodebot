const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const moment = require("moment");

//Load Validation
const validateCookEventInput = require("../../validation/cookEvent");

//Load CookEvent model
const CookEvent = require("../../models/CookEvent");
//Load CookLog model
const CookLog = require("../../models/CookLog");
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
// @desc    get current user's active cook events
// @access  private
router.get(
  "/myCookEvents",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEvent.find({ user: req.user.id, activeInd: true })
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

// @ route  GET api/cookEvents/myCookEventHistory
// @desc    get current user's non acdtive active cook events
// @access  private
router.get(
  "/myCookEventHistory",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEvent.find({ user: req.user.id, activeInd: false })
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

// @ route  GET api/cookEvents/myCookEventHistory/:cookEventId
// @desc    get current user's cookEvent history by cook event id
// @access  private
router.get(
  "/myCookEventHistory/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEvent.findById(req.params.id)
      .then(cookEvent => res.json(cookEvent))
      .catch(err =>
        res.status(404).json({ nocookeventfound: "No cook event with that id" })
      );
  }
);

// @ route  GET api/cookEvents/myCookEvents/:id
// @desc    get current user's cook events by cookEventId
// @access  private
router.get(
  "/myCookEvents/:cookEventId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    CookEvent.findById({ _id: req.params.cookEventId })
      .then(cookEvent => {
        if (!cookEvent) {
          errors.cookEvent = "There are no cook events for this user";
          return res.status(404).json(errors);
        }
        res.json(cookEvent);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/cookEvent
//@desc create cookEvent
//@access Private

router.post(
  "/createCookEvent",
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
    cookEventFields.recipeId = req.body.recipeId;
    cookEventFields.recipeName = req.body.recipeName;
    cookEventFields.deviceBoards = req.body.deviceBoards;
    if (req.body.meatType) cookEventFields.meatType = req.body.meatType;
    if (req.body.meatWeight) cookEventFields.meatWeight = req.body.meatWeight;
    if (req.body.totalCookTime)
      cookEventFields.totalCookTime = req.body.totalCookTime;
    if (req.body.minutesPerPound)
      cookEventFields.minutesPerPound = req.body.minutesPerPound;
    if (req.body.cookRating) cookEventFields.cookRating = req.body.cookRating;
    if (req.body.ovenTemp) cookEventFields.ovenTemp = req.body.ovenTemp;
    if (req.body.cookState) cookEventFields.cookState = req.body.cookState;
    if (req.body.activeInd) cookEventFields.activeInd = req.body.activeInd;
    if (req.body.cookNotes) cookEventFields.cookNotes = req.body.cookNotes;
    if (req.body.purchasePlace)
      cookEventFields.purchasePlace = req.body.purchasePlace;
    if (req.body.purchasePrice)
      cookEventFields.purchasePrice = req.body.purchasePrice;

    //console.log("add meat weight: ", cookEventFields.meatWeight);

    CookEvent.findOne({
      user: req.user.id,
      recipeId: req.body.recipeId,
      activeInd: true
    }).then(cookEvent => {
      if (cookEvent) {
        //update cookEvent
        errors.recipeName = "This cook event already exists";
        return res.status(400).json(errors);
      } else {
        //create create cookEvent
        console.log("about to create new cookevent");
        new CookEvent(cookEventFields)
          .save()
          .then(cookEvent => res.json(cookEvent));
      }
    });
  }
);

//@route POST api/cookEvent/editCookEvent
//@desc edit cookEvent
//@access Private
router.post(
  "/editCookEvent",
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
    //cookEventFields._id = req.body._id;
    //console.log("in cook event route. id is: ", req.body._id);
    //cookEventFields.user = req.user.id; //includes the avatar, name, email
    //cookEventFields.recipeId = req.body.recipeId;
    cookEventFields.recipeName = req.body.recipeName;
    //cookEventFields.deviceId = req.body.deviceId;
    if (req.body.deviceBoards)
      cookEventFields.deviceBoards = req.body.deviceBoards;
    if (req.body.meatType) cookEventFields.meatType = req.body.meatType;
    if (req.body.meatWeight) cookEventFields.meatWeight = req.body.meatWeight;
    if (req.body.totalCookTime)
      cookEventFields.totalCookTime = req.body.totalCookTime;
    if (req.body.minutesPerPound)
      cookEventFields.minutesPerPound = req.body.minutesPerPound;
    if (req.body.cookRating) cookEventFields.cookRating = req.body.cookRating;
    if (req.body.ovenTemp) cookEventFields.ovenTemp = req.body.ovenTemp;
    if (req.body.cookState) cookEventFields.cookState = req.body.cookState;
    if (req.body.activeInd) cookEventFields.activeInd = req.body.activeInd;
    if (req.body.cookNotes) cookEventFields.cookNotes = req.body.cookNotes;
    if (req.body.purchasePlace)
      cookEventFields.purchasePlace = req.body.purchasePlace;
    if (req.body.purchasePrice)
      cookEventFields.purchasePrice = req.body.purchasePrice;
    //console.log("in cook event route. activeInd: ", req.body.activeInd);
    //console.log("edit meat weight: ", cookEventFields.meatWeight);

    CookEvent.findOneAndUpdate(
      { _id: req.body._id },
      { $set: cookEventFields },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));

    CookEvent.findOneAndUpdate(
      { _id: req.body._id },
      { activeInd: req.body.activeInd },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));
  }
);

//@route POST api/cookEvent/updateCookEventMeatProbeActive
//@desc edit cookEvent to set the meat probe to active state
//@access Private
router.post(
  "/updateCookEventMeatProbeActive",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCookEventInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }

    //1. update cookEvent for the meat probe indicator
    CookEvent.findOneAndUpdate(
      {
        _id: req.body._id
      },
      { $set: { meatProbeInd: true } },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));
    //onsole.log("after CookEvent.findOneAndReplace");

    //2. get the cookLog first
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
        console.log("cookLog.deviceId: ", cookLog[0].deviceId);
        //3. update the profile for the deviceId.
        console.log("user: ", req.user._id);
        console.log("body.id: ", req.body._id);
        console.log("body.recipeName: ", req.body.recipeName);
        console.log("deviceBoards: ", req.body.deviceBoards);

        var arrDeviceBoards = [];
        arrDeviceBoards = req.body.deviceBoards;
        arrDeviceBoards.push(cookLog[0].deviceId);
        var index = arrDeviceBoards.indexOf(cookLog[0].deviceId);
        if (index >= 1) {
          arrDeviceBoards.splice(index, 1);
        }
        console.log("arrDeviceBoards: ", JSON.stringify(arrDeviceBoards));
        //5. updated cookEvent for deviceId
        /*CookEvent.findOneAndReplace(
          //eventually should be findOneAndReplace with array of deviceIds
          { _id: req.body._id },
          { "deviceBoards.deviceId": cookLog[0].deviceId }
        ).then(cookEvent => res.json(cookEvent));*/
        /*CookEvent.findOneAndUpdate(
          //eventually should be findOneAndReplace with array of deviceIds
          { _id: req.body._id },
          { $set: { deviceBoards: arrDeviceBoards } },
          { new: true }
        ).then(cookEvent => res.json(cookEvent));*/
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          { $set: { deviceId: cookLog[0].deviceId } },
          { new: true }
        ).then(cookLog => res.json(cookLog));

        //4. create CookEventCookLog entry
        const cookEventCookLogFields = {};
        //const cookEventState = req.body.cookState;
        //const dateToday = moment(new Date());
        //console.log("stringify params: ", JSON.stringify(cookEvent));
        //console.log("deviceId: ", cookLog[0].deviceId);
        cookEventCookLogFields.user = req.user.id; //includes the avatar, name, email should not be tempUser
        cookEventCookLogFields.recipeId = req.body.recipeId;
        cookEventCookLogFields.cookEventId = req.body._id;
        cookEventCookLogFields.cookLogId = cookLog[0]._id;
        cookEventCookLogFields.deviceId = cookLog[0].deviceId;
        cookEventCookLogFields.status = "meat probe started";
        //cookEventCookLogFields.statusDate = req.body.statusDate;
        //add the CookEventCookLog
        new CookEventCookLog(cookEventCookLogFields).save();
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/cookEvent/updateCookEventMeatProbeActive
//@desc edit cookEvent to set the meat probe to active state
//@access Private
router.post(
  "/updateCookEventMeatProbeNotActive",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCookEventInput(req.body);

    //check validation
    if (!isValid) {
      //return errors
      return res.status(400).json(errors);
    }
    //console.log("body.id: ", req.body._id);
    //1. update cookEvent for the meat probe indicator
    CookEvent.findOneAndUpdate(
      {
        _id: req.body._id
      },
      { $set: { meatProbeInd: false } },
      { new: true }
    ).then(cookEvent => res.json(cookEvent));
    //console.log("after CookEvent.findOneAndReplace");

    //2. get the cookLog first
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
        // console.log("cookLog.deviceId: ", cookLog[0].deviceId);
        //3. update the profile for the deviceId.
        //console.log("user: ", req.user._id);
        Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          { $set: { deviceId: cookLog[0].deviceId } },
          { new: true }
        ).then(cookLog => res.json(cookLog));

        //4. create CookEventCookLog entry
        const cookEventCookLogFields = {};
        //const cookEventState = req.body.cookState;
        //const dateToday = moment(new Date());
        //console.log("stringify params: ", JSON.stringify(cookEvent));
        //console.log("deviceId: ", cookLog[0].deviceId);
        cookEventCookLogFields.user = req.user.id; //includes the avatar, name, email should not be tempUser
        cookEventCookLogFields.recipeId = req.body.recipeId;
        cookEventCookLogFields.cookEventId = req.body._id;
        cookEventCookLogFields.cookLogId = cookLog[0]._id;
        cookEventCookLogFields.deviceId = cookLog[0].deviceId;
        cookEventCookLogFields.status = "meat probe stopped";
        //cookEventCookLogFields.statusDate = req.body.statusDate;
        //add the CookEventCookLog
        new CookEventCookLog(cookEventCookLogFields).save();

        /*//5. updated cookEvent for deviceId
        console.log(
          "value of req.body.deviceBoard: ",
          valueOf(req.body.deviceBoards)
        );
        console.log("req.body.deviceBoards: ", req.body.deviceBoards);
        var arrDeviceBoards = req.body.deviceBoards;
        arrDeviceBoards.push(cookLog[0].deviceId);
        var index = arrDeviceBoards.indexOf(cookLog[0].deviceId);
        if (index >= 0) {
          arrDeviceBoards.splice(index, 1);
        }
        console.log("arrDeviceBoards: ", JSON.stringify(arrDeviceBoards));

        CookEvent.findOneAndUpdate(
          //eventually should be findOneAndReplace with array of deviceIds
          { _id: req.body._id },
          { $set: { deviceBoards: arrDeviceBoards } },
          { new: true }
        ).then(cookEvent => res.json(cookEvent));*/
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
