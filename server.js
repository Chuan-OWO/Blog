require('dotenv').config()
const express = require('express')

const authRoutes = require('./router/api/auth')
const postRoutes = require('./router/api/post')

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
//Auth
app.use('/api/auth',authRoutes)
//Post 
app.use('/api/post',postRoutes)


//listen for requests
const port = process.env.PORT || 4000
app.listen(process.env.PORT, ()=>{
    console.log(`listeneing on port ${port} `)
})

