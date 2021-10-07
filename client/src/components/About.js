import React from "react";
import styled from "styled-components";
import aboutimagee from '../WebImages/aboutimagee.jpeg';

export const About = () => {
    return (
        <>
            <AboutHeader>About</AboutHeader>
            <Wrapper>
                <Container>
                    <AboutText>Order Way was inspired after seeing people deal with re-occuring issues everytime visiting an ordering system business. Issues such as long lineups, being in a rush or touching items that all customers have contact with such as a menu. </AboutText>
                    <AboutText>We all know employee are busy with several tasks when dealing with customers. Order Way eases the process for both business owners and users. This happens by allowing users to instantly order what they want through their device and get what they came for.</AboutText>
                </Container>
                <AboutImgg src={aboutimagee} />
            </Wrapper>
        </>
    )
};

const Container = styled.div`
border: 2px solid grey;
width: 40%;
height: 350px;
background-color: black;
border: 3px solid #f6b210;

@media screen and (max-width: 600px){
    width: 80%;

}


`;

const AboutHeader = styled.h1`
font-weight: 600;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 30px;
`;

const AboutText = styled.div`
font-weight: 500;
color: white;
text-decoration: none;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 16px;
margin-top: 5px;
margin-top: 20px;
line-height: 25px;;
`;

const AboutImgg = styled.img`
height: 350px;
width: 700px;

@media screen and (max-width: 600px){
    width: 80%;

}
`

const Wrapper = styled.div`
display: flex;
justify-content: space-around;

@media screen and (max-width: 600px){
    display: block;
    width: 80%;
    margin: 0 auto;

}
`