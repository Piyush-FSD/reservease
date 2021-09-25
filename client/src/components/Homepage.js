import React from "react";
import styled from 'styled-components'

export const Homepage = () => {

    return (
        <>
            <WelcomeContainer>
                <WelcomeMsg>Order Way.</WelcomeMsg> <Ordering>Ordering just got simpler.</Ordering>
            </WelcomeContainer>
            <SearchBarContainer>
                <SearchInput placeholder="Search a location"></SearchInput>
            </SearchBarContainer>
        </>
    )
};

const SearchBarContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 30px;
`;

const SearchInput = styled.input`
width: 550px;
height: 40px;
border-radius: 5px;
`;
const WelcomeContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 70px;
`;

const WelcomeMsg = styled.h2`
color: green;
`;

const Ordering = styled.h2`
color: black;
margin-left: 5px;
`