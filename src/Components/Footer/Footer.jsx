import React from 'react'

export default function Footer() {
    return <>
    
    <div className="bg-body-secondary pb-5 mb-0  position-relative bottom">
        <div className="container">
            <div className="row">
            <h4 className='pt-5'>Get The FreshCart app</h4>
            <p className='text-muted'>We will send you a link , open it on your phone to download the app.</p>
            </div>
            <div className="row mb-5">
                <div className="col-md-9 col-lg-10 mb-3">
                    <input type="email" name='Email' placeholder='Email...' className='form-control'/>
                </div>
                <div className="col-md-3 col-lg-2">
                    <button className='btn bg-main text-white w-100'>Share App Link</button>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-center py-4 border-top border-bottom border-2">
                <div className="col-6">
                    <div className='d-flex  align-items-center'>
                        <h6 className='w-auto'>Payment Parteners</h6>
                        <img src= { require ( '../../images/Amazon_Pay-Logo.wine.png' ) } className='w-6' alt="Amazon_Pay-logo" />
                        <img src= { require ( '../../images/American Express.png' ) } className='w-6' alt="American Express-logo" />
                        <img src= { require ( '../../images/Mastercard-Logo.wine.png' ) } className='w-6' alt="Mastercard-logo" />
                        <img src= { require ( '../../images/PayPal-Logo.wine.png' ) } className='w-6' alt="PayPal-logo" />
                    </div>
                </div>
                <div className="col-6">
                    <div className='d-flex justify-content-end align-items-center'>
                            <h6 className='w-auto'>Get deliveries with FreshCart </h6>
                            <img src= { require ( '../../images/pngwing.com.png' ) } className='w-15' alt="google-play-logo" />
                            <img src= { require ( '../../images/pngwing.com (1).png' ) } className='w-15' alt="apple-store-logo" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
    </>
}
