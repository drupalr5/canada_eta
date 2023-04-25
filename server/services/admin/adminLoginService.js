const models = require("../../models");
const authService = require("../front/authServices");
const Joi = require("joi");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uploadFile = require("../../middleware/upload");
const AddAdmin = async (req, res) => {
  try {
    let info = req.body;
    const main_tbl = await models.tbl_admin
      .create(info)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    res.send(main_tbl);
  } catch (error) {
    let msg = {
      status: 0,
      message: "Something Went Wrong.",
      error: error.message,
    };
    res.send(msg);
  }
};

const LoginAdmin = async (req, res) => {
  try {
    let data = req.body;
    let { error, value } = validateAdminUserLogin(data);
    if (error) {
      return {
        status: 0,
        message: error.message,
      };
    }
    const main_tbl = await models.tbl_admin
      .findOne({
        attributes: { exclude: ["password"] },
        where: {
          email: data?.email,
          password: data?.password,
        },
      })
      .then((userInfo) => {
        if (userInfo != null) {
          return {
            status: 1,
            message: "Welcome To The Canada Admin Portal",
            jwtToken: authService.generateJwtToken(userInfo),
            data: userInfo,
          };
        } else {
          return {
            status: 0,
            message: "Please Check Your Email And Password.",
            data: [],
          };
        }
      })
      .catch((error) => {
        return {
          status: 0,
          message: "Something Went Wrong",
          error: error.message,
        };
      });
    res.send(main_tbl);
  } catch (error) {
    let msg = {
      status: 0,
      message: "Something Went Wrong.",
      error: error.message,
    };
    res.send(msg);
  }
};

const getUserByEmail = async (email, columns) => {
  try {
    if (typeof columns === "undefined") {
      columns = ["*"];
    } else if (typeof columns == "string") {
      columns = [columns];
    }
    let whereClause = { email: email };
    return await models.adminModel
      .findOne({
        attributes: columns,
        where: whereClause,
        subQuery: false,
        raw: true,
      })
      .then(function (result) {
        if (result !== null) {
          return result;
        } else {
          return 0;
        }
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    return {
      status: 0,
      message: "Something Went Wrong.",
      result: err,
    };
  }
};

const validateAdminUserLogin = (data) => {
  const schema = Joi.object()
    .keys({
      ["email"]: Joi.string().email().required().messages({
        "string.empty": `Email cannot be an empty`,
        "string.email": `Please enter a valid email address.`,
        "any.required": `Email field is required`,
      }),
      ["password"]: Joi.string().required().messages({
        "string.empty": `Password cannot be an empty`,
        "any.required": `Password field is required`,
      }),
    })
    .options({ allowUnknown: true });
  return schema.validate(data);
};

const getAllAdmin = async (req, res) => {
  try {
    const main_tbl = await models.tbl_admin
      .findAll({})
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    res.status(200).send(main_tbl);
  } catch (error) {
    let msg = {
      status: 0,
      message: "Something Went Wrong.",
      error: error.message,
    };
    res.send(msg);
  }
};

const getOneAdmin = async (req, res) => {
  let email = req.params.email;
  let password = req.params.password;
  const main_tbl = await models.tbl_admin
    .findOne({ where: { email: email, password: password } })
    .then((result) => {
      return {
        jwtToken: authService.generateJwtToken(result),
        result,
      };
    })
    .catch((err) => {
      return err;
    });
  res.status(200).send(main_tbl);
};

const updateAdmin = async (req, res) => {
  try {
    let id = req.params.id;
    const main_tbl = await models.tbl_admin
      .update(req.body, { where: { id: id } })
      .then(async (result) => {
        if (result[0] == 1) {
          let response = await models.tbl_admin.findOne({
            where: { id: id },
            attributes: { exclude: ["password"] },
          });
          return res.send({
            status: 1,
            message: "Password Changed Successfully.",
            data: response,
          });
        } else {
          return res.send({
            status: 0,
            message: "Password does not change, please try again.",
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.send({
          status: 0,
          message: "Something Went Wrong.",
          error: error.message,
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

const updateData = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req)
    // const main_tbl = await models.tbl_admin
    //   .update(req.body, { where: { id: id } })
    //   .then(async (result) => {
    //     if (result[0] == 1) {
    //       let response = await models.tbl_admin.findOne({
    //         where: { id: id },
    //         attributes: { exclude: ["password"] },
    //       });
    //       return res.send({
    //         status: 1,
    //         message: "Password Changed Successfully.",
    //         data: response,
    //       });
    //     } else {
    //       return res.send({
    //         status: 0,
    //         message: "Password does not change, please try again.",
    //         data: result,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     return res.send({
    //       status: 0,
    //       message: "Something Went Wrong.",
    //       error: error.message,
    //     });
    //   });
  } catch (error) {
    let msg = {
      status: 0,
      message: "Something Went Wrong.",
      error: error.message,
    };
    res.send(msg);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    let Id = req.params.id;
    const main_tbl = await models.tbl_admin
      .destroy({ where: { id: Id } })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
    res.end("admin deleted!");
  } catch (err) {
    res.end(err);
  }
};

const getAdminById = async (req, res) => {
  try {
    let Id = req.params.id;
    const main_tbl = await models.tbl_admin
      .findOne({ where: { id: Id } })
      .then((result) => {
        return res.send(result);
      })
      .catch((err) => {
        return err;
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
const getSetting = async (req, res) => {
  try {
    console.log(models.tbl_setting);
    const settingtbl = await models.tbl_setting
      .findAll({})
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        return err;
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

const updateSettings = async (req, res) => {
  try {
    let gatewayId = req.body.gateway_name;
    const settingtbl = await models.tbl_setting
      .update({ is_active: 1 }, { where: { id: gatewayId } })
      .then(async (result) => {
        await models.tbl_setting.update(
          { is_active: 0 },
          { where: { id: { [Op.not]: gatewayId } } }
        );
        if (result[0] === 1) {
          return res.send({
            status: 1,
            message: "Updated setting successfully",
            data: result,
          });
        } else {
          // const settingtbl = await models.tbl_setting.findAll({});
          return res.send({
            status: 0,
            message: "Already updated, change and update again",
            data: result,
          });
        }
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

const userFileUpload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });


    // let id = req.params.id;
    // const main_tbl = await models.tbl_admin
    //   .update(req.body, { where: { id: id } })
    //   .then(async (result) => {
    //     if (result[0] == 1) {
    //       let response = await models.tbl_admin.findOne({
    //         where: { id: id },
    //         attributes: { exclude: ["password"] },
    //       });
    //       return res.send({
    //         status: 1,
    //         message: "Password Changed Successfully.",
    //         data: response,
    //       });
    //     } else {
    //       return res.send({
    //         status: 0,
    //         message: "Password does not change, please try again.",
    //         data: result,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     return res.send({
    //       status: 0,
    //       message: "Something Went Wrong.",
    //       error: error.message,
    //     });
    //   });
  }
  catch (error) {
    console.log(error);

    // if (err.code == "LIMIT_FILE_SIZE") {
    //   return res.status(500).send({
    //     message: "File size cannot be larger than 2MB!",
    //   });
    // }

    // res.status(500).send({
    //   message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    // });
  }
}
module.exports = {
  AddAdmin,
  getAllAdmin,
  getOneAdmin,
  updateAdmin,
  updateData,
  deleteAdmin,
  getAdminById,
  LoginAdmin,
  getUserByEmail,
  getSetting,
  updateSettings,
  userFileUpload
};
