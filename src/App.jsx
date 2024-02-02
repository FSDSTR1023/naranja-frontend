import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GroupProvider } from './context/GroupContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';
import GroupPage from './pages/GroupPage';
import GroupForm from './components/GroupForm';
import LoginPage from './pages/LoginPage';

import RegisterPage from './pages/RegisterPage';

import VerifyEmailPage from './pages/VerifyEmailPage';
import NavBar from './components/NavBar';
import './App.css';
import { UserProvider } from './context/UserContext';
import VerifyEmail from './pages/VerifyEmail';
import { TaskProvider } from './context/TasksContext';

import { MessageProvider } from './context/MessagesContext';
import RecoverPassword from './pages/RecoverPassword';
// import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <UserProvider>
        <MessageProvider>
          <GroupProvider>
            <TaskProvider>
              <NavBar />
              <Routes>
                <Route
                  path='/'
                  element={<HomePage />}
                />
                <Route
                  path='/password-recovery'
                  element={<RecoverPassword />}
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
                  path='/groupboard/:groupId'
                  element={<GroupPage />}
                />
                <Route
                  path='/create-group'
                  element={<GroupForm />}
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
            </TaskProvider>
          </GroupProvider>
        </MessageProvider>
      </UserProvider>
    </Router>
  );
}

//UserContext
//GroupContext
//TasksContext
//MessagesContext

export default App;
