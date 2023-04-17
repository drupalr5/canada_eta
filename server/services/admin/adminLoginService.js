const models = require("../../models")
const authService = require("../front/authServices")
const AddAdmin = async (req, res) => {
  try {
    let info = req.body;
    const main_tbl = await models.tbl_admin.create(info)
      .then(result => {
        return result
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

const getAllAdmin = async (req, res) => {
  try {
    const main_tbl = await models.tbl_admin.findAll({})
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    res.status(200).send(main_tbl)
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

const getOneAdmin = async (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  const main_tbl = await models.tbl_admin.findOne({ where: { email: email, password: password } })
    .then(result => {
      return {
        jwtToken: authService.generateJwtToken(result),
        result,
      }
    })
    .catch(err => {
      return err;
    })
  res.status(200).send(main_tbl)
}

const updateAdmin = async (req, res) => {
  try {
    let id = req.params.id;
    const main_tbl = await models.tbl_admin.update(req.body.params, { where: { id: id } }).then(result => {
      console.log(result)
      res.status(200).send({ message: 'Success...' })
    })
      .catch(error => {
        res.status(200).send({ message: err.message })
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

const deleteAdmin = async (req, res) => {
  try {
    let Id = req.params.id;
    const main_tbl = await models.tbl_admin.destroy({ where: { id: Id } })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    res.end("admin deleted!")
  }
  catch (err) {
    res.end(err)
  }
}

const getAdminById = async (req, res) => {
  try {
    let Id = req.params.id;
    const main_tbl = await models.tbl_admin.findOne({ where: { id: Id } })
      .then(result => {
        return result
      })
      .catch(err => {
        return err;
      })
    res.status(200).send(main_tbl)
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
  AddAdmin,
  getAllAdmin,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById
}