import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';



export const AllAdmins = () => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getBusNames = async () => {
            const response = await fetch("/search/results")
            const data = await response.json();
            console.log(data, 'all admins')
            setSearchResults(data.data.map((item) => {
                return { busName: item.busName, userId: item.userId }
            }))
        }
        getBusNames();
    }, [])
    console.log(searchResults, ' searchh')

    return (
        <div>
            <h1>All Hosts</h1>
            {searchResults.map((item) => {
                return (
                    <div>
                        <Links to={`user/menu/${item.userId}`}>
                            <Hosts>{item.busName}</Hosts>
                        </Links>
                    </div>
                )
            })}
        </div>
    )
};

const Links = styled(Link)`
text-decoration: none;
`

const Hosts = styled.div`
width: 170px;
height: 45px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
align-items: center;
display: flex;
justify-content: center;
`;
