import React, { useState } from 'react';

export default function Add() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    specificService: '',
    address: '',
    city: '',
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerData = {
      username: formData.name,
      email: formData.email,
      number: formData.phone,
      service: formData.service,
      specificService: formData.specificService,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      createdBy: 'admin', // Replace as necessary
      status: 1, // Default status
    };

    try {
      const response = await fetch('http://localhost:6567/api/v1/customer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        alert('Customer record created successfully!');
        setFormData({ // Reset form data upon successful submission
          name: '',
          email: '',
          phone: '',
          service: '',
          specificService: '',
          address: '',
          city: '',
          state: '',
        });
      } else {
        alert('Failed to create customer record. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="bg-white shadow-md  overflow-hidden ">
      <div className="bg-[#111827] text-white text-center py-4 text-2xl font-bold uppercase">
        Customer
      </div>
      <form className="py-6 px-8 " onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="service">
            Service
          </label>
          <select
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">Select a service</option>
            <option value="service1">Service 1</option>
            <option value="service2">Service 2</option>
            <option value="service3">Service 3</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="specificService">
            Specific Service
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="specificService"
            type="text"
            placeholder="Enter specific service details"
            value={formData.specificService}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="address"
            type="text"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="city"
            type="text"
            placeholder="Enter your city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="state">
            State
          </label>
          <input
            className="shadow-md border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-[#3730a3]"
            id="state"
            type="text"
            placeholder="Enter your state"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center mb-5">
          <button
            className="bg-[#3730a3] text-white py-2 px-4 rounded hover:bg-[#5a3cbb] focus:outline-none focus:ring focus:ring-[#5a3cbb]"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
