import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import { AdminMenuHeader } from './AdminMenuHeader';
import { AddMenuModal } from '../AddMenuModal';
import { AdminMenuItems } from './AdminMenuItems'

export const AdminMenu = () => {

    // data from AddMenuModal input fields are set and passed to AdminMenuItems to display
    const [itemData, setItemData] = useState(null);
    const [addressInfo, setAddressInfo] = useState();
    const [menuData, setMenuData] = useState()

    // const { _id } = useParams();

    useEffect(() => {
        const getAddress = async () => {
            const response = await fetch('/admin/info');
            const data = await response.json();

            console.log(data.data.menu, 'menu data')
            console.log(data.data, 'address info')

            setMenuData(data.data.menu)
            setAddressInfo(data.data)
        }
        getAddress();
    }, []);

    return (
        <>
            <AdminMenuHeader />
            <AddressInfoContainer>
                <AddressWebContainer>
                    <div>
                        {addressInfo && addressInfo.address},
                        {addressInfo && addressInfo.city},
                        {addressInfo && addressInfo.postalCode}
                        <MoreInfoLink to="#">More Info</MoreInfoLink>
                    </div>
                    <BusName>
                        {addressInfo && addressInfo.busName}
                    </BusName>
                    <WebsiteContainer>
                        {addressInfo && addressInfo.website}
                    </WebsiteContainer>
                </AddressWebContainer>
            </AddressInfoContainer>
            <MenuTextContainer>
                <h2>Menu</h2>
                <div>
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
                                        <div>{item.itemPrice}</div>
                                    </MenuInfo>
                                </MenuItemContainer>
                            </>
                        )
                    })}
                </div>
            </MenuTextContainer>
            <>
                <AddMenuModal setItemData={setItemData} />
                <AdminMenuItems itemData={itemData} />
            </>
        </>
    )
};

const AddressInfoContainer = styled.div`
margin-top: 10px;;
height: 100px;
width: 36%;
border: 2px solid orange;
margin-left: 10px;
/* display: flex; */
`

const AddressWebContainer = styled.span`
display: flex;
flex-direction: column;
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
flex-direction: row;
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