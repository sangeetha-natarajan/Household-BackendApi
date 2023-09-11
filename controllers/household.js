const Household = require('../models/Household')

// @desc Get all households
// @route GET /api/v1/households
exports.getHouseholds = (req, res, next) =>{
    res.status(200).json({ success: true, msg: 'Show all households'})
}

// @desc Get single households
// @route GET /api/v1/households/:id
exports.getHousehold = (req, res, next) =>{
    res.status(200).json({ success: true, msg: 'Show single household'})
}

// @desc Get all households
// @route POST /api/v1/households
exports.createHousehold = (req, res, next) =>{
    res.status(201).json({ success: true, msg: 'Create new household'})
}


// @desc Update single households
// @route put /api/v1/households/:id
exports.updateHousehold = (req, res, next) =>{
    res.status(200).json({ success: true, msg: 'Update the household'})
}

// @desc Delete a households
// @route DELETE /api/v1/households/:ID
exports.deleteHousehold = (req, res, next) =>{
    res.status(200).json({ success: true, msg: 'Delete the household'})
}

