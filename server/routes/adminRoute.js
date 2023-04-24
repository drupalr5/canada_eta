const express = require("express");
const adminRouter = express.Router();
const adminService = require("../services/admin/adminLoginService")

adminRouter.post('/create', adminService.AddAdmin);
adminRouter.post('/login', adminService.LoginAdmin);
adminRouter.get('/all', adminService.getAllAdmin);
adminRouter.get('/:email/:password', adminService.getOneAdmin);
adminRouter.put('/update/:id', adminService.updateAdmin);
adminRouter.delete('/delete/:id', adminService.deleteAdmin);
adminRouter.get('/gateway-setting', adminService.getSetting);
// adminRouter.get('/:id', adminService.getAdminById);
adminRouter.post('/update-gateway-setting/:id', adminService.updateSettings);


module.exports = adminRouter