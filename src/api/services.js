import axios from 'axios';

export const uploadImage = async (file) => {
  console.log(file, 'file de services');
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'emnwqxan');
  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/daoxla1fg/auto/upload',
      formData
    );
    const uploadedData = response.data.url;
    return uploadedData;
  } catch (error) {
    console.error(error);
  }
};
