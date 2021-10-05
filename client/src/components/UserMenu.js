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

    const { state, actions: { addOrder }, } = useContext(OrderContext);

    const { userId } = useParams();

    // put state in session storage to have access in CartBar
    useEffect(() => {
        // setAdminId(userId);
        sessionStorage.setItem("adminId", userId);
    }, [userId]);

    // GET - fetch all menu's by id
    useEffect(() => {
        const getAdminInfoById = async () => {
            const response = await fetch(`/menu/${userId}`);
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
                    <div>
                        {busInfo && busInfo.address},
                        {busInfo && busInfo.city},
                        {busInfo && busInfo.postalCode}
                        <MoreInfoLink to="#">More Info</MoreInfoLink>
                    </div>
                    <BusName>
                        {busInfo && busInfo.busName}
                    </BusName>
                    <WebsiteContainer>
                        {busInfo && busInfo.website}
                    </WebsiteContainer>
                </AddressWebContainer>
            </AddressInfoContainer>
            <MenuTextContainer>
                <h2>Menu</h2>
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
height: 100px;
width: 36%;
border: 2px solid orange;
margin-left: 10px;
/* display: flex; */
`

const AddressWebContainer = styled.span`
/* display: flex; */
/* flex-direction: column; */
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
border: 1px solid red;
width: 30%;
border-radius: 20px;
`;

const WebsiteContainer = styled.div`
margin-top: 15px;
`;

const BusName = styled.div`
margin-top: 10px;
color: green;
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

`;

const MenuImg = styled.div`
width: 50%;
`;

const MenuItemName = styled.div`
font-weight: bold;
`;

const MenuItemWrapper = styled.div`
display: flex;
width: 80%;
`;

const AddToCartBtn = styled.button`
width: 80px;
height: 30px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
`;