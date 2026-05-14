import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (isAuthenticated) {
    window.location.href = '/';
    return null;
  }
  
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    const result = login(form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page" id="login-page">
      <div className="auth-split">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <span className="auth-visual-icon">📖</span>
            <h2>Welcome Back<br />to BookNest</h2>
            <p>"A reader lives a thousand lives before he dies. The man who never reads lives only one."</p>
            <span className="auth-visual-author">— George R.R. Martin</span>
          </div>
          <div className="auth-visual-glow"></div>
        </div>

        <div className="auth-form-side">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Welcome back! Login to continue reading</p>

            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" id="login-submit">
              Login
            </button>

            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
