const express = require("express");
const docUploadRouter = express.Router();
const docUploadService = require("../services/front/docUploadService")

docUploadRouter.post('/doc-upload/create', docUploadService.createUploadDocByOrderId);
docUploadRouter.get('/doc-upload/get/:order_id', docUploadService.getUploadDocByOrderId);
docUploadRouter.post('/doc-upload/pdf-upload', docUploadService.movePdfDocFile);
docUploadRouter.get('/:file', docUploadService.downloadDocFile);

module.exports = docUploadRouter