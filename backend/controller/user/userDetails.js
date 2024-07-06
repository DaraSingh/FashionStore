const userModel = require("../../models/userModel")

async function userDetailsController(req,res){
    try {
        // catching all the details of the user once logged id
        console.log("used id",req.userId)
        const user = await userModel.findById(req.userId);
        console.log(user);
        res.status(200).json({
            data:user,
            error:false,
            success:true,
            message:"user details"
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success:false,
        })
    }
}

module.exports = userDetailsController