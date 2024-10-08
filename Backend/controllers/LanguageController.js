const Language = require('../models/Language ');

const CreateLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
  const existingLanguage = await Language.findOne({name});
    if (existingLanguage) {
      return res.status(400).json({ message: 'Language already exist' });
    }
    const newLanguage = new Language({
      name
    });
    await newLanguage.save();

    res.status(201).json({ message: 'Language created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
const GetLanguage = async (req, res) => {
  try {
    const language = await Language.find();
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insurances', error });
  }
};

module.exports = { CreateLanguage,GetLanguage };
