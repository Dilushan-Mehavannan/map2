import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

type RoleType = 'tourist' | 'admin';

const Register = () => {
  const { register, error, loading } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<RoleType>('tourist');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const registered = await register({ name, email, password, role });
    if (registered) {
      setMessage('Successfully registered! Redirecting...');
      setTimeout(() => navigate(role === 'admin' ? '/admin' : '/tourist'), 500);
    } else {
      setMessage('Registration failed. Try again.');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p>Register as a {role === 'admin' ? 'Admin' : 'Tourist'}.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as RoleType)}>
              <option value="tourist">Tourist</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Register'}
          </button>

          {message && <p className="form-message">{message}</p>}
          {error && <p className="form-error">{error}</p>}

          <p className="auth-footer">
            Already registered? <Link to="/login">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
