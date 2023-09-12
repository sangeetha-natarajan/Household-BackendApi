const Household = require('../models/Household')



// @desc Get all households
// @route POST /api/v1/households
exports.createHousehold = async (req, res, next) =>{
    console.log(req.body)
    try {
        const response = await Household.create(req.Body)
        res.status(200).json({
            success: true,
            data: response
        })
    } catch(err) {
        res.status(400).json({
            success:false,
            msg: err.errors
        })
    }
}

// @desc Get single households
// @route GET /api/v1/households/:id
exports.getHousehold = async(req, res, next) =>{
    try {
        const response = await Household.findById(req.params.id)

        if(!response) {
            return res.status(400).json({
                success: false
            })
        }
        res.status(200).json({
            success: true,
            data:response
        })
    }catch(err){
        res.status(400).json({
            success: false,
            msg: err
        })
    }
    
}


// @desc Get all households
exports.getHouseholds = async (req, res, next) =>{
    console.log(res)
    try {
        const response = await Household.find()
        res.status(200).json({
            success: true,
            count: response.length,
            data: response
        })
        
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
    res.status(200).json({ success: true, msg: 'Show all households'})
}

// @desc Update single households
// @route put /api/v1/households/:id
exports.updateHousehold = async(req, res, next) =>{
   try {
        const response = await Household.findByIdAndUpdate(req.params.id, req.Body, {
            new:true,
            runValidators:true
        })
        if(!response) {
            return res.status(400).json({
                    success: false,
                    msg: 'Result not found'
                })}
        res.status(200).json({
            success: true,
            data:response
        })
    }catch(err){
        res.status(400).json({
            success: false,
            msg: err
        })
   }
}

// @desc Delete a households
// @route DELETE /api/v1/households/:ID
exports.deleteHousehold = async(req, res, next) =>{
    try {
        const response = await Household.findByIdAndDelete(req.params.id)
        if(!response) {
            return res.status(400).json({
                    success: false,
                    msg: `There is no ${req.params.id}  to delete`
                })}
        res.status(200).json({
            success: true,
            data:response
        })
    }catch(err){
        res.status(400).json({
            success: false,
            msg: err
        })
   }
}

