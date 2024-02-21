const userSchema = require('../MODELS/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')
const nodemailer = require('nodemailer')

function generatePassword() {
    const length = 6;
    let password = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return password;
}

const register =async(req,res)=>{
    try {
       const {username,email,isAdmin} = req.body
       if(!username || !email){
        return res.json({msg:"missing fields",status:false})
       }
       const password = generatePassword()
       const checkEmail = await userSchema.findOne({email})
       const checkUsername = await userSchema.findOne({username})
       if(checkEmail){
        return res.json({message:"This email is already registered",status:false})
       }
       if(checkUsername){
        return res.json({message:"This username is already registered",status:false})
       }
       const hashedPassword = await bcrypt.hash(password,10)
       const newUser = {username,
        password:hashedPassword,
        email,
        isAdmin
    }
       const user = await userSchema.create(newUser)
       if(user){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'aalansasonsingarayan@gmail.com',
              pass: 'opid nkqb fquq bkxr'
            }
          });
          
          const mailOptions = {
            from: 'aalansasonsingarayan@gmail.com',
            to: email,
            subject: 'Welcome to TechWiz Club🎉',
            text: `Your username and password for you account in TechWiz club is,\nusername: ${username}\npassword: ${password}\nDon't share it with anyone.`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
                res.status(200).json({msg: "user registered successfully",status: true})
            }
          })
       }
    } catch (error) {
        res.status(401).json({message: `${error.message}`,status:"error"})
    }
}

const login = async(req,res)=>{
    try {
       const {email,password} = req.body
       const user = await userSchema.findOne({email})
       if(!user){
        return res.json({message:"user not found",status:false})
       }
       const match = await bcrypt.compare(password,user.password)
       if(!match){
        return res.json({message:"Invalid Password",status:false})
       }
       const token = jwt.sign({"username": user.username},process.env.JWT,{expiresIn: '1d'})
       const userObject = user.toObject()
       delete userObject.password;
       userObject.token = token;
       res.status(201).json({user:userObject,status:true})
    } catch (error) {
        res.status(401).json({message: `${error.message}`,status:false})
    }
}

module.exports = {register,login}