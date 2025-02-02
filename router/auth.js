const express = require("express");
const router = express.Router();
const {SignUpFunction, signInFunction, getAllUser} = require("../controller/auth")

router.post("/signup", SignUpFunction);
router.post("/signin", signInFunction);
router.get("/all-users", getAllUser);

module.exports = router;