import React, { useState } from 'react'
import { useContext } from 'react'
import { authContext } from '../../context/AuthContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';

export default function VerifyCode() {


    const { setVerifyCode } = useContext(authContext)
    const [isLoading , setIsLoading] = useState (false)

    const nav = useNavigate()





    function verifyCodeFunction() {

        setIsLoading( true )

        const verifyCode = document.getElementById('verifyCode')
        localStorage.setItem("verifyCode", verifyCode.value)
        const LocalVerifyCode = localStorage.getItem("verifyCode")
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { "resetCode": LocalVerifyCode }, {
        }).then((res) => {
            console.log(res);
            setVerifyCode(LocalVerifyCode)
            toast.success("Reset code that you Entered is Correct", { duration: 1500, position: "top-center" });
            setTimeout(() => {
                nav('/Reset-Password')
                setIsLoading( false )
            }, 1000);
        })
            .catch((err) => {

                console.log("err", err);
                toast.error('Error Occurred...', { duration: 1500, position: "top-center" })

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
        <div className="container mt-5">
            <h1 className='mb-3 fw-bold'>reset your account password</h1>
            <input name='verifyCode' id='verifyCode' type="text" placeholder='Code' className='form-control p-2 mb-3' />
            <button onClick={verifyCodeFunction} className='btn btn-outline-success mb-3 fw-bold'>Verify</button>
        </div>

    </>

}