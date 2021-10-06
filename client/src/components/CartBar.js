import React, { useContext } from 'react';
// import { useHistory } from "react-router";
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { OrderContext } from '../OrderProvider';

import LogoImg from '../Logo/LogoImg.png';

export const CartBar = (userLoginData) => {
    // const formHistory = useHistory();

    const { state, actions: { deleteOrder } } = useContext(OrderContext);

    const handleDeleteItem = (itemId) => {
        if (!itemId) return;
        deleteOrder(itemId)
    }

    // POST - when user click Order button
    const handleSubmitOrder = async (event) => {
        event.preventDefault();
        //get orders from order cart -> state context
        //do the post
        //rest is backend.

        const userIdStorageInfo = JSON.parse(localStorage.getItem("userLoggedIn"));
        const userId = userIdStorageInfo.userId
        const adminIdStorageInfo = sessionStorage.getItem("adminData");

        if (!adminIdStorageInfo) return;

        // initial order status when order is placed
        const status = 'order placed';

        const response = await fetch(`${apiUrl}/order`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminIdStorageInfo, userId, state, status: status })
        })
        const result = await response.json();
        if (result.status === 201) {
            toast("Order has been placed!")
        }
    };

    return (
        <Container>
            <LogoContainer>
                <LogoImgg src={LogoImg}></LogoImgg>
                <LogoText>Order Way.</LogoText>
            </LogoContainer>
            {!userLoginData.userLoginData ? (
                <>
                    <CartSteps>To add items to your cart:</CartSteps>
                    <InstructionsContainer>
                        <Steps>1- Sign In</Steps>
                        <Steps>2- Visit a desired location</Steps>
                        <Steps>3- Scan QR Code</Steps>
                        <Steps>4- Choose available items and add to cart</Steps>
                    </InstructionsContainer>
                </>
            ) : (
                <>
                    {!state.orders.length > 0 ? (
                        <b>Your Cart is Empty</b>
                    ) : (
                        <>
                            <h2>Orders</h2>
                            {state.orders.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <OrderContainer>
                                            <ItemTitle>{item.itemTitle}</ItemTitle>
                                            <ItemQuantity>x{item.quantity}</ItemQuantity>
                                            <ItemPrice>{item.itemPrice}</ItemPrice>
                                            <ItemDelBtn onClick={() => handleDeleteItem(item._id)}>x</ItemDelBtn>
                                        </OrderContainer>
                                    </div>
                                )
                            })
                            }
                            <ConfirmBtn onClick={handleSubmitOrder}>Confirm Order</ConfirmBtn>
                        </>
                    )
                        // Once order confirmed, hide <h2>Order</h2>, <button> and display "Order Confirmed! <order number>"
                        // Order status
                    }
                </>
            )
            }
        </Container>
    )
};

const Container = styled.div`
width: 290px;
background: #000;
position: absolute;
height: 95vh;
padding: 0 30px;
transition: all 1s;
display: block;
right: 0;
z-index: 1;
overflow-y: scroll;
`;

const OrderContainer = styled.div`
display: flex;
justify-content: space - between;
align-items: center;
border-bottom: 1px solid black;
`;

const ItemTitle = styled.span`
font-size: 19px;
margin-top: 30px;
margin-bottom: 10px;
color: yellow;
`;

const ItemQuantity = styled.span`
margin-top: 30px;
margin-bottom: 10px;
color: purple;
`;

const ItemPrice = styled.span`
font-size: 17px;
margin-top: 30px;
margin-bottom: 10px;
color: darkgreen;
`;

const ConfirmBtn = styled.button`
height: 45px;
width: 150px;
margin-top: 40px;
border-radius: 10px;
background:#4a7b9d;
color: #fff;
`;

const ItemDelBtn = styled.button`
margin-top: 25px;
border-radius: 10px;
background:#4a7b9d;
color: #fff;
`;

const LogoText = styled.h1`
display: inline - block;
color: #fff;
text-transform: uppercase;
-webkit-letter-spacing: 2px;
-moz-letter-spacing: 2px;
-ms-letter-spacing: 2px;
letter-spacing: 2px;
font-size: 16px;

:hover {
color: #f6b210;
}
`;

const LogoImgg = styled.img`
width: 80px;
`

const LogoContainer = styled.div`
margin-top: 15px;;
`;

const CartSteps = styled.h3`
font-weight: 700;
color: white;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
`

const Steps = styled.span`
color: white;
width: 100%;
margin-top: 50px;
font-weight: 500;
color: white;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
`

const InstructionsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`