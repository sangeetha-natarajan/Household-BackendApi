const Household = require('../models/Household')

exports.createHousehold = async (req, res, next) =>{
    try { 
        const response = await Household.create(req.body)
             res.status(200).json({
                  success: true,
                  data: response
             })
        } catch(err) {
        res.status(400).json({
            success:false,
            msg: err
        })
    }
}


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


exports.getHouseholds = async (req, res, next) =>{
   
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
}


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

        } catch(err){
        res.status(400).json({
            success: false,
            msg: err
        })
   }
}


exports.deleteFamilyMemberById = async(req, res, next) =>{
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
    } catch(err){
        res.status(400).json({
            success: false,
            msg: err
        })
   }
}


exports.getHouseholdsGroupBy = async (req, res, next) =>{    
        try {  
            const response = await Household.aggregate([
                {
                    $project: {
                        
                        totalIncome: { $sum: "$FamilyMembers.annualIncome"}
                    }
                }
            ])
            res.status(200).json({
                success: true,
                count: response.length,
                data: response
            })   

        } catch (err) {
            res.status(400).json({
                success: false,
                Message: err
            })
        }
}


exports.getHouseholdsGroupByAge = async (req, res, next) =>{    
    try {  
        console.log('calling age')
        const response = await Household.aggregate([
            {   
                $set: {
                    dob: {
                        $dateFromString: {
                            dateString: "$FamilyMembers.dob",
                            // format: "%d-%m-%Y"
                            format: "%Y-%m-%d"
                        }
                    }
                }
            },
            { $set: {
                    age: {
                        $subtract: [
                            {
                                $subtract: [{$year: "$$NOW"},{$year: "$dob"}]
                            },
                            {
                                $cond:[{ $lt: [{ $dayOfYear: "$dob"},{$dayOfYear: "$$NOW"}]}, 0, 1]
                            }

                        ]
                    }
                }
            }
        ])
        console.log("RESPONSE:", response)
        res.status(200).json({
            success: true,
            data: response
        })        
    } catch (err) {
        res.status(400).json({
            success: false,
            Message: err
        })
    }
}