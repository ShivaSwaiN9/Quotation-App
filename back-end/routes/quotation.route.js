const express = require('express');
const router = express.Router();
const { createQuotation, getQuotations, updateQuotation, deleteQuotation, salaryGeneratorPdf } = require('../controllers/quotation.controller');

router.route('/create')
  .post(createQuotation);

router.get('/pdf/:companyName/:hours', salaryGeneratorPdf); // Updated route for PDF generation
router.post('/pdf', salaryGeneratorPdf); // Updated route for PDF generation
router.get('/pdf', salaryGeneratorPdf);
router.route('/getall')
  .get(getQuotations);

router.route("/update/:id")
  .put(updateQuotation);

router.route('/delete/:id')
  .delete(deleteQuotation);

module.exports = router;
