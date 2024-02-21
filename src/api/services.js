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

export const sendNotification = async (data) => {
  const { name, surname, email, taskTitle, containerTitle, groupName } = data;

  const message = {
    text: `This ${taskTitle} from ${groupName} group in ${containerTitle}has been modificated by ${name} ${surname} with email ${email}`,
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  try {
    await axios.post(import.meta.env.VITE_SLACK_URL_WEBHOOK, message, config);
  } catch (error) {
    console.error(error);
  }
};
