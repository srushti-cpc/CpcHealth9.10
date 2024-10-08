const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    npi: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: {
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipcode: { type: String, required: true }
    },
    telehealthServices: { type: Boolean, default: false } ,
    insuranceTypeIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' }
    ],
    specialityIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Speciality' }
    ],
    languageIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Language' }
    ],
    ratingId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Rating'
    },
    practiceId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Practice' 
    }
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
