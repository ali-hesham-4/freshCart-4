import React from "react"
import SubCategory from '../SubCategory/SubCategory';
import { useContext } from 'react';
import { NewCategoiesContext } from '../../context/CategoiesContext';


export default function SpecificSubCategory() {


    const { category } = useContext (  NewCategoiesContext )




    return <>
            <div className="container">
                        <div className="row">
                            <div className="subCategories-header text-center">
                                <h2 className='text-main fw-bold mt-5 mb-5'>{category.name } subcategories </h2>
                            </div>
                                    </div>
                                </div>
        <SubCategory />
            </>
}