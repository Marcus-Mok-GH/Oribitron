import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Keep or remove based on styling choices
import logo from './assets/images/logo.png'; // Import the logo

// Define simple components for routes
const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Orbitron!</h1>
      <p>The future of AI interaction.</p>
    </div>
  );
};

const LoginPage: React.FC = () => {
  return (
    <div>
      <h2>Login Page Placeholder</h2>
      <p>This is where the login form will go.</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header style={{ textAlign: 'center', padding: '1rem' }}>
          <img src={logo} alt="Orbitron Logo" style={{ height: '50px' }} />
        </header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* Add other navigation links here as needed */}
          </ul>
        </nav>

        <hr />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Define other routes here */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
