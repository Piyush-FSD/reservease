import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
// import { Button } from './Button';
import { PreviewImageUpload } from './PreviewImageUpload';
// import ImageUpload from './ImageUpload';
import { apiUrl } from '../urls'


export const AddMenuModal = ({ setItemData }) => {

    Modal.setAppElement('#root');
    // Modal - toggle open/close
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // inital values of menu fields are empty strings
    const [menuItemInput, setMenuItemInput] = useState({ itemTitle: "", itemDetails: "", itemPrice: "", email: "" });

    const [previewSource, setPreviewSource] = useState(null);

    // tracks inputs entered in menu fields
    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // once fields are inputted, values get stored in menuItemInput
        setMenuItemInput({ ...menuItemInput, [name]: value });
    };

    // add menu item form submit
    const handleAddMenu = async (event) => {
        event.preventDefault();

        // check if any of the following are missing. If so, return and stop here
        if (!previewSource || !menuItemInput.itemTitle || !menuItemInput.itemDetails || !menuItemInput.itemPrice) {
            toast("Missing fields!")
            return;
        }

        // data in local storage for the user who is logged in
        const storageData = JSON.parse(localStorage.getItem("userLoggedIn"));

        // data to send to backend (menu info & image)
        const payload = { ...menuItemInput, itemImage: previewSource, ...storageData }

        const response = await fetch(`${apiUrl}/menu/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        }
        )
        const data = await response.json();

        if (data.status === 201) {
            toast("Menu item added!");
            setItemData(data.data);
        }
        setMenuItemInput({ itemTitle: "", itemDetails: "", itemPrice: "" });
        // email: isAdminEmail.data.email 
    };

    return (
        <div>
            <AddItemBtn onClick={() => setModalIsOpen(true)}>Add New Menu Item</AddItemBtn>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <ModalHeader>Add to cart </ModalHeader>
                <form onSubmit={handleAddMenu}>
                    <PreviewImageUpload previewSource={previewSource} setPreviewSource={setPreviewSource} />
                    <InputsContainer>
                        <ItemNameInput
                            type="text"
                            placeholder="Item Name"
                            name="itemTitle"
                            onChange={handleInput}
                            value={menuItemInput.itemTitle}
                        />
                        <ItemInfoInput
                            type="text"
                            placeholder="Item Description"
                            name="itemDetails"
                            onChange={handleInput}
                            value={menuItemInput.itemDetails}
                        />
                        <ItemNameInput
                            type="text"
                            placeholder="Item Price"
                            name="itemPrice"
                            onChange={handleInput}
                            value={menuItemInput.itemPrice}
                        />
                        <AddBtn>Add to Menu</AddBtn>
                        <CloseModalBtn onClick={() => setModalIsOpen(false)}>Go Back</CloseModalBtn>
                    </InputsContainer>
                </form>
            </Modal>
        </div>
    )
};


const ItemNameInput = styled.input`
width: 400px;
margin: 15px;
height: 30px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`;

const ItemInfoInput = styled.input`
width: 400px;
margin: 15px;
margin-top: 8px;
height: 70px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
`;

const AddItemBtn = styled.button`
width: 130px;
height: 35px;
border-radius: 10px;
background: white;
margin-left: 50px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 10px;
margin-left: 90px;
`;

const AddBtn = styled.button`
height: 40px;
width: 150px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
margin: 15px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
`;


const CloseModalBtn = styled.button`
height: 40px;
width: 150px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
margin: 5px;
text-transform: uppercase;
letter-spacing: 2px;
font-size: 12px;
`;
const InputsContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const ModalHeader = styled.h2`
text-transform: uppercase;
letter-spacing: 2px;
font-size: 23px;
color: black;
`