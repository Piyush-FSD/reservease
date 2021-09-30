import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { MdEmail } from 'react-icons/md';
import { AiTwotoneLock } from 'react-icons/ai';

export const UserLogin = ({ setUserLoginData, userLogin, setUserLogin }) => {
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
        const data = await response.json();

        // if fetch is successful, store data in userLoginData & in local storage. Then route homepage ('/')
        if (data.status === 200) {
            setUserLoginData(data);

            localStorage.setItem("userLoggedIn", JSON.stringify(data));
            formHistory.push("/");
            // window.location.reload();
        }

        // clear email and password input fields once submit button clicked
        setUserLogin({ email: "", password: "" })
    };

    return (
        <>
            <Container>
                <h3>Welcome to Order Way</h3>
                <UserAdminContainer>
                    <div to="/login/user">Sign In</div>
                </UserAdminContainer>
                <Form onSubmit={handleSubmit}>
                    <MdEmail />
                    <AiTwotoneLock />
                    <Input
                        type="email"
                        placeholder="📧 Email"
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
        </>
    )
};

const Container = styled.div`
margin-left: 500px; 
/* width: 100%; */
`;

const Form = styled.form`
width: 400px;
display: flex;
flex-direction: column;
justify-content: center;
margin-top: 10px;
`;

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
`;

const UserAdminContainer = styled.div`
display: flex;
`;