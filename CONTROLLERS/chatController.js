const messageSchema = require('../MODELS/chatModel')

const newMessage = async(req,res)=>{
    try {
        const {from,message} = req.body
        const data = await messageSchema.create({
            message:message,
            sender:from
        })
        res.status(200).json({msg:"message sent",status:true,data:data})
    } catch (error) {
        res.status(400).json({msg:error.message,status:false})
    }
}

const getAllMessages = async(req,res)=>{
    try {
        const {from} = req.body
        const data =await messageSchema.find().sort({updatedAt:1}).populate("sender")
        if(!data){
            return res.json({msg:"error on fetching messages",status:false})
        }
        const messages = data.map((message)=>{
            return{
                fromSelf : message.sender._id.toString() === from,
                message : message.message,
                sender : message.sender.username
            }
        })
        res.json({messages:messages,status:true})
    } catch (error) {
        res.status(400).json({msg:error.message,status:true})
    }
}

module.exports = {newMessage,getAllMessages}