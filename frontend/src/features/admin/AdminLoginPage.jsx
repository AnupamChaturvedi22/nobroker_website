import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Brand from '../../components/Brand';
import { loginAdmin } from '../../services/api';
import { setAuthenticatedUser } from '../auth/authSlice';

export default function AdminLoginPage({ onSuccess }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginAdmin({ email, password });
      dispatch(setAuthenticatedUser(response.data.user));
      onSuccess();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <div className="admin-login-brand"><Brand /></div>
        <p className="admin-login-eyebrow">RESTRICTED ACCESS</p>
        <h1 id="admin-login-title">Admin portal</h1>
        <p className="admin-login-copy">Sign in with your administrator account to manage the platform.</p>

        <form className="admin-login-form" onSubmit={submit}>
          <label>
            <span>Administrator email</span>
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              required
              type="password"
              minLength="6"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
            />
          </label>
          {error && <p className="admin-login-error" role="alert">{error}</p>}
          <button disabled={loading} type="submit">
            {loading ? 'Signing in…' : 'Sign in securely'}
          </button>
        </form>
        <p className="admin-login-note">This area is for authorised administrators only.</p>
      </section>
    </main>
  );
}
