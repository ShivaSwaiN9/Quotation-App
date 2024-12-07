const Customer = require("../models/customer.model");

// Create Customer Record
const createCustomer = async (req, resp) => {
  try {
    const { username, email, number, service, specificService, address, city, state, createdBy, status } = req.body;
    
    if (!username || !email || !number) {
      return resp.status(400).send("Fields username, email, and number are mandatory!");
    }

    const existingCustomer = await Customer.findOne({ where: { email } });
    if (!existingCustomer) {
      const newCustomer = new Customer({
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
      await newCustomer.save();
      return resp.status(201).send("Customer record created successfully!");
    } else {
      return resp.status(400).send("Customer with this email already exists!");
    }
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Get All Customer Records
const getCustomers = async (req, resp) => {
  try {
    const customers = await Customer.findAll({
      attributes: ['sl', 'username', 'number', 'email', 'service', 'specificService', 'address', 'state']  // Include the new fields
    });
    
    return resp.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Update Customer Record
const updateCustomer = async (req, resp) => {
  try {
    const { id } = req.params;
    const { username, email, number, service, specificService, address, city, state, updatedBy, status } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return resp.status(404).send("Customer record not found");
    }

    customer.username = username || customer.username;
    customer.email = email || customer.email;
    customer.number = number || customer.number;
    customer.service = service || customer.service;
    customer.specificService = specificService || customer.specificService;
    customer.address = address || customer.address;
    customer.city = city || customer.city;
    customer.state = state || customer.state;
    customer.updatedBy = updatedBy || customer.updatedBy;
    customer.status = status;

    await customer.save();
    return resp.status(200).send("Customer record updated successfully!");
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

// Delete Customer Record
const deleteCustomer = async (req, resp) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return resp.status(404).send("Customer record not found");
    }

    await customer.destroy();
    return resp.status(200).send("Customer record deleted successfully");
  } catch (error) {
    console.error(error);
    return resp.status(500).send("Internal Server Error");
  }
};

module.exports = { createCustomer, getCustomers, updateCustomer, deleteCustomer };
