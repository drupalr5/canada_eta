const models = require("../models")

const AddAdmin = async (req, res) => {
  let info = req.body;
  const main_tbl = await models.tbl_admin.create(info)
  res.status(200).send(main_tbl)
}

const getAllAdmin = async (req, res) => {
  console.log(models)
  const main_tbl = await models.tbl_admin.findAll({})
  res.status(200).send(main_tbl)
}

const getOneAdmin = async (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  const main_tbl = await models.tbl_admin.findOne({ where: {email : email, password: password}})
  res.status(200).send(main_tbl)
}

const updateAdmin = async (req, res) => {
  let id = req.params.id;
  const main_tbl = await models.tbl_admin.update(req.body, { where: {id : id}})
  res.status(200).send(main_tbl)
}

const deleteAdmin = async (req, res) => {
  try {
    let Id = req.params.id;
    const main_tbl = await models.tbl_admin.destroy({ where: {id : Id}})
    res.end("admin deleted!")
  }
  catch (err) {
    res.end(err)
  }
}

const getAdminById = async (req, res) => {
  let Id = req.params.id;
  const main_tbl = await models.tbl_admin.findOne({ where: {id : Id}})
  res.status(200).send(main_tbl)
}

module.exports = {
  AddAdmin,
  getAllAdmin,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById
}