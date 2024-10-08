const Speciality = require('../models/Speciality');

const CreateSpeciality= async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
  const existingSpeciality = await Speciality.findOne({name});
    if (existingSpeciality) {
      return res.status(400).json({ message: 'Insurance already registered' });
    }
    const newSpeciality = new Speciality({
      name
    });
    await newSpeciality.save();

    res.status(201).json({ message: 'Insurance created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const GetSpeciality = async (req, res) => {
  try {
    const speciality = await Speciality.find();
    res.status(200).json(speciality);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurances', error });
  }
};
module.exports = { CreateSpeciality, GetSpeciality};
