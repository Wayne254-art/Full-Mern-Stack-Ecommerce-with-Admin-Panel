

import axios from 'axios';

const uploadImage = async (image) => {
    const url = `http://localhost:8080/api/upload-product-image`;

    const formData = new FormData();
    formData.append("productImage", image);

    try {
        const { data } = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true, // If you're using cookies/sessions
        });

        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
