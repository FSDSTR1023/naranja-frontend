import { Link } from 'react-router-dom';

const VerifyEmailPage = () => {
  return (
    <div className='bg-gradient-to-b from-yellow-100 via-blue-300 to-blue-700 h-full'>
      <div className=' flex flex-col justify-center max-w-[60%] mx-auto pt-40 '>
        <h1 className='text-3xl text-orange-500 font-bold mb-4'>Busca en tu bandeja de entrada el correo electrónico de verificación de TaskTalk y haz click en el enlace que contiene para verificar tu cuenta.</h1>
        <Link to='/login-page' className='text-blue-800 pt-4 font-bold hover:underline'>Haz click aqui para ir al inicio de sesión.</Link>
      </div>
    </div>

  );
};

export default VerifyEmailPage;
