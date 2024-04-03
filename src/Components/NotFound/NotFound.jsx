import React from 'react'

export default function NotFound() {
    return <>
    
    <div className='m-auto w-50'>
        <figure>
            <img src={require("../../images/error.png")} className='w-100' alt="error-404" />
        </figure>
    </div>
    
    </>
}
