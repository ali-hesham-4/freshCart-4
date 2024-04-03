import axios from 'axios'
import React, { createContext, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'

export const NewCategoiesContext = createContext()

export default function NewCategoiesContextProvider( { children } ) {


    const [ brand , setBrand] = useState("")
    const [ brandId , setBrandId] = useState("")
    const [ categoryID ] = useState("")
    const [ category , setCategory] = useState("")
    const [isClicked , setIsClicked] = useState (false)
    const [ subcategoryID , setSubCategoryID] = useState("")
    const [ subcategoryy , setSubCategoryy] = useState([])
    const [isLoading , setIsLoading] = useState (null)


    async function getSubBrands(id){
    const res = await axios.get (  `https://route-ecommerce.onrender.com/api/v1/brands/${id}` )
        console.log("data" , id);  
        const brand = res.data.data
        console.log("brand" , brand);
        setBrand(brand)
        console.log(brand);
        setBrandId(id)
        }




        async function getSpecificSubCategory(categoryID){
            setIsLoading(true)
            console.log(categoryID);
            setIsClicked(true)
            const res =  await axios.get (  `https://route-ecommerce.onrender.com/api/v1/categories/${categoryID}` )
            console.log("data10" , res.data.data );
            setCategory(res.data.data)
            setSubCategoryID(res.data.data._id)
            getSubCategories(res.data.data._id)
            }
        


            async function getSubCategories(subcategoryID){
                setIsClicked(true)            
                console.log("subcategoryID" , subcategoryID );
                const res = await axios.get (  `https://route-ecommerce.onrender.com/api/v1/categories/${subcategoryID}/subcategories` )
                setSubCategoryy(res.data.data)
                setIsLoading(false)
                }    
                



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
    <NewCategoiesContext.Provider value = { {
        getSubBrands,
        brand,
        setBrandId,
        brandId,
        setBrand,
        categoryID,
        getSpecificSubCategory,
        isClicked,
        category,
        subcategoryID,
        subcategoryy,    
    } }>


    { children } 


    </NewCategoiesContext.Provider>
    </>
}
