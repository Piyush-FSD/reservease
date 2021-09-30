import React, { useState } from 'react'
import { PreviewImageUpload } from './PreviewImageUpload';
import { uploadImage } from '../helpers/uploadImage';

const ImageUpload = () => {

    const [previewSource, setPreviewSource] = useState();

    const handleSubmitImg = (event) => {
        event.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource)
    };

    return (
        <>
            <button onClick={handleSubmitImg}>Upload Image</button>
            <PreviewImageUpload previewSource={previewSource} setPreviewSource={setPreviewSource} />

        </>
    )
}

export default ImageUpload
