// import logo from './logo.svg';
import './App.css';
import {Outlet} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryApi from './common';
import context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
function App() {
  const dispatch=useDispatch()

  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails=async()=>{
    const dataResponse=await fetch(summaryApi.current_user.url,{
      method: summaryApi.current_user.method,
      'credentials':"include",  //=> if not included =>token can't be send to backend
      // body:JSON.stringify(data)
    })

    const dataApi=await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log(dataApi)
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(summaryApi.addToCartProductCount.url,{
      method : summaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()
  },[])

  return (
    <>
      <context.Provider value={{
        fetchUserDetails, // User Details fetched
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart
      }}>
      <ToastContainer position='top-center'/>
      <Header/>
      <main className='min-h-[calc(100vh-130px)]'><Outlet/></main>
      <Footer/>
      </context.Provider>
    </>
  );
}

export default App;
