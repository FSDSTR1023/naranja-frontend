import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='flex flex-col justify-center items-center w-full h-full gap-2'>
        <h1 className='text-orange-400 text-9xl'>404 </h1>
        <h2 className='text-4xl w-60 justify-end text-end'>Not Found</h2>
        <p className='text-2xl mb-10'>
          Looks like you are lost. The page you are looking for is no longer
          here.
        </p>
        <button
          onClick={() => navigate('/')}
          className='bg-orange-400 text-black cursor-pointer'>
          Home Page
        </button>
      </div>
    </>
  );
};

export default NavBar;
