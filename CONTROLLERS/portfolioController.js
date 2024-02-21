const portfolioSchema = require('../MODELS/portfolioModel')
const userSchema = require('../MODELS/userModel')

const newPortfolio = async(req,res)=>{
    try {
        const {userId, personalInfo, bio, education, skills , projects} = req.body
        if(!userId || !personalInfo || !bio || !education || !skills){
            return res.json({msg: "missing fields",status:false})
        }
        const project = projects?projects:[]
        const user = await userSchema.findOne({_id : userId})
        if(!user){
            return res.json({msg: "user not found",status:false})
        }
        const portfolio= {
            userId : user._id,
            personalInfo,
            bio,
            skills,
            education,
            skills,
            projects : project
        }
        const response = await portfolioSchema.create(portfolio)
        if(!response){
            return res.json({msg: "error in saving portfolio" , status: false})
        }
        await userSchema.findByIdAndUpdate(userId,{isPortfolio:true})
        await userSchema.findByIdAndUpdate(userId,{isPortfolio: true},{'new':true})
        const updatedUser = await userSchema.findOne({_id : userId})
        res.status(200).json({msg: 'portfolio created successfully', user:updatedUser, status: true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const getPortfolio = async(req,res)=>{
    try {
        const {id} = req.params
        const profile = await portfolioSchema.findOne({userId: id})
        if(!profile){
            return res.json({msg:"no portfolio found in you id",status:false})
        }
        res.status(200).json({msg: 'portfolio fetched successfully', data: profile, status: true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const updatePortfolio = async(req,res)=>{
    try {
        const {userId, personalInfo, bio, education, skills , projects} = req.body
        if(!userId || !personalInfo || !bio || !education || !skills){
            return res.json({msg: "missing fields",status:false})
        }
        const project = projects?projects:[]
        const user = await portfolioSchema.findOne({userId})
        if(!user){
            return res.json({msg: "user not found",status:false})
        }
        const portfolio= {
            userId : user.userId,
            personalInfo,
            bio,
            skills,
            education,
            skills,
            projects : project
        }
        const response = await portfolioSchema.findByIdAndUpdate(user._id,{...portfolio}, {new:true})
        res.status(201).json({msg:'portfolio updated successfully',data:response,status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

module.exports = {newPortfolio,getPortfolio,updatePortfolio}