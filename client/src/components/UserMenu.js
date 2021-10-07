import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import { AdminMenuHeader } from './Admin/AdminMenuHeader';
import { OrderContext } from '../OrderProvider';
import { apiUrl } from '../urls'
import { toast } from 'react-toastify';

// menu the user sees after searching and choosing a business
export const UserMenu = (userLoginData) => {
    const [busInfo, setBusInfo] = useState();
    const [menuData, setMenuData] = useState();
    const { userId } = useParams();

    // add to cart action from Provider
    const { actions: { addOrder } } = useContext(OrderContext);

    // put state in session storage to have access in CartBar
    useEffect(() => {
        sessionStorage.setItem("adminId", userId);
    }, [userId]);

    // GET - fetch all menu's by id
    useEffect(() => {
        const getAdminInfoById = async () => {
            const response = await fetch(`${apiUrl}/menu/${userId}`);
            const data = await response.json();

            setBusInfo(data.data);
            setMenuData(data.data.menu);
        }
        getAdminInfoById();
    }, [userId]);

    // onClick for Add to Order button
    const handleAddToCart = (item) => {
        if (!item) return

        const itemWithQuantity = { ...item, quantity: 1 }
        addOrder(itemWithQuantity);

        toast("Item added to cart!")
    };

    return (
        <>
            <AdminMenuHeader />
            <AddressInfoContainer>
                <AddressWebContainer>
                    <BusName>
                        {busInfo && busInfo.busName}
                    </BusName>
                    <Address>
                        {busInfo && busInfo.address},
                        {busInfo && busInfo.city},
                        {busInfo && busInfo.postalCode}
                    </Address>
                    <WebsiteContainer>
                        {busInfo && busInfo.website}
                    </WebsiteContainer>
                </AddressWebContainer>
            </AddressInfoContainer>
            <MenuTextContainer>
                <MenuHeader>Menu</MenuHeader>
                <MenuItemWrapper>
                    {menuData && menuData.map((item, index) => {
                        return (
                            <div key={index}>
                                <MenuItemContainer key={index}>
                                    <MenuImg>
                                        <ItemImg src={item.itemImage} />
                                    </MenuImg>
                                    <MenuInfo>
                                        <MenuItemName>{item.itemTitle}</MenuItemName>
                                        <div>{item.itemDetails}</div>
                                        <div>{item.itemPrice}</div>
                                        {userLoginData &&
                                            <AddToCartBtn onClick={() => handleAddToCart(item)}>Add to Cart</AddToCartBtn>
                                        }
                                    </MenuInfo>
                                </MenuItemContainer>
                            </div>
                        )
                    })}
                </MenuItemWrapper>
            </MenuTextContainer>
        </>
    )
};

const AddressInfoContainer = styled.div`
margin-top: 10px;
height: 150px;
width: 80%;
border: 3px solid #f6b210;
margin-left: 10px;
background-color: black;
`;

const AddressWebContainer = styled.span`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 17px;
padding-left: 10px;
`;

const MenuTextContainer = styled.div`
margin-left: 10px;
`;

const MenuItemContainer = styled.div`
display: flex;
border: 3px solid #f6b210;
background-color: black;
width: 400px;
border-radius: 20px;
flex-wrap: wrap;
`;

const WebsiteContainer = styled.div`
margin-top: 15px;
margin-left: 10px;
color: white;
`;

const BusName = styled.div`
color: #f6b210;
margin-bottom: 10px;
font-size: 35px;
font-weight: 650;
margin-left: 10px;
`;

const ItemImg = styled.img`
height: 150px;
`;

const MenuInfo = styled.div`
width: 50%;
display: flex;
flex-direction: column;
text-align: center;
justify-content: space-around;
box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
color: white;
`;

const MenuImg = styled.div`
width: 50%;
`;

const MenuItemName = styled.div`

`;

const MenuItemWrapper = styled.div`
display: flex;
justify-content: center;    
flex-wrap: wrap;
`;

const AddToCartBtn = styled.button`
width: 120px;
height: 35px;
border-radius: 10px;
background: white;
margin-left: 50px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`;


const MenuHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
color: white;
`;

const Address = styled.div`
margin-left: 10px;
color: white;
`;