import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';

const ProfilePage = () => {
  const { register, handleSubmit } = useForm();
  const { uploadProfilePicture, user } = useUser();
  // >>>>>>> Crear la pagina para poder editar el avatar del usuario y el isOnline...

  const onSubmit = handleSubmit((data) => {
    uploadProfilePicture(data);
    console.log(data);
  });

  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <div>
          <p>{user._id}</p>
          <p>{user.name}</p>
          <p>{user.surname}</p>
          <p>{user.email}</p>
          <p>{user.isOnline}</p>
          <img
            className='w-20 h-20 rounded-full'
            src={user.avatar}
            alt='avatar'
          />
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <input
          type='file'
          {...register('file')}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default ProfilePage;
