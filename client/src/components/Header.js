import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';

export const Header = ({ userLoginData, setUserLoginData, showCart, setShowCart }) => {
    console.log(userLoginData, 'THIS USER LOGGED IN ')
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
                                    Welcome {userLoginData !== undefined && userLoginData.firstName || userLoginData !== undefined && userLoginData.busName}

                                    {/* Welcome {adminLoginData.busName || userLoginData.firstName} */}
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
                        </LoggedInContainer>
                        {userLoginData.isAdmin &&
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

const LogoLink = styled(Link)`

`

const LogRegisterContainer = styled.div`
width: 12%;
display: inline-block;;
`;

const LoginLink = styled(Link)`
text-decoration: none;
margin-top: 6px;
margin-left: 5px;
font-size: 1.2em;
font-weight:500;
color: #3C7DA8;
`;

const RegisterLink = styled(Link)`
text-decoration: none;
margin-top: 6px;
margin-left: 18px;
font-size: 1.2em;
font-weight:500;
color: #3C7DA8;

`;

const Button = styled.button`

`

const Icon = styled.div`
text-decoration: none;
width: 10%;
/* display: inline-block; */
float: right;
padding-top: 20px;
`

const LoginName = styled.span`
font-weight: bold;
`

const LoggedInContainer = styled.div`

`

const AdminMenuLinkContainer = styled.div`

`
