import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';
import { Navbar } from "./NavBar";
import LogoImg from '../Logo/LogoImg.png'

export const Header = ({ userLoginData, setUserLoginData, showCart, setShowCart }) => {
    const [id, setId] = useState();

    useEffect(() => {
        const storageData = localStorage.getItem("userLoggedIn");
        if (storageData) {
            const isUserLoggedIn = JSON.parse(storageData);
            setId(isUserLoggedIn.adminId)
        }
    }, []);

    return (
        <>
            <HeaderContainer>
                <Link to="/"><LogoImgg src={LogoImg}></LogoImgg>
                    <LogoText>Order Way.</LogoText></Link>
                <Icon>
                    <IoFastFoodOutline size={40} onClick={() => setShowCart(!showCart)} />
                </Icon>
                <Navbar />
                {!userLoginData ? (
                    <>
                        <LogRegisterContainer>
                            <LoginLink to="/login/user">Log in</LoginLink>
                            <RegisterLink to="/register/user">Register</RegisterLink>
                        </LogRegisterContainer>
                    </>
                ) : (
                    <LoginMenuContainer>
                        <WelcomeContainer>
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
                            {userLoginData.admin === true &&
                                <MenuContainer>
                                    <AdminMenuLink to={`/menu/${id}`}>Edit Menu</AdminMenuLink>
                                </MenuContainer>}
                        </WelcomeContainer>
                    </LoginMenuContainer>
                )}
            </HeaderContainer>
        </>
    )
};

const HeaderContainer = styled.div`
width: 85rem;
margin: 0 auto;
position: relative;
display: block;
padding: 30px 0px;
`;

const LogoText = styled.h1`
    color: #f6b210;
    display: inline-block;
    width: 78%;
    margin: 0;
    padding-bottom: 0;
    padding-left: 10px;
`;

const LogRegisterContainer = styled.div`
width: 40%;
display: inline-block;
text-align: right;
`;

const LoginLink = styled(Link)`
text-decoration: none;
display: inline-block;
width: 17%;
float: right;
margin-top: 2px;
`;

const RegisterLink = styled(Link)`
text-decoration: none;
font-size: 1.2em;
font-weight: 500;
color: #3C7DA8;
`;

const Button = styled.button`
border: none;
background: transparent;
font-size: 1.2em;
font-weight: 548;
color: #3C7DA8;
`

const Icon = styled.div`
text-decoration: none;
width: 10%;
float: right;
padding-top: 20px;
`

const LoginName = styled.div`
font-weight: bold;
display: inline-block;
width: 40%;
`;

const WelcomeText = styled.span`
color: #54577c;
font-size: 1.3em;
font-weight: 600;
`

const AdminMenuLink = styled(Link)`
font-size: 1.2em;
font-weight: 500;
color: #3C7DA8;
text-decoration: none;
`

const LogoImgg = styled.img`
width: 80px;
padding-left: 5px;

`

const LoginMenuContainer = styled.div`
display:inline-block;
width: 40%;
`

const MenuContainer = styled.div`
display: inline-block;
width: 20%;
`

const WelcomeContainer = styled.div`
text-align:right;

`