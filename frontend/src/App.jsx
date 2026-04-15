import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="relative">
      {showLogin ? <LoginPage /> : <LandingPage onNavigateToLogin={() => setShowLogin(true)} />}
    </div>
  );
}

export default App;