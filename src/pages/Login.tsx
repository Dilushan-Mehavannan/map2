import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

type RoleType = 'tourist' | 'admin';

const Login = () => {
  const { login, error, loading } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<RoleType>('tourist');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password, role });
    if (success) {
      setMessage('Login successful');
      navigate(role === 'admin' ? '/admin' : '/tourist');
    } else {
      setMessage('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Sign in to your {role === 'admin' ? 'Admin' : 'Tourist'} account.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as RoleType)}>
              <option value="tourist">Tourist</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Login'}
          </button>

          {message && <p className="form-message">{message}</p>}
          {error && <p className="form-error">{error}</p>}

          <p className="auth-footer">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
