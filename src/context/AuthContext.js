import React from "react"
import { jwtDecode } from "jwt-decode"
import { createContext , useEffect, useState} from "react"

export const authContext = createContext()

export function AuthContextProvider( {children} ){

    const [ token , setToken ] = useState(null)
    const [ userData , setUserData ] = useState(null)
    const [ email , setEmail] = useState(null)
    const [ verifyCode , setVerifyCode] = useState(null)
    const [ varifiedEmail , setVarifiedEmail] = useState(null)
    const [ newPassword , setNewPassword] = useState(null)

    useEffect( function () {

        const val = localStorage.getItem ( 'tkn' )

        if (  val != null ) {

            setToken ( val )
            getUserData()
        }

        console.log("Refresh");

    }  , [] )

    function getUserData(){
    const userData =  jwtDecode( localStorage.getItem('tkn') )
    console.log('userData' , userData);
    setUserData(userData)
    }

    return <authContext.Provider value = { {
        myToken: token ,
        setToken , 
        setUserData ,
        userData , 
        getUserData ,
        setEmail ,
        email , 
        setVerifyCode , 
        verifyCode,
        setVarifiedEmail, 
        varifiedEmail,
        setNewPassword,
        newPassword
        } } >


        { children }


    </authContext.Provider>



}