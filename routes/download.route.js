const express = require('express');
const router = express.Router();

const controller = require("../controller/fileActions.controller");

/* download file */
router.get("/:name", controller.downloadFile);


module.exports = router;
