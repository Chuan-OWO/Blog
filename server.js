require('dotenv').config()
const express = require('express')

// const articleRoutes = require('./routes/article') 

const connection = require('./db/db')
const cors = require('cors');

// express app 
const app = express()

//database connection
connection()

//middleware
app.use(cors());
app.use(express.json())
app.use((res,req,next)=>{
    console.log(req.path,req.method)
    next()
})

//routes

//listen for requests
const port = process.env.PORT || 4000
app.listen(process.env.PORT, ()=>{
    console.log(`listeneing on port ${port} `)
})