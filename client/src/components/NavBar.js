import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Navbar = () => {

    return (
        <>
            <NavLinkContainer>
                <NavLinks to="/">Home</NavLinks>
                <NavLinks to="/hosts">Hosts</NavLinks>
                <NavLinks to="/orders">Orders </NavLinks>
                <NavLinks to="/about">About</NavLinks>
            </NavLinkContainer>
        </>
    )
};

const NavLinks = styled(Link)`
font-size: 1.2em;
font-weight: 500;
color: #3C7DA8;
text-decoration: none;
margin-left: 15px;
`;


const NavLinkContainer = styled.div`
width: 60%;
display: inline-block;
text-align: right;
`

