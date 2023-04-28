const models = require("../../models");
const uploadFile = require("../../middleware/upload");
const path = require('path');
const getUploadDocByOrderId = async (req, res) => {
  try {
    let orderId = req.params.order_id;
    const main_tbl = await models.tbl_upload_doc.findAll({
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

const createUploadDocByOrderId = async (req, res) => {
  try {
    let info = req.body;
    console.log(info)
    const lastId = await models.tbl_upload_doc.findOne({ order: [['id', 'DESC']] })
      .then(async (result) => {
        if (result.id) {
          info.id = result.id + 1;
          const main_tbl = await models.tbl_upload_doc.create(info)
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

const downloadDocFile = async (req, res) => {
  try {
    let file_name = req.params.file;
    const filepath = path.resolve(`./uploads/docs/${file_name}`);
    ;(async () => {
     await res.download(filepath, file_name)
    })()
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
const movePdfDocFile = async (req, res) => {
  try {
    await uploadFile.uploadDocPdfFile(req, res)
      .then((result) => {
        console.log(result)
        return res.send({
          status: 1,
          message: "Uploaded the file successfully: ",
          fileName: req.file.originalname,
        });
      })
    if (req.file == undefined) {
      return res
        .status(400)
        .send({ status: 1, message: "Please upload a file!" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: 1, message: error });
  }
};

module.exports = {
  getUploadDocByOrderId,
  createUploadDocByOrderId,
  movePdfDocFile,
  downloadDocFile
};
