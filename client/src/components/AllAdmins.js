import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { apiUrl } from '../urls'



export const AllAdmins = () => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getBusNames = async () => {
            const response = await fetch(`${apiUrl}/search/results`)
            const data = await response.json();

            setSearchResults(data.data.map((item) => {
                return { busName: item.busName, userId: item.userId }
            }))
        }
        getBusNames();
    }, [])
    console.log(searchResults, ' searchh')

    return (
        <>
            <AllHostsHeader>All Hosts</AllHostsHeader>
            <AdminContainer>
                {searchResults.map((item) => {
                    return (
                        <LinksContainer>
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
-webkit-align-items: center;
-webkit-box-align: center;
-ms-flex-align: center;
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
`;

const AllHostsHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
`