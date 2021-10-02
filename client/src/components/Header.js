import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';

export const Header = ({ userLoginData, setUserLoginData, showCart, setShowCart }) => {

    return (
        <>
            <HeaderContainer>
                <Link to="/"><Logo>Order Way.</Logo></Link>
                <Icon>
                    <IoFastFoodOutline size={40} onClick={() => setShowCart(!showCart)} />
                </Icon>

                {!userLoginData ? (
                    // {!adminLoginData || !userLoginData ? (
                    <>
                        <LogRegisterContainer>
                            <LoginLink to="/login/user">Log in</LoginLink>
                            <RegisterLink to="/register/user">Register</RegisterLink>
                        </LogRegisterContainer>
                    </>
                ) : (
                    <>
                        <div>
                            <>
                                <LoginName>
                                    <WelcomeText>Welcome {userLoginData !== undefined && userLoginData.firstName}
                                        {/* || userLoginData !== undefined && userLoginData.busName */}

                                        {/* Welcome {adminLoginData.busName || userLoginData.firstName} */}
                                    </WelcomeText>
                                </LoginName>

                                <LoginLink to="/login/user">

                                    {/*log out by setting adminLoginData to undefined*/}
                                    <Button onClick={() => {
                                        setUserLoginData(undefined)
                                        localStorage.setItem("userLoggedIn", '')
                                    }}>
                                        Log Out
                                    </Button>
                                </LoginLink>
                            </>
                        </div>
                        {userLoginData.admin === true &&
                            <div>
                                <Link to="/admin/menu">Menu</Link>
                            </div>}
                    </>
                )}
            </HeaderContainer>
        </>
    )
};

const HeaderContainer = styled.div`
width: 100%;
position: relative;
display: block;
border-bottom: 3px solid #54577c;
`;

const Logo = styled.h1`
color: #3C7DA8;
display: inline-block;
width: 78%;
`;

const LogRegisterContainer = styled.div`
width: 12%;
display: inline-block;;
`;

const LoginLink = styled(Link)`
text-decoration: none;
margin-top: 6px;
margin-left: 5px;
font-size: 1.2em;
font-weight: 500;
color: #3C7DA8;
`;

const RegisterLink = styled(Link)`
text-decoration: none;
margin-top: 6px;
margin-left: 18px;
font-size: 1.2em;
font-weight: 500;
color: #3C7DA8;
`;

const Button = styled.button`
border: none;
background: transparent;
color: #3C7DA8;
font-size: 0.9em;
font-weight: 500;
`

const Icon = styled.div`
text-decoration: none;
width: 10%;
float: right;
padding-top: 20px;
`

const LoginName = styled.span`
font-weight: bold;
`;

const WelcomeText = styled.div`
color: #54577c;
font-size: 1.3em;
font-weight: 600;
`
