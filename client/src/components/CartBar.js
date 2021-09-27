import React, { useState } from 'react'
import styled from 'styled-components';

export const CartBar = () => {
    return (
        <Container>
            <CartInfo>
                <b>If signed in, it will show "VISIT VENUE, SCAN QR CODE AND ADD ITEM"</b>
                <Seperator />
                <b>if NOT signed in, it will show "SIGN IN TO ADD ITEMS TO CART"</b>
            </CartInfo>
        </Container>
    )
};

const Container = styled.div``;

const CartInfo = styled.div`
width: 240px;
background-color: grey;
position: absolute;
height: 95vh;
padding: 0 30px;
transition: all 1s;
display: block;
right: 0;
`

const Seperator = styled.div`
margin-top: 50px;
`







