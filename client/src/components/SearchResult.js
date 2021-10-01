import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'

export const SearchResult = () => {

    const [menuResult, setMenuResult] = useState([]);
    const { _id } = useParams();

    useEffect(() => {
        const response = fetch(`/menu/${_id}`);
        const data = response.json()
        setMenuResult(data);
    }, [])

    return (
        <>
            <HeaderImgContainer>
                <UploadImg>Business image here</UploadImg>
            </HeaderImgContainer>
            <AddressInfoContainer>
                <Address>address</Address>
                <div>
                    <MoreInfoLink to="#">More Info</MoreInfoLink>
                </div>
            </AddressInfoContainer>
            <MenuTextContainer>
                <h2>Menu</h2>
            </MenuTextContainer>
            <MenuContainer>
                <MenuRowOne>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                </MenuRowOne>
                <MenuRowTwo>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                </MenuRowTwo>
                <MenuRowThree>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                </MenuRowThree>
            </MenuContainer>
        </>
    )
};

const HeaderImgContainer = styled.div`
height: 235px;
width: 100%;
border: 2px solid red;
`;

const UploadImg = styled.h1`
display: flex;
justify-content: center;
`;

const AddressInfoContainer = styled.div`
height: 30px;
width: 400px;
border: 2px solid orange;
margin-left: 10px;
display: flex;
`;

const Address = styled.span`
color: blue;
`;

const MenuTextContainer = styled.div`
margin-top: 10px;
margin-left: 10px;
`;

const MenuContainer = styled.div`
width: 100%;
height: 500px;
border: 2px solid purple;
/* display: flex; */
/* justify-content: space-around; */
`;

const MenuRowOne = styled.div`
width: 32%;
height: 100%;
border: 2px solid green;
`;

const MenuRowTwo = styled.div`
width: 32%;
height: 100%;
border: 2px solid green;
`;
const MenuRowThree = styled.div`
width: 32%;
height: 100%;
border: 2px solid green;
`;

const ItemContainer = styled.div`
width: 90%;
height: 30%;
border: 2px solid blue;
display: flex;
flex-direction: column;
margin-left: 20px;
margin-top: 10px;
`;

const MoreInfoLink = styled(Link)`
font-size: 13px;
text-decoration: none;
margin-left: 10px;
margin-top: 5px;
`;