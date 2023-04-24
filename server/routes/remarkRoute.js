const express = require("express");
const remarkRouter = express.Router();
const remarkService = require("../services/front/remarkService")

remarkRouter.post('/create-remark', remarkService.createRemarkForOrder);
remarkRouter.get('/get-remark/:order_id', remarkService.getRemarkByOrderId);


module.exports = remarkRouter