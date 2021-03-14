const upload = require("../middleware/fileActions");
const markdownpdf = require("markdown-pdf")
const downloadsFolder = require('downloads-folder');
const fs = require('fs')
const path = require('path');

const uploadFile = async (req, res) => {
    try {
         await upload(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Choose a file to upload" });
        }
        res.status(200).json(
            req.file
        );
    } catch (err) {
        console.log(err);

        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size should be less than 5MB",
            });
        }
        res.status(500).send({
            message: `Error occured: ${err}`,
        });
    }
};

const convertFile = (req, res) => {
    const DIR = __basedir + "/public/uploads/";
    const fileName = req.params.name;
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
        markdownpdf().from(DIR+fileName).to(DIR+baseName+".pdf", function () {
            try {
                if (fs.existsSync(DIR+baseName+".pdf")) {
                    res.status(200).json({
                            "convert": true
                        });
                }
            } catch(err) {
                res.status(500).send({
                    message: `Error occured: ${err}`,
                });
            }
        });
}

const deleteFile = function (fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(err)
            return
        }
    });
}

const downloadFile = (req, res) => {
    const DIR = __basedir + "/public/uploads/";
    const fileName = req.params.name;
    const ext = path.extname(fileName);
    const baseName = path.basename(fileName, ext);
    try {
        res.download(DIR + fileName, (err) => {
            if (err) {
                res.status(500).send({
                    message: "File can not be downloaded: " + err,
                });
            }
            deleteFile(DIR + baseName+'.md');
            deleteFile(DIR + fileName);
        });
    } catch(err) {
        res.status(500).send({
            message: `Error occured: ${err}`,
        });
    }
};

module.exports = { uploadFile, downloadFile, convertFile };
