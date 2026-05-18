import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    
    if (email && password) {
      const success = login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials! Please enter valid credentials.');
      }
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <div className="auth-page container">
      <div className="auth-card glass-card">
        <h2>Login</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}
