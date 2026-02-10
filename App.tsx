
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import CommitteePage from './pages/CommitteePage';
import LiveEventsPage from './pages/LiveEventsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/committee" element={<CommitteePage />} />
        <Route path="/Live Events" element={<LiveEventsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

