const express = require("express");
const adminRouter = express.Router();
const adminService = require("../services/admin/adminLoginService")

adminRouter.post('/create', adminService.AddAdmin);
adminRouter.get('/all', adminService.getAllAdmin);
adminRouter.get('/:email/:password', adminService.getOneAdmin);
adminRouter.put('/update/:id', adminService.updateAdmin);
adminRouter.delete('/delete/:id', adminService.deleteAdmin);
adminRouter.get('/:id', adminService.getAdminById);

module.exports = adminRouter