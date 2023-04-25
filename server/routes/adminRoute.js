const express = require("express");
const adminRouter = express.Router();
const adminService = require("../services/admin/adminLoginService")

adminRouter.post('/create', adminService.AddAdmin);
adminRouter.post('/login', adminService.LoginAdmin);
adminRouter.get('/all', adminService.getAllAdmin);
adminRouter.put('/update/:id', adminService.updateAdmin);
adminRouter.post('/updateuser/:id', adminService.updateData);
adminRouter.delete('/delete/:id', adminService.deleteAdmin);
adminRouter.get('/gateway-setting', adminService.getSetting);
adminRouter.get('/user/:id', adminService.getAdminById);
adminRouter.put('/update-gateway-setting', adminService.updateSettings);


module.exports = adminRouter