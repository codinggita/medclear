import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import UploadPage from './components/upload/UploadPage';
import ReportsPage from './components/reports/ReportsPage';
import InsightsPage from './components/insights/InsightsPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  return (
    <div className="relative">
      {currentPage === 'landing' && (
        <LandingPage onNavigateToLogin={() => setCurrentPage('login')} />
      )}
      {currentPage === 'login' && (
        <LoginPage 
          onNavigateBack={() => setCurrentPage('landing')} 
          onNavigateToDashboard={() => setCurrentPage('dashboard')}
        />
      )}
      {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} onNavigateToUpload={() => setCurrentPage('upload')} currentPage={currentPage} />}
      {currentPage === 'upload' && (
        <UploadPage 
          onNavigateToDashboard={() => setCurrentPage('dashboard')} 
          onNavigateToReports={() => setCurrentPage('reports')}
          onNavigateToInsights={() => setCurrentPage('insights')}
          currentPage={currentPage}
        />
      )}
      {currentPage === 'reports' && (
        <ReportsPage 
          onNavigateToDashboard={() => setCurrentPage('dashboard')}
          onNavigateToUpload={() => setCurrentPage('upload')}
          onNavigateToInsights={() => setCurrentPage('insights')}
          currentPage={currentPage}
        />
      )}
      {currentPage === 'insights' && (
        <InsightsPage 
          onNavigateToDashboard={() => setCurrentPage('dashboard')}
          onNavigateToUpload={() => setCurrentPage('upload')}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default App;