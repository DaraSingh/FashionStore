import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet } from "react-router-dom";
import ROLE from "../common/role";
import { useNavigate } from "react-router-dom";

// only for desktop version
const AdminPanel = () => {
    const user = useSelector((state) => state?.user?.user);
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <div className="min-h-[calc(99vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.userName}</p>
          <p className="text-sm">{user?.role}</p>
        </div>
         {/*** Navigation */}
        <div >
                <nav className="grid p-4">
                    <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">All Users</Link>
                    <Link to={"all-products"} className="px-2 py-1  hover:bg-slate-100">All Products</Link>
                </nav>
        </div>
      </aside>

      <main className="w-full h-full p-4">
                <Outlet></Outlet>
      </main>
    </div>
    // <div>AdminPanel</div>
  );
};

export default AdminPanel;
