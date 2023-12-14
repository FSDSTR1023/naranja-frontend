/* eslint-disable react/prop-types */
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { PaperClipIcon, PaperAirplaneIcon } from '@heroicons/react/solid';

const AvatarHandler = ({ user, uploadProfilePicture }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  console.log(user, '<-- user en AvatarHandler');

  const handleImage = () => {
    uploadProfilePicture(image);
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <>
      <div className='flex flex-col gap-2 justify-center items-center border-2 border-gray-300 p-4 rounded-lg'>
        <p>Cambia tu Avatar</p>
        <div className='flex justify-center w-full '>
          <img
            src={previewImage ? previewImage : user.avatar}
            alt='Avatar'
            className='w-12 h-12 rounded-full object-cover align-center m-1'
          />
        </div>

        <div className='flex flex-row gap-2 items-center'>
          <Dropzone
            acceptedFiles='.jpg, .png, .jpeg, .gif, .svg'
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setImage(acceptedFiles[0]);
              setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
            }}>
            {({ getRootProps, getInputProps, open }) => (
              <section>
                <div
                  {...getRootProps()}
                  className='flex gap-2'>
                  <input {...getInputProps()} />

                  <PaperClipIcon
                    className='h-6 w-6 cursor-pointer border-2 border-gray-300 p-1 rounded-md hover:border-gray-400'
                    onClick={open}
                  />
                </div>
              </section>
            )}
          </Dropzone>
          <PaperAirplaneIcon
            className='h-6 w-6 
      cursor-pointer border-2 border-gray-300 p-1 rounded-md hover:border-gray-400 rotate-90'
            onClick={handleImage}
          />
        </div>
      </div>
    </>
  );
};

export default AvatarHandler;
