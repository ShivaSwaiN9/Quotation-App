const express = require('express');
const router = express.Router();
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customer.controller');

router.route('/create')
  .post(createCustomer);

router.route('/getall')
  .get(getCustomers);

router.route("/update/:id")
  .put(updateCustomer);

router.route('/delete/:id')
  .delete(deleteCustomer);

module.exports = router;
