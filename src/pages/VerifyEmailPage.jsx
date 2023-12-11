import { Link } from 'react-router-dom';
const VerifyEmailPage = () => {
  return (
    <div>
      Verifica tu correo electronico para activar tu cuenta{' '}
      <Link to='/login-page'>
        <span className='text-indigo-500'>Go to Login</span>
      </Link>
    </div>
  );
};

export default VerifyEmailPage;
