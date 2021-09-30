import React from 'react'

// show preview of image and 'choose file' button
export const PreviewImageUpload = ({ previewSource, setPreviewSource }) => {

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
    return (
        <div>
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

        </div>
    )
}


