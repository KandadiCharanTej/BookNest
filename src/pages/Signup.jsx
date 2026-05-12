import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }
    const result = signup(form.name, form.email, form.password);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  return (
    <main className="auth-page" id="signup-page">
      <div className="auth-split">
        <div className="auth-visual">
          <div className="auth-visual-content">
            <span className="auth-visual-icon">✨</span>
            <h2>Join the<br />BookNest Family</h2>
            <p>"The more that you read, the more things you will know. The more that you learn, the more places you'll go."</p>
            <span className="auth-visual-author">— Dr. Seuss</span>
          </div>
          <div className="auth-visual-glow"></div>
        </div>

        <div className="auth-form-side">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start your reading journey today</p>

            {error && <div className="auth-error">{error}</div>}

            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <input
                type="text"
                id="signup-name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                name="password"
                className="form-input"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
              <input
                type="password"
                id="signup-confirm"
                name="confirm"
                className="form-input"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary auth-submit-btn" id="signup-submit">
              Create Account
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
