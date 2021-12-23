import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { apiUrl } from '../urls'

export const AllAdmins = () => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getBusNames = async () => {
            const response = await fetch(`${apiUrl}/search/results`);
            const data = await response.json();

            setSearchResults(data.data.map((item) => {
                return { busName: item.busName, userId: item.userId }
            }))
        }
        getBusNames();
    }, [])

    return (
        <>
            <AllHostsHeader>All Hosts</AllHostsHeader>
            <AdminContainer>
                {searchResults.map((item, index) => {
                    return (
                        <LinksContainer key={index}>
                            <Links to={`user/menu/${item.userId}`}>
                                <Hosts>{item.busName}</Hosts>
                            </Links>
                        </LinksContainer>
                    )
                })}
            </AdminContainer>
        </>
    )
};

const Links = styled(Link)`
text-decoration: none;
`

const Hosts = styled.div`
width: 100%;
height: 45px;
line-height: 45px;
margin: 20px 0;
border-radius: 10px;
background: #000000;
color: #ffffff;
align-items: center;
border: 3px solid #f6b210;

:hover {
    color: #f6b210;
}
`;

const AdminContainer = styled.div`
display: flex;
flex-wrap: wrap;
text-align: center;
justify-content: space-evenly;
`

const LinksContainer = styled.div`
width: calc(25% - 200px);
margin: 0 100px;
width: 200px;
`;

const AllHostsHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
margin-left: 11vw;;
`