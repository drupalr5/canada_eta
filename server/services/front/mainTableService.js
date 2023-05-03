const { INTEGER } = require("sequelize");
const models = require("../../models")
const columns = ['id', 'order_id', 'passport_first_name', 'passport_surname', 'email', 'telephone_number', 'customer_date', 'create_ts', 'assign_to', 'process_status'];
const AddOrder = async (req, res) => {
  try {
    let info = req.body;
    await models.tblmain.create(info)
      .then(result => {
        res.send({
          status: 200,
          data: result
        });
      })
      .catch(err => {
        res.send({
          status: 400,
          message: 'Something Went Wrong.',
          error: error.message
        })
      })
  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    })
  }
}

const getAllOrder = async (req, res) => {
  try {
    let whereClause = req.body ? req.body : req.params
    if (Object.keys(whereClause).length === 0) {
      whereClause = req.query
    }
    let resultLimit = whereClause.limit ? +whereClause.limit : null;
    delete whereClause["limit"];
    let conditionalClause = whereClause ? whereClause : {}
    await models.tblmain.findAll({ attributes: columns, where: conditionalClause, limit: resultLimit })
      .then(result => {
        res.send({
          status: 200,
          data: result
        })
      })
      .catch(err => {
        res.send({
          status: 400,
          message: 'Something Went Wrong.',
          error: error.message
        });
      })
  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}

const getOneOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    await models.tblmain.findOne({ where: { order_id: orderId } })
      .then(result => {
        res.send({
          status: 200,
          data: result
        })
      })
      .catch(err => {
        res.send({
          status: 400,
          message: 'Something Went Wrong.',
          error: error.message
        });
      })

  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}

const updateOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    await models.tblmain.update(req.body, { where: { order_id: orderId } })
      .then(result => {
        return res.send({ status: 200, data: result })
      })
      .catch(err => {
        return res.send({ status: 400, message: err.message, error: err });
      })
  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}

const updateMultipleOrder = async (req, res) => {
  try {
    let orderIds = req.body?.params?.oids;
    await models.tblmain.update(req?.body?.data, { where: { order_id: orderIds } })
      .then(result => {
        return res.send({ status: 200, data: result })
      })
      .catch(err => {
        return res.send({ status: 400, message: err.message, error: err });
      })
  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}

const deleteOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    await models.tblmain.destroy({ where: { order_id: orderId } })
      .then(result => {
        return res.send({ status: 200, data: result })
      })
      .catch(err => {
        return res.send({ status: 400, message: err.message, error: err });
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

// New Order
const gettilesOrder = async (req, res) => {
  try {
    // new Order count.
    let qassign_to = req.query.assign_to ? req.query.assign_to : null;
    const newOrder = {
      'payment_status': "Success",
      'process_status': "New",
      'processing_type': "Standard Processing",
      'doc_uploaded': 0,
    }
    if (qassign_to) {
      newOrder.assign_to = qassign_to;
    }
    const newOrderResult = await models.tblmain.count({ where: newOrder });
    //Pririty order
    const priorityOrder = {
      'payment_status': "Success",
      'process_status': "New",
      'processing_type': "Priority Processing",
      'doc_uploaded': 0,
    }
    if (qassign_to) {
      priorityOrder.assign_to = qassign_to;
    }
    const priorityOrderResult = await models.tblmain.count({ where: priorityOrder });

    // pendingOrder order
    const pendingOrder = {
      'payment_status': "Success",
      'process_status': "Pending",
      'doc_uploaded': 1,
    }
    if (qassign_to) {
      pendingOrder.assign_to = qassign_to;
    }

    const pendingrderResult = await models.tblmain.count({ where: pendingOrder });


    // completeOrder order
    const completeOrder = {
      'payment_status': "Success",
      'process_status': "Completed",
    }
    if (qassign_to) {
      completeOrder.assign_to = qassign_to;
    }

    const completeOrderResult = await models.tblmain.count({ where: completeOrder });

    // contact order
    const contact = {
      'payment_status': "Success",
      'process_status': "Contact Customer",
    }
    if (qassign_to) {
      contact.assign_to = qassign_to;
    }
    const contactOrderResult = await models.tblmain.count({ where: contact });

    let results = {
      'new_order': newOrderResult,
      'priority_order': priorityOrderResult,
      'pending_order': pendingrderResult,
      'complete_order': completeOrderResult,
      'customer_contact': contactOrderResult
    }
    res.send({
      status: 200,
      data: results
    });
  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}

// Count Order
const getCountsOrder = async (req, res) => {
  try {
    // Awiating count.
    let qassign_to = req.query.assign_to ? req.query.assign_to : null;
    const awiating = {
      'payment_status': "Success",
      'process_status': "Awiating",
    }
    if (qassign_to) {
      awiating.assign_to = qassign_to;
    }
    const awiatingResult = await models.tblmain.count({ where: awiating });
    // AwaitingGovt order
    const awaitingGovt = {
      'payment_status': "Success",
      'process_status': "AwaitingGovt",
    }
    if (qassign_to) {
      awaitingGovt.assign_to = qassign_to;
    }
    const awaitingGovtResult = await models.tblmain.count({ where: awaitingGovt });
    // History order
    const history = {
      'payment_status': "Success",
    }
    if (qassign_to) {
      history.assign_to = qassign_to;
    }
    const historyResult = await models.tblmain.count({ where: history });

    // Deleted order
    const deleted = {
      'payment_status': "Success",
      'process_status': "Deleted",
    }
    if (qassign_to) {
      deleted.assign_to = qassign_to;
    }
    const deletedResult = await models.tblmain.count({ where: deleted });
    // Refund order
    const refund = {
      'payment_status': "Success",
      'process_status': ["Complete Refunds", "Refund"]
    }
    if (qassign_to) {
      refund.assign_to = qassign_to;
    }
    const refundResult = await models.tblmain.count({ where: refund });
    // Rejected order
    const rejected = {
      'payment_status': "Success",
      'process_status': "Rejected",
    }
    if (qassign_to) {
      rejected.assign_to = qassign_to;
    }
    const rejectedResult = await models.tblmain.count({ where: rejected });
    let results = {
      'awiatingCount': awiatingResult,
      'awaitingGovtCount': awaitingGovtResult,
      'historyCount': historyResult,
      'deletedCount': deletedResult,
      'refundCount': refundResult,
      'rejectedCount': rejectedResult
    }
    res.send({
      status: 200,
      data: results
    })
  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}

const getOrderDetails = async (req, res) => {
  try {
    let orderId = req.params.id;
    console.log(orderId)
    const main_tbl = await models.tblmain.findOne({
      include: [
        {
          model: models.tbl_upload_doc,
          as: 'uploadDoc',
          attributes: {
            exclude: ['file2', 'table_id', 'reference_no']
          }
        },
        {
          model: models.tbl_downloaded_history,
          as: 'downloadHistory'
        },
        {
          model: models.tbl_remark,
          as: 'remark',
          attributes: {
            exclude: ['create_ts']
          }
        },
        {
          model: models.tbl_mail_history,
          as: 'mailHistory',
        }
      ],
      where: { order_id: orderId }
    })
      .then(result => {
        res.send({
          status: 200,
          data: result
        })
      })
      .catch(err => {
        res.send({
          status: 0,
          message: 'Something Went Wrong.',
          error: error.message
        })
      })

  }
  catch (error) {
    res.send({
      status: 400,
      message: 'Something Went Wrong.',
      error: error.message
    });
  }
}
module.exports = {
  AddOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  gettilesOrder,
  getCountsOrder,
  updateMultipleOrder,
  getOrderDetails
}