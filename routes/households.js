const express = require('express')
const { 
    getHouseholds,
    getHousehold,
    getHouseholdsGroupBy,
    createHousehold,
    updateHousehold,
    deleteHousehold, 
    getHouseholdsGroupByAge
} = require('../controllers/household')

const router = express.Router()

router.route('/')
.get(getHouseholds)
.post(createHousehold)

router.route('/:id')
.get(getHousehold)
.put(updateHousehold)
.delete(deleteHousehold)


router.route('/getHouseholdsGroupBy')
.post(getHouseholdsGroupBy)
router.route('/getHouseholdsGroupByAge')
.post(getHouseholdsGroupByAge)

module.exports = router