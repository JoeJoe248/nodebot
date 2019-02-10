const express = require("express");
const router = express.Router();

//@route GET api/cookLog/test
//@desc Tests cookLog route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "cookLog works" }));

module.exports = router;
