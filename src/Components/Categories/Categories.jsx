import React from "react"
import axios from 'axios';
import { useContext } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { NewCategoiesContext } from '../../context/CategoiesContext';
import SpecificSubCategory from '../specificSubCategory/specificSubCategory';


export default function Categories() {


    const { getSpecificSubCategory , isClicked } = useContext (  NewCategoiesContext )






    async function getAllcategories(){

    return axios.get ( 'https://ecommerce.routemisr.com/api/v1/categories' )

    }

    const { data , isLoading  } = useQuery( ' getAllcategories ' , getAllcategories , {
        cacheTime: 3000
        
    }  )
    console.log("data" , data?.data.data );


    if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div> }
    

    




    return <>
    
    {isClicked ?  <> <div className="container">
    <div className="row mt-3 gy-4 mb-3">
        { data.data.data.map( (category , idx) =>  {
        return  <div key={idx} className="col-md-6 col-lg-4">
                    <Link onClick={()=>getSpecificSubCategory(category._id)} className='category' >
                                    <div className="category card">
                                            <figure className='m-0'>
                                                <img style = { { height: "300px" } }  src=  {category.image} className="card-img-top w-100 object-fit-cover" alt={category.name}/>
                                            </figure>
                                            <div className="card-body rounded-bottom">
                                                <h2 className='card-text h3 fw-bold text-center text-success'> {category.name}</h2>
                                            </div>
                                    </div>
                    </Link>
                </div> })}
    </div>
</div>
<SpecificSubCategory/>
    </> :  <> <div className="container">
    <div className="row mt-3 gy-4 mb-3">
        { data.data.data.map( (category , idx) =>  {
        return  <div key={idx} className="col-md-6 col-lg-4">
                    <Link onClick={()=>getSpecificSubCategory(category._id)} className='category' >
                                    <div className="category card">
                                            <figure className='m-0'>
                                                <img style = { { height: "300px" } }  src=  {category.image} className="card-img-top w-100 object-fit-cover" alt={category.name}/>
                                            </figure>
                                            <div className="card-body rounded-bottom">
                                                <h2 className='card-text h3 fw-bold text-center text-success'> {category.name}</h2>
                                            </div>
                                    </div>
                    </Link>
                </div> })}
    </div>
</div>
    </>}
    
    </>
}