const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load validation
const validateProfileInput = require("../../validation/profile");
//const validateEquipmentInput = require("../../validation/equipment");

//load profile model
const Profile = require("../../models/Profile");
//load user model
const User = require("../../models/User");

// @ route  GET api/profile/test
// @desc    Tests profile routes
// @access  public

router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

// @ route  GET api/profile/
// @desc    get current user's profile  getCurrentProfile()
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //token goes into req.user
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) //we connected users collection into profile
      .then(profile => {
        if (!profile) {
          errors.profile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @ route  GET api/profile/handle/:handle
// @desc    get profile by handle, backend route
// @access  public

router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @ route  GET api/profile/user/:user_id
// @desc    get profile by user ID
// @access  public

router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile for this user" })
    );
});

// @ route  GET api/profile/all
// @desc    get all profile
// @access  public

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "there is no profiles" }));
});

// @ route  POST api/profile/addProfile
// @desc    create or edit user profile assiciated with createProfile action
// @access  private

// adding equipment will be separate part of profile

router.post(
  "/addProfile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return nany errors with 400 status
      return res.status(400).json(errors);
    }

    //get equipmentRequired into an array
    /*let objEquipment = {};
    let arrEquipment = [];
    objEquipment = req.body.equipmentRequired;
    arrEquipment = Object.values(objEquipment);
    */

    //get fields other than equipment
    const profileFields = {};
    profileFields.user = req.user.id; //gets avatar, name, email
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.deviceType) profileFields.deviceType = req.body.deviceType;
    if (req.body.deviceId) profileFields.deviceId = req.body.deviceId;
    // Skills - Spilt into array
    if (typeof req.body.cookingType !== "undefined") {
      profileFields.cookingType = req.body.cookingType.split(",");
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create

        //check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }
          console.log("type of profile: " + typeof profile);
          //save Profile Fields
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// @ route  POST api/profile/addProfileEquipment
// @desc    create or edit user profile with his/her equipment associated with createProfileEquipment action
// @access  private

router.post(
  "/addProfileEquipment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if (!isValid) {
      //return nany errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    //get equipmentRequired into an array
    let objEquipment = {};
    let arrEquipment = [];
    objEquipment = req.body.equipmentRequired;
    arrEquipment = Object.values(objEquipment);

    const profileEquipmentFields = {};
    profileEquipmentFields.user = req.user.id; //gets avatar, name, email
    if (req.body.handle) profileEquipmentFields.handle = req.body.handle;
    if (req.body.equipmentRequired)
      profileEquipmentFields.equipmentRequired = arrEquipment;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileEquipmentFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create

        //check if handle exists
        Profile.findOne({ handle: profileEquipmentFields.handle }).then(
          profile => {
            if (profile) {
              errors.handle = "That handle already exists";
              res.status(400).json(errors);
            }
            //save Profile
            new Profile(profileEquipmentFields)
              .save()
              .then(profile => res.json(profile));
          }
        );
      }
    });
  }
);

// @ route  POST api/profile/equipment
// @desc    add equipment to profile
// @access  private

//needs to be like workout where we pass in an object of equipment

/*router.post(
  "/equipment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEquipmentInput(req.body);
    if (!isValid) {
      //console.log("is valid failed");
      return res.status(400).json(errors);
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      let objEquipment = {};
      let arrEquipment = [];
      objEquipment = req.body.equipment;
      arrEquipment = Object.values(objEquipment);

      const newEquipment = {
        //_id: req.body._id,
        equipment: arrEquipment
      };

      //add to equipment array
      profile.equipment.unshift(newEquipment);
      profile.save().then(profile => res.json(profile));
    });
  }
);*/

// @ route  DELETE api/profile/equipment/:equipment_id
// @desc    delete equipment from profile  works with deleteEquipment in profileActions
// @access  private

//needs to be like workout where we pass in an object of equipment

// @route   DELETE api/profile/equipment/:eq_id
// @desc    Delete education from profile works with deleteEquipment in profileActions
// @access  Private
/*router.delete(
  "/equipment/:eq_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.equipmentRequired
          .map(item => item.id)
          .indexOf(req.params.eq_id);

        // Splice out of array
        profile.equipmentRequired.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);*/

// @ route  DELETE api/profile
// @desc    delete user and profile
// @access  private

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
