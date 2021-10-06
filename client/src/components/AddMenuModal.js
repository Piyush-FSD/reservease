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
        const payload = { ...menuItemInput, image: previewSource, ...storageData }

        const response = await fetch(`${apiUrl}/menu/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
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
                style={{
                    overlay: {
                        backgroundColor: 'grey'
                    },
                    content: {
                        color: 'blue'
                    }
                }}
            >
                <h2>Add to cart</h2>
                <form onSubmit={handleAddMenu}>
                    <PreviewImageUpload previewSource={previewSource} setPreviewSource={setPreviewSource} />
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
                </form>
                <CloseModalBtn onClick={() => setModalIsOpen(false)}>Go Back</CloseModalBtn>
            </Modal>
        </div>
    )
};


const ItemNameInput = styled.input`
width: 200px;
margin-left: 160px;
margin-top: 8px;
height: 20px;
`;

const ItemInfoInput = styled.input`
width: 200px;
margin-left: 160px;
margin-top: 8px;
height: 70px;
`;

const AddBtn = styled.button`
height: 40px;
width: 120px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
`

const AddItemBtn = styled.button`
height: 40px;
width: 140px;
margin: 50px 0 0 270px;  
margin-left: 550px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
`;

const CloseModalBtn = styled.button`
height: 40px;
width: 120px;
border-radius: 10px;
background: #4a7b9d;
color: #fff;
`
