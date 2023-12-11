import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login-page'
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoutes;
