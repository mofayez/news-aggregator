import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './app/components/Navbar';
import Login from './app/components/Login';
import Home from './app/pages/Home.tsx';
import Preferences from './app/pages/Preferences.tsx';
import Register from './app/components/Register.tsx';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preferences" element={<Preferences />} />
        </Routes>
      </div>
    </Router>
  );
}