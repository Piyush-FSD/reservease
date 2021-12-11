import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import { FaBriefcase } from 'react-icons/fa'
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from 'react-icons/md';
import { AiTwotoneLock } from 'react-icons/ai';
import { MdWeb } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import { AiTwotonePhone } from 'react-icons/ai'
import { apiUrl } from '../../urls';
import { toast } from 'react-toastify';

export const AdminRegister = () => {
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
        city: "",
        phone: "",
        website: ""
    });

    // tracking user input value when typing
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // updates userRegistration with name and value entered
        setAdminRegistration({ ...adminRegistration, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`${apiUrl}/register/admin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminRegistration)
        })
        const data = await response.json();
        if (data.status === 200) {
            setAdminRegistration({
                busName: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                address: "",
                postalCode: "",
                province: "",
                city: "",
                phone: "",
                website: ""
            });
            formHistory.push("/");
            toast("Successfully registered as a host!")
        }
    };

    return (
        <Wrapper>
            <Container>
                <RegisterMsg>Register! It's quick and easy.</RegisterMsg>
                <Splitter>
                    <AdminOr>Register as Admin or</AdminOr>
                    <UserLink to="/register/user">User</UserLink>
                </Splitter>
                <Form onSubmit={handleSubmit}>
                    <FaBriefcase />
                    <Input
                        type="text"
                        placeholder="Business Name"
                        name="busName"
                        value={adminRegistration.busName}
                        onChange={handleInput}
                    >
                    </Input>
                    <MdWeb />
                    <Input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={adminRegistration.website}
                        onChange={handleInput}
                    >
                    </Input>
                    <BsFillPersonFill />
                    <Input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={adminRegistration.firstName}
                        onChange={handleInput}
                    >
                    </Input>
                    <BsFillPersonFill />
                    <Input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={adminRegistration.lastName}
                        onChange={handleInput}
                    >
                    </Input>
                    <MdEmail />
                    <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={adminRegistration.email}
                        onChange={handleInput}
                    >
                    </Input>
                    <AiTwotoneLock />
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={adminRegistration.password}
                        onChange={handleInput}
                    ></Input>
                    <FaAddressCard />
                    <Input
                        placeholder="Address"
                        type="text"
                        name="address"
                        value={adminRegistration.address}
                        onChange={handleInput}
                    >
                    </Input>
                    <FaAddressCard />
                    <SplitInputContainer>
                        <SplitInput
                            placeholder="City"
                            type="text"
                            name="city"
                            value={adminRegistration.city}
                            onChange={handleInput}
                        >
                        </SplitInput>
                        <FaAddressCard />
                        <SplitInput
                            placeholder="Province"
                            type="text"
                            name="province"
                            value={adminRegistration.province}
                            onChange={handleInput}
                        >
                        </SplitInput>
                    </SplitInputContainer>
                    <FaAddressCard />
                    <SplitInputContainer>
                        <SplitInput
                            placeholder="Postal Code"
                            type="text"
                            name="postalCode"
                            value={adminRegistration.postalCode}
                            onChange={handleInput}
                        >
                        </SplitInput>
                        <AiTwotonePhone />
                        <SplitInput
                            placeholder="Phone"
                            type="tel"
                            name="phone"
                            value={adminRegistration.phone}
                            onChange={handleInput}
                        >
                        </SplitInput>
                    </SplitInputContainer>
                    <SubmitBtn>Register as Admin</SubmitBtn>
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

const SplitInputContainer = styled.div`
display: flex;
justify-content: space-between;
`;

const SplitInput = styled.input`
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

const UserLink = styled(Link)`
font-weight: 500;
color: white;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 22px;
`

const RegisterMsg = styled.h3`
font-weight: 500;
color: white;
-webkit-text-decoration: none;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 23px;
`

const AdminOr = styled.span`
font-weight: 500;
color: white;
text-decoration: none;
margin-left: 15px;
padding: 0 35px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 20px;
`

const Splitter = styled.div`
margin-top: 20px ;
`