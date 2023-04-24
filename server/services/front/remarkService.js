const models = require("../../models");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getRemarkByOrderId = async (req, res) => {
  try {
    let orderId = req.params.order_id;    
    const main_tbl = await models.tbl_remark.findOne({ where: { order_id: orderId } })
      .then(result => {
        res.send({
          status: 1,
          data: result
        })
      })
      .catch(err => {
        res.send(err)
      })
  }
  catch (error) {
    let msg = {
      status: 0,
      message: 'Something Went Wrong.',
      error: error.message
    }
    res.send(msg)
  }
}

const createRemarkForOrder = async (req, res) => {
  try {
    let info = req.body;
    const main_tbl = await models.tbl_remark.create(info)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err
      })
    res.send(main_tbl)
  }
  catch (error) {
    let msg = {
      status: 0,
      message: 'Something Went Wrong.',
      error: error.message
    }
    res.send(msg)
  }
}

module.exports = {
  getRemarkByOrderId,
  createRemarkForOrder
};
