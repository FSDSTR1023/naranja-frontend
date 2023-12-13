//import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';

import Dropzone from 'react-dropzone';
import { PaperClipIcon } from '@heroicons/react/solid';

const ProfilePage = () => {
  // const { register, handleSubmit } = useForm();
  const { uploadProfilePicture, user } = useUser();
  // >>>>>>> Crear la pagina para poder editar el avatar del usuario y el isOnline...

  // const onSubmit = handleSubmit((data) => {
  //   uploadProfilePicture(data);
  //   console.log(data);
  // });

  return (
    <div className='flex flex-col justify-center items-center'>
      {/* <form onSubmit={onSubmit}>
        <input
          className=' appearance-none  rounded w-full py-2 px-4'
          placeholder=''
          type='file'
          {...register('file')}
        />
        <br />
        <button
          className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2'
          type='submit'>
          Submit
        </button>
      </form> */}
      <Dropzone
        acceptedFiles='.jpg, .png, .jpeg, .gif, .svg'
        onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps, open }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <PaperClipIcon
                className='h-6 w-6'
                onClick={open}
              />
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfilePage;
