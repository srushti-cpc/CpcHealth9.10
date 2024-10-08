const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    name: { type: String, required: true ,unique: true},
    isRemove: {
        type: Boolean,
        default: false,
      },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Insurance = mongoose.model('Insurance', insuranceSchema);
module.exports = Insurance;