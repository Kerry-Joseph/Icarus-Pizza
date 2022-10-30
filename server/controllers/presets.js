const presetsRoute = require('express').Router()
const Preset = require('../models/presetSchema')

presetsRoute.get('/', async (req, res) => {
  try {
    res.send(await Preset.find({}))
  }catch (err) {
    console.log(err)
  }
})

presetsRoute.post('/post', async (req, res) => {
  try {
    res.send(await Preset.create(req.body))
  } catch (err) {
    console.log(err)
  }
})

module.exports = presetsRoute