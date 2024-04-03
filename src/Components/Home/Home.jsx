import React from "react"
import axios from 'axios';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { useContext , useState } from 'react';
import { cartContext } from '../../context/CartContext';
import { WhichListContext } from '../../context/WhichListContext';




export default function Home() {

    const {  allWichListProductsID  , deleteFromWhichList  } = useContext( WhichListContext )
    const [search , setSearch] = useState (null)


    const { addProductToCart } = useContext( cartContext )
    const { addToWhichList } = useContext( WhichListContext )
    



    async function addMyProduct( id ){
        const res  =   await addProductToCart (id)
        console.log(res);
    }


    async function getAllProducts(){

    return axios.get ( ' https://ecommerce.routemisr.com/api/v1/products ' )

    }

    const { data , isLoading } = useQuery( ' getAllProducts ' , getAllProducts , {
        cacheTime: 3000
    }  )

    console.log(data?.data.data);


    let allProductList = data?.data.data
    var searchResult2  = []



function getSearchValue (value){
    localStorage.setItem( "searchValue" , document.getElementById('search').value) 
    const searchValue = localStorage.getItem("searchValue")
    console.log(searchValue);
    searchByName(searchValue)
}


    function searchByName(term){
        let foundedItems = []
        for( var i = 0 ; i < allProductList?.length ; i++){
            if(allProductList[i].title?.toLowerCase().includes(term?.toLowerCase()) === true){
                foundedItems.push(allProductList[i])
            }
        }
        localStorage.setItem("searchResult" , JSON.stringify(foundedItems))
        console.log(foundedItems);
        console.log("searching");
        console.log(term);
        searchResult2 = JSON.parse(localStorage.getItem("searchResult"))
        setSearch(searchResult2)
        console.log(search);
    }
    console.log(searchResult2);


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


<div className="container mb-5">

    <div className="row my-4">

        <div className="col-md-9">
        <SimpleSlider />
        </div>


        <div className="col-md-3">
            <div>
                <img style={ { height: "150px"} } className='w-100' src= { require ( '../../images/grocery-banner-2.jpeg' ) } alt="grocery-banner-1." />
            </div>

            <div>
                <img style={ { height: "150px"} } className='w-100' src= { require ( '../../images/grocery-banner.png' ) } alt="grocery-banner-2." />
            </div>
        </div>

    </div>
</div>



<div className="container-fluid mb-5">
    <div className='row'>
        <div className='col-md-12 mt-5 px-0'>
            <CategorySlider />
        </div>
    </div>
</div>


{search ?  <div className='container'>


<div className='row mb-5'>
    <input onChange={()=>{ getSearchValue() }} name='search' id='search' type="text" placeholder='Search' className='form-control  mt-5'/>
</div>

<div className="products row mb-5 gy-5 ">

    {search.map( (Products , idx , idx2 ) =>  { return <> 
    <div key={ idx } className="col-md-3 gy-5 overflow-hidden">
        <Link  className='product  h-25' to={`/products/${Products._id}`} >
            <div className="product pt-3">
                <img src= { Products.imageCover } className='w-100 mb-' alt={ Products.title.split( ' ' ).slice( 0, 2 ).join( ' ' ) } />
                <div className='px-3'>

                <h3 className='h6 text-main'>{ Products.category.name }</h3>

                <h6 className='h5'>{ Products.title.split( ' ' ).slice( 0, 2 ).join( ' ' ) }</h6>
                </div>
                </div>
        </Link>
        <Link>
        <div className='px-3'>
            <div>
                { Products.priceAfterDiscount ?  <p> <span className='text-decoration-line-through m-1'> { Products.price }  </span>  - { Products.priceAfterDiscount } EGP </p> : <p>{ Products.price } EGP </p> }
            </div>
            <div className='d-flex justify-content-between'>
                    <p> <span> <i style = { { color: "#daa520" } } className='fa-solid fs-4 fa-star' ></i> </span> { Products.ratingsAverage }</p>
                    <p > 
                    {allWichListProductsID.includes(Products._id)  ? <span onClick={ () => {deleteFromWhichList(Products._id) }}> <i style = { { color: "red" } } className='fa-solid fs-4 fa-heart' ></i> </span>
                    : <span onClick={ () => {addToWhichList(Products._id) }}> <i style = { { color: "black" } } className='fa-solid fs-4 fa-heart' ></i> </span>
                    }
                    </p>
            </div>
            <div className="row px-5 pb-3">
                <button onClick={ () => addMyProduct (Products.id) } className='addBtn btn bg-main text-white m-auto d-block'>+ Add To Cart</button>
            </div>
        </div>
        </Link>
    </div>

    </> })}

</div> 
</div> : <div className='container'>


<div className='row mb-5'>
    <input onChange={()=>{ getSearchValue() }} name='search' id='search' type="text" placeholder='Search' className='form-control  mt-5' />
</div>

<div className="products row mb-5 gy-5 ">

    {data.data.data.map( (Products , idx , idx2 ) =>  { return <> 
    <div key={ idx } className="col-md-3 gy-5 overflow-hidden">
        <Link  className='product  h-25' to={`/products/${Products._id}`} >
            <div className="product pt-3">
                <img src= { Products.imageCover } className='w-100 mb-' alt={ Products.title.split( ' ' ).slice( 0, 2 ).join( ' ' ) } />
                <div className='px-3'>

                <h3 className='h6 text-main'>{ Products.category.name }</h3>

                <h6 className='h5'>{ Products.title.split( ' ' ).slice( 0, 2 ).join( ' ' ) }</h6>
                </div>
                </div>
        </Link>
        <Link>
        <div className='px-3'>
            <div>
                { Products.priceAfterDiscount ?  <p> <span className='text-decoration-line-through m-1'> { Products.price }  </span>  - { Products.priceAfterDiscount } EGP </p> : <p>{ Products.price } EGP </p> }
            </div>
            <div className='d-flex justify-content-between'>
                    <p> <span> <i style = { { color: "#daa520" } } className='fa-solid fs-4 fa-star' ></i> </span> { Products.ratingsAverage }</p>
                    <p > 
                    {allWichListProductsID.includes(Products._id)  ? <span onClick={ () => {deleteFromWhichList(Products._id) }}> <i style = { { color: "red" } } className='fa-solid fs-4 fa-heart' ></i> </span>
                    : <span onClick={ () => {addToWhichList(Products._id) }}> <i style = { { color: "black" } } className='fa-solid fs-4 fa-heart' ></i> </span>
                    }
                    </p>
            </div>
            <div className="row px-5 pb-3">
                <button onClick={ () => addMyProduct (Products.id) } className='addBtn btn bg-main text-white m-auto d-block'>+ Add To Cart</button>
            </div>
        </div>
        </Link>
    </div>

    </> })}

</div> 
</div> }


    </>
}