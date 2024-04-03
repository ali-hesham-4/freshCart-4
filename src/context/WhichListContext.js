import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { authContext } from './AuthContext';
import { FallingLines } from 'react-loader-spinner';
export const WhichListContext = createContext()

export default function WhichListContextProvider( { children } ) {
    const { myToken } = useContext( authContext )


    const [allWichListProducts , setAllWichListProducts] = useState(null)
    const [allWichListProductsID , setAllWichListProductsID] = useState([])
    const [isLoading , setIsLoading] = useState (null)
    let allproducts=[]


    function addToWhichList(id){

        setIsLoading( true )

        axios.post( `https://ecommerce.routemisr.com/api/v1/wishlist` , {productId: id } , {
            headers: {
                token: localStorage.getItem('tkn')
            }
        } ).then( (res)=>{
            if(res.data.status === "success"){
                console.log(res.data.data);
                toast.success( 'Added Successfully' , { duration : 1500 , position: "top-center" } )
                getUserWishList()
                setAllWichListProductsID(res.data.data)
                setIsLoading( false )
            }
        })
        .catch( (err)=>{

            console.log("err" , err);

            toast.error( 'Error Occurred...' , { duration : 1500 , position: "top-center" } )

        })


    }




    async function deleteFromWhichList(id){
        setIsLoading( true )
        const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`  , {
            headers: {
            token: localStorage.getItem('tkn')}

        }).then( (res)=>{
            getUserWishList()
            setAllWichListProductsID(res.data.data)
            setIsLoading( false )
            toast.success( 'Deleted Successfully' , { duration : 1500 , position: "top-center" } )
            return true
        })
        .catch( (err)=>{

            console.log("err" , err);
            toast.error('Error Occurred...' , { duration : 1500 , position: "top-center" } );


            return false

        })

        return res
    }

    function getUserWishList(){
        axios.get( 'https://ecommerce.routemisr.com/api/v1/wishlist' ,{
            headers: {
                token: localStorage.getItem( 'tkn' )
            }
            
        }).then( (res)=>{
            console.log(res.data.data);
            setAllWichListProducts(res.data.data)
            for (let i = 0;  i < res.data.data.length; i++) {
                allproducts.push(res?.data.data[i]._id)
            }
            console.log(allproducts);
            setAllWichListProductsID(allproducts)
        })
        .catch( (err)=>{

            console.log("err" , err);

            return false

        })




}


useEffect ( ()=>{
    getUserWishList()
    // eslint-disable-next-line
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
<WhichListContext.Provider value = { {
    addToWhichList,
    allWichListProducts,
    setAllWichListProducts,
    deleteFromWhichList,
    setAllWichListProductsID,
    allWichListProductsID,
    setIsLoading,
    isLoading,
    getUserWishList,
} }>


{ children } 


</WhichListContext.Provider>



</>

}
