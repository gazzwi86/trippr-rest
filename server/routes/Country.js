const express = require('express');
const router = express.Router();
const CountryController = require('../controllers/Country');

router
  .route('/')
  .get(CountryController.get)

module.exports = router;