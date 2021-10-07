import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom'
import { AdminMenuHeader } from './AdminMenuHeader';
import { AddMenuModal } from '../AddMenuModal';
import { apiUrl } from '../../urls';
import { AdminMenuItems } from './AdminMenuItems'


export const AdminMenu = () => {

    // data from AddMenuModal input fields are set and passed to AdminMenuItems to display
    const [itemData, setItemData] = useState(null);
    const [addressInfo, setAddressInfo] = useState();
    const [menuData, setMenuData] = useState();

    const { userId } = useParams();

    // fetch logged in admin data by ID
    useEffect(() => {
        const getAdminInfoById = async () => {
            const response = await fetch(`${apiUrl}/menu/${userId}`);
            const data = await response.json();

            setMenuData(data.data.menu)
            setAddressInfo(data.data)
        }
        getAdminInfoById();
    }, [userId])

    return (
        <>
            <AdminMenuHeader />
            <AddressInfoContainer>
                <AddressWebContainer>
                    <BusName>
                        {addressInfo && addressInfo.busName}
                    </BusName>
                    <Address>
                        {addressInfo && addressInfo.address},
                        {addressInfo && addressInfo.city},
                        {addressInfo && addressInfo.postalCode}
                        <WebsiteContainer>
                            {addressInfo && addressInfo.website}
                        </WebsiteContainer>
                    </Address>
                </AddressWebContainer>
            </AddressInfoContainer>
            <>
                <AddMenuModal setItemData={setItemData} />
                <AdminMenuItems itemData={itemData} />
            </>
            <MenuTextContainer>
                <MenuText>Menu</MenuText>
                <MenuItemWrapper>
                    {menuData && menuData.map((item) => {
                        return (
                            <>
                                <MenuItemContainer>
                                    <MenuImg>
                                        <ItemImg src={item.itemImage} />
                                    </MenuImg>
                                    <MenuInfo>
                                        <MenuItemName>{item.itemTitle}</MenuItemName>
                                        <div>{item.itemDetails}</div>
                                        <ItemPrice>{item.itemPrice}</ItemPrice>
                                        <EditDelContainer>
                                            <EditBtn>Edit</EditBtn>
                                            <DeleteBtn>Delete</DeleteBtn>
                                        </EditDelContainer>
                                    </MenuInfo>
                                </MenuItemContainer>
                            </>
                        )
                    })}
                </MenuItemWrapper>
            </MenuTextContainer>
        </>
    )
};

const AddressInfoContainer = styled.div`
margin-top: 10px;
border: 3px solid #f6b210;
margin-left: 10px;
background-color: black;
width: 43%;
margin: 0 auto;
`;

const Address = styled.div`
color: white;
`;


const AddressWebContainer = styled.span`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 17px;
`;

const MenuTextContainer = styled.div`

    h2 {
        text-align: center;
    }
`;


const MenuItemContainer = styled.div`
display: flex;
border: 3px solid #f6b210;
background-color: black;
width: 350px;
border-radius: 20px;
color: white;
margin: 5px;
`;

const WebsiteContainer = styled.div`
margin-top: 15px;
`;

const BusName = styled.div`
color: #f6b210;
margin-bottom: 10px;
font-size: 35px;
font-weight: 650;
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
font-weight: bold;
color: #f6b210;
`;

const DeleteBtn = styled.button`
width: 120px;
height: 35px;
border-radius: 10px;
background: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`;

const EditBtn = styled.button`
width: 120px;
height: 35px;
border-radius: 10px;
background: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`;

const EditDelContainer = styled.div`
display: flex; 
`;

const MenuItemWrapper = styled.div`
display: flex;
justify-content: center;    
flex-wrap: wrap;
`;

const ItemPrice = styled.div`
font-weight: bold;
color: #f6b210;
`;

const MenuText = styled.h2`
color: white;
`