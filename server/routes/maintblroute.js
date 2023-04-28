const express = require("express");
const router = express.Router();
const mainOrderService = require("../services/front/mainTableService")
const emailHistory = require("../services/front/emailHistoryService")
const docUploadService = require("../services/front/docUploadService")
const downloadHistoryService = require("../services/front/downloadedHistoryService")

router.post('/create', mainOrderService.AddOrder);
router.get('/get', mainOrderService.getAllOrder);
router.get('/ordertiles', mainOrderService.gettilesOrder);
router.get('/ordercounts', mainOrderService.getCountsOrder);
router.get('/:id', mainOrderService.getOneOrder);
router.put('/update/:id', mainOrderService.updateOrder);
router.put('/update-multiple', mainOrderService.updateMultipleOrder);
router.delete('/delete/:id', mainOrderService.deleteOrder);

// Email History Route.
router.post('/email-history/create', emailHistory.createEmailHistoryByOrderId);
router.get('/email-history/get/:order_id', emailHistory.getEmailHistoryByOrderId);


// Doc Upload Route.
router.post('/doc-upload/create', docUploadService.createUploadDocByOrderId);
router.get('/doc-upload/get/:order_id', docUploadService.getUploadDocByOrderId);
router.post('/doc-upload/pdf-upload', docUploadService.movePdfDocFile);
router.get('/docs/:file', docUploadService.downloadDocFile);

// Download history.
router.get('/download-history/get/:order_id', downloadHistoryService.getDownloadHistoryByOrderId);
router.post('/download-history/create', downloadHistoryService.createDownloadHistoryByOrderId);
// new order
module.exports = router