import AvatarHandler from './AvatarHandler';
import PasswordUpdate from './PasswordUpdate';
import UserStatusHandler from './UserStatusHandler';
import { useUser } from '../context/UserContext';




const Profile = () => {
    const { user, logOutUser } = useUser();
    const handleClick = () => {
        console.log('handleClick LogOut');

        logOutUser();
    };
    return (
        <div className='col-span-3 bg-gray-200 flex flex-col justify-start'>
            <h1 className=' text-center text-2xl font-bold mt-6'>Perfil</h1>
            <h3 className=''>
                {user?.name} {user?.surname}
            </h3>
            <AvatarHandler />
            <PasswordUpdate />
            <UserStatusHandler />
            <div className='flex flex-col items-center justify-center'>
                <button
                    className='bg-red-600 mt-4 text-white font-bold py-2 px-4 rounded-md hover:bg-red-800'
                    onClick={handleClick}>
                    LogOut →
                </button>
            </div>
        </div>
    );
};

export default Profile;