import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <GroupProvider>
      <HomePage />
    </GroupProvider>
  );
}

export default App;
