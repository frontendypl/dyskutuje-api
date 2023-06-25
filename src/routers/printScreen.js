require('dotenv').config();
const express = require('express')

const PrintScreen = require('../models/PrintScreen')

const router = new express.Router()

router.get('/printScreens', async (req, res)=>{
  const printScreens = await PrintScreen.find().sort({'createdAt':-1})
  res.status(200).send(printScreens)
})

router.delete('/printScreens/all', async (req, res)=>{
  await PrintScreen.deleteMany()
  res.status(200).send('deleted all')
})

module.exports = router;