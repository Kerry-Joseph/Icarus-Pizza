const mongoose = require('mongoose')

const PresetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  size: String,
  crust: String,
  toppings: Array,
  price: Number
})

module.exports = mongoose.model('Preset', PresetSchema)