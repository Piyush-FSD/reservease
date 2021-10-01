import React, { useState } from 'react'
import { PreviewImageUpload } from './PreviewImageUpload';
import { uploadImage } from '../helpers/uploadImage';

export const ImageUpload = () => {
    const [previewSource, setPreviewSource] = useState(null);

    // when the upload image button is clicked, it will check if previewSouce is falsy which it is since it is initally set to null.
    // if an image is selected, then it will passed to uploadImage 
    const handleSubmitImg = (event) => {
        event.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    };

    return (
        <>
            <button onClick={handleSubmitImg}>Upload Image</button>
            <PreviewImageUpload previewSource={previewSource} setPreviewSource={setPreviewSource} />
        </>
    )
};

