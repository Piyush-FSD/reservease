import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export const AdminLogin = () => {

    return (
        <>
            <Container>
                <h3>Welcome to Order Way</h3>
                <UserAdminContainer>
                    <h4>Admin Login or</h4>
                    <UserLink to="/login/user">User Login</UserLink>
                </UserAdminContainer>
                <Form>
                    <Input placeholder="Email"></Input>
                    <Input placeholder="Password"></Input>
                    <SubmitBtn>Log In</SubmitBtn>
                </Form>
            </Container>
        </>
    )
};

const Container = styled.div`
margin-left: 500px;
width: 100%;
`;

const Form = styled.form`
width: 400px;
display: flex;
flex-direction: column;
justify-content: center;
`

const Input = styled.input`
width: 400px;
height: 40px;
margin-top: 5px;
margin-bottom: 15px;
border-radius: 5px;
`;

const SubmitBtn = styled.button`
width: 170px;
height: 45px;
margin-top: 15px;
margin-left: 130px;
border-radius: 10px;
`
const UserAdminContainer = styled.div`
display: flex;
`
const UserLink = styled(Link)`
color: blue;
text-decoration: none;
margin-top: 22px;
margin-left: 5px;
`
