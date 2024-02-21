const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    personalInfo: {
        name: {
            type: String
        },
        email: {
            type: String
        },
        personalEmail: {
            type: String
        },
        mobile: {
            type:  Number
        }
    },
    bio: {
        type: String,
        required: true
    },
    education: [{
        school :{
            type: String
        },
        degree: {
            type: String
        },
        field: {
            type : String
        },
        startYear:{
            type: String
        },
        endYear: {
            type: String
        },
        percentage: {
            type: Number
        }
    }],
    skills: [String],
    projects : [{
        title: {
            type: String
        },
        description :{
            type: String
        },
        projectDomain: {
            type: String
        },
        link: {
            type: String
        },
        gitHub: {
            type: String
        }
    }]
})

module.exports = mongoose.model('Portfolio',portfolioSchema)