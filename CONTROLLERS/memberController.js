const userSchema = require('../MODELS/userModel')
const portfolioSchema = require('../MODELS/portfolioModel')
const chatSchema = require('../MODELS/chatModel')

const getAllMembers = async(req,res)=>{
    try {
        const members = await  userSchema.find({isAdmin:false,isPortfolio:true}).select(" _id email username")
        res.status(201).json({msg:"fetched successfully",users:members,status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}
const getUsers = async(req,res)=>{
    try {
        const members = await  userSchema.find().select(" _id email username")
        res.status(201).json({msg:"fetched successfully",users:members,status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}


const delMember = async(req,res)=>{
    try {
        const {id}= req.params
        await userSchema.findByIdAndDelete(id)
        const profile = await portfolioSchema.findOne( {userId: id} )
        const message = await chatSchema.findOne({sender:id})
        if(message){
            await chatSchema.deleteMany({sender:id})
        }
        if(profile){
            await portfolioSchema.findByIdAndDelete(profile._id)
        }
        res.status(201).json({msg:'user removed successfully',status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

module.exports = {getAllMembers,delMember,getUsers}