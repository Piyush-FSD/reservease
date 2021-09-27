import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

export const UserLogin = ({ setUserLoginData, userLogin, setUserLogin }) => {
    const formHistory = useHistory();

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)

        setUserLogin({ ...userLogin, [name]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch("/login/user", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userLogin),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setUserLoginData(data)
                    formHistory.push("/")
                }
            });

        // clear email and password input fields once submit button clicked
        setUserLogin({ email: "", password: "" })

    };

    return (
        <>
            <Container>
                <h3>Welcome to Order Way</h3>
                <UserAdminContainer>
                    <h4>User Login or</h4>
                    <AdminLink to="/login/admin">Admin Login</AdminLink>
                </UserAdminContainer>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Email"
                        name="email"
                        id="email"
                        onChange={handleInput}
                        value={userLogin.email}
                    >
                    </Input>
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        id="password"
                        onChange={handleInput}
                        value={userLogin.password}
                    >
                    </Input>
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
const AdminLink = styled(Link)`
color: blue;
text-decoration: none;
margin-top: 22px;
margin-left: 5px;
`
