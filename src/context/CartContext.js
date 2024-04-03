import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext'
import toast from 'react-hot-toast'
import { FallingLines } from 'react-loader-spinner'

export const cartContext = createContext()

export default function CartContextProvider( { children } ) {

    const { myToken } = useContext( authContext )


    const [numberOfCartItems , setNumberOfCartItems] = useState(0)
    const [totalCartPrice , setTotalCartPrice] = useState(0)
    const [allProducts , setAllProducts] = useState(null)
    const [cartID , setcartID] = useState(null)
    const [isLoading , setIsLoading] = useState (null)



    async function addProductToCart(id){
        setIsLoading(true)
            const res = await axios.post( 'https://ecommerce.routemisr.com/api/v1/cart' , {
                "productId" : id
            }, {
                headers: {
                token: localStorage.getItem('tkn')
                }

            }).then( (res)=>{
                setIsLoading(false)
                toast.success( 'Added Successfully' , { duration : 1500 , position: "top-center" } )
                getUserCart()
                return true
            })
            .catch( (err)=>{
    
                console.log("err" , err);
                toast.error( 'Error Occurred...' , { duration : 1500 , position: "top-center" } )

    
                return false
    
            })
        return res

        }


        function getUserCart(){
            axios.get( 'https://ecommerce.routemisr.com/api/v1/cart' ,{
                headers: {
                    token: localStorage.getItem( 'tkn' )
                }
            }).then( (res)=>{
                console.log("res" , res.data);
                setcartID(res.data.data._id)
                localStorage.setItem('userID' , res.data.data.cartOwner)
                setAllProducts(res.data.data.products);
                setNumberOfCartItems(res.data.numOfCartItems);
                setTotalCartPrice(res.data.data.totalCartPrice);
                return true
            })
            .catch( (err)=>{
    
                console.log("err" , err);
                return false
    
            })

    }

    async function updateCount(id , newCount){
        setIsLoading(true)
        const booleanFlag =  axios.put( `https://ecommerce.routemisr.com/api/v1/cart/${id}`  ,{
            "count": newCount

        }, {
            headers: {
            token: localStorage.getItem('tkn')
            }

        }).then( (res)=>{
            setIsLoading(false)
            setAllProducts(res.data.data.products);
            setNumberOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            return true
        })
        .catch( (err)=>{

            console.log("err" , err);

            return false

        })

        return booleanFlag


    }

    async function deleteProduct(id){
        setIsLoading(true)
        const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/cart/${id}`  , {
            headers: {
            token: localStorage.getItem('tkn')}

        }).then( (res)=>{
            setAllProducts(res.data.data.products);
            setNumberOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setIsLoading(false)
            return true
        })
        .catch( (err)=>{

            console.log("err" , err);

            return false

        })

        return res


    }

    async function clearCart(){
        const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/cart`  , {
            headers: {
            token: localStorage.getItem('tkn')}

        }).then( (res)=>{
            setAllProducts([]);
            setNumberOfCartItems(0);
            setTotalCartPrice(0);

            return true
        })
        .catch( (err)=>{

            console.log("err" , err);

            return false

        })

        return res


    }

    useEffect ( ()=>{
        console.log('Getting User Data .....');
        getUserCart()

    } , [myToken] )


    if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">
    
        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div> }







    return <> 
    <cartContext.Provider value = { {
    addProductToCart,
    numberOfCartItems,
    totalCartPrice,
    allProducts,
    updateCount,
    deleteProduct,
    clearCart,
    cartID,
    getUserCart,
    } }>


        { children } 


    </cartContext.Provider>
    
    
    
    </>
}
