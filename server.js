const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const logger = require('./middleware/logger')


// load env vars
dotenv.config({path:'./config/config.env'})
    
const app = express()

// Body parser
app.use(express.json())

app.use(logger)

app.get('/api/v1/households', (req, res) => {
    res.status(200).json({ success: true, msg: 'show the households'})
})

app.get('/api/v1/households/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Get the single household'})
})

app.post('/api/v1/households', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new household'})
})

app.put('/api/v1/households/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Update the household'})
})

app.delete('/api/v1/households/:id', (req, res) => {
  res.status(200).json({ success: true, msg: 'Delete the household'})
})


 
const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV 

app.listen( PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`))