import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { RiShoppingCartLine } from "react-icons/ri";
import { Navbar } from "./NavBar";
import LogoImg from '../Logo/LogoImg.png'

export const Header = ({ userLoginData, setUserLoginData, showCart, setShowCart }) => {

    // state that holds user ID in local storage to re-direct 
    const [id, setId] = useState();

    useEffect(() => {
        const storageData = localStorage.getItem("userLoggedIn");
        if (storageData) {
            const isUserLoggedIn = JSON.parse(storageData);
            setId(isUserLoggedIn.userId)
        }
    }, []);

    return (
        <>
            <HeaderContainer>
                <LogoContainer>
                    <Link to="/"><LogoImgg src={LogoImg}></LogoImgg>
                        <LogoText>Order Way.</LogoText></Link>
                </LogoContainer>
                {!userLoginData ? (
                    <>
                        <LogRegisterContainer>
                            <CartIconContainer>
                                <RiShoppingCartLine size={40} onClick={() => setShowCart(!showCart)} />
                            </CartIconContainer>
                            <LoginLink to="/login/user">Log in</LoginLink>
                            <RegisterLink to="/register/user">Register</RegisterLink>
                        </LogRegisterContainer>
                        <Navbar />
                    </>
                ) : (
                    <>
                        <LoginMenuContainer>
                            <WelcomeContainer>
                                <>
                                    <CartFlex>
                                        <CartIconContainer>
                                            <RiShoppingCartLine size={40} onClick={() => setShowCart(!showCart)} />
                                        </CartIconContainer>
                                        <LoginName>
                                            <WelcomeText>Welcome {userLoginData !== undefined && userLoginData.firstName}
                                                {/* || userLoginData !== undefined && userLoginData.busName */}

                                                {/* Welcome {adminLoginData.busName || userLoginData.firstName} */}
                                            </WelcomeText>
                                        </LoginName>
                                        <LoginLink to="/login/user">

                                            {/*log out by setting adminLoginData to undefined*/}
                                            <LogOutButton onClick={() => {
                                                setUserLoginData(undefined)
                                                localStorage.setItem("userLoggedIn", '')
                                            }}>
                                                Log Out
                                            </LogOutButton>
                                        </LoginLink>
                                        {userLoginData.admin === true &&
                                            <MenuContainer>
                                                <AdminMenuLink to={`/admin/menu/${id}`}>Edit Menu</AdminMenuLink>
                                            </MenuContainer>}
                                    </CartFlex>
                                </>
                            </WelcomeContainer>
                        </LoginMenuContainer>
                        <Navbar />

                    </>
                )}
            </HeaderContainer>
        </>
    )
};

const HeaderContainer = styled.div`
width: 100%;
margin: 0 auto;
position: relative;
display: block;
padding: 30px 0px;
`;

const LogoText = styled.h1`
display: inline-block;
color: #000;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 19px;

:hover {
    color: #f6b210;
}
`;

const LogRegisterContainer = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: end;
`;

const LoginLink = styled(Link)`
font-weight: 500;
color: #000;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;

:hover {
    color: #f6b210;
}
`;

const RegisterLink = styled(Link)`
font-weight: 500;
color: #000;
-webkit-text-decoration: none;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;

:hover {
    color: #f6b210;
}
`;

const LogOutButton = styled.button`
border: none;
background: transparent;
font-size: 1.2em;
font-weight: 500;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
font-weight: 500;


:hover {
    color: #f6b210;
}
`;

const LoginName = styled.div`
font-weight: bold;
display: inline-block;
/* width: 40%; */
`;

const WelcomeText = styled.span`
color: #f6b210;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 19px;

`;

const AdminMenuLink = styled(Link)`
font-size: 1.2em;
font-weight: 450;
color: black;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;

:hover {
    color: #f6b210;
}
`;

const LogoImgg = styled.img`
width: 80px;
padding-left: 5px;
`;

const LoginMenuContainer = styled.div`
display: inline-block;
width: 50%;
position: absolute;
right: 0;
`;

const MenuContainer = styled.div`
display: inline-block;
width: 20%;
text-decoration: none;
`;

const WelcomeContainer = styled.div`
text-align: right;
`;

const LogoContainer = styled.div`
width: 50%;
float: left;
`;

const CartIconContainer = styled.div`
margin-right: 15px;

:hover {
    color: #f6b210;
}
`

const CartFlex = styled.div`
display: flex;
align-items: center;
flex-wrap: wrap;
`
