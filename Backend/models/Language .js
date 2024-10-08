const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    name: { type: String, required: true,unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;