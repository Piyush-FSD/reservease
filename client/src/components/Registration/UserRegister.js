import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { BsFillPersonFill } from "react-icons/bs"
import { MdEmail } from 'react-icons/md'
import { AiTwotoneLock } from 'react-icons/ai'

export const UserRegister = () => {
    const formHistory = useHistory();

    // empty strings which will be updated with user data
    const [userRegistration, setUserRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    // tracking user input value when typing
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)

        // updates userRegistration with name and value entered
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    // once user submits data, data will be sent as POST
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/register/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userRegistration),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 201) {
                    console.log(data);
                }
            });
        setUserRegistration({
            firstName: "",
            lastName: "",
            email: "",
            password: "",

        });
        formHistory.push("/");
    };

    return (
        <Container>
            <h3>Register! It's quick and easy.</h3>
            <UserAdminContainer>
                <h4>Register as User or</h4>
                <AdminLink to="/register/admin">Admin</AdminLink>
            </UserAdminContainer>
            <Form onSubmit={handleSubmit}>
                <BsFillPersonFill />
                <MdEmail />
                <AiTwotoneLock />
                <Input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={userRegistration.firstName}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={userRegistration.lastName}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    id="email"
                    value={userRegistration.email}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="password"
                    value={userRegistration.password}
                    onChange={handleInput}
                >
                </Input>
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