const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DestinationSchema = require('./Destination').schema;

const ListSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  destinations: [DestinationSchema],
});

module.exports = mongoose.model('List', ListSchema);
