import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'

export const AdminRegister = () => {

    return (
        <Container>
            <h3>Register! It's quick and easy.</h3>                <UserAdminContainer>
                <h4>Regsiter as Admin or</h4>
                <UserLink to="/register/user">User</UserLink>
            </UserAdminContainer>
            <Form>
                <Input placeholder="Business Name"></Input>
                <Input placeholder="First Name"></Input>
                <Input placeholder="Last Name"></Input>
                <Input placeholder="Email"></Input>
                <Input placeholder="Password"></Input>
                <Input placeholder="Confirm Password"></Input>
                <Input placeholder="Address"></Input>
                <PostalProvinceContainer>
                    <PostalInput placeholder="Postal Code"></PostalInput>
                    <ProvinceInput placeholder="Province"></ProvinceInput>
                </PostalProvinceContainer>
                <Input placeholder="Country"></Input>
                <SubmitBtn>Register as Admin</SubmitBtn>
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

const PostalProvinceContainer = styled.div`
display: flex;
justify-content: space-between;
`;

const PostalInput = styled.input`
width: 190px;
height: 40px;
margin-top: 5px;
margin-bottom: 15px;
border-radius: 5px;
`;

const ProvinceInput = styled.input`
width: 190px;
height: 40px;
margin-top: 5px;
margin-bottom: 15px;
border-radius: 5px;
`;

const UserAdminContainer = styled.div`
display: flex;
`
const UserLink = styled(Link)`
color: blue;
text-decoration: none;
margin-top: 22px;
margin-left: 5px;
`