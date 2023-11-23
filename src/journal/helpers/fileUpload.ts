
const CLOUD_URL = 'https://api.cloudinary.com/v1_1/deu9wf4pe/upload';

export const fileUpload = async (imageFile: File): Promise<string> => {

    if (!imageFile) throw new Error('No se envió ningún archivo para subir');

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', imageFile);


    try {
        const fetchResponse = await fetch(CLOUD_URL, {
            method: 'POST',
            body: formData
        });

        if (!fetchResponse.ok) throw new Error('Error al subir el archivo');

        const cloudResponse = await fetchResponse.json();

        return cloudResponse.secure_url;

    } catch (error: any) {
        throw new Error(error.message);
    }
};