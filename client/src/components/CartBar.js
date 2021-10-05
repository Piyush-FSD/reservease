import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router";
import styled from 'styled-components';
import { OrderContext } from '../OrderProvider';

export const CartBar = (userLoginData) => {
    const formHistory = useHistory();

    const { state, actions: { deleteOrder } } = useContext(OrderContext);

    const handleDeleteItem = (itemId) => {
        if (!itemId) return;

        deleteOrder(itemId)
    }

    // POST - when user click Order button
    const handleSubmitOrder = async (event) => {
        event.preventDefault();

        const userIdStorageInfo = JSON.parse(localStorage.getItem("userLoggedIn"));
        const adminIdStorageInfo = sessionStorage.getItem("adminData");
        const orderIdStorageInfo = JSON.parse(sessionStorage.getItem("cartInfo"));
        const userId = userIdStorageInfo.userId;

        if (!adminIdStorageInfo) return;
        const status = 'order sent';

        const response = await fetch("/order", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminIdStorageInfo, userId, orderIdStorageInfo, status: status })
        })
        const result = await response.json();
        // if (result)
        console.log(result)
    };

    return (
        <Container>
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
background: #9AA899;
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
justify-content: space-between;
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