const mongoose = require('mongoose')


const TestSchema = new mongoose.Schema({
    "HouseholdType": {
        "type": "String"
      },
      "FamilyMemembers": {
        "type": [
          "Mixed"
        ]
      }
  }
)

const Household = mongoose.model('Household', TestSchema)
module.exports = Household