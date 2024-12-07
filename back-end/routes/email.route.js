const express = require('express');
const router = express.Router();
const {  } = require('../controllers/email.controller');

router.route('/create')
  .post(createCustomer);

module.exports = router;
