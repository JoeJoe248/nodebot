const express = require("express");
const router = express.Router();

//@route GET api/recipe/test
// @desc Tests recipe route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "recipes works" }));

module.exports = router;
