import AvatarHandler from './AvatarHandler';
import PasswordUpdate from './PasswordUpdate';
import UserStatusHandler from './UserStatusHandler';
import { useUser } from '../context/UserContext';




const Profile = () => {
    const { user } = useUser();

    return (
        <div className='col-span-3 bg-white flex flex-col justify-start pb-5 px-8 rounded-lg'>
            <h1 className='text-center text-2xl font-bold mt-6'>Perfil</h1>
            <h3 className=''>
                {user?.name} {user?.surname}
            </h3>
            <AvatarHandler />
            <span className="block w-full h-[1px] bg-customGray my-4"></span>
            <PasswordUpdate />
            <span className="block w-full h-[1px] bg-customGray my-4"></span>
            <UserStatusHandler />
        </div>
    );
};

export default Profile;