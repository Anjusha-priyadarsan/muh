const mongoose=require('mongoose')

const connectionstring=process.env.CONNECTION_STRING

mongoose.connect(connectionstring).then(res=>{
    console.log('pfserver connected to mongoDB atlas...');
    
}).catch(err=>{
    console.log("connection failed!!");
    console.log(err);
    
    
})