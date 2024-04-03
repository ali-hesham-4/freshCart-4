import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Payment() {

    const { cartID  , clearCart } = useContext (  cartContext )


    const nav = useNavigate()




    function confirmCashPayment(){

        const datails = document.getElementById('details').value
        const phone = document.getElementById('phone').value
        const city = document.getElementById('city').value

        const shppingObject = {
            "shippingAddress":{
                "details": datails,
                "phone": phone,
                "city": city
                }
        }
        axios.post( `https://ecommerce.routemisr.com/api/v1/orders/${cartID}` , shppingObject , {
            headers: {
                token: localStorage.getItem('tkn')
            }
        } ).then( (res)=>{
            if(res.data.status === "success"){
                console.log(res);
                toast.success( 'Pament Comelete Successfully' , { duration : 1500 , position: "top-center" } );
                clearCart()
                setTimeout(() => {
                    nav('/products')
                }, 1500);
            }
        })
        .catch( (err)=>{

            console.log("err" , err);

            toast.error( 'Error Occurred...' , { duration : 1500 , position: "top-center" } )

        })


    }

    
    function confirmOnlinePayment(){

        const datails = document.getElementById('details').value
        const phone = document.getElementById('phone').value
        const city = document.getElementById('city').value

        const shppingObject = {
            "shippingAddress":{
                "details": datails,
                "phone": phone,
                "city": city
                }
        }
        axios.post( `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}` , shppingObject , {
            headers: {
                token: localStorage.getItem('tkn')
            },
            params: {url: 'http://localhost:3000'}
        } ).then( (res)=>{
            if(res.data.status === "success"){
                window.open(res.data.session.url , "_self" )
            }
        })
        .catch( (err)=>{

            console.log("err" , err);

            toast.error( 'Error Occurred...' , { duration : 1500 , position: "top-center" } )

        })


    }


    return <>
    <div className='w-50 m-auto py-3'>
        <label className='mb-2' htmlFor="">City</label>
        <input type="text" id='city' placeholder='city...' className='form-control mb-3'/>

        <label className='mb-2' htmlFor="">Phone</label>
        <input type="text" id='phone' placeholder='phone...' className='form-control mb-3'/>
        
        <label className='mb-2' htmlFor="">Details</label>
        <textarea type="text" id='details' placeholder='details...' className='form-control mb-3'></textarea>
        <div className='row justify-content-between'>
            <div className="col-sm-12 col-lg-6 mb-3">
                <button onClick={confirmCashPayment} className='btn btn-primary w-100'>Confirm Cash Payment</button>
            </div>
            <div className="col-sm-12 col-lg-6">
                <button onClick={confirmOnlinePayment} className='btn btn-primary w-100'>Confirm Online Payment</button>
            </div>
        </div>
    </div>
    </>
}
