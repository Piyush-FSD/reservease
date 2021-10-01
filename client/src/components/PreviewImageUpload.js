import React from 'react'

// show preview of image and 'choose file' button
export const PreviewImageUpload = ({ previewSource, setPreviewSource }) => {

    // show host preview of file when uploading
    const previewFile = (imgFile) => {
        const reader = new FileReader();
        //.readAsDataURL -> converts img to URL
        reader.readAsDataURL(imgFile);
        //  event is fired whether a request has completed (success or fail)
        reader.onloadend = () => {
            // reader.result -> returns file's contents
            setPreviewSource(reader.result)
        }
    };

    // onChange triggered when image is chosen for preview
    const handleImgFile = (event) => {
        const imgFile = event.target.files[0];
        previewFile(imgFile);
    };

    return (
        <div>
            <input
                type="file"
                name="headerImg"
                onChange={handleImgFile}
            >
            </input>

            {/* if the image is passed from ImageUpload component to PreviewImageUpload, then it will display image as preview */}
            {previewSource && (
                <img
                    src={previewSource}
                    alt="selectedImg"
                    style={{ height: '200px' }}
                />
            )}
        </div>
    )
}


