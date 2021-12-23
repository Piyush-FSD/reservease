import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
// import '../App.css';
// import '../jQuery.js';


export const Navbar = () => {

    return (
        <div>
            <NavLinkContainer>
                <NavLinks to="/">Home</NavLinks>
                <NavLinks to="/hosts">Hosts</NavLinks>
                <NavLinks to="/orders">Orders </NavLinks>
                <NavLinks to="/about">About</NavLinks>
            </NavLinkContainer>
        </div>
    )
};

const NavLinkContainer = styled.div`
width: 100%;
display: inline-block;
text-align: center;

@media screen and (max-width: 767px) {
    overflow: hidden;
    width: 100%;
}
`;

const NavLinks = styled(Link)`
font-weight: 500;
color: #000;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;

&:hover {
    color: #f6b210;
  }
`;

