const express = require("express");
const router = express.Router();
const mainOrder = require("../services/mainTableService")

router.post('/create', mainOrder.AddOrder);
router.get('/get', mainOrder.getAllOrder);
// router.get('/recent', mainOrder.getRecentOrder);

router.get('/ordertiles', mainOrder.gettilesOrder);
router.get('/:id', mainOrder.getOneOrder);
router.put('/update/:id', mainOrder.updateOrder);
router.delete('/delete/:id', mainOrder.deleteOrder);

// new order
module.exports = router