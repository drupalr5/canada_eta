const models = require("../../models");
const Sequelize = require('sequelize');

const getRemarkByOrderId = async (req, res) => {
  try {
    let orderId = req.params.order_id;
    const main_tbl = await models.tbl_remark.findAll({
      where: { order_id: orderId },
      order: [['id', 'DESC']]
    })
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
    const lastId = await models.tbl_remark.findOne({ order: [['id', 'DESC']] })
      .then(async (result) => {
        if (result.id) {
          info.id = result.id + 1;
          const main_tbl = await models.tbl_remark.create(info)
            .then(insert => {
              return res.send(insert);
            })
            .catch(err => {
              return res.send(err);
            })
        }
      })
      .catch(err => {
        return res.send(err);
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

module.exports = {
  getRemarkByOrderId,
  createRemarkForOrder
};
