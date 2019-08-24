const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Country', CountrySchema);
