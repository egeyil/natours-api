const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: [true, 'A name is required'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A price is required'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
