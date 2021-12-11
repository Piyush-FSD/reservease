import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { apiUrl } from '../urls'

export const Orders = (props) => {
    const { userId, admin } = props.userLoginData || {};

    // inital state which will hold users orders
    const [orders, setOrders] = useState(null);

    // GET - orders for users and admins dynamically
    // dependancy is based on if a user or admin is requesting order information
    useEffect(() => {
        if (typeof admin !== "boolean") return;
        if (admin) {
            fetch(`${apiUrl}/order/all/${userId}`)
                .then((res) => res.json())
                .then((data) => setOrders(data.data))
        } else {
            fetch(`${apiUrl}/order/info/${userId}`)
                .then((res) => res.json())
                .then((data) => setOrders(data.data))
        }
    }, [userId, admin]);

    // filter orders which have a items in them and not and map through them
    const orderArr = orders && orders.filter((item) => item.order).map(item => ({ order: item.order, userId: item.userId, status: item.status, _id: item._id }))


    // PATCH - update order status
    const updateOrder = async (event, orderId) => {

        if (!event.target.value || !orderId) console.error(event.target.value, orderId)

        const selectedItem = event.target.value;

        const response = await fetch(`${apiUrl}/order/status`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: selectedItem, orderId })
        })

        const data = await response.json();

        if (data.status === 200)
            toast.success('Order status updated.');
        else {
            toast('Unable to update order status.')
        }
    };

    // if user is an admin, display the following: 
    if (!admin && !userId) {
        return (
            <>
                <OrderHeader>Orders</OrderHeader>
                <div>
                    <InstructionsContainer>
                        <CartSteps>TO VIEW ORDERS:</CartSteps>
                        <Steps>1- SIGN IN</Steps>
                        <Steps>2- VISIT A DESIRED LOCATION</Steps>
                        <Steps>3- SCAN QR CODE</Steps>
                        <Steps>4- CHOOSE AVAILABLE ITEMS, AND ADD TO CART AND SUBMIT ORDER</Steps>
                    </InstructionsContainer>
                </div>
            </>
        )
    }
    else if (admin) {
        return (
            <Container>
                <OrderHeader>Orders</OrderHeader>
                {orderArr && orderArr.map(({ order, userId, _id }) => {
                    return <OrderWrapper>
                        <StyledUserId>
                            <UserId>User ID: {userId && userId.slice(0, 5)}</UserId>
                        </StyledUserId>
                        <StyledOrders>
                            {order.orders.length && order.orders.map(item => {
                                return (
                                    <OrderContainer>
                                        <ItemTitle>{item.itemTitle}</ItemTitle>
                                        <ItemPrice>{item.itemPrice}</ItemPrice>
                                        <ItemId>Order ID: {item._id.slice(0, 5)}</ItemId>
                                        <ItemPrice>Quantity: {item.quantity}</ItemPrice>
                                        <ItemImage src={item.itemImage} />
                                        <div>
                                            <SelectOrder onChange={(event) => updateOrder(event, _id)} >
                                                <Options hidden>Order Status</Options>
                                                <Options value="Order in Progress">Order in progress</Options>
                                                <Options value="Order Delivered">Order delivered</Options>
                                            </SelectOrder>
                                            <DeleteBtnContainer><DelBtn>Delete Order</DelBtn></DeleteBtnContainer>
                                        </div>
                                    </OrderContainer>
                                )
                            })}
                        </StyledOrders>
                    </OrderWrapper>
                })}
            </Container>
        )
        // if user is NOT an admin and an order exists, display the following: 
    } else {
        return (
            <Container>
                <OrderHeader>Orders</OrderHeader>
                {orderArr && orderArr.map((order) => {

                    return <OrderWrapper>
                        <OrderStatus>{order.status}</OrderStatus>

                        {order.order.orders.map(item => {
                            return (
                                <OrderContainer>
                                    <ItemId>Order ID: {item._id.slice(0, 5)}</ItemId>
                                    <ItemTitle>{item.itemTitle}</ItemTitle>
                                    <ItemPrice>{item.itemPrice}</ItemPrice>
                                    <ItemPrice>{item.quantity}</ItemPrice>
                                    <ItemImage src={item.itemImage} />
                                </OrderContainer>
                            )
                        })}
                    </OrderWrapper>
                })}
            </Container>
        )
    }
};

const StyledOrders = styled.div`
width: 60%;
display: flex;
flex-wrap: wrap;
margin-left: 20px;

@media screen and (max-width: 475px){
    display: block;
    justify-content: center;
    width: 80%;
    margin: 0 auto;

}
`
const StyledUserId = styled.div`

@media screen and (max-width: 475px){
    text-align: center;
}

`
const Container = styled.div`
`

const OrderWrapper = styled.div`
display: flex;
margin: 0 auto;
width: 80%;
justify-content: flex-start;

@media screen and (max-width: 475px){
    display: block;
    justify-content: center;
    width: 100%;

}
`
const OrderContainer = styled.div`
border: 3px solid #f6b210;
background-color: black;
border-radius: 10px;
padding: 20px;
margin: 10px;
`;

const OrderHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
margin-left: 15px;
text-align: center;

@media screen and (max-width: 475px){
    text-align: center;

}
`

const ItemId = styled.div`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
color: white;
`

const ItemTitle = styled.div`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
color: white;
`

const ItemPrice = styled.div`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
color: white;
`

const ItemImage = styled.img`
color: white;
height: 200px;
width: 200px;
`

const DeleteBtnContainer = styled.div`
color: white;
`;

const DelBtn = styled.button`
width: 120px;
height: 35px;
border-radius: 10px;
background: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`

const OrderStatus = styled.div`
`

const CartSteps = styled.h3`
font-weight: 700;
color: white;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 18px;
margin-left: 15px;
`;

const InstructionsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
border: 2px solid grey;
width: 80%;
height: 360px;
background-color: black;
border: 3px solid #f6b210;
margin: 0 auto;

@media screen and (max-width: 600px){
    width: 80%;
}
`;

const Steps = styled.span`
color: white;
width: 100%;
margin-top: 50px;
font-weight: 500;
color: white;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 18px;
padding-left: 15px;
`;

const UserId = styled.h3`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 23px;
color: black;
`;

const Options = styled.option`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
`;

const SelectOrder = styled.select`
height: 45px;
border-radius: 10px;
margin: 10px 0;
background: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`