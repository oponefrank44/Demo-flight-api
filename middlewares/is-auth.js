const jwt=require("jsonwebtoken");


module.exports=(req,res,next)=>{
    const token=req.get("authorization");
    if (!token) {
        const err= new Error("Not authenticated ");
        err.statusCode=401;
        throw err
    }
    let decodeToken;
    try {
        decodeToken=jwt.verify(token,"iloveyouperpetualaremyworld");
    } catch (error) {
        error.statusCode=500;
        throw error;
        
    }
    if (!decodeToken) {
        const err= new Error("Not authenticated ");
        err.statusCode=401;
        throw err
    }
    req.userId=decodeToken.userId;
    next();

}







