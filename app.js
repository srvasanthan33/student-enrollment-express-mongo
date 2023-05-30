require('dotenv').config()
const express = require("express")
const app = express()
const PORT = 3400
const stud = require("./routes/students")
const mongoose = require('mongoose')

app.use(express.json())
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',errorMessage => console.log(errorMessage))
db.once('open',() => console.log("connection established"))

app.get("/",(request,response) => {
    response.send("welcome")
    
})

app.use('/api/v1/students',stud)

app.listen(PORT,console.log(`Server running at http://localhost:${PORT}`))