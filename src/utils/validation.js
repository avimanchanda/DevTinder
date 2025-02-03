const validator=require("validator")
const validatesignup=(req)=>{
    const {firstName,LastName,emailId,password,skiils} = req.body;

    if(!firstName ||!LastName)
    {
       throw new Error("Name is not valid")
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is not valid")
    }
    else if(!validator.isStrongPassword(password))
        {
            throw new Error("password is not valid as it is not strong")
        }
}

module.exports={
    validatesignup:validatesignup
}