const Insurance = require('../models/Insurance');
const bcrypt = require('bcrypt');

const CreateInsurance = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
  const existingInsurance = await Insurance.findOne({name});
    if (existingInsurance) {
      return res.status(400).json({ message: 'Insurance already registered' });
    }
    const newInsurance = new Insurance({
      name
    });
    await newInsurance.save();

    res.status(201).json({ message: 'Insurance created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const GetInsurances = async (req, res) => {
  try {
    const insurances = await Insurance.find();
    res.status(200).json(insurances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurances', error });
  }
};
module.exports = { CreateInsurance,GetInsurances };
