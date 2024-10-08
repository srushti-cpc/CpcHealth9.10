const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: { // Changed from contact to phoneNumber
        type: String,
        required: true
    },
    address: {
        street: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipcode: { type: String, required: true }
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Practice = mongoose.model('Practice', practiceSchema);
module.exports = Practice;
