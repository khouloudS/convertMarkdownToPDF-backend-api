const express = require('express');
const router = express.Router();

const controller = require("../controller/fileActions.controller");

/* convert file */
router.get("/:name", controller.convertFile);


module.exports = router;
