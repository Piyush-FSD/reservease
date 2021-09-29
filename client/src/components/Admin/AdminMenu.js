import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export const AdminMenu = () => {

    // img file
    const [fileInput, setFileInput] = useState('');
    // target specific img file
    const [selectedFile, setSelectedFile] = useState('');
    // string that represents entire img
    const [previewSource, setPreviewSource] = useState();

    // const [menuData, setMenuData] = useState();

    const handleImgFile = (event) => {
        const imgFile = event.target.files[0];
        previewFile(imgFile);
    };

    // show admin preview of file when uploading
    const previewFile = (imgFile) => {
        const reader = new FileReader();
        //.readAsDataURL -> converts img to URL
        reader.readAsDataURL(imgFile);
        //  event is fired when a request has completed (success or fail)
        reader.onloadend = () => {
            // reader.result -> returns file's contents
            setPreviewSource(reader.result)
        }
    };

    const handleSubmitImg = (event) => {
        event.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource)
    };

    // upload image for header and menu item 
    // images stored in Cloudinary
    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        try {
            await fetch('/menu/addImg', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-type': 'application/json' }
            });
        } catch (error) {
            console.log(error)
        }
    }

    const [menuItemInput, setMenuItemInput] = useState({ itemTitle: "", itemDetails: "", itemPrice: "" });

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)

        setMenuItemInput({ ...menuItemInput, [name]: value })
    };

    // data from add menu is stored here
    const [itemData, setItemData] = useState()

    // input form submit
    const handleAddMenu = async (event) => {
        event.preventDefault();

        const response = await fetch("/menu/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(menuItemInput)
        })
        const data = await response.json();
        if (data.status === 200) {
            setItemData(data)
            //if menu is successfuly uploaded
            //endpoint get all menu items
        }
        setMenuItemInput({ itemTitle: "", itemDetails: "", itemPrice: "" })
    };

    // fetch existing menu items
    useEffect(() => {
        //fetch all items

        //setState...
    }, [handleAddMenu])

    // Modal - toggle open/close
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <HeaderImgContainer>
                {/* Move this to a different component */}
                <form onSubmit={handleSubmitImg}>
                    <input
                        type="file"
                        name="headerImg"
                        onChange={handleImgFile}
                        value={fileInput}
                    >
                    </input>
                    <button type="submit">Upload Image</button>
                </form>
                {previewSource && (
                    <img
                        src={previewSource}
                        alt="selectedImg"
                        style={{ height: '200px' }}
                    />
                )}
            </HeaderImgContainer>
            <AddressInfoContainer>
                <Address>2465 Rue Maisonneuve E, Montreal, QC</Address>
                <div>
                    <MoreInfoLink to="#">More Info</MoreInfoLink>
                </div>
            </AddressInfoContainer>
            <MenuTextContainer>
                <h2>Menu</h2>
                <form onSubmit={handleAddMenu}>
                    <MenuImgInput
                        type="file"
                        name="headerImg"
                        onChange={handleImgFile}
                        value={fileInput}
                    >
                    </MenuImgInput>
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
                    <AddBtn>Add</AddBtn>
                </form>
            </MenuTextContainer>
            <MenuContainer>
                <MenuRowOne>
                    <ItemContainer>
                        <AddItemBtn onClick={() => setModalIsOpen(true)}>+</AddItemBtn>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={() => setModalIsOpen(false)}
                            style={{
                                overlay: {
                                    backgroundColor: 'grey'
                                },
                                content: {
                                    color: 'green'
                                }
                            }}
                        >
                            <h2>Add to cart</h2>
                            <button onClick={() => setModalIsOpen(false)}>X</button>
                        </Modal>
                    </ItemContainer>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                </MenuRowOne>
                <MenuRowTwo>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                </MenuRowTwo>
                <MenuRowThree>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                    <ItemContainer></ItemContainer>
                </MenuRowThree>
            </MenuContainer>
        </>
    )
};

const HeaderImgContainer = styled.div`
height: 235px;
width: 100%;
border: 2px solid red;
`;

const UploadImg = styled.h1`
display: flex;
justify-content: center;
`

const AddressInfoContainer = styled.div`
height: 30px;
width: 400px;
border: 2px solid orange;
margin-left: 10px;
display: flex;
`

const Address = styled.span`
color: blue;
`

const MenuTextContainer = styled.div`
margin-top: 10px;
margin-left: 10px;
`

const MenuContainer = styled.div`
width: 100%;
height: 500px;
border: 2px solid purple;
display: flex;
justify-content: space-around;
`

const MenuRowOne = styled.div`
width: 32%;
height: 100%;
border: 2px solid green;
`

const MenuRowTwo = styled.div`
width: 32%;
height: 100%;
border: 2px solid green;
`
const MenuRowThree = styled.div`
width: 32%;
height: 100%;
border: 2px solid green;
`

const ItemContainer = styled.div`
width: 94%;
height: 30%;
border: 2px solid blue;
display: flex;
flex-direction: column;
margin-left: 10px;
margin-top: 10px;
`

const MoreInfoLink = styled(Link)`
font-size: 13px;
text-decoration: none;
margin-left: 10px;
margin-top: 5px;
`

const ItemNameInput = styled.input`
width: 200px;
margin-left: 160px;
margin-top: 8px;
height: 20px;
`

const ItemInfoInput = styled.input`
width: 200px;
margin-left: 160px;
margin-top: 8px;
height: 70px;
`;

const AddBtn = styled.button`
width: 60px;
margin-left: 235px;
margin-top: 8px;
height: 20px;
`

const MenuImgInput = styled.input`
width: 176px;
`

const AddItemBtn = styled.button`
height: 40px;
width: 40px;
margin: 50px 0 0 270px; 
`

const Modall = styled.div`
overlay: 
`