import React from "react";
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
// import video.mp4 from '../videos'

export const Homepage = () => {

    return (
        <>
            <Container>
                <div>
                    {/* <video src="/videos/video.mp4" autoPlay loop muted /> */}
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
display: block;
width: 100%;
text-align: center;
height:50vh;
background: #FAFFD8;
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

const WelcomeMsg = styled.h2`
margin-top: 0;
padding-top:100px;
color: #54577c;
font-size: 1.6em;
font-weight:600;
`;

const Ordering = styled.h2`
color: #3C7DA8;
font-size: 1.3em;
font-weight:500;
margin-left: 5px;
`