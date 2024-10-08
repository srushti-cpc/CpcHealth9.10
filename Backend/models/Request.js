const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    reasonForVisit: { type: String, required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
