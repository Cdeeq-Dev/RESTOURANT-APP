import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-3 mb-4">
        <Utensils className="w-10 h-10 text-indigo-400" />
        <h1 className="text-3xl font-bold tracking-tight">Hotel Restaurant Room Ordering System</h1>
      </div>
      <p className="text-slate-400 max-w-md text-center">
        Frontend environment initialized successfully with React, Vite, TypeScript, Tailwind CSS, React Router, Axios, and Lucide React.
      </p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
