import React from 'react'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'
import { AuthContextProvider } from './context/AuthContext'
import ProtectedRoute from './Components/Protected Route/ProtectedRoute'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './context/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'
import NewCategoiesContextProvider from './context/CategoiesContext'
import WhichList from './Components/WhichList/WhichList'
import WhichListContextProvider from './context/WhichListContext'
import { Offline } from 'react-detect-offline'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword'
import VerifyCode from './Components/VerifyCode/VerifyCode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import ForgetPasswordContextProvider from './context/ForgetPasswordContext'
import BrandsContextProvider from './context/BrandsContext'
import Home from './Components/Home/Home'
const myRouter =  createHashRouter( [
{path: '/' , element:  <Layout /> , children:[

    { path: '' , element:<ProtectedRoute>
    <Home /> 
    </ProtectedRoute> },
    { path: 'register' , element: <Register /> },
    { path: 'Login' , element: <Login /> },
    { path: 'Forget-Password' , element: <ForgetPassword /> },
    { path: 'Verify-Code' , element: <VerifyCode /> },
    { path: 'Reset-Password' , element: <ResetPassword /> },
    { path: 'Home' , element: <ProtectedRoute>
        <Home /> 
        </ProtectedRoute> },
    { path: 'Products' , element: <ProtectedRoute>
        <Products /> 
        </ProtectedRoute> },
    { path: 'cart' , element: <ProtectedRoute>
        <Cart /> 
        </ProtectedRoute> },
    { path: 'categories' , element: <ProtectedRoute>
        <Categories /> 
        </ProtectedRoute> },
    { path: 'brands' , element: <ProtectedRoute>
        <Brands /> 
        </ProtectedRoute> },
    { path: 'products/:id' , element: <ProtectedRoute>
        <ProductDetails /> 
        </ProtectedRoute> },
    { path: 'Payment' , element: <ProtectedRoute>
        <Payment />
        </ProtectedRoute> },
    { path: 'AllOrders' , element: <ProtectedRoute>
        <AllOrders />
        </ProtectedRoute> },
    { path: 'WhichList' , element: <ProtectedRoute>
        <WhichList />
        </ProtectedRoute> },

    { path: '*' , element: <NotFound /> },
    
] },
] )

const myClient = new QueryClient()

export default function App() {


return <>

<QueryClientProvider client={ myClient }>


        <AuthContextProvider>
            <CartContextProvider>
                <NewCategoiesContextProvider>
                    <BrandsContextProvider>
                        <WhichListContextProvider>
                            <ForgetPasswordContextProvider>
                                <RouterProvider router = {myRouter} />
                            </ForgetPasswordContextProvider>
                        </WhichListContextProvider>
                    </BrandsContextProvider>
                </NewCategoiesContextProvider>
            </CartContextProvider>
        </AuthContextProvider>


</QueryClientProvider>

<Toaster />

<Offline>
    <div className="bg-dark fixed-bottom text-center text-white">
        Your Internet Connection has been Corrupted
    </div>
</Offline>


</>



}
