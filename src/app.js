const express = require('express');

const app = express();

const {connectdb}=require('./config/database');

const {userModel}=require('./models/user')
const {validatesignup}=require('./utils/validation')

app.use(express.json())

app.post("/signup",async (req,res)=>{
//creating a new instance of the user model

    // const user=new userModel({
    //     firstName:"Avi",
    //     LastName:"Manchanda",
    //     emailId:"abc@gmail.com",
    //     password:"abc",
    //     age:24,
    //     gender:"Male"
    // });
    
    try{
        validatesignup(req)
        console.log(req.body);
    const user=new userModel(req.body)

    await user.save()
   
    res.send("Data saved to MongoDB")
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

// get user by email
app.get("/user",async(req,res)=>{
    const useremail=req.body.emailId;

    try{
    const data=await userModel.find(
        {
            emailId:useremail
        }

    )

    if(data==0){
        res.send("No Data found")
    }
    else{
            res.send(data)  
    }
}
catch(err){
    res.status(400).send("Something went wrong")
}
})



// FEED API => Get all the users from the DB
app.get("/feed",async (req,res)=>{

        try{
            const data=await userModel.find({})

            if(data==0){
                res.send("No Data found")
            }
            else{
                    res.send(data)
                   
            }
        }
        catch(err){
            res.status(400).send("Something went wrong")
        }
        
})

// Deleting the user by ID

app.delete("/user",async (req,res)=>{
    const userid=req.body._id

    try{
        const user=await userModel.findByIdAndDelete(userid)
        res.send("Dleted Sucessfully")
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// Updating the data of the user

app.patch("/user",async(req,res)=>{

    const userid=req.body._id

    try{
        const data=await userModel.findByIdAndUpdate(userid,{    
            emailId:"suhani123@gmail.com",
            password:"suhani123",
            gender:"female"
        },{
            runValidators:true
        }
    )
        res.send("Data Updated Sucessfully")
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// upda the user with email id

app.patch("/useremail",async(req,res)=>{
    const emailid=req.body.emailId

    try{
        const data=await userModel.findOneAndUpdate({
            emailId:emailid
        },{
            password:"suhani1234567"
        })
        res.send("Data Updated Sucessfully 1")

    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})


// API Level Validation
// We dont want the user to change the email id when updatinmg the other fields
app.patch("/userpost/:userId",async(req,res)=>{

    const userid=req.params?.userId
    const data=req.body
    console.log(data)
    try{
    const ALLOWED_UPDATES=["about","skiils"]
    console.log("Object.keys(data):", Object.keys(data)); 
    const isUpdateAllowed = Object.keys(data)
            .filter((key) => key !== "_id") // Remove _id from the check
            .every((key) => ALLOWED_UPDATES.includes(key));
    console.log(isUpdateAllowed)
    
    if(!isUpdateAllowed){
        return res.status(400).send("Invalid update")
    }

   
        const data1=await userModel.findByIdAndUpdate({_id:userid},data,{
            runValidators:true,
            new:true
        }
    )

    res.send("Data Updated Sucessfully")


    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

// updating user by passing the data inside the postman

app.patch("/userapi",async(req,res)=>{

    const userid=req.body._id

    try{
        const data=await userModel.findByIdAndUpdate(userid,req.body,{
            runValidators:true
        }
    )
        res.send("Data Updated Sucessfully")
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})


app.patch("/userposttester", async (req, res) => {
    const userid = req.body._id;
    const data = req.body;

    console.log("Received data:", data);

    try {
        const ALLOWED_UPDATES = ["about"]; // Only allow "about" to be updated
        console.log("Object.keys(data):", Object.keys(data));

        // Filter out _id and check if all other keys in data are allowed
        const isUpdateAllowed = Object.keys(data)
            .filter((key) => key !== "_id") // Remove _id from the check
            .every((key) => ALLOWED_UPDATES.includes(key));

        console.log("isUpdateAllowed:", isUpdateAllowed);

        // If update is not allowed, return an error
        if (!isUpdateAllowed) {
            return res.status(400).send("Invalid fields for update");
        }

        // Perform the update operation and get the updated document
        const updatedData = await userModel.findByIdAndUpdate(userid, data, {
            runValidators: true,
            new: true, // Ensure the updated document is returned
        });

        if (!updatedData) {
            return res.status(404).send("User not found");
        }

        // Send back the updated data in the response
        res.json({
            message: "Data Updated Successfully",
            updatedData: updatedData, // Send back the updated document
        });
    } catch (err) {
        console.error(err); // Log the error
        res.status(400).send(err.message || "Something went wrong during the update");
    }
});




connectdb().then(
    ()=>{
        console.log("MongoDB Connected");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    }
).catch((err)=>{
    console.log(err)
})

