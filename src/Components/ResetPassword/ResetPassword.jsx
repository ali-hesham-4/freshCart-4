import axios from 'axios';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { FallingLines } from 'react-loader-spinner';

export default function ResetPassword() {

    const { setVarifiedEmail, setNewPassword  , setToken , getUserData } = useContext(authContext)
    const [isLoading , setIsLoading] = useState (false)

    const nav = useNavigate()








    function resetPassword() {

        setIsLoading( true )


        const email = document.getElementById('email')
        const newPasswordInput = document.getElementById('newPassword')
        localStorage.setItem("email", email.value)
        localStorage.setItem("newPassword", newPasswordInput.value)
        const LocalEmail = localStorage.getItem("email")
        const LocalNewPassword = localStorage.getItem("newPassword")


        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,{ "email" : LocalEmail , "newPassword": LocalNewPassword
        }).then((res) => {
            console.log(res);
            setVarifiedEmail(LocalEmail)
            setNewPassword(LocalNewPassword)
            localStorage.setItem('tkn', res.data.token )
            setToken( res.data.token )
            getUserData()
            toast.success("Your Password has been Reset Correctly", { duration: 1500, position: "top-center" });
            setTimeout(() => {
                nav('/Products')
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

    <div className="container mt-5 fw-bold">
        <h1 className='mb-3'>reset your account password</h1>
        <input id='email' name='email' type="text" placeholder='Email' className='form-control mb-3'/>
        <input id='newPassword' name='Password' type="password" placeholder='Password' className='form-control mb-3'/>
        <button onClick={resetPassword} className='btn btn-outline-success mb-3 fw-bold'>Reset Password</button>
    </div>

    </>
}
