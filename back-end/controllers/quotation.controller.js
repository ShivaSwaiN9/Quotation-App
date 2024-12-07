const puppeteer = require('puppeteer');
const Quotation = require("../models/quotation.model");
const path = require('path');
const fs = require('fs');

// Create Quotation Record
const createQuotation = async (req, resp) => {
  try {
    const { username, email, number, service, specificService, address, city, state, createdBy, status } = req.body;
    
    if (!username || !email || !number) {
      return resp.status(400).send("Fields username, email, and number are mandatory!");
    }

    const existingQuotation = await Quotation.findOne({ where: { email } });
    if (!existingQuotation) {
      const newQuotation = new Quotation({
        username,
        email,
        number,
        service,
        specificService,
        address,
        city,
        state,
        createdBy,
        status
      });
      await newQuotation.save();
      return resp.status(201).send("Quotation record created successfully!");
    } else {
      return resp.status(400).send("Quotation with this email already exists!");
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Get All Quotation Records
const getQuotations = async (req, resp) => {
  try {
    const quotations = await Quotation.findAll({
      attributes: ['sl', 'username', 'email', 'number', 'service', 'enterYourText']  // Include the new fields
    });
    
    return resp.status(200).json(quotations);
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Update Quotation Record
const updateQuotation = async (req, resp) => {
  try {
    const { id } = req.params;
    const { username, email, number, service, specificService, address, city, state, updatedBy, status } = req.body;

    const quotation = await Quotation.findByPk(id);
    if (!quotation) {
      return resp.status(404).send("Quotation record not found");
    }

    quotation.username = username || quotation.username;
    quotation.email = email || quotation.email;
    quotation.number = number || quotation.number;
    quotation.service = service || quotation.service;
    quotation.specificService = specificService || quotation.specificService;
    quotation.address = address || quotation.address;
    quotation.city = city || quotation.city;
    quotation.state = state || quotation.state;
    quotation.updatedBy = updatedBy || quotation.updatedBy;
    quotation.status = status !== undefined ? status : quotation.status; // Check if status is provided

    await quotation.save();
    return resp.status(200).send("Quotation record updated successfully!");
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Delete Quotation Record
const deleteQuotation = async (req, resp) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findByPk(id);

    if (!quotation) {
      return resp.status(404).send("Quotation record not found");
    }

    await quotation.destroy();
    return resp.status(200).send("Quotation record deleted successfully");
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Salary Generator PDF (remains unchanged)
const salaryGeneratorPdf = async (req, res) => {
  try {
      const {  } = req.params;
      const { companyName, hours } = req.body;

      // Load the JSON data
      const JsonPath = path.resolve(__dirname,"../public/json.json" );
      const jsonData = JSON.parse(fs.readFileSync(JsonPath, 'utf8'));
      let companyData ;

      if ((!hours && !companyName)){
        companyData = jsonData.companies;
        return res.status(200).send( companyData)
      };

      if(companyName){
        if (companyName == "ZPlusSecurity" && (hours == '8h'|| hours == '8')) {
          companyData = jsonData.companies[companyName];
          const companyDName = companyData.companyName;
          const companyTnC = companyData.termsAndConditions;
          const companyHours = companyData.services['8HourService']
          return res.status(200).send({ companyDName, companyHours, companyTnC})
        }
        else if(companyName == "ZPlusSecurity" && (hours == '12h' || hours == '12')){
          companyData = jsonData.companies[companyName];
          const companyDName = companyData.companyName;
          const companyTnC = companyData.termsAndConditions;
          const companyHours = companyData.services['12HourService']
          return res.status(200).send({ companyDName, companyHours, companyTnC})
        }
        else if(companyName == "MrCorporate" && (hours == '12h' || hours == '12')){
          companyData = jsonData.companies[companyName];
          const companyDName = companyData.companyName;
          const companyTnC = companyData.termsAndConditions;
          const companyHours = companyData.services['12HourService']
          return res.status(200).send({ companyDName, companyHours, companyTnC})
        }
        else if(companyName == "UtkalFacility" && (hours == '8h' || hours == '8')){
          companyData = jsonData.companies[companyName];
          const companyDName = companyData.companyName;
          const companyTnC = companyData.termsAndConditions;
          const companyHours = companyData.services['8HourService']
          return res.status(200).send({ companyDName, companyHours, companyTnC})
        }
        else{
          companyData = jsonData.companies[companyName];
          return res.status(200).send({ companyData})
        }
      };

      // Determine service data
      const serviceData = (hours == '8h') ? jsonData.companies[companyName] : 
                          (hours == '12h') ? companyData.services['12HourService'] : 
                          null;
      

      if (!serviceData) {
          console.log(`Service data for ${hours} not found.`);
          return res.status(404).send('Service not found');
      }

      // Load the template
      const templateContent = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf8');

      // Replace placeholders
      const htmlContent = templateContent
          .replace('{{companyName}}', companyData.companyName)
          .replace('{{date}}', companyData.date)
          .replace(/{{toCompanyName}}/g, companyData.to.companyName)
          .replace(/{{toAddress}}/g, companyData.to.address.join('<br>'))
          .replace('{{serviceTitle}}', serviceData.title)
          .replace('{{serviceCharges}}', serviceData.costDetails.map(detail => {
              return `<tr><td>${detail.costHead}</td><td>${detail.particulars}</td><td>${detail.securityGuardSemiSkilled}</td><td>${detail.securitySupervisorSkilled}</td></tr>`
          }).join(''));

      // Generate the PDF using Puppeteer
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();

      res.set({
          'Content-Type': 'application/pdf',
          'Content-Length': pdfBuffer.length,
          'Content-Disposition': `attachment; filename="${companyName}_quotation_${hours}.pdf"`,
      });
      res.end(pdfBuffer);
  } catch (error) {
      console.error('Error generating PDF:', error); // Log the full error
      res.status(500).send('Error generating PDF');
  }
};


module.exports = { createQuotation, getQuotations, updateQuotation, deleteQuotation, salaryGeneratorPdf };
