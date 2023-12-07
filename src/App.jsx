import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GroupProvider } from './context/GroupContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';
import GroupFormPage from './pages/GroupFormPage';
import LoginPage from './pages/LoginPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import RegisterPage from './pages/RegisterPage';
import TaskFormPage from './pages/TaskFormPage';
import TasksPage from './pages/TasksPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <GroupProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
          <Route path="/chat-page" element={<ChatPage />} />
          <Route path="/group-form-page" element={<GroupFormPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/register-page" element={<RegisterPage />} />
          <Route path="/task-form-page" element={<TaskFormPage />} />
          <Route path="/tasks-page" element={<TasksPage />} />
          <Route path="/verify-email-page" element={<VerifyEmailPage />} />
          <Route path="/recover-password-page" element={<RecoverPasswordPage />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </GroupProvider>
    </Router>
  );
}

//UserContext
//GroupContext
//TasksContext
//MessagesContext

export default App;
