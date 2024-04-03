import React from "react"
import axios from 'axios';
import { useContext } from 'react';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { BrandsContext } from '../../context/BrandsContext';


export default function Brands() {

    const {setBrand , brand, getSubBrands } = useContext (  BrandsContext )




    async function getAllBrands(){

    return axios.get ( ' https://ecommerce.routemisr.com/api/v1/brands' )

    }

    const { data , isLoading  } = useQuery( ' getAllBrands' , getAllBrands , {
        cacheTime: 3000
    }  )



    console.log("data" , data?.data.data );

    if (isLoading ) {
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div> }


    return <>
    <div className="container">
        <div className="row">
            <div className="subCategories-header text-center">
                <h2 className='text-main display-6api fw-bold mt-5 mb-2'> All Brands </h2>
            </div>
        </div>
    <div className="row mt-3 gy-4 mb-3">
        { data.data.data.map( (brand , idx) =>  {
        return  <div onClick={ ()=> {setBrand("")}} key={idx} className="col-md-6 col-lg-3">
                    <Link onClick={ ()=> {getSubBrands(brand._id) }} className='category' >
                                    <div   className="Brand card" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <figure className='m-0'>
                                                <img   src=  {brand.image} className="card-img-top w-100 object-fit-cover" alt={brand.name}/>
                                            </figure>
                                            <div className="card-body rounded-bottom">
                                                <h2 className='card-text h3 fw-bold text-center text-success'> {brand.name}</h2>
                                            </div>
                                    </div>
                    </Link>
                </div> 
            })}
            <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
    <div className="modal-content">
    <div _ngcontent-jmb-c10="" class="modal-header">
    <button _ngcontent-jmb-c10="" type="button" data-bs-dismiss="modal" aria-label="Close" class="btn-close"></button>
    </div>
    <div className="modal-body">
        <div className="row justify-content-center align-items-center">
            <div className="col-6">
                <h2 className='text-main fw-bolder ps-2'>{brand.name}</h2>
                <p className='text-black ps-2'>{brand.slug}</p>
            </div>
            <div className="col-6">
            <figure className='m-0'>
                <img   src=  {brand.image} className="card-img-top w-100 object-fit-cover" alt={brand.name}/>
            </figure>
            </div>
        </div>
    </div>
    <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
    </div>
</div>
</div>
    </div>
</div>
</>
}





