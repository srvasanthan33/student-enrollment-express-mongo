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

router.patch('/:id',getStudents,async (request,response) =>{
    // response.send(`patching id ${request.params.id}`)

    //assigning the details sent by user to the only specified fields
    
    if (request.body.name != null){
        response.student.name = request.body.name
    }
    if (request.body.enrolledDepartment != null){
        response.student.enrolledDepartment = request.body.enrolledDepartment
    }

    
    try{
        const updateStudent = await response.student.save() // saving the details sent by user
        response.status(201).json(updateStudent)
    }
    catch (error){
        response.status(400).json({message:error.message})
    }
})

router.delete('/:id',getStudents,async (request,response) => {
    response.send(`deleting the data with id ${request.params.id}`)
    // try{
    //     await response.student.deleteOne()
    //     response.json({message:`Deleted ${response.student.name} and the `})
    // }
    // catch(error){
    //     response.status(500).json({message:error.message})
    // }
})

async function getStudents(request,response,next){
    let student
    // should not initialize or create variables inside try statement
    try{
    student = await studentModel.findById(request.params.id)
    if(student == null){
        return response.status(404).json({message:`cannot find user wit id ${request.params.id}`})
    }
    response.student = student
    next()
    }
    catch (error){
        return response.status(500).json({message:error.message})
    }
    
}

module.exports = router