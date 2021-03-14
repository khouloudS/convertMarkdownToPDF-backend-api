const upload = require("../middleware/fileActions");
//const fs = require("fs");


const uploadFile = async (req, res) => {
    try {
        await upload(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Choose a file to upload" });
        }

        res.status(200).send({
            message: "File uploaded successfully: " + req.file.originalname,
        });
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

module.exports = { uploadFile };
