const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('../canadaredux/public/assests/uploads/member_profile/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let DocPdfStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('../canadaredux/public/assests/uploads/docs/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let OrderDocPdf = multer({
  storage: DocPdfStorage,
}).single("files");

let uploadUserFile = util.promisify(uploadFile);
let uploadDocPdfFile = util.promisify(OrderDocPdf);

module.exports = {
  uploadUserFile,
  uploadDocPdfFile
}