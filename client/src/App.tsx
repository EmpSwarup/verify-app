import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SuccessPage from './pages/Success';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
