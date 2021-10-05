import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom'
import { AdminMenuHeader } from './Admin/AdminMenuHeader';
import { toast } from 'react-toastify';
import { OrderContext } from '../OrderProvider';

// menu the user sees after searching and choosing a business
export const UserMenu = (userLoginData) => {
    const [busInfo, setBusInfo] = useState();
    const [menuData, setMenuData] = useState();

    const { state, actions: { addOrder }, } = useContext(OrderContext);

    // state holding the param
    // const [adminId, setAdminId] = useState();
    const { userId } = useParams();

    // put state in session storage to have access in CartBar
    useEffect(() => {
        // setAdminId(userId);
        sessionStorage.setItem("adminData", userId);
    }, [userId]);

    // GET - fetch all menu's by id
    useEffect(() => {
        const getAdminInfoById = async () => {
            const response = await fetch(`/menu/${userId}`);
            const data = await response.json();

            setBusInfo(data.data);
            setMenuData(data.data.menu);
        }
        getAdminInfoById();
    }, [userId]);

    // onClick add button
    const handleAddToCart = (item) => {

        if (!item) return

        //add quantity key

        const itemWithQuantity = { ...item, quantity: 1 }

        addOrder(itemWithQuantity);



        // const cartInfoKeyName = "cartInfo";

        // let cartArray = sessionStorage.getItem(cartInfoKeyName);
        // if (!cartArray) {
        //     cartArray = [];
        // }
        // else {
        //     cartArray = JSON.parse(cartArray);
        // }
        // console.log(cartArray, ' cart arraty')

        // //Find the matching item in the cartArray
        // const itemMatch = cartArray.find((elem) => elem._id === item._id);

        // //What happens if we find it?
        // if (itemMatch) {
        //     // update item quantity locally
        //     itemMatch.quantity = itemMatch.quantity + 1

        //     //how do you know which index to replace?
        //     const itemIndex = cartArray.findIndex((elem) => elem._id === item._id);

        //     // replace the cart array with updated item (object)
        //     cartArray[itemIndex] = itemMatch;

        //     // replace existing session storage cartInfo with new.
        //     sessionStorage.setItem(cartInfoKeyName, JSON.stringify(cartArray));

        //     //toast -> Item Succesfully added - Name of the item
        //     toast(`${item.itemTitle} added to cart`);
        // } else {
        //     //Get existing cartArray
        //     //Add to that existing carArray
        //     cartArray.push({ ...item, quantity: 1 })
        //     //Set to session storage 
        //     sessionStorage.setItem(cartInfoKeyName, JSON.stringify(cartArray))
        //     //toast -> Item Succesfully added - Name of the item
        //     toast(`${item.itemTitle} added to cart`);
        // }
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
                            <div key={index}>
                                <MenuItemContainer key={index}>
                                    <MenuImg>
                                        <ItemImg src={item.itemImage} />
                                    </MenuImg>
                                    <MenuInfo>
                                        <MenuItemName>{item.itemTitle}</MenuItemName>
                                        <div>{item.itemDetails}</div>
                                        <div>{item.itemPrice}</div>
                                        {userLoginData &&
                                            <AddToCartBtn onClick={() => handleAddToCart(item)}>Add to Cart</AddToCartBtn>
                                        }
                                    </MenuInfo>
                                </MenuItemContainer>
                            </div>
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