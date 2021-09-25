import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export const UserRegister = () => {

    return (
        <Container>
            <h3>Register! It's quick and easy.</h3>
            <UserAdminContainer>
                <h4>Regsiter as User or</h4>
                <AdminLink to="/register/admin">Admin</AdminLink>
            </UserAdminContainer>
            <Form>
                <Input placeholder="First Name"></Input>
                <Input placeholder="Last Name"></Input>
                <Input placeholder="Email"></Input>
                <Input placeholder="Password"></Input>
                <Input placeholder="Confirm Password"></Input>
                <SubmitBtn>Register as User</SubmitBtn>
            </Form>
        </Container>
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
const AdminLink = styled(Link)`
color: blue;
text-decoration: none;
margin-top: 22px;
margin-left: 5px;
`