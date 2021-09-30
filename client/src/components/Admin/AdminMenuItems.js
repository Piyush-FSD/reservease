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
                        {item.itemImage && <img alt="itemImg" src={item.itemImage}></img>}

                    </MenuItemContainer>
                </Container>
            )}
        </Wrapper>
    )
};

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 80%;
margin: 0 auto;
`

const MenuItemContainer = styled.div`
width: 300px;
height: 150px;
border: 1px solid rgb(221,221,221);
border-radius: 12px;
padding: 10px;
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center; 
justify-content: space-around;
margin: 5px;
`;

const ItemTitle = styled.span`
font-size: 18px;
font-weight: 600;
`;

const ItemDetails = styled.span`

`;

const ItemPrice = styled.span`
color: rgb(113,113,113);

`

const Container = styled.div`
display: flex;
flex-direction: row;
`
