import AvatarHandler from './AvatarHandler';
import PasswordUpdate from './PasswordUpdate';
import UserStatusHandler from './UserStatusHandler';
import { useUser } from '../context/UserContext';




const Profile = () => {
    const { user } = useUser();

    return (
        <div className='col-span-3 bg-gray-200 flex flex-col px-10 justify-start'>
            <h1 className=' text-center text-2xl font-bold mt-6'>Perfil</h1>
            <h3 className=''>
                {user?.name} {user?.surname}
            </h3>
            <AvatarHandler />
            <PasswordUpdate />
            <UserStatusHandler />
        </div>
    );
};

export default Profile;