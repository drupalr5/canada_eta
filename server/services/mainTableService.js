const models  = require("../models")

const AddOrder = async (req, res) => {
  let info = req.body;
  const main_tbl = await models.tblmain.create(info)
  res.status(200).send(main_tbl)
}

const getAllOrder = async (req, res) => {
  const main_tbl = await models.tblmain.findAll({})
  res.status(200).send(main_tbl)
}

const getOneOrder = async (req, res) => {
  let orderId = req.params.order_id;
  const main_tbl = await models.tblmain.findOne({ where: {order_id : orderId}})
  res.status(200).send(main_tbl)
}

const updateOrder = async (req, res) => {
  const main_tbl = await models.tblmain.update(req.body, { where: {order_id : orderId}})
  res.status(200).send(main_tbl)
}

const deleteOrder = async (req, res) => {
  let orderId = res.params.order_id;
  const main_tbl = await models.tblmain.destroy({ where: {order_id : orderId}})
  res.status(200).send(main_tbl)
}

module.exports = {
  AddOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder
}