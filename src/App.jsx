import './App.css';
import HomePage from './pages/HomePage';
import { GroupProvider } from './context/GroupContext';

function App() {
  return (
    <GroupProvider>
      <HomePage />
    </GroupProvider>
  );
}

export default App;
