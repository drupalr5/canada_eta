const models = require("../../models");
const Sequelize = require('sequelize');

const getAllCountries = async (req, res) => {
  try {
    const main_tbl = await models.tbl_country.findAll({
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

const getCountryById = async (req, res) => {
  try {
    let cid = req.params.cid;
    await models.tbl_country.findOne({ where: { id: cid } })
      .then(async (result) => {
        if (result.id) {
          return res.send({
            status: 1,
            data: result
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

const updateCountryById = async (req, res) => {
  try {
    let cid = req.params.cid;
    const settingtbl = await models.tbl_country
      .update(req.body, { where: { id: cid } })
      .then(async (result) => {
        return res.send({
          status: 1,
          message: "Updated setting successfully",
          data: result,
        });
      })
      .catch((err) => {
        return res.send({
          status: 0,
          message: "Something Went Wrong.",
          error: err.message,
        });
      });
  } catch (error) {
    let msg = {
      status: 0,
      message: "Something Went Wrong.",
      error: error.message,
    };
    res.send(msg);
  }
};

module.exports = {
  getAllCountries,
  getCountryById,
  updateCountryById
};
