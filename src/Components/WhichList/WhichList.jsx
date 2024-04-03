import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { WhichListContext } from '../../context/WhichListContext'
import axios from 'axios'

export default function WhichList() {

    const {  addProductToCart } = useContext( cartContext )
    const {  allWichListProducts  , deleteFromWhichList , setIsLoading , getUserWishList , setAllWichListProductsID , isLoading  } = useContext( WhichListContext )

    if(allWichListProducts == null || isLoading){
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div>
    }


    async function myDeleteProduct(id){
        setIsLoading( true )
        const res = await axios.delete( `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`  , {
            headers: {
            token: localStorage.getItem('tkn')}

        }).then( (res)=>{
            getUserWishList()
            setAllWichListProductsID(res.data.data)
            setIsLoading( false )
            return true
        })
        .catch( (err)=>{

            console.log("err" , err);
            toast.error('Error Occurred...' , { duration : 1500 , position: "top-center" } );


            return false

        })
        return res
    }




    return <>

    {allWichListProducts.length !==0 ? <div className="container mt-5">
                <h2>My wish List</h2>

        { allWichListProducts.map( (product , idx)=>         <div key={idx} className="row border-1 border-bottom border-danger py-3 align-items-center mb-1">
            <div className="col-md-1">
                <figure>
                    <img src= {product.imageCover} className='w-100' alt={product.title} />
                </figure>
            </div>
            <div className="col-md-9">
                <h3 className='mb-3'>{product.title}</h3>
                <h5 className='mb-3'>Price: {product.price}</h5>
                <div className="d-flex justify-content-between">
                    <button onClick= { () =>deleteFromWhichList( product.id ) }  className='btn btn-outline-danger'>remove</button>
                    <button onClick={ () => addProductToCart (product.id) && myDeleteProduct( product.id ) }  className='btn btn-outline-success add-btn'>Add To Cart</button>
                </div>

            </div>
        </div> ) }

    </div> : <h1 className='bg-body-secondary text-center m-0 py-5 text-danger fw-bold'> Your Which List is Empty </h1> }

            </>
}
