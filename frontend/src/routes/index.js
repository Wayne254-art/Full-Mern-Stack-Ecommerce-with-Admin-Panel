

import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/adminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import UserPanel from '../pages/UserPanel'
import MyAddress from '../pages/MyAddress'
import MyOrders from '../pages/MyOrders'
import MyWishlist from '../pages/MyWishlist'
import EarnWithUs from '../pages/EarnWithUs'


const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot password",
                element : <ForgotPassword/>
            },
            {
                path : "sign up",
                element : <SignUp/>
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
                path : "admin panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all products",
                        element : <AllProducts/>
                    }
                ]
            },
            {
                path : "user panel",
                element : <UserPanel/>,
                children : [
                    {
                        path : "my address",
                        element : <MyAddress/>
                    },
                    {
                        path : "my orders",
                        element : <MyOrders/>
                    },
                    {
                        path : "my wishlist",
                        element : <MyWishlist/>
                    },
                    {
                        path : "sell",
                        element : <EarnWithUs/>
                    },
                ]
            },
        ]
    }
])


export default router