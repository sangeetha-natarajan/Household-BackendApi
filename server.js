const express = require('express')
const dotenv = require('dotenv')
const logger = require('./middleware/logger')

//Route files

const households = require('./routes/households')

// load env vars
dotenv.config({path:'./config/config.env'})
    
const app = express()

// Mount routers
app.use('/api/v1/households', households)

// Body parser
app.use(express.json())

app.use(logger)
 
const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV 

app.listen( PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`))