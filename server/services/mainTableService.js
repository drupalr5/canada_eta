const { INTEGER } = require("sequelize");
const models  = require("../models")

const AddOrder = async (req, res) => {
  let info = req.body;
  const main_tbl = await models.tblmain.create(info)
  res.status(200).send(main_tbl)
}

const getAllOrder = async (req, res) => {
  let whereClause = req.body ? req.body : req.params
  if (whereClause && Object.keys(whereClause).length === 0) {
    whereClause = req.query
  }
  let resultLimit = whereClause.limit ? +whereClause.limit : null;
  delete whereClause["limit"];
  let conditionalClause = whereClause ? whereClause : {}  
  const main_tbl = await models.tblmain.findAll({ where: conditionalClause, limit: resultLimit})
  res.status(200).send(main_tbl)
}

const getOneOrder = async (req, res) => {
  let orderId = req.params.id;
  const main_tbl = await models.tblmain.findOne({ where: {order_id : orderId}})
  res.status(200).send(main_tbl)
}

const updateOrder = async (req, res) => {
  let orderId = req.params.id;
  console.log(orderId)
  console.log(req.body)
  const main_tbl = await models.tblmain.update(req.body, { where: {order_id : orderId}})
  res.status(200).send(main_tbl)
}

const updateMultipleOrder = async (req, res) => {
  let orderIds = req.query.oids;
  const main_tbl = await models.tblmain.update(req.body, { where: {order_id : orderIds}})
  res.status(200).send(main_tbl)
}

const deleteOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    const main_tbl = await models.tblmain.destroy({ where: {order_id : orderId}})
    res.end('success')
  }
  catch (err) {
    res.end(err)
  }
}

// New Order
const gettilesOrder = async (req, res) => {
  // new Order count.
  let newOrderCount, priorityOrderCount, pendingOrderCount, completeOrderCount, customerContact = 0;

  const newOrder = {
    'payment_status': "Success",
    'process_status': "New",
    'processing_type': "Standard Processing",
    'doc_uploaded': 0,
  }
  const newOrderResult = await models.tblmain.count({where: newOrder})

  //Pririty order
  const priorityOrder = {
    'payment_status': "Success",
    'process_status': "New",
    'processing_type': "Priority Processing",
    'doc_uploaded': 0,
  }
  const priorityOrderResult = await models.tblmain.count({where: priorityOrder})

  // pendingOrder order
  const pendingOrder = {
    'payment_status': "Success",
    'process_status': "Pending",
    'doc_uploaded': 1,
  }
  const pendingrderResult = await models.tblmain.count({where: pendingOrder})


  // completeOrder order
   const completeOrder = {
    'payment_status': "Success",
    'process_status': "Completed",
  }
  const completeOrderResult = await models.tblmain.count({where: completeOrder})
  
  // contact order
  const contact = {
    'payment_status': "Success",
    'process_status': "Contact Customer",
  }
  const contactOrderResult = await models.tblmain.count({where: contact})
  
  let results = {
    'new_order': newOrderResult,
    'priority_order':priorityOrderResult,
    'pending_order':pendingrderResult,
    'complete_order':completeOrderResult,
    'customer_contact': contactOrderResult
  }
  res.status(200).send(results)
}

// Count Order
const getCountsOrder = async (req, res) => {
  // Awiating count.
  let awiatingCount, awaitingGovtCount, historyCount, deletedCount, refundCount, rejectedCount = 0;

  const awiating = {
    'payment_status': "Success",
    'process_status': "Awiating",
  }
  const awiatingResult = await models.tblmain.count({where: awiating})

  // AwaitingGovt order
  const awaitingGovt = {
    'payment_status': "Success",
    'process_status': "AwaitingGovt",
  }
  const awaitingGovtResult = await models.tblmain.count({where: awaitingGovt})

  // History order
  const history = {
    'payment_status': "Success",
  }
  const historyResult = await models.tblmain.count({where: history})

  // Deleted order
   const deleted = {
    'payment_status': "Success",
    'process_status': "Deleted",
  }
  const deletedResult = await models.tblmain.count({where: deleted})
  
  // Refund order
  const refund = {
    'payment_status': "Success",
    'process_status': "Refund",
  }
  const refundResult = await models.tblmain.count({where: refund})

  // Rejected order
  const rejected = {
    'payment_status': "Success",
    'process_status': "Rejected",
  }
  const rejectedResult = await models.tblmain.count({where: rejected})
  
  let results = {
    'awiatingCount': awiatingResult,
    'awaitingGovtCount':awaitingGovtResult,
    'historyCount':historyResult,
    'deletedCount':deletedResult,
    'refundCount': refundResult,
    'rejectedCount': rejectedResult
  }
  res.status(200).send(results)
}


module.exports = {
  AddOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  gettilesOrder,
  getCountsOrder,
  updateMultipleOrder
}