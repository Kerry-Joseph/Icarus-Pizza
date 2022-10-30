const mongoose = require('mongoose')

const DealSchema = new mongoose.Schema({
  name: String,
  img: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2017/02/18/21/28/pizza-2078289_960_720.png'
  },
  requirements: Array,
  price: Number
})

module.exports = mongoose.model('Deal' , DealSchema)