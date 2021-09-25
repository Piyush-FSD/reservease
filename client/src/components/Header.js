import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Header = () => {

    return (
        <>
            <HeaderContainer>
                <LogoLink to="/"><Logo>LOGO</Logo></LogoLink>
                <LogRegisterContainer>
                    <LoginLink to="/login/user">Log in</LoginLink>
                    <RegisterLink to="/register/user">Register</RegisterLink>
                </LogRegisterContainer>
            </HeaderContainer>

        </>
    )
};

const HeaderContainer = styled.div`
height: 140px;
border-bottom: 2px solid green;
`;

const Logo = styled.h1`
color: green;
width: 10%;
margin-left: 20px; 
`;

const LogoLink = styled(Link)`
text-decoration: none;
`

const LogRegisterContainer = styled.div`
float: right;
top: 10px;
display: flex;
margin-right: 5px;
`;

const LoginLink = styled(Link)`
color: blue;
text-decoration: none;
margin-right: 15px;
`;

const RegisterLink = styled(Link)`
color: blue;
text-decoration: none;
margin-right: 15px;
`;

