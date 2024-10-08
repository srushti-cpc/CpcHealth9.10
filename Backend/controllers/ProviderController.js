const Provider = require('../models/Provider'); // Import the Provider model

// Controller function to create a new provider
const createProvider = async (req, res) => {
  try {
    // Extracting the fields from the request body
    const {
      npi,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      address:{ street, city, state, country, zipcode },
      telehealthServices,
      insuranceTypeIds,
      specialityIds,
      languageIds,
      practiceId
    } = req.body;

    // Create the new provider with the extracted data
    const newProvider = new Provider({
      npi,
      firstName,
      lastName,
      email,
      password, // Ensure you hash the password before saving
      phoneNumber,
      address: {
        street,
        city,
        state,
        country,
        zipcode,
      },
      telehealthServices,
      insuranceTypeIds,
      specialityIds,
      languageIds,
      practiceId
    });

    // Save the provider to the database
    await newProvider.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Provider added successfully!',
      data: newProvider,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error adding provider',
      error: error.message,
    });
  }
};
const GetProviderData = async (req, res) => {
  try {
    // Fetch provider data and populate the related fields
    const providers = await Provider.find()
      .populate('insuranceTypeIds', 'name')  // Populate insuranceTypeIds with only the 'name' field
      .populate('specialityIds', 'name')     // Populate specialityIds with only the 'name' field
      .populate('languageIds', 'name')       // Populate languageIds with only the 'name' field
      .populate('practiceId', 'name')        // Populate practiceId with only the 'name' field
      .populate('ratingId');                 // If you need the whole rating object, you can keep this as it is or limit fields

    // Send back the populated data
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching provider data', error });
  }
};

module.exports = {
  createProvider,
  GetProviderData
};
