const mongoose = require('mongoose')

const MenuSchema = new mongoose.Schema({
  itemType: String,
  name: String,
  img: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2017/02/18/21/28/pizza-2078289_960_720.png'
  },
  description: String,
  price: Number
})

module.exports = mongoose.model('Menu', MenuSchema)