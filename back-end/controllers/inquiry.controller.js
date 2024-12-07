const Inquiry = require('../models/inquiry.model');

// Create Inquiry
const createInquiry = async (req, res) => {
  try {
    const { username, email, number, service, enterYourText, createdBy } = req.body;

    if (!username || !email || !number || !service) {
      return res.status(400).send('Username, email, number, and service are mandatory!');
    }

    const newInquiry = await Inquiry.create({
      username,
      email,
      number,
      service,
      enterYourText,
      createdBy
    });

    return res.status(201).send('Inquiry created successfully!');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

// Get All Inquiries
// const getInquiries = async (req, res) => {
//   try {
//     const inquiries = await Inquiry.findAll();
//     return res.status(200).json(inquiries);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send('Internal Server Error');
//   }
// };

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({
      attributes: [
        "sl",
        "username",
        "email",
        "number",
        "service",
        "enterYourText"
      ],
    });
    return res.status(200).json(inquiries);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

// Update Inquiry
const updateInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, number, service, enterYourText, updatedBy } = req.body;
    
    const inquiry = await Inquiry.findByPk(id);
   
    if (!inquiry) {
      return res.status(404).send('Inquiry not found');
    }

    inquiry.username = username;
    inquiry.email = email;
    inquiry.number = number;
    inquiry.service = service;
    inquiry.enterYourText = enterYourText;
    inquiry.updatedBy = updatedBy;

    await inquiry.save();

    return res.status(200).send('Inquiry updated successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

// Delete Inquiry
const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const inquiry = await Inquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).send('Inquiry not found');
    }

    await inquiry.destroy();
    return res.status(200).send('Inquiry deleted successfully');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  updateInquiry,
  deleteInquiry,
};
