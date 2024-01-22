import { Link } from 'react-router-dom';

const VerifyEmailPage = () => {
  return (
    <div className='flex flex-col justify-center max-w-[50%] mx-auto mt-40 '>
      <h1 className='text-2xl font-bold mb-4'>Busca en tu bandeja de entrada el correo electrónico de verificación de TaskTalk y haz click en el enlace que contiene para verificar tu cuenta.</h1>
      <Link to='/login-page' className='text-blue-700 font-bold underline'>Haz click aqui para ir al login</Link>
    </div>
  );
};

export default VerifyEmailPage;
