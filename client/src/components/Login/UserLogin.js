import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { MdEmail } from 'react-icons/md';
import { AiTwotoneLock } from 'react-icons/ai';
import { apiUrl } from '../../urls';

export const UserLogin = ({ userLoginData, setUserLoginData, userLogin, setUserLogin }) => {
    const formHistory = useHistory();

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log(name, 'name name name ');
        console.log(value, 'val val val')

        setUserLogin({ ...userLogin, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${apiUrl}/login`, {
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
                    <WelcomeMsg>Welcome to Order Way.</WelcomeMsg>
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
                        <SubmitBtn><SignInText>Sign In</SignInText></SubmitBtn>
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
background: black;
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
border: 3px solid #f6b210;

::placeholder {
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
}
`;

const SubmitBtn = styled.button`
width: 170px;
height: 45px;
border-radius: 10px;
background: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 15px;
color: black;
border: 3px solid #f6b210;
`;

const WelcomeMsg = styled.h3`
font-weight: 500;
color: white;
-webkit-text-decoration: none;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 25px;
`

const SignInMsg = styled.span`
font-weight: 500;
color: white;
-webkit-text-decoration: none;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 22px;
`

const SignInText = styled.div`
font-weight: 700;
:hover {
    color: #f6b210;
}
`