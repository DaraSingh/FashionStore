import React, { useContext, useState } from 'react'
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart3 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";
import ROLE from "../common/role";
const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.LogOut.url, {
      // By default fetch is a get method
      method: summaryApi.LogOut.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
      // fetchUserDetails()
    } else {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <header className="h-25 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={100} h={100} />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3">
          <input
            type="text"
            width={200}
            placeholder="search product here..."
            className="w-full text-center h-8 outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-8 justify-center">
        
          <div className="relative group flex justify-center" >
          {
            user?._id && (
              <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                {
                  user?.profilePic ? (
                    <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                  ) : (
                    <FaRegCircleUser/>
                  )
                }
              </div>
            )
          }
              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                        )
                      }
                     
                    </nav>
                  </div>
                )
              }
          </div>

        
          {
            user?._id && (
             <Link to={"/cart"} className='text-2xl relative'>
                 <span><BsCart3 /></span>

                 <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                     <p className='text-sm'>{context?.cartProductCount}</p>
                 </div>
             </Link>
             )
         }


          <div>
            {user?._id ? (
              <Link
                to={"/Login"}
                className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
                onClick={handleLogout}
              >
                LogOut
              </Link>
            ) : (
              <Link
                to={"/Login"}
                className="px-3 py-1 rounded-full text-white hover:bg-red-700 bg-red-600"
              >
                LogIn
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
