import React, { useState, useEffect } from 'react'
import styled from 'styled-components';

export const CartBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState()

    useEffect(() => {
        setIsLoggedIn(JSON.parse(localStorage.getItem("userLoggedIn")))
    }, []);

    // if logged in show whether cart is empty or not via local storage item info
    // if !logged in, show steps 1) to log in  2) visit "rest" & scan QR code  3) add item to cart

    return (
        <div>
            <CartInfo>
                <X>If signed in, it will show "VISIT VENUE, SCAN QR CODE AND ADD ITEM"</X>
                <Seperator />
                <X>if NOT signed in, it will show "SIGN IN TO ADD ITEMS TO CART"</X>
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

const Seperator = styled.div`
margin-top: 50px;
`

const X = styled.span`
color:#54577c;
font-size: 1.3em;
font-weight:500;
`







