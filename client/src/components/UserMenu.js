import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import { AdminMenuHeader } from './Admin/AdminMenuHeader';
import { toast } from 'react-toastify';
import { OrderContext } from '../OrderProvider';

// menu the user sees after searching and choosing a business
export const UserMenu = (userLoginData) => {
    const [busInfo, setBusInfo] = useState();
    const [menuData, setMenuData] = useState();
    const { userId } = useParams();
    const { state, actions: { addOrder }, } = useContext(OrderContext);

    // put state in session storage to have access in CartBar
    useEffect(() => {
        // setAdminId(userId);
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

    const handleAddToCart = (item) => {
        if (!item) return

        const itemWithQuantity = { ...item, quantity: 1 }
        addOrder(itemWithQuantity);
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
width: 36%;
border: 3px solid #f6b210;
margin-left: 10px;
background-color: black;
/* display: flex; */
`

const AddressWebContainer = styled.span`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 17px;
padding-left: 10px;
`

const MenuTextContainer = styled.div`
margin-left: 10px;
`

const MoreInfoLink = styled(Link)`
font-size: 13px;
text-decoration: none;
margin-left: 10px;
margin-top: 5px;
`

const MenuItemContainer = styled.div`
display: flex;
/* flex-direction: row; */
border: 3px solid #f6b210;
background-color: black;
width: 400px;
border-radius: 20px;

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

`

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
/* font-weight: bold; */
`;

const MenuItemWrapper = styled.div`
display: flex;
width: 80%;
`;

const AddToCartBtn = styled.button`
width: 120px;
height: 35px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
margin-left: 50px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;

:hover {
    color: #f6b210;
}
`;


const MenuHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
`

const Address = styled.div`
margin-left: 10px;
color: white;
`