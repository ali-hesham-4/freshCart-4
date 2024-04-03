import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const userData = {
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
    }

    const [isSuccess , setIsSuccess] = useState (false)
    const [errMessage , setErrMessage] = useState (undefined)
    const [isLoading , setIsLoading] = useState (false)

    const navigate = useNavigate ()



    async function mySubmit ( values ){

        setIsLoading( true )

        try{

            const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup"  , values  )
            console.log("sucsses" ,res.data.message);
            console.log(res.data);
            setIsSuccess (true);
            setTimeout(function(){
                setIsSuccess (false);
                navigate('/login')
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

            const nameRegex  = /^[A-Z][a-z]{3,7}$/;

            const phoneRegex  = /^01[0125][0-9]{8}$/;
            if(nameRegex.test(values.name ) === false ){
                errors.name  = "Name must be from 4 to 8 characters starts with capital letter";
            }

            if(values.email.includes("@") !== true || values.email.includes(".")  !== true ) {
                errors.email  = "Email Must be in Formate";
            }

            if(phoneRegex.test(values.phone ) === false ){
                errors.phone = "Phone must be an Egyption Number";
            }

            if(values.password.length < 6 || values.password.length > 12 ){
                errors.password  = "Password must be an From 6 to 12 characters";
            }

            if(values.rePassword !== values.password ){
                errors.repassword  = "Password and rePassword don't match ";
            }
            
            return errors;
        },
    } )
    


    return <>

    <div className="w-75 m-auto p-5">

        {isSuccess ? <div className="alert alert-success text-center">Congratulation your account has been created. </div> : "" }


        {errMessage ? <div className="alert alert-danger text-center"> { errMessage } </div> : "" }

    


        <h2>Register Now:</h2>
        <form onSubmit = { myFormik.handleSubmit }  action="">
            <label htmlFor="name">Name</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id='name' type="text" placeholder='name' className='form-control mb-3' />
            { myFormik.errors.name  && myFormik.touched.name ? <div className='alert alert-danger'> {myFormik.errors.name} </div> : "" } 

            <label htmlFor="email">Email</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} id='email' type="email" placeholder='email' className='form-control mb-3' />
            { myFormik.errors.email  && myFormik.touched.email ? <div className='alert alert-danger'> {myFormik.errors.email} </div> : "" } 


            <label htmlFor="phone">Phone</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text" placeholder='phone' className='form-control mb-3' />
            { myFormik.errors.phone && myFormik.touched.phone ? <div className='alert alert-danger'> {myFormik.errors.phone} </div> : "" } 


            <label htmlFor="password">Password</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} id='password' type="password" placeholder='password' className='form-control mb-3' />
            { myFormik.errors.password  && myFormik.touched.password ? <div className='alert alert-danger'> {myFormik.errors.password} </div> : "" } 


            <label htmlFor="rePassword">RePassword</label>
            <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' type="password" placeholder='rePassword' className='form-control mb-3' />
            { myFormik.errors.rePassword  && myFormik.touched.rePassword ? <div className='alert alert-danger'> {myFormik.errors.rePassword} </div> : "" } 


            <button type='submit' className='bg-main p-2  text-white rounded-3 btn'>



                {isLoading ?   <ColorRing
                    visible={true}
                    height="30"
                    width="30"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                /> : "Register" }

                </button>
        </form>

    </div>
    
    
    
    </>
}
