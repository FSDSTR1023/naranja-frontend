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
    text: `This ${taskTitle} from ${groupName} group in ${containerTitle} has been modificated by ${name} ${surname} with email ${email}`,
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(message),
  };

  try {
    const response = await fetch(
      import.meta.env.VITE_SLACK_URL_WEBHOOK,
      config
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendAssigneNotification = async (data) => {
  const {
    name,
    surname,
    email,
    taskTitle,
    containerTitle,
    groupName,
    assignedTo,
  } = data;

  const message = {
    text: `This ${taskTitle} from ${groupName} group in ${containerTitle} has been modificated by ${name} ${surname} with email ${email} and assigned to ${assignedTo}`,
  };

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(message),
  };

  try {
    const response = await fetch(
      import.meta.env.VITE_SLACK_URL_WEBHOOK,
      config
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
