const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    message : {
        type: String,
        required: true
    },
    sender : {
        type: mongoose.SchemaTypes.ObjectId,
        ref : "User",
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Message',messageSchema)