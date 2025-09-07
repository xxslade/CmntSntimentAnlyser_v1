const express = require("express");
const router = express.Router();

const {mainPage} = require("../controllers/mainPage");

router.post("/mainPage",mainPage);

module.exports = router;