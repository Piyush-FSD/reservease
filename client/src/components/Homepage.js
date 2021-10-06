import React from "react";
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
// import homepage from '../Logo/homepage.png'

export const Homepage = () => {
    return (
        <>
            <Container>
                <div>
                    <WelcomeMsg>Order Way.</WelcomeMsg> <Ordering>Ordering just got simpler.</Ordering>
                </div>
                <div>
                    <SearchBar />
                </div>
            </Container>
        </>
    )
};

const Container = styled.div`
position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    height: 50vh;
    background: #000;
`;

const WelcomeMsg = styled.h2`
    font-weight: 500;
    color: #f6b210;
    -webkit-text-decoration: none;
    text-decoration: none;
    margin-left: 15px;
    padding: 0 35px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 2em;
`;

const Ordering = styled.h2`
    font-weight: 500;
    color: #fff;
    -webkit-text-decoration: none;
    text-decoration: none;
    margin-left: 15px;
    padding: 0 35px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 1.3em;
`;