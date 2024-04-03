import React, { useContext, useState } from 'react'
import { authContext } from '../../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';

export default function ForgetPassword() {

const { setEmail   } = useContext (  authContext )
const [isLoading , setIsLoading] = useState (false)

const nav = useNavigate()




    function forgetPassword(){

    setIsLoading( true )


    const emailInput = document.getElementById('email')
    localStorage.setItem("Email" , emailInput.value )
    const LocaLEmail = localStorage.getItem("Email")
    axios.post( `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , {"email" : LocaLEmail} , {
    } ).then( (res)=>{
        console.log(res);
        setEmail(LocaLEmail)
        toast.success( "Reset code has been sent to your email" , { duration : 1500 , position: "top-center" } );
        setTimeout(() => {
            nav('/verify-code')
            setIsLoading( false )
        }, 1000);
        
    })
    .catch( (err)=>{

        console.log("err" , err);
        toast.error( 'Error Occurred...' , { duration : 1500 , position: "top-center" } )

    })




}

if(isLoading){
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

    <div className="container mt-5 fw-bold">
        <h1 className='mb-3'>please enter your verification code</h1>
        <input id='email' name='email' type="text" placeholder='Email' className='form-control mb-3'/>
        <button onClick={ forgetPassword }  className='btn btn-outline-success mb-3 fw-bold'>Verify</button>
    </div>

    </>
}
