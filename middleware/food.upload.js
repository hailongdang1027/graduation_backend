const multer = require("multer");
const { parse } = require("path");
const Path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/foods");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
})

const fileFilter = (req, file, callback) => {
    const acceptableExtensions = [".png", ".jpg", ".jpeg"];
    if (!acceptableExtensions.includes(Path.extname(file.originalname))) {
        return callback(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }

    const fileSize = parseInt(req.headers["content-length"]);
    if (fileSize > 1048576) {
        return callback(new Error("File Size Big"));
    }

    callback(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    fileSize: 1048576, // 10 Mb
});

module.exports = upload.single("foodImage");