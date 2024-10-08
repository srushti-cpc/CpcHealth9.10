const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    birthdate: { type: Date, required: true },
    password: { type: String, required: true },
    insuranceTypeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' }] // Embedded array of Insurance IDs
});

const User = mongoose.model('User', userSchema);

module.exports = User;