import React from "react"
import { createContext, useState } from "react"

export const ForgetPasswordContext = createContext()

export default function ForgetPasswordContextProvider( { children } ) {

    const [ email , setEmail] = useState("")


return <> 
<ForgetPasswordContext.Provider value = { {
    email,
    setEmail
} }>


{ children } 


</ForgetPasswordContext.Provider>



</>

}
