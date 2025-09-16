const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwtMiddleware");

    const token=req.headers['authorization'].split(" ")[1]

    try {
        const jwtResponse=jwt.verify(token,process.env.JWT_PASSWORD)
        console.log(jwtResponse);
        req.userId=jwtResponse.userId
        next()
        


    } catch (err) {
        res.status(401).json("authorization failed")
        
    }
    
}


module.exports=jwtMiddleware