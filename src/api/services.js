import axios from 'axios';

export const uploadImage = async (file) => {
  console.log(file, 'file de services');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'emnwqxan');
  try {
    const response = await axios.post(import.meta.env.VITE_COUDINARY, formData);
    const uploadedData = response.data.secure_url;
    return uploadedData;
  } catch (error) {
    console.error(error);
  }
};
