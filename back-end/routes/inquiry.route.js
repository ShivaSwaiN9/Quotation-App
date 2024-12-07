const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiry, deleteInquiry } = require('../controllers/inquiry.controller');

router.route('/create')
  .post(createInquiry);

router.route('/getall')
  .get(getInquiries);

router.route("/update/:id")
  .put(updateInquiry);

router.route('/delete/:id')
  .delete(deleteInquiry);

module.exports = router;
