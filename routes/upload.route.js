const express = require("express");
const router = express.Router();

const controller = require("../controller/fileActions.controller");

/* upload file */
router.post("/", controller.uploadFile)

module.exports = router;
