const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    ratingId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
    ratingNumber: { type: Number, required: true },
    reviewerName: { type: String, required: true }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;