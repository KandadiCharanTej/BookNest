import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './Auth.css';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { t } = useLanguage();
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
    <main className="auth-page container">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <h1>{t.welcomeBack}</h1>
          <p>{t.loginSubtitle}</p>
        </div>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>{t.email}</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>{t.password}</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            {t.login}
          </button>
        </form>

        <div className="auth-footer">
          <p>{t.noAccount} <Link to="/signup">{t.createAccount}</Link></p>
        </div>
      </div>
    </main>
  );
}
