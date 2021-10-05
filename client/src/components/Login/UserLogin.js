import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { MdEmail } from 'react-icons/md';
import { AiTwotoneLock } from 'react-icons/ai';

export const UserLogin = ({ userLoginData, setUserLoginData, userLogin, setUserLogin }) => {
    const formHistory = useHistory();

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)

        setUserLogin({ ...userLogin, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin),
        })
        const result = await response.json();

        // if fetch is successful, store data in userLoginData & in local storage. Then route homepage ('/')
        if (result.status === 200) {
            setUserLoginData(result.data);

            localStorage.setItem("userLoggedIn", JSON.stringify(result.data));
            formHistory.push("/");
            // window.location.reload();
            // localStorage.setItem("userEmail", JSON.stringify(userLogin.email))
        }

        // clear email and password input fields once submit button clicked
        setUserLogin({ email: "", password: "" })
    };

    return (
        <>
            <Wrapper>
                <Container>
                    <WelcomeMsg>Welcome to Order Way</WelcomeMsg>
                    <div>
                        <SignInMsg to="/login/user">Sign In</SignInMsg>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <MdEmail />
                        <AiTwotoneLock />
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleInput}
                            value={userLogin.email}
                        >
                        </Input>
                        <Input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleInput}
                            value={userLogin.password}
                        >
                        </Input>
                        <SubmitBtn>Sign in</SubmitBtn>
                    </Form>
                </Container>
            </Wrapper>
        </>
    )
};

const Wrapper = styled.div`
text-align:center;
`;
const Container = styled.div`
text-align: center;
margin: auto 0;
display: inline-block;
width: 40%;
background: #faffd8;
margin-top: 30px;
padding: 3%;
border-radius: 5%;
border: 3px solid #54577c;
`;

const Form = styled.form`
width: 70%;
display: inline-block;
margin-top: 10px; 
`;

const Input = styled.input`
width: 100%;
height: 40px;
margin-top: 5px;
margin-bottom: 15px;
border-radius: 5px;
background: white;
border: 1px solid #c2c2c2; 
box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
padding-left: 10px;
color: black;
`;

const SubmitBtn = styled.button`
width: 170px;
height: 45px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
`;

const WelcomeMsg = styled.h3`
color:#54577c;
font-size: 1.6em;
font-weight:600;
`

const SignInMsg = styled.span`
color:#54577c;
font-size: 1.4em;
font-weight:500;
`
