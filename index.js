const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const socket = require('socket.io')
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3400

app.use(cors())
app.use(express.json())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://zenchat-aalan.onrender.com');
//     next();
// })

const main =async()=>{
    try {
        const server = app.listen(PORT,()=>{
            console.log(`server running on ${PORT}`)
        })
        mongoose.connect(process.env.DB_URL).then(()=>{
            console.log('database connected successfully')
        })
        const io =  socket(server, {
            cors: {
                origin: 'https://techwiz-official.onrender.com',
                methods: ['GET', 'POST'],
            },
        })
        global.onlineUsers = new Map();

        io.on('connection', (socket) => {
            global.chatSocket = socket;
        
            socket.on('add-user', (userId) => {
                onlineUsers.set(userId, socket.id)
            });
            socket.on("send-msg",async(data) => {
                onlineUsers.forEach(async (sendUserSocket, userId) => {
                    if (userId !== socket.userId) {
                        socket.to(sendUserSocket).emit('msg-receive', {"message":data.message,"sender":data.sender});
                    }
                })
            });
        });
    } catch (error) {
        console.log(error.message)
    }
}
main()

app.use('/auth',require('./Routers/authRouter'))
app.use('/portfolio',require('./Routers/portfolioRouter'))
app.use('/chat',require('./Routers/chatRouter'))
app.use('/members',require('./Routers/memberRouter'))