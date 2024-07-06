const userModel=require("../../models/userModel")
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken"); // => for converting the data to be send into a token
const cookie = require('cookie-parser');
async function userSignInController(req,res){
    try {
        const {email,password}=req.body;
        console.log(req.body);
        const user=await userModel.findOne({email});
        if(!email){
            throw new Error("Please provide email");
        }
        if(!password){
            throw new Error("Please provide password");
        }
        if(!user){
            throw new Error("User Doesn't Exist")
        }
        const checkPassword=await bcrypt.compare(password,user.password)
        if(checkPassword){
            const tokenData={
                _id : user._id,
                email:user.email,
            }
            const token = jwt.sign(tokenData, process.env.Token_SECRET_KEY, { expiresIn: '8h' });
            const tokenOption ={
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,tokenOption).json({
                message:"Login Successful",
                credentials:"include",
                data:token,
                error:false,
                success:true,
            })
            // throw new Error(token);
        }
        else {
            throw new Error("Invalid Credentials");
        }
        // console.log("checkPassword:",checkPassword)
    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success:false,
        })
    }
}

module.exports=userSignInController;