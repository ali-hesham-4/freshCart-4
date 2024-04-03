import axios from 'axios'
import React, { createContext, useState } from 'react'

export const BrandsContext = createContext()

export default function BrandsContextProvider( { children } ) {


    const [ brand , setBrand] = useState("")
    const [ brandId , setBrandId] = useState("")


    async function getSubBrands(id){
    const res = await axios.get (  `https://route-ecommerce.onrender.com/api/v1/brands/${id}` )
        console.log("data" , id);  
        const brand = res.data.data
        console.log("brand" , brand);
        setBrand(brand)
        console.log(brand);
        setBrandId(id)
        }
    


    return <> 
    <BrandsContext.Provider value = { {
        getSubBrands,
        brand,
        setBrandId,
        brandId,
        setBrand,
    } }>


    { children } 


    </BrandsContext.Provider>
    </>
}
