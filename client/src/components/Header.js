import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';

export const Header = ({ userLoginData, setUserLoginData, showCart, setShowCart }) => {
    return (
        <>
            <HeaderContainer>
                <LogoLink to="/"><Logo>LOGO</Logo></LogoLink>
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
                        <LoggedInContainer>
                            <>
                                <LoginName>
                                    Welcome {userLoginData.busName}
                                    {/* Welcome {adminLoginData.busName || userLoginData.firstName} */}
                                </LoginName>

                                <LoginLink to="/login/user">

                                    {/*log out by setting adminLoginData to undefined*/}
                                    <Button onClick={() => {
                                        setUserLoginData(undefined)
                                        localStorage.setItem("userLoggedIn", '')
                                        // localStorage.clear();
                                    }}>
                                        Log Out
                                    </Button>
                                </LoginLink>
                            </>
                        </LoggedInContainer>
                        {userLoginData.isAdmin !== false &&
                            <AdminMenuLinkContainer>
                                <Link to="/admin/menu">Menu</Link>
                            </AdminMenuLinkContainer>}
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
color: blue;
font-size: 16px;
margin-left: 15px;
font-weight: bold;
`

const Icon = styled.div`
float: right;
margin-right: 20px;
cursor: pointer;
`

const LoginName = styled.span`
font-weight: bold;
`

const LoggedInContainer = styled.div`
float: right;
`

const AdminMenuLinkContainer = styled.div`
margin-left: 15px;
margin-top: 50px;
`