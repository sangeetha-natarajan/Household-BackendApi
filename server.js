const express = require('express')
const dotenv = require('dotenv')
const db = require('./database/db')
const morgan = require('morgan')
dotenv.config({path:'./config/config.env'})

const householdRoute = require('./routes/households')
    
const app = express()

app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV === 'development' ) {
    app.use(morgan('dev'))
}

app.use('/api/v1/households', householdRoute)
 
const PORT = process.env.PORT || 5000
const ENV = process.env.NODE_ENV 

app.listen( PORT, console.log(`Server running in ${ENV} mode on port ${PORT}`))