import axios from 'axios';

export const uploadImage = async (file) => {
  console.log(file, 'file de services');
  const formData = new FormData();
  formData.append('image', file);
  formData.append('upload_preset', 'emnwqxan');
  axios
    .post('https://api.cloudinary.com/v1_1/daoxla1fg/image/upload', formData)
    .then((response) => {
      const uplodedData = response.data.url;
      return uplodedData;
    });
};
