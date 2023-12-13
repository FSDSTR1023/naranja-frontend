import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GroupProvider } from './context/GroupContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';
import GroupFormPage from './pages/GroupFormPage';
import LoginPage from './pages/LoginPage';


import RegisterPage from './pages/RegisterPage';
import TaskFormPage from './pages/TaskFormPage';
import TaskPage from './pages/TaskPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import NavBar from './components/NavBar';
import './App.css';
import { UserProvider } from './context/UserContext';
import VerifyEmail from './pages/VerifyEmail';
// import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <UserProvider>
        <GroupProvider>
          <NavBar />
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/profile-page'
              element={<ProfilePage />}
            />
            <Route
              path='/chat-page'
              element={<ChatPage />}
            />
            <Route
              path='/group-form-page'
              element={<GroupFormPage />}
            />
            <Route
              path='/login-page'
              element={<LoginPage />}
            />
            <Route
              path='/register-page'
              element={<RegisterPage />}
            />
            <Route
              path='/task-form-page'
              element={<TaskFormPage />}
            />

            <Route
              path='/task-page'
              element={<TaskPage />}
            />

            <Route
              path='/verify-email-page'
              element={<VerifyEmailPage />}
            />

            <Route
              path='/verify/:token'
              element={<VerifyEmail />}
            />
            <Route
              path='*'
              element={<NotFound />}></Route>
          </Routes>
        </GroupProvider>
      </UserProvider>
    </Router>
  );
}

//UserContext
//GroupContext
//TasksContext
//MessagesContext

export default App;
