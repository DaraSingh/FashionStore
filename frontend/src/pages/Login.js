import React, { useState ,useContext} from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import summaryApi from "../common";
import { toast } from "react-toastify"; //=> used for pop up
import context from "../context";
const Login = () => {
    const [showPassword,setShowPassword]=useState(false);
    const [data,setData]=useState({
        email : "",
        password : ""
    })
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
    const navigate=useNavigate();
    const {fetchUserDetails}=useContext(context)
    const handleSubbmit = async(e)=>{
        e.preventDefault();
        // const dataResponse=await fetch('http://localhost:8080/api/signin',{
            const dataResponse=await fetch(summaryApi.signIn.url,{
              method: summaryApi.signIn.method,
              'credentials':"include",
              headers:{
                'content-type' : "application/json"
              },
              body:JSON.stringify(data)
            })
            const dataApi=await dataResponse.json()
            if(dataApi.success){
                toast(dataApi.message)
                navigate("/")
                fetchUserDetails()
            }
            else {
                toast.error(dataApi.message)
            }
    }
    
  return (
    <section id="login">
    <div className='mx-auto container p-4'>
        <div className='bg-white  p-5 w-full max-w-md mx-auto rounded-sm shadow-lg'>
            <div className='w-20 h-20 mx-auto'>
                <img src={loginIcon} alt='login icon'></img>
            </div>

            <form className='pt-9 flex flex-col gap-2' onSubmit={handleSubbmit}>
                <div className='grid'>
                    <label>Email:</label>
                    <div className='bg-slate-100 p-2'>
                        <input 
                            type='email' 
                            placeholder='Enter Email' 
                            className='w-full h-full outline-none bg-transparent'
                            name='email'
                            value={data.email}
                            onChange={handleOnChange}   
                        />
                    </div>
                    
                </div>
                <div>
                    <label>Password:</label>
                    <div className='bg-slate-100 p-2 flex'>
                        <input 
                            type={showPassword ? "text" :'password'} 
                            placeholder='Enter Password' 
                            className='w-full h-full outline-none bg-transparent'
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                        />
                        <div className='cursor-pointer hover:scale-125' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword ? (
                                        <FaEye />
                                    ):(
                                        
                                        <FaEyeSlash />
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <div >
                                <Link to={'/forget-password'} className='block w-fit hover:underline ml-auto hover:text-gray-500'>
                                    forget password ?
                                </Link>
                    </div>
                </div>
                <button className='bg-red-600 text-white w-full px-6 py-2 max-w-[200px] rounded-full hover:scale-110 mt-4 transition-all mx-auto block hover:bg-red-500'> Login</button>
            </form>
            <p className='my-5'>Don't you have account? <Link to={'/Sign-up'} className='text-red-500 hover:text-red-700 hover:underline'> Sign Up</Link></p>
        </div>
    </div>
    </section>
  )
}

export default Login