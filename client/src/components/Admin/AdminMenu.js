import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import { AdminMenuHeader } from './AdminMenuHeader';
import { AddMenuModal } from '../AddMenuModal';
import { AdminMenuItems } from './AdminMenuItems'

export const AdminMenu = () => {

    // data from AddMenuModal input fields are set and passed to AdminMenuItems to display
    const [itemData, setItemData] = useState(null);
    const [addressInfo, setAddressInfo] = useState(null);

    // const { _id } = useParams();

    useEffect(() => {
        const getAddress = async () => {
            const response = await fetch(`/search/results`);

            const data = await response.json();
            console.log(data.data.menu, ' d a t a a a  ')

            setAddressInfo(data.data.menu)
        }
        getAddress();
    }, []);

    return (
        <>
            <AdminMenuHeader />
            <AddressInfoContainer>
                <Address>
                    {/* addressInfo !== null && */}
                    {/* {addressInfo.map((item) => {
                        return <div>{item.address}</div>
                    })} */}
                </Address>
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
height: 100px;
width: 1000px;
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


