import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const AdminMenuItems = ({ itemData }) => {
    const [state, setstate] = useState()

    useEffect(() => {
        const getAllItems = async () => {
            const response = await fetch("/menu");
            const data = await response.json();
            setstate(data.data)
        }
        getAllItems();
    }, [itemData]);

    return (
        <Wrapper>
            {state && state.map((item) =>
                <Container>
                    <MenuItemContainer>
                        <ItemTitle>
                            {item.itemTitle}
                        </ItemTitle>
                        <ItemDetails>
                            {item.itemDetails}
                        </ItemDetails>
                        <ItemPrice>
                            {item.itemPrice}
                        </ItemPrice>
                    </MenuItemContainer>
                </Container>
            )}
        </Wrapper>
    )
};

const Wrapper = styled.div`
display: flex;
width: 33%auto;
`

const MenuItemContainer = styled.div`
width: 350px;
height: 150px;
border: 2px solid;
display: flex;
flex-direction: column;
/* justify-content: center; */
/* align-items: center; */
justify-content: space-around;
border-radius: 15px;
margin-bottom: 10px;
`;

const ItemTitle = styled.span`
font-size: 18px;
color: red;
float: right;
display: block;
right: 0;
`;

const ItemDetails = styled.span`
color: green;
`;

const ItemPrice = styled.span`
color: purple;
`

const Container = styled.div`
display: flex;
flex-direction: row;
`
