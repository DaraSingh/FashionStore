const userModel=require("../../models/userModel")
const bcrypt = require('bcrypt');

async function userSignUpController(req,res){
    try{
        const {email,password,userName}=req.body;
        console.log(req.body);
        const user=await userModel.findOne({email});
        if(user){
            throw new Error("User Already Exists")
        }
        if(!email){
            throw new Error("Please provide email");
        }
        if(!userName){
            throw new Error("Please provide name");
        }
        if(!password){
            throw new Error("Please provide password");
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);
        if(!hashPassword){
            throw new Error("Something went wrong")
        }
        const payload={
            ...req.body,
            role:"GENERAL",
            password:hashPassword,
            confirmPassword:hashPassword
        }
        const userData=new userModel(payload);
        const saveUser=userData.save();
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"User created Successfully"
        })
    }
    catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success:false,
        })
    }
}

module.exports=userSignUpController;