// once image is passed from upload, it will be stored in Cloudinary database
// upload image for header and menu item 
// images stored in Cloudinary
export const uploadImage = async (base64EncodedImage) => {
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
};