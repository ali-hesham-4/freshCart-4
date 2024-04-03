import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';


export default function Login() {

    const userData = {
        email: '',
        password: '',
    }

    const [isSuccess , setIsSuccess] = useState (false)
    const [errMessage , setErrMessage] = useState (undefined)
    const [isLoading , setIsLoading] = useState (false)

    const navigate = useNavigate ()
    const { setToken , getUserData } = useContext ( authContext )



    async function mySubmit ( values ){

        setIsLoading( true )

        try{

            const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin"  , values  )
            console.log("sucsses" ,res.data.message);
            console.log("Token: ",res.data.token);
            localStorage.setItem('tkn', res.data.token )
            setToken( res.data.token )
            getUserData()
            setIsSuccess (true);
            setTimeout(function(){
                setIsSuccess (false);
                navigate('/Home')
            } , 2000)



        }catch(e){
            console.log("error" , e);
            setErrMessage (true);
            setErrMessage( e.response.data.message )
            setTimeout(function(){
                setErrMessage (false);
            } , 2000)
        }

        setIsLoading( false )


    }



    const myFormik = useFormik( {

        initialValues : userData,
        onSubmit: mySubmit,

        validate: function(values){


            const errors  = {}

            if(values.email.includes("@") !== true || values.email.includes(".")  !== true ) {
                errors.email  = "Email Must be in Formate";
            }

            if(values.password.length < 6 || values.password.length > 12 ){
                errors.password  = "Password must be an From 6 to 12 characters";
            }

            
            return errors;
        },
    } )
    


    return <>

    <div className="w-75 m-auto p-5 position-relative">

        {isSuccess ? <div className="alert alert-success text-center">Welcome Back.</div> : "" }


        {errMessage ? <div className="alert alert-danger text-center"> { errMessage } </div> : "" }

    


        <h2 className='mb-3'>Login Now:</h2>
        <form onSubmit = { myFormik.handleSubmit }  action="">
            <label className='mb-2' htmlFor="email">Email</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" placeholder='email' className='form-control mb-3' />
            { myFormik.errors.email  && myFormik.touched.email ? <div className='alert alert-danger'> {myFormik.errors.email} </div> : "" } 


            <label className='mb-2' htmlFor="password">Password</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" placeholder='password' className='form-control mb-3' />
            { myFormik.errors.password  && myFormik.touched.password ? <div className='alert alert-danger'> {myFormik.errors.password} </div> : "" } 

            <div className="row justify-content-between align-items-center mt-4">

                <div className="col-lg-9">
                    <Link to={'/Forget-Password'}>
                        <p className='forget-p fw-bold'>forget your password ?</p>
                    </Link>
                </div>

                <div className="col-lg-3 ">
                    <button  type='submit' className='bg-main p-2  text-white rounded-3 btn w-100'>


                        {isLoading ?   <ColorRing
                            visible={true}
                            height="30"
                            width="30"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                        /> : "Login Now" }

                    </button>
                </div>






            </div>

            
        </form>

    </div>
    
    
    
    </>
}