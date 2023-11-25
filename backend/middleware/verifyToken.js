import jwt from "jsonwebtoken"
//middleware for verify the token and attaching the user_id with the req
const verifyToken = (req,res,next)=>{
     const tokenBearer = req.headers.authorization;
    const token = tokenBearer.split(' ')[1];
    
    if(!token){
      return res.status(400).json({
        message:"user unauthorized"
      })
    }

    jwt.verify(token,'secret',(err,decoded)=>{
     if(decoded){
      
         req.user_id = decoded.user_id;
         next();
     }
     if(err){
       return res.status(500).json({
         message:"either the token expired or its invalid"
       })
     }
    })
  
  
}

export default verifyToken;
