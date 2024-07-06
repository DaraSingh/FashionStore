import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import summaryApi from "../common";
import { toast } from "react-toastify"; //=> used for pop up
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate=useNavigate();
  console.log("data",data);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadPic = async(e) => {
    const file=e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev)=>{
      return {
        ...prev,
        profilePic:imagePic
      }
    })
    
  }
  const handleSubbmit = async(e) => {
    e.preventDefault();
    if(data.password===data.confirmPassword) {
      console.log(summaryApi.signUp.url)
      // const dataResponse=await fetch('http://localhost:8080/api/signup',{
      const dataResponse=await fetch(summaryApi.signUp.url,{
        method:summaryApi.signUp.method,
        headers:{
          'content-type' : "application/json"
        },
        body:JSON.stringify(data)
      })
      const dataApi=await dataResponse.json()
      if(dataApi.success){
        toast(dataApi.message)
        navigate("/Login")
      }
      else{
        toast.error(dataApi.message)
      }
    }else{
      toast.error("Password Should be same")
    }
    
  };
  return (
    <section id="SignUp">
      <div className="mx-auto container p-4">
        <div className="bg-white  p-5 w-full max-w-md mx-auto rounded-sm shadow-lg">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <div>
              <img src={data.profilePic || loginIcon} alt="login icon"></img>
            </div>
            <form>
              <label>
              <div className="bg-slate-200 text-center pt-1 pb-5 text-xs absolute bottom-0 w-full bg-opacity-80 cursor-pointer">
              Upload Photo
            </div>
                <input 
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
              
            </form>
          </div>

          <form className="pt-9 flex flex-col gap-2" onSubmit={handleSubbmit}>
            <div>
              <label>UserName:</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter UserName"
                  className="bg-slate-100 w-full p-2 flex"
                  name="userName"
                  required
                  value={data.userName}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full h-full outline-none bg-transparent"
                  name="email"
                  required
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full h-full outline-none bg-transparent"
                  name="password"
                  required
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer hover:scale-125"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              <div>
                <label>Confirm Password:</label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full h-full outline-none bg-transparent"
                    name="confirmPassword"
                    required
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                  />
                  <div
                    className="cursor-pointer hover:scale-125"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <span>
                      {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white w-full px-6 py-2 max-w-[200px] rounded-full hover:scale-110 mt-4 transition-all mx-auto block hover:bg-red-500">
              {" "}
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-red-500 hover:text-red-700 hover:underline"
            >
              {" "}
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
