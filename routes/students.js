const express = require("express")
const router = express.Router()
const studentModel = require('../models/students')

//adding async await to 
router.get('/',async(request,response) => {
    try{
        const students = await studentModel.find()
        response.status(200).json(students)

    }
    catch(error){
        response.status(500).json({message:error.message})
    }
})

router.get('/:id',getStudents,(request,response)=>{
    response.status(200).json(response.student)
})


router.post('/',async(request,response) =>{
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
    catch(error){
        response.status(500).json({message:error.message})
    }
})

router.patch('/:id',getStudents,(request,response) =>{
    response.send(`patching id ${request.params.id}`)
})

router.delete('/:id',(request,response) => {
    response.send(`deleting the data with id ${request.params.id}`)
})

async function getStudents(request,response,next){
    let student
    // should not initialize or create variables inside try statement
    try{
    student = await studentModel.findById(request.params.id)
    if(student == null){
        return response.status(404).json({message:`cannot find user wit id ${request.params.id}`})
    }
    }
    catch (error){
        return response.status(500).json({message:error.message})
    }
    response.json(student)
    next()
}

module.exports = router