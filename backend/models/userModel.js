const mongoose = require('mongoose');
// const  { use } = '../routes';
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: String, // String is shorthand for {type: String}
  email: {type:String,unique:true,required:true},
  password: String,
  confirmPassword: String,
  profilePic:String,
  role:String,
},{
    timestamps:true
});

const userModel=mongoose.model("user",userSchema);


module.exports=userModel