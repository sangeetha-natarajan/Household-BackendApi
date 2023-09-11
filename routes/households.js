const express = require('express')
const { 
    getHouseholds,
    getHousehold,
    createHousehold,
    updateHousehold,
    deleteHousehold 
} = require('../controllers/household')

const router = express.Router()

router.route('/')
.get(getHouseholds)
.post(createHousehold);

router.route('/:id')
.get(getHousehold)
.put(updateHousehold)
.delete(deleteHousehold)

module.exports = router