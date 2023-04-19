const { INTEGER } = require("sequelize");
const models = require("../../models")

const AddOrder = async (req, res) => {
  try {
    let info = req.body;
    const main_tbl = await models.tblmain.create(info)
    .then(result => {
      return result;
    })
    .catch(err => {
      return err
    })
    res.send(main_tbl)
  }
  catch (error) {
    return {
      status: 0,
      message: 'Something Went Wrong.',
      error: error.message
    }
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
    const main_tbl = await models.tblmain.findAll({ where: conditionalClause, limit: resultLimit })
    .then(result => {
      return {
        status: 1,
        data: result
      }
    })
    .catch(err => {
      return err;
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

const getOneOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    const main_tbl = await models.tblmain.findOne({ where: { order_id: orderId } })
    .then(result => {
      return {
        status: 1,
        data: result
      }
    })
    .catch(err => {
      return err;
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

const updateOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    const main_tbl = await models.tblmain.update(req.body, { where: { order_id: orderId } })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
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

const updateMultipleOrder = async (req, res) => {
  try {
    let orderIds = req.body?.params?.oids;
    const main_tbl = await models.tblmain.update(req?.body?.data, { where: { order_id: orderIds } })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
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

const deleteOrder = async (req, res) => {
  try {
    let orderId = req.params.id;
    const main_tbl = await models.tblmain.destroy({ where: { order_id: orderId } })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
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
    let newOrderCount, priorityOrderCount, pendingOrderCount, completeOrderCount, customerContact = 0;
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
    const newOrderResult = await models.tblmain.count({ where: newOrder })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
    })

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
    const priorityOrderResult = await models.tblmain.count({ where: priorityOrder })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
    })

    // pendingOrder order
    const pendingOrder = {
      'payment_status': "Success",
      'process_status': "Pending",
      'doc_uploaded': 1,
    }
    if (qassign_to) {
      pendingOrder.assign_to = qassign_to;
    }

    const pendingrderResult = await models.tblmain.count({ where: pendingOrder })


    // completeOrder order
    const completeOrder = {
      'payment_status': "Success",
      'process_status': "Completed",
    }
    if (qassign_to) {
      completeOrder.assign_to = qassign_to;
    }

    const completeOrderResult = await models.tblmain.count({ where: completeOrder })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
    })

    // contact order
    const contact = {
      'payment_status': "Success",
      'process_status': "Contact Customer",
    }
    if (qassign_to) {
      contact.assign_to = qassign_to;
    }
    const contactOrderResult = await models.tblmain.count({ where: contact })
    .then(result => {
      return result
    })
    .catch(err => {
      return err;
    })

    let results = {
      'new_order': newOrderResult,
      'priority_order': priorityOrderResult,
      'pending_order': pendingrderResult,
      'complete_order': completeOrderResult,
      'customer_contact': contactOrderResult
    }
    res.status(200).send(results)
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

// Count Order
const getCountsOrder = async (req, res) => {
  try {
    // Awiating count.
    let awiatingCount, awaitingGovtCount, historyCount, deletedCount, refundCount, rejectedCount = 0;

    const awiating = {
      'payment_status': "Success",
      'process_status': "Awiating",
    }
    const awiatingResult = await models.tblmain.count({ where: awiating })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    // AwaitingGovt order
    const awaitingGovt = {
      'payment_status': "Success",
      'process_status': "AwaitingGovt",
    }
    const awaitingGovtResult = await models.tblmain.count({ where: awaitingGovt })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })

    // History order
    const history = {
      'payment_status': "Success",
    }
    const historyResult = await models.tblmain.count({ where: history })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })

    // Deleted order
    const deleted = {
      'payment_status': "Success",
      'process_status': "Deleted",
    }
    const deletedResult = await models.tblmain.count({ where: deleted })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    // Refund order
    const refund = {
      'payment_status': "Success",
      'process_status': "Refund",
    }
    const refundResult = await models.tblmain.count({ where: refund })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    // Rejected order
    const rejected = {
      'payment_status': "Success",
      'process_status': "Rejected",
    }
    const rejectedResult = await models.tblmain.count({ where: rejected })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    let results = {
      'awiatingCount': awiatingResult,
      'awaitingGovtCount': awaitingGovtResult,
      'historyCount': historyResult,
      'deletedCount': deletedResult,
      'refundCount': refundResult,
      'rejectedCount': rejectedResult
    }
    res.send(results)
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
  AddOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  gettilesOrder,
  getCountsOrder,
  updateMultipleOrder
}