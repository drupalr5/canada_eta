const express = require("express");
const remarkRouter = express.Router();
const remarkService = require("../services/front/remarkService")

remarkRouter.post('/remark/create', remarkService.createRemarkForOrder);
remarkRouter.get('/remark/get/:order_id', remarkService.getRemarkByOrderId);


module.exports = remarkRouter