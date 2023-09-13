const express = require('express')
const { 
    getHouseholds,
    getHousehold,
    getHouseholdsGroupBy,
    createHousehold,
    deleteHousehold,
    getStudentScheme,
    getFamilyTogethernessScheme,
    getElderBonusScheme,
    getBabyShineScheme,
    getYoloGSTScheme    
    
} = require('../controllers/household')

const router = express.Router()

router.route('/')
.get(getHouseholds)
.post(createHousehold)

router.route('/:id')
.get(getHousehold)
.delete(deleteHousehold)

router.route('/getHouseholdsGroupBy')
.post(getHouseholdsGroupBy)

router.route('/getStudentScheme')
.post(getStudentScheme)

router.route('/getFamilyTogethernessScheme')
.post(getFamilyTogethernessScheme)

router.route('/getElderBonusScheme')
.post(getElderBonusScheme)

router.route('/getBabyShineScheme')
.post(getBabyShineScheme)

router.route('/getYOLOGSTScheme')
.post(getYoloGSTScheme)



module.exports = router