const express = require("express");
const router = express.Router();
const mainOrderService = require("../services/front/mainTableService")

router.post('/create', mainOrderService.AddOrder);
router.get('/get', mainOrderService.getAllOrder);
router.get('/ordertiles', mainOrderService.gettilesOrder);
router.get('/ordercounts', mainOrderService.getCountsOrder);
router.get('/:id', mainOrderService.getOneOrder);
router.put('/update/:id', mainOrderService.updateOrder);
router.put('/update-multiple', mainOrderService.updateMultipleOrder);
router.delete('/delete/:id', mainOrderService.deleteOrder);

// new order
module.exports = router