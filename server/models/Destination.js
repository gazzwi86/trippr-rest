const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  destination: { type: String, required: true },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model('Destination', DestinationSchema);
