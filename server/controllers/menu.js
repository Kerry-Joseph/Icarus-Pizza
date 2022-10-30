const menuRoute = require('express').Router()
const Menu = require('../models/menuSchema')

menuRoute.get('/', async (req, res) => {
  try {
    res.send(await Menu.find({}))
  } catch (err) {
    console.log(err)
  }
})

module.exports = menuRoute