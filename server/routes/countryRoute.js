const express = require("express");
const countryRouter = express.Router();
const countryService = require("../services/front/countryService")

countryRouter.put('/update/:cid', countryService.updateCountryById);
countryRouter.get('/get/', countryService.getAllCountries);
countryRouter.get('/get/:cid', countryService.getCountryById);

module.exports = countryRouter