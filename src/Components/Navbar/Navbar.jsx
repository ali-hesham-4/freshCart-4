import React, { useContext } from 'react';
import logo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';
import { cartContext } from '../../context/CartContext';
export default function Navbar() {

    const { myToken , setToken } = useContext ( authContext )
    const {  numberOfCartItems } = useContext ( cartContext )
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem( 'tkn' );
        localStorage.removeItem( 'searchValue' );
        localStorage.removeItem( 'Email' );
        localStorage.removeItem( 'searchResult' );
        localStorage.removeItem( 'CategoryId' );
        localStorage.removeItem( 'userID' );
        setToken (null);
        navigate( '/login' );

    }



    return <>
    <div className='bg-body-tertiary'>
    <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid pt-2">
                <Link className="navbar-brand" to ="/">
                    <img src= { logo } alt="Fresh Cart" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    { myToken ?   <ul className="navbar-nav nav nav-pills ms-auto mb-2 mb-lg-0" id="pills-tab" role="tablist" >
                    <li className="nav-item" id="pills-Home-tab" data-bs-toggle="pill" data-bs-target="#pills-Home">
                    <Link className="nav-link" aria-current="page" to ="/Home">Home</Link>
                    </li>
                    <li className="nav-item" id="pills-products-tab" data-bs-toggle="pill" data-bs-target="#pills-products">
                    <Link className="nav-link"  aria-current="page" to ="/products">Products</Link>
                    </li>
                    <li className="nav-item" id="pills-Categories-tab" data-bs-toggle="pill" data-bs-target="#pills-Categories">
                    <Link className="nav-link"  aria-current="page" to ="/categories">Categories</Link>
                    </li>
                    <li className="nav-item" id="pills-Brands-tab" data-bs-toggle="pill" data-bs-target="#pills-Brands">
                    <Link className="nav-link"  aria-current="page" to ="/brands">Brands</Link>
                    </li>
                    <li className="nav-item" id="pills-AllOrders-tab" data-bs-toggle="pill" data-bs-target="#pills-AllOrders">
                    <Link className="nav-link"  aria-current="page" to ="/AllOrders">All Orders</Link>
                    </li>
                    <li className="nav-item" id="pills-WhichList-tab" data-bs-toggle="pill" data-bs-target="#pills-WhichList">
                    <Link className="nav-link"  aria-current="page" to ="/WhichList">Which List</Link>
                    </li>
                    <li className="nav-item position-relative" id="pills-Cart-tab" data-bs-toggle="pill" data-bs-target="#pills-Cart">
                    <Link className="nav-link"  aria-current="page" to ="/cart">Cart</Link>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            { numberOfCartItems ? numberOfCartItems :"" }
                        </span>
                    </li>
                </ul> 
                : ""  }

                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">

                <ul className='list-unstyled d-flex social-box'>
                    <li>
                        <i className='fa-brands fa-facebook-f me-2'></i>
                    </li>
                    <li>
                        <i className='fa-brands fa-instagram me-2'></i>
                    </li>
                    <li>
                        <i className='fa-brands fa-linkedin me-2'></i>
                    </li>
                    <li>
                        <i className='fa-brands fa-twitter me-2'></i>
                    </li>
                </ul>

                { myToken ? <>
                    <li className="nav-item">
                        <span onClick= { logout } role='button' className="nav-link" aria-current="page" to ="/register">Logout</span>
                    </li> 
                </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to ="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to ="/register">Register</Link>
                                </li> 
                    </>
                }

                </ul>
                </div>
            </div>
</nav>
    </div>
    </div>
        </>
}
