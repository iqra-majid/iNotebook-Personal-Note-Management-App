const jwt = require("jsonwebtoken");
const JWT_SECRET = "mynameisiqra";

const fetchuser = (req,res,next)=>{
    // Get the user from jwt and add id to req object
    const token = req.header('authToken');
    if(!token){
        res.status(401).send({error:'please authenticate using a valid token'})
    }

    try {
        // This function checks the validity of the token and decodes its payload.
        // jwt.verify() returns the decoded payload (in this case, data), which typically contains user information.
        // const data = jwt.decode(token);
        // console.log(data);
        const data= jwt.verify(token,JWT_SECRET);
        console.log(data)
        req.user=data.user; 
        console.log(req.user);
 //req.user is set to the decoded payload ,we use .user because we want specific information
        next();
    
        
    } catch (error) {
        res.status(401).send({error:'please authenticate using a valid token'})
    }
    
}

module.exports = fetchuser;