const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HouseHoldSchema = new Schema({
    houseType:{
        type: [String] ,
        required: true,
        enum: [
            'HDB',
            'Condo',
            'Landed'
        ]              
    },    
    name:{
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    gender: String,
    maritalStatus: String,
    spouse: String,
    annualIncome:{
        type: Number,
        required: [true, 'Please enter the annual income']
    },
    
    dob:{
        type: Date,
        required: true,
    },

    occupationType:{
        type: [String],
        required:true,
        enum: [
            'Unemployed',
            'Student',
            'Employed'
        ]
    }
})

const testSchema = new Schema({
    houseType:String,
    name: String,
    gender: String,
    maritalStatus: String,
    spouse: String,
    annualIncome: Number,
    dob: Date,
    occupationType: String
})

const Household = mongoose.model('Household', HouseHoldSchema)
module.exports = Household