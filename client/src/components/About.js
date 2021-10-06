import React from "react";
import styled from "styled-components";

export const About = () => {
    return (
        <>
            <AboutHeader>About</AboutHeader>
            <Container>
                <AboutText>Order Way was inspired after seeing people deal with re-occuring issues everytime visiting an ordering system business. Issues such as long lineups, being in a rush or touching items that all customers have contact with such as a menu. </AboutText>
                <AboutText>We all know employee are busy with several tasks when dealing with customers. Order Way eases the process for both business owners and users. This happens by allowing users to instantly order what they want through their device and get what they came for.</AboutText>
            </Container>
        </>

    )
};

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
border: 2px solid grey;
width: 38%;
height: 350px;
background-color: black;
margin-left: 15px;;
border: 3px solid #f6b210;
`;

const AboutHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
margin-left: 15px;
`;

const AboutText = styled.div`
font-weight: 700;
color: white;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 16px;
margin-left: 15px;
margin-top: 5px;
`;