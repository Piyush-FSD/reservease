import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';

export const AdminRegister = () => {
    // try {
    const formHistory = useHistory();

    // empty strings which will be updated with user data
    const [adminRegistration, setAdminRegistration] = useState({
        busName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        postalCode: "",
        province: "",
        country: "",
        phone: "",
        website: ""
    });

    // tracking user input value when typing
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)

        // updates userRegistration with name and value entered
        setAdminRegistration({ ...adminRegistration, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/register/admin", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminRegistration)
        })
        const data = await response.json();
        if (data.status === 200) {
            console.log(data)
        }
        setAdminRegistration({
            busName: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            postalCode: "",
            province: "",
            country: "",
            phone: "",
            website: ""
        });
        formHistory.push("/");
    }
    // } catch (err) {
    //     console.log(e, "Error")
    // }

    return (
        <Container>
            <h3>Register! It's quick and easy.</h3>
            <UserAdminContainer>
                <h4>Register as Admin or</h4>
                <UserLink to="/register/user">User</UserLink>
            </UserAdminContainer>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Business Name"
                    name="busName"
                    value={adminRegistration.busName}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    type="text"
                    placeholder="Website"
                    name="website"
                    value={adminRegistration.website}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={adminRegistration.firstName}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={adminRegistration.lastName}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={adminRegistration.email}
                    onChange={handleInput}
                >
                </Input>
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={adminRegistration.password}
                    onChange={handleInput}
                ></Input>
                <Input
                    placeholder="Address"
                    type="text"
                    name="address"
                    value={adminRegistration.address}
                    onChange={handleInput}
                >
                </Input>
                <PostalProvinceContainer>
                    <SplitInput
                        placeholder="Postal Code"
                        type="text"
                        name="postalCode"
                        value={adminRegistration.postalCode}
                        onChange={handleInput}
                    >
                    </SplitInput>
                    <SplitInput
                        placeholder="Province"
                        type="text"
                        name="province"
                        value={adminRegistration.province}
                        onChange={handleInput}
                    >
                    </SplitInput>
                </PostalProvinceContainer>
                <PostalProvinceContainer>
                    <SplitInput
                        placeholder="Country"
                        type="text"
                        name="country"
                        value={adminRegistration.country}
                        onChange={handleInput}
                    >
                    </SplitInput>
                    <SplitInput
                        placeholder="Phone"
                        type="tel"
                        name="phone"
                        value={adminRegistration.phone}
                        onChange={handleInput}
                    >
                    </SplitInput>
                </PostalProvinceContainer>
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

const SplitInput = styled.input`
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