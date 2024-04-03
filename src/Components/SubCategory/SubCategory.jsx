import React from "react"
import { NewCategoiesContext } from '../../context/CategoiesContext';
import { useContext } from 'react';

export default function Subcategory() {


    const {subcategoryy } = useContext (  NewCategoiesContext )



    return <>
            <div className="container">
                        <div className="row">
                            <div className="subCategories-header text-center">
                                <h2 className='text-main fw-bold mt-5 mb-5'>{subcategoryy.name }</h2>
                            </div>
                            <div className='subCategories-body text-center'>
                                <div className="row">
                                {subcategoryy.map( (subcategoryy , idx) =>  {
                                return  <div key={idx} className="col-md-4">
                                                    <div className="card mb-3">
                                                                <div className="card-body category">
                                                                    <h3 className="h5 card-title fw-bold">{ subcategoryy.name }</h3>
                                                                </div>
                                                    </div>
                                        </div>})}
                                    </div>
                                </div>
                            </div>
            </div>
            </>
}
