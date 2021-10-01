import React from 'react'
import styled from 'styled-components'

export const Button = ({ text }) => {
    return (
        <StyledButton>{text}</StyledButton>
    )
};

const StyledButton = styled.button`
padding: 10px;
border-radius: 10px;
background-color: #ffa544;
`;
