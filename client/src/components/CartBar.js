import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

export const CartBar = (userLoginData) => {
    const cartInfoFromStorage = localStorage.getItem("cartInfo");

    return (
        <div>
            <CartInfo>
                {!userLoginData.userLoginData ? (
                    <>
                        <h3>To add items to your cart:</h3>
                        <div>1- Sign In</div>
                        <div>2- Visit a desired location</div>
                        <div>3- Scan QR Code</div>
                        <div>4- Choose available items and add to cart</div>
                    </>
                ) : (
                    <>
                        {/* {check length if array} */}
                        {/* {cartInfoFromStorage === null || cartInfoFromStorage.length === 0 ? (<b>Your Cart is Empty</b>) : (x)} */}
                        <span>connect to session storage and check if items there or not.</span>
                        <span>if items in session storage, display them</span>
                    </>
                )
                }
            </CartInfo>
        </div>
    )
};

const CartInfo = styled.div`
width: 240px;
background: #9AA899;
position: absolute;
height: 95vh;
padding: 0 30px;
transition: all 1s;
display: block;
right: 0;
z-index: 1;
`







