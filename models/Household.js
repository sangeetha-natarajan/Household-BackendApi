const mongoose = require('mongoose')


const HouseholdSchema = new mongoose.Schema({
    "HouseholdType": {
        "type": "String"
      },
      "FamilyMembers": {
        "type": [
          "Mixed"
        ]
      }
  }
)

const Household = mongoose.model('Household', HouseholdSchema)
module.exports = Household