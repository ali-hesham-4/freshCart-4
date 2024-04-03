import React from "react"
import { Link, Navigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import { FallingLines } from 'react-loader-spinner';
import { useContext, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WhichListContext } from '../../context/WhichListContext';

export default function ProductDetails() {

    const { addProductToCart } = useContext( cartContext )
    const [isLoadingg , setIsLoadingg] = useState (null)
    const {  allWichListProductsID  , deleteFromWhichList , addToWhichList  } = useContext( WhichListContext )



    const { id } = useParams()

    async function addProduct(id){
        setIsLoadingg(true)
        const res = await addProductToCart (id)
        if ( res  ){
            setIsLoadingg(false)
        }else{
            toast.error('Error Occurred...' , { duration : 1500 , position: "top-right" } );
        }
    }


    function getProductDetails(){
        return axios.get( ` https://ecommerce.routemisr.com/api/v1/products/${ id } ` )
    }

    const { isLoading , data , isError } = useQuery( `ProductDetails-${id}` , getProductDetails  )

    if (isLoading || isLoadingg ) {
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div> }


    if (isError){
        return <Navigate to = '/Products' />
    }

    const ProductDetails = data.data.data

    return <>
    <div className="container my-5">
        <div className="row align-items-center">
            <div className="col-3">
                <figure>
                    <img className='w-100' src= { ProductDetails.imageCover } alt= { ProductDetails.title } />
                </figure>
            </div>

            <div className="col-9">

                <article>
                    <h2>{ ProductDetails.title }</h2>
                    <p>{ ProductDetails.description }</p>
                    <div className="d-flex justify-content-between">
                        <p className='h5'> <span className='h4 fw-bolder'> price: </span>  { ProductDetails.price } EGP</p>
                        <div className="d-flex">
                            <p className='h5 mx-5'> <span> <i style = { { color: "#daa520" } } className='fa-solid fs-4 fa-star' ></i> </span> { ProductDetails.ratingsAverage }</p>
                            <Link>
                                <p className='me-2'> 
                                    {allWichListProductsID.includes(ProductDetails._id)  ? <span onClick={ () => {deleteFromWhichList(ProductDetails._id) }}> <i style = { { color: "red" } } className='fa-solid fs-4 fa-heart' ></i> </span>
                                        : <span onClick={ () => {addToWhichList(ProductDetails._id) }}> <i style = { { color: "black" } } className='fa-solid fs-4 fa-heart' ></i> </span>
                                    }
                                </p>
                            </Link>
                        </div>
                    </div>
                    <button onClick= { () => addProduct(ProductDetails.id) } className='btn bg-main text-white w-100'>Add To Cart + </button>
                </article>
            </div>
        </div>
    </div>    
    </>
}
