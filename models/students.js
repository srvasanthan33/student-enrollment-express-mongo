// Model-View-Controller (MVC) 
// creating model

const mongoose = require('mongoose')
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    enrollDepartment:{
        type:String,
        require :true
    },
    enrollmentDate:{
        type:Date,
        default :Date.now()
    }

})



module.exports = mongoose.model('studentModel',studentSchema)