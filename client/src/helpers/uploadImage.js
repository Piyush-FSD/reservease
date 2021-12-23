import { apiUrl } from '../urls'

export const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    try {
        await fetch(`${apiUrl}/menu/addImg`, {
            method: 'POST',
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { 'Content-type': 'application/json' }
        });
    } catch (error) {
        console.log(error)
    }
};