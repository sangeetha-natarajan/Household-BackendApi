const Household = require('../models/Household')

let { AgeFromDateString } = require('age-calculator');

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


exports.deleteFamilyMemberByName = async(req, res, next) =>{
    try {
        let name = req.body.Name 
        //const response = await Household.findByIdAndDelete(req.params.id)
        Household.findOneAndDelete({ Name: name })
        if(!response) {
            return res.status(400).json({
                    success: false,
                    msg: `Family member ${req.body.name} deleted`
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

// Age call
function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
  
    // Check if the birthday has occurred this year
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      return age - 1;
    }
  
    return age;
  }

// Age call

exports.getHouseholdsGroupBy = async (req, res, next) =>{    
        try {  
            
            const response = await Household.aggregate([
                {      
                   
                    $project: {                        
                        totalIncome: { $sum: "$FamilyMembers.annualIncome"},
                        Age :{$max: "$FamilyMembers.dob"}
                    }
                }
            ])            
            
            response.forEach((elem) => {                                  
                  elem.Age = new AgeFromDateString(elem.Age).age;                
            });             

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


// Student scheme
exports.getStudentScheme = async (req, res, next) =>{    
    try {  
        
        const response = await Household.aggregate([
            {      
               
                $project: {                        
                    totalIncome: { $sum: "$FamilyMembers.annualIncome"},
                    DOB :"$FamilyMembers.dob"
                }
            }
        ])            
        
        const resultJson = []

        response.forEach((elem) => {            
            elem.DOB.forEach((item) => {
                const a = new AgeFromDateString(item).age
                if(a < 16 && elem.totalIncome < 150000) 
                { 
                    resultJson.push(elem._id)                                   
                }                          
            });             
        });             

        res.status(200).json({
            Scheme:"Student Encouragement Bonus Scheme",
            "No Of Families": resultJson.length,
            "Family Ids": resultJson
        })   

    } catch (err) {
        res.status(400).json({
            success: false,
            Message: err
        })
    }
}


// Family Togetherness scheme
exports.getFamilyTogethernessScheme = async (req, res, next) =>{    
    try {
        const response = await Household.aggregate([
            {      
               
                $project: {                        
                    totalIncome: { $sum: "$FamilyMembers.annualIncome"},
                    DOB :"$FamilyMembers.dob",
                    Spouse:"$FamilyMembers.spouse",
                    Name : "$FamilyMembers.name"
                }
            }
        ])                    
        
        const resultJson = []                
        response.forEach((elem) => {  
            elem.DOB.forEach((item) => {
                const a = new AgeFromDateString(item).age  
                const names = elem.Name.filter(value => elem.Spouse.includes(value)) 
                if(a < 18 && names.length > 0) 
                { 
                    resultJson.push(elem._id)                                   
                }                          
            });             
        });             

        res.status(200).json({
            Scheme:"Family togertherness Scheme",
            "No Of Families": resultJson.length,
            "Family Ids": resultJson
        })   

    } catch (err) {
        res.status(400).json({
            success: false,
            Message: err
        })
    }
}


// Family Togetherness scheme
exports.getElderBonusScheme = async (req, res, next) =>{    
    try {
        const response = await Household.aggregate([
            {  
                $project: {
                    DOB :"$FamilyMembers.dob"
                }
            }
        ])                    
        
        const resultJson = []                
        response.forEach((elem) => {             
            elem.DOB.forEach((item) => {
                const a = new AgeFromDateString(item).age           
                if(a > 50) 
                { 
                    resultJson.push(elem._id)                                   
                }                          
            });             
        });             

        res.status(200).json({
            Scheme:"Elder Bonus Scheme",
            "No Of Families": resultJson.length,
            "Family Ids": resultJson
        })   

    } catch (err) {
        res.status(400).json({
            success: false,
            Message: err
        })
    }
}


// Baby Shine
exports.getBabyShineScheme = async (req, res, next) =>{    
    try {
        const response = await Household.aggregate([
            {  
                $project: {
                    DOB :"$FamilyMembers.dob"
                }
            }
        ])                    
        const resultJson = []                
        response.forEach((elem) => {             
            elem.DOB.forEach((item) => {
                const a = new AgeFromDateString(item).age              
                if(a < 5) 
                { 
                    resultJson.push(elem._id)                                   
                }                          
            });             
        });             

        res.status(200).json({
            Scheme:"Elder Bonus Scheme",
            "No Of Families": resultJson.length,
            "Family Ids": resultJson
        })   

    } catch (err) {
        res.status(400).json({
            success: false,
            Message: err
        })
    }
}


// YOLO GST
exports.getYoloGSTScheme = async (req, res, next) =>{    
    try {  
        
        const response = await Household.aggregate([
            { 
                $project: {                        
                    totalIncome: { $sum: "$FamilyMembers.annualIncome"}                    
                }
            }
        ])            
        
        const resultJson = []

        response.forEach((elem) => { 
                if(elem.totalIncome < 100000) 
                { 
                    resultJson.push(elem._id)                                   
                }      
        });           

        res.status(200).json({
            Scheme:"YOLO GST Scheme",
            "No Of Families": resultJson.length,
            "Family Ids": resultJson
        })   

    } catch (err) {
        res.status(400).json({
            success: false,
            Message: err
        })
    }
}