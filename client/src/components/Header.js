import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { AdminLogin } from "./Login/AdminLogin";
import { IoFastFoodOutline } from 'react-icons/io5';

export const Header = ({ adminLoginData, setAdminLoginData, userLoginData, setUserLoginData, showCart, setShowCart }) => {

    return (
        <>
            <HeaderContainer>
                <LogoLink to="/"><Logo>LOGO</Logo></LogoLink>

                <Icon>
                    <IoFastFoodOutline size={40} onClick={() => setShowCart(!showCart)} />
                </Icon>

                {adminLoginData === undefined ? (
                    <>
                        <LogRegisterContainer>
                            <LoginLink to="/login/user">Log in</LoginLink>
                            <RegisterLink to="/register/user">Register</RegisterLink>
                        </LogRegisterContainer>
                    </>
                ) : (
                    <>
                        <span>
                            Welcome {adminLoginData !== undefined && adminLoginData.data.busName}
                        </span>

                        <LoginLink to="/login/user">
                            <Button onClick={() => {
                                setAdminLoginData(undefined)
                            }}
                            >
                                Log Out
                            </Button>
                        </LoginLink>
                    </>
                )}
            </HeaderContainer>
        </>
    )
};

const HeaderContainer = styled.div`
height: 110px;
border-bottom: 2px solid green;
`;

const Logo = styled.h1`
color: green;
width: 20px;
margin-left: 20px; 
`;

const LogoLink = styled(Link)`
text-decoration: none;
`

const LogRegisterContainer = styled.div`
float: right;
position: absolute;
right: 0;
top: 0;
margin-right: 10px;
margin-top: 10px;
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

const Button = styled.button`
border: none;
background: transparent;
`

const Icon = styled.div`
float: right;
margin-right: 20px;
cursor: pointer;
`