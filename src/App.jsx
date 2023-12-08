import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GroupProvider } from './context/GroupContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';
import GroupFormPage from './pages/GroupFormPage';
import LoginPage from './pages/LoginPage';
import ChangePasswordForm from './pages/ChangePaswordForm';
import RegisterPage from './pages/RegisterPage';
import TaskFormPage from './pages/TaskFormPage';
import TaskPage from './pages/TaskPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import NavBar from './components/NavBar';
import './App.css';

const task = {
    id: "2312",
    title: "cualquiera",
    description: "la que sea",
    status: "siempre online",
    dateStart: "2022-01-01", // Use a valid date string here
    dateEnd: "2022-01-02", // And here
};

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
          <Route path="/task-page" element={<TaskPage />} />
          <Route path="/verify-email-page" element={<VerifyEmailPage />} />
          <Route path="/change-password-form" element={<ChangePasswordForm />} />
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
