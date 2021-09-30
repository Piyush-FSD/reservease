import React from "react";
import styled from 'styled-components';
import { SearchBar } from './SearchBar';

export const Homepage = () => {

    return (
        <>
            <Container>
                <WelcomeContainer>
                    <WelcomeMsg>Order Way.</WelcomeMsg> <Ordering>Ordering just got simpler.</Ordering>
                </WelcomeContainer>
                <SearchBarContainer>
                    <SearchBar />

                </SearchBarContainer>
            </Container>
        </>
    )
};

const Container = styled.div`
display: flex;
flex-direction: column;
`

const SearchBarContainer = styled.div`
margin: 1px;
align-items: center;
`


// const SearchInput = styled.input`
// width: 550px;
// height: 50px;
// border-radius: 5px;

// &::-webkit-input-placeholder {
//     color: green;
//     margin-left: 15px;
//     font-size: 15px;
//   }
// `;

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