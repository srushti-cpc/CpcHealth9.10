const Practice = require('../models/Practice');

const CreatePractice = async (req, res) => {
  try {
      const { name, email, phoneNumber, address:{ street, city, state, country, zipcode }} = req.body; // Changed contact to phoneNumber

      // Create a new practice
      const newPractice = new Practice({
          name,
          email,
          phoneNumber, // Updated to phoneNumber
          address: {
            street,
            city,
            state,
            country,
            zipcode,
          },
      });

      // Save to the database
      const savedPractice = await newPractice.save();

      res.status(201).json(savedPractice);
  } catch (error) {
      console.error('Error creating practice:', error);
      res.status(500).json({ message: 'Failed to create practice' });
  }
};

const GetPractice = async (req, res) => {
    try {
        const practice = await Practice.find();
        res.status(200).json(practice);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching Practice Name', error });
      }
    
  };
module.exports = { CreatePractice,GetPractice};