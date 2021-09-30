import React, { useState } from 'react'

const ImageUpload = () => {

    const [previewSource, setPreviewSource] = useState();

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

    return (
        <>
            <button onClick={handleSubmitImg}>Upload Image</button>
            <input
                type="file"
                name="headerImg"
                onChange={handleImgFile}
            >
            </input>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="selectedImg"
                    style={{ height: '200px' }}
                />
            )}
        </>
    )
}

export default ImageUpload
