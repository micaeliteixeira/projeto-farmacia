import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Medications from './pages/Medications';
import './App.css';
import CreateMedications from './pages/CreateMedications';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="/create" element={<CreateMedications />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
