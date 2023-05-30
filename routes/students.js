const express = require("express")
const router = express.Router()
const studentModel = require('../models/students')

router.get('/',async(request,response) => {
    try{
        const students = await studentModel.find()
        response.status(200).json(students)

    }
    catch(error){
        response.status(500).json({message:error.message})
    }
})
//adding async await to 

router.post('/',(request,response) =>{
    // response.send("Details posted")
    const newStudent = new studentModel({
        name :request.body.name,
        enrolledDepartment:request.body.enrolledDepartment,
        enrollmentDate: request.body.enrollmentDate
    })
    try {
        const student = await newStudent.save()
        response.status(200).json(student)
    }
})

router.patch('/:id',(request,response) =>{
    response.send(`patching id ${request.params.id}`)
})

router.delete('/:id',(request,response) => {
    response.send(`deleting the data with id ${request.params.id}`)
})

module.exports = router