import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';

export default function AllOrders() {

    const [allOrders , setAllOrders] = useState (null)

    function getUserOrders(){
        const userID = localStorage.getItem( 'userID' )
        console.log("userId" , userID);
        axios.get( `https://ecommerce.routemisr.com/api/v1/orders/user/${userID}` )
        .then( ( res ) =>{
            console.log(res);
            setAllOrders(res.data);
            console.log(res.data);
            console.log(allOrders);

        } ).catch( ( err ) =>{

            console.log("err..." , err);

        } )
    }


    useEffect(()=>{
        getUserOrders();
        // eslint-disable-next-line
    } , [])

    if(!allOrders){
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
        </div>
    }

    return <>
    <div className="container">
        <div className="row gy-3 mb-5">
            {allOrders.map( (order , idx ) => {

                return <div key={idx} className="col-md-6 mt-5">
                <div className="order bg-body-secondary p-2 h-100">
                <div className="container">
                    <div className="row">

                        { order.cartItems.map( (item , secIdx ) => {      
                        return <div className="col-md-6 col-lg-4 gy-3">
                        <div key={secIdx} className="product bg-success-subtle h-100">
                            <img src={item.product.imageCover} className='w-100' alt={item.product.title} />
                            <div className='p-2'>
                                <h6 className='h6 text-main'>{ item.product.title.split( ' ' ).slice( 0, 2 ).join( ' ' ) }</h6>
                                <p className='mb-1'> <span className='fw-bold'> Price:  </span> {item.price} EGP </p>
                                <p> <span className='fw-bold'> Count:  </span> {item.count} </p>
                            </div>
                            </div>
                        </div>})}
                    </div>
                </div>
                <div className='mt-5 px-3'>
                    <h5 className='mb-3'> <span className='fw-bold'> Payment Method: </span> <span className='text-primary fw-bold'> {order.paymentMethodType}  </span> </h5>
                    <h5 className='mb-3'> <span className='fw-bold'> Order Price: </span> <span className='text-main fw-bold'> {order.totalOrderPrice} EGP  </span></h5>
                    <h5 className='mb-3 lh-base'> This Order is Delivering to <span className='text-danger fw-bold'> {order.shippingAddress.city}  </span> on phone number: <span className='text-danger fw-bold'> {order.shippingAddress.phone} </span> with details: <span className='text-danger fw-bold'> {order.shippingAddress.details} </span>  </h5>
                </div>
                </div>
            </div>
            } )}
        </div>
    </div>
    </>
}
