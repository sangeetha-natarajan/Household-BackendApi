const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/HouseholdDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6', {useNewUrlParser: true, useUnifiedTopology: true})
const db =  mongoose.connection

db.on('error',(err) => {
    console.log(err)
})


db.once('open', () => {
    console.log("Dabase Connected successfully...")
})
