import React, { useEffect, useState } from 'react'
import summaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers]=useState([])
    const [openUpdateRole,setOpenUpdateRole]=useState(false)  // for opening and closing of pop up for edit Action
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        userName: "",
        role: "",
        _id:""
    })
    const fetchAllUsers = async() =>{
        const fetchData = await fetch(summaryApi.allUser.url,{
            method : summaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse=await fetchData.json()
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }
        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

        console.log("data",dataResponse)
    }
    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='pb-4 bg-white'>
        <table className='w-full userTable '>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {
                allUser.map((el,index)=>{
                    return(
                        <tr>
                            <td>{index+1}</td>
                            <td>{el?.userName}</td>
                            <td>{el?.email}</td>
                            <td>{el?.role}</td>
                            <td>{moment(el?.createdAt).format('LL')}</td>
                            <td>
                                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                onClick={()=>{
                                    setUpdateUserDetails(el)
                                    setOpenUpdateRole(true)

                                }}

                                ><MdModeEdit /></button>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    userName={updateUserDetails.userName}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )
        }
    </div>
  )
}

export default AllUsers