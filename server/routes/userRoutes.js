const express = require("express");
const router = express.Router();
const {generatejwtToken} = require('../middlewares/jwtMiddleware')

const {registerUser,loginUser} = require("../controllers/userController")

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;