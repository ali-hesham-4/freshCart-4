import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Cart() {

    const { allProducts , totalCartPrice , updateCount , deleteProduct , clearCart , isLoading } = useContext( cartContext )

    if(allProducts == null || isLoading ){
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div>
    }


    async function updateMyProductCount( id , newCount ){

        const res = await updateCount( id , newCount )
        if ( res  ){
            toast.success( 'Product updated Successfully' , { duration : 1500 , position: "top-center" } )
        }else{
            toast.error('Error Occurred...' , { duration : 1500 , position: "top-center" } );
        }
    }

    async function myDeleteProduct( id ){
        const res  = deleteProduct( id )
        if ( res  ){
            toast.success( 'Product Deleted Successfully' , { duration : 1500 , position: "top-center" } )
        }else{
            toast.error('Error Occurred...' , { duration : 1500 , position: "top-center" } );
        }
    }


    return <>


    {allProducts.length !==0 ? <div className="container mt-5">
        <div className='d-flex justify-content-between'>
            <div>
                <h2 className='mb-3'>Shop Cart</h2>
                <h5 className='mb-3'>Total Cart Price: {totalCartPrice} LE</h5>
            </div>
            <Link to='/payment'>
            <button className='btn btn-primary'>Confirm Payment</button>
            </Link>
        </div>
        <button onClick= { () => clearCart( ) }  className='btn btn-outline-danger'>Clear</button>
        { allProducts.map( (product , idx)=>         <div key={idx} className="row gy-5 border-1 border-bottom border-danger py-3 align-items-center mb-1">
            <div className="col-md-1">
                <figure>
                    <img src= {product.product.imageCover} className='w-100' alt={product.product.title} />
                </figure>
            </div>
            <div className="col-md-9">
                <h3 className='mb-3'>{product.product.title}</h3>
                <h5 className='mb-3'>Price: {product.price}</h5>
                <button onClick= { () => myDeleteProduct( product.product.id ) }  className='btn btn-outline-danger'>remove</button>
            </div>
            <div className="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <button onClick= { () => updateMyProductCount( product.product.id , product.count + 1 ) } className='btn btn-outline-success'>+</button>
                    <p className='pt-3'>{product.count}</p>
                    <button disabled = {product.count === 1 } onClick= { () => updateMyProductCount( product.product.id , product.count - 1 ) } className='btn btn-outline-success'>-</button>
                </div>
            </div>
        </div> ) }

    </div> : <h1 className='bg-body-secondary text-center m-0 py-5 text-danger fw-bold'> Your Shop Cart is Empty </h1> }

            </>
}
