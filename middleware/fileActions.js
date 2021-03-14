const util = require("util");
const multer = require("multer");
const crypto = require('crypto');
const markdownpdf = require("markdown-pdf");
const md5 = require('md5');
const path = require('path');
fs = require("fs")

const DIR = './public/uploads/';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const concatFileName = Date.now()+baseName.toLowerCase().split(' ').join('-');
        const fileName = md5(concatFileName)+ext;
        cb(null, fileName)
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "text/markdown") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('File types allowed markdown only!'));
        }
    }
}).single("file");

let fileUploadMiddleware = util.promisify(upload);

module.exports = fileUploadMiddleware;
