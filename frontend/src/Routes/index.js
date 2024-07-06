import {createBrowserRouter} from 'react-router-dom';
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login';
import ForgetPassword from '../pages/ForgetPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import Cart from '../pages/Cart';
import ProductDetails from '../pages/ProductDetails';
import SearchProduct from '../pages/SearchProduct';

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
            {
                path: "",
                element: <Home/>,
            },
            {
                path:"login",
                element: <Login/>,
            },
            {
                path:"forget-password",
                element: <ForgetPassword/>
            },
            {
                path:"Sign-Up",
                element: <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path:"admin-panel",
                element: <AdminPanel/>,
                children:[
                    {
                        path:"all-users",
                        element: <AllUsers/>
                    },
                    {
                        path:"all-products",
                        element: <AllProducts/>
                    }

                ]
            },
        ]
    }
  ]);
  export default router