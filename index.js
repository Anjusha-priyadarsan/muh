require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routes/router')
require('./Db/dbConnection')


// create express server
const pfServer=express()

// enable cors in server
pfServer.use(cors())


// use default middileware
pfServer.use(express.json())


// ....
pfServer.use(router)

// heme 3 project view image display cheyyan
pfServer.use("/uploads",express.static("./uploads"))

// create port for server
const PORT=process.env.PORT || 3000

pfServer.listen(PORT,()=>{
    console.log(`pfServer running at port ${PORT}`);
    
})

pfServer.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">server running and waiting for client request!!!!</h1>`)
})
