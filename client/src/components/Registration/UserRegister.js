import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";
import { BsFillPersonFill } from "react-icons/bs"
import { MdEmail } from 'react-icons/md'
import { AiTwotoneLock } from 'react-icons/ai'
import { apiUrl } from '../../urls';
import { toast } from 'react-toastify';

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

        // updates userRegistration with name and value entered
        setUserRegistration({ ...userRegistration, [name]: value });
    };

    // once user submits data, data will be sent as POST
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${apiUrl}/register/user`, {
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
        toast("Registration successful")
    };

    return (
        <Wrapper>
            <Container>
                <RegisterMsg>Register! It's quick and easy.</RegisterMsg>
                <div>
                    <UserOr>Register as User or</UserOr>
                    <AdminLink to="/register/admin">Admin</AdminLink>
                </div>
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
                    <SubmitBtn><RegisterText>Register as User</RegisterText></SubmitBtn>
                </Form>
            </Container>
        </Wrapper>
    )
};

const Wrapper = styled.div`
text-align: center;
`

const Container = styled.div`
text-align: center;
margin: auto 0;
display: inline-block;
width: 40%;
background: black;;
margin-top: 30px;
padding: 3%;
border-radius: 5%;
border: 3px solid #f6b210;

@media screen and (max-width: 600px){
    width: 80%;

}
`;

const Form = styled.form`
width: 70%;
display: inline-block;
margin-top: 10px; 
`

const Input = styled.input`
width: 100%;
height: 40px;
margin-top: 5px;
margin-bottom: 15px;
border-radius: 5px;
background: white;
color: black;
border: 1px solid #c2c2c2; 
box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
padding-left: 10px;
border: 3px solid #f6b210;

::placeholder {
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
}
`;

const SubmitBtn = styled.button`
width: 200px;
height: 50px;
border-radius: 10px;
background: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
color: black;
border: 3px solid #f6b210;

`
const AdminLink = styled(Link)`
font-weight: 500;
color: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 22px;
`

const RegisterMsg = styled.h3`
font-weight: 500;
color: white;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 23px;
`

const UserOr = styled.span`
font-weight: 500;
color: white;
-webkit-text-decoration: none;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 20px;
`;

const RegisterText = styled.div`
font-weight: 700;
:hover {
    color: #f6b210;
}
`;