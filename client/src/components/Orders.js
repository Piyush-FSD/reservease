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
    const orderArr = orders && orders.filter(item => item.order && item.order.length).map(item => ({ order: item.order, userId: item.userId, status: item.status, _id: item._id }))

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

    if (!admin || !userId) {
        return (
            <>
                <OrderHeader>Orders</OrderHeader>

                <div>
                    <InstructionsContainer>
                        <CartSteps>TO VIEW ORDERS:</CartSteps>
                        <Steps>1- SIGN IN</Steps>
                        <Steps>2- VISIT A DESIRED LOCATION</Steps>
                        <Steps>3- SCAN QR CODE</Steps>
                        <Steps>4- CHOOSE AVAILABLE ITEMS AND ADD TO CART</Steps>
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
                    return <div>
                        <h3>User ID: {userId.slice(0, 5)}</h3>
                        {order.map(item => {
                            return (
                                <OrderContainer>
                                    <ItemTitle>{item.itemTitle}</ItemTitle>
                                    <ItemPrice>{item.itemPrice}</ItemPrice>
                                    <ItemId>Order ID: {item._id.slice(0, 5)}</ItemId>
                                    <ItemPrice>Quantity: {item.quantity}</ItemPrice>
                                    <ItemImage src={item.itemImage} />
                                    <select onChange={(event) => updateOrder(event, _id)} >
                                        <option disabled>Order Status</option>
                                        <option value="Order in Progress">Order in progress</option>
                                        <option value="Order Delivered">Order delivered</option>
                                    </select>
                                    <DeleteBtnContainer><button>Delete Order</button></DeleteBtnContainer>
                                </OrderContainer>
                            )
                        })}
                    </div>
                })}
            </Container>
        )
        // if user is NOT an admin, display the following: 
    } else {
        return (
            <Container>
                <OrderHeader>Orders</OrderHeader>
                {orderArr && orderArr.map((order) => {

                    return <OrderWrapper>
                        <OrderStatus>{order.status}</OrderStatus>
                        {order.order.map(item => {
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

const Container = styled.div`
`

const OrderWrapper = styled.div`
display: flex;
justify-content: space-evenly;
`
const OrderContainer = styled.div`
width: 250px;
height: 300px;
border: 3px solid #f6b210;
background-color: black;
border-radius: 10px;
`;

const OrderHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
margin-left: 15px;
`

const ItemId = styled.div`
color: white;
`

const ItemTitle = styled.div`
color: white;
`

const ItemPrice = styled.div`
color: white;
`

const ItemImage = styled.img`
color: white;
height: 200px;
width: 200px;
`

const DeleteBtnContainer = styled.div`
color: white;
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
justify-content: space-between;
border: 2px solid grey;
width: 38%;
height: 350px;
background-color: black;
margin-left: 15px;;
border: 3px solid #f6b210;
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