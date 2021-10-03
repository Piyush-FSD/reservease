import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import { AdminMenuHeader } from './Admin/AdminMenuHeader';
import { CartBar } from './CartBar';
import { toast } from 'react-toastify';

// menu the user sees after searching and choosing a business
export const UserMenu = () => {
    const [busInfo, setBusInfo] = useState();
    const [menuData, setMenuData] = useState()
    const { userId } = useParams();

    useEffect(() => {
        const getAdminInfoById = async () => {
            const response = await fetch(`/menu/${userId}`);
            const data = await response.json();

            setBusInfo(data.data)
            setMenuData(data.data.menu)
        }
        getAdminInfoById();
    }, []);

    // 1) get menu id of item that was clicked on //
    // 2) keep track of how many of each item is being added. default = 1
    // 3) use array to keep track of all items // 
    // 4) each item being pushed in the array is an object
    // 5) item in array -> item name, details, price, id
    // OBJECT --> {menuId: menuId, name: itemName, details: itemDetails, price: itemPrice, quantity: itemQuantity}
    // 6) push into an array
    // 7) put array into session storage
    // 8) if session storage already exists, take exisiting item and increment
    // 9) console.log and do the flow 

    const handleAddToCart = (item) => {

        const cartInfoKeyName = "cartInfo";

        let cartArray = sessionStorage.getItem(cartInfoKeyName);

        if (!cartArray) {
            cartArray = [];
        }
        else {
            cartArray = JSON.parse(cartArray);
        }

        //Find the matching item in the cartArray
        const itemMatch = cartArray.find((elem) => elem._id === item._id);

        //What happens if we find it?
        if (itemMatch) {
            // update item quantity locally
            itemMatch.quantity = itemMatch.quantity + 1

            //how do you know which index to replace?
            const itemIndex = cartArray.findIndex((elem) => elem._id === item._id);

            // replace the cart array with updated item (object)
            cartArray[itemIndex] = itemMatch;

            // replace existing session storage cartInfo with new.
            sessionStorage.setItem(cartInfoKeyName, JSON.stringify(cartArray));

            //toast -> Item Succesfully added - Name of the item
            toast(`${item.itemTitle} added to cart`);
        } else {
            //Get existing cartArray
            //Add to that existing carArray
            cartArray.push({ ...item, quantity: 1 })
            //Set to session storage 
            sessionStorage.setItem(cartInfoKeyName, JSON.stringify(cartArray))
            //toast -> Item Succesfully added - Name of the item
            toast(`${item.itemTitle} added to cart`);
        }
    };

    return (
        <>
            <AdminMenuHeader />
            <AddressInfoContainer>
                <AddressWebContainer>
                    <div>
                        {busInfo && busInfo.address},
                        {busInfo && busInfo.city},
                        {busInfo && busInfo.postalCode}
                        <MoreInfoLink to="#">More Info</MoreInfoLink>
                    </div>
                    <BusName>
                        {busInfo && busInfo.busName}
                    </BusName>
                    <WebsiteContainer>
                        {busInfo && busInfo.website}
                    </WebsiteContainer>
                </AddressWebContainer>
            </AddressInfoContainer>
            <MenuTextContainer>
                <h2>Menu</h2>
                <MenuItemWrapper>
                    {menuData && menuData.map((item, index) => {
                        return (
                            <>
                                <MenuItemContainer key={index}>
                                    <MenuImg>
                                        <ItemImg src={item.itemImage} />
                                    </MenuImg>
                                    <MenuInfo>
                                        <MenuItemName>{item.itemTitle}</MenuItemName>
                                        <div>{item.itemDetails}</div>
                                        <div>{item.itemPrice}</div>
                                        <AddToCartBtn onClick={() => handleAddToCart(item)}>Add to Cart</AddToCartBtn>
                                    </MenuInfo>
                                </MenuItemContainer>
                            </>
                        )
                    })}
                </MenuItemWrapper>
            </MenuTextContainer>
        </>
    )
};

const AddressInfoContainer = styled.div`
margin-top: 10px;
height: 100px;
width: 36%;
border: 2px solid orange;
margin-left: 10px;
/* display: flex; */
`

const AddressWebContainer = styled.span`
/* display: flex; */
/* flex-direction: column; */
`

const MenuTextContainer = styled.div`
margin-left: 10px;
`

const MoreInfoLink = styled(Link)`
font-size: 13px;
text-decoration: none;
margin-left: 10px;
margin-top: 5px;
`

const MenuItemContainer = styled.div`
display: flex;
/* flex-direction: row; */
border: 1px solid red;
width: 30%;
border-radius: 20px;
`;

const WebsiteContainer = styled.div`
margin-top: 15px;
`;

const BusName = styled.div`
margin-top: 10px;
color: green;
`

const ItemImg = styled.img`
height: 150px;
`;

const MenuInfo = styled.div`
width: 50%;
display: flex;
flex-direction: column;
text-align: center;
justify-content: space-around;
box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);

`;

const MenuImg = styled.div`
width: 50%;
`;

const MenuItemName = styled.div`
font-weight: bold;
`;

const MenuItemWrapper = styled.div`
display: flex;
width: 80%;
`;

const AddToCartBtn = styled.button`
width: 80px;
height: 30px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
`;