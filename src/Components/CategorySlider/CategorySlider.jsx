import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

        function getGategories(){
            return axios.get( ' https://ecommerce.routemisr.com/api/v1/categories ' )
        }

        const { data , isLoading } = useQuery ( ' CategorySlider ' , getGategories )



        if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-oppacity-50 justify-content-center align-items-center">

        <FallingLines
            color="#fff"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
        />
    </div> }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            { data.data.data.map( ( category , idx )   => <div key ={idx} className="text-center">
                <img style={ { height : "250px"} } className="w-100" src= {category.image} alt={category.image}  />
                <h4 className="fw-bolder">{category.name}</h4>
            </div>)}            
        </Slider>
    );
}
