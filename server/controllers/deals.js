const dealsRoute = require('express').Router()
const Deal = require('../models/dealSchema')

dealsRoute.get("/", async (req, res) => {
  try {
    res.send(await Deal.find({}))
  } catch (err) { 
    console.log(err)  
  }
})

module.exports = dealsRoute