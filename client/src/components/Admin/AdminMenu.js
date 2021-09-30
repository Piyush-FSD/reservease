import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import AdminMenuHeader from './AdminMenuHeader';
import { AddMenuModal } from '../AddMenuModal';
import { AdminMenuItems } from './AdminMenuItems'

export const AdminMenu = () => {
    //set the state and render

    // data from add menu is stored here
    const [itemData, setItemData] = useState()

    return (
        <>
            <AdminMenuHeader />
            <AddressInfoContainer>
                <Address>2465 Rue Maisonneuve E, Montreal, QC</Address>
                <div>
                    <MoreInfoLink to="#">More Info</MoreInfoLink>
                </div>
            </AddressInfoContainer>
            <MenuTextContainer><h2>Menu</h2></MenuTextContainer>
            <>
                <AddMenuModal setItemData={setItemData} />
                <AdminMenuItems itemData={itemData} />
            </>
        </>
    )
};

const AddressInfoContainer = styled.div`
height: 30px;
width: 400px;
border: 2px solid orange;
margin-left: 10px;
/* display: flex; */
`

const Address = styled.span`
color: blue;
`

const MenuTextContainer = styled.div`
margin-top: 10px;
margin-left: 10px;
`


const MoreInfoLink = styled(Link)`
font-size: 13px;
text-decoration: none;
margin-left: 10px;
margin-top: 5px;
`


