import { useState } from 'react';
import { loginUser, registerUser } from '../utils/api';
import Brand from './Brand';

export default function AuthForm({ mode, onClose, onSuccess, onSwitch }) {
  const isRegister = mode === 'register';
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });

  const updateField = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async event => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = isRegister
        ? await registerUser({ ...form, terms_conditions: true })
        : await loginUser({ email: form.email, password: form.password });
      onSuccess(response.data.user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return <div className="modal-backdrop" onMouseDown={onClose}>
    <section className="auth-modal" onMouseDown={event => event.stopPropagation()}>
      <button className="close-modal" onClick={onClose} aria-label="Back to home">x</button>
      <Brand />
      <h2>{isRegister ? 'Create your account' : 'Welcome back'}</h2>
      <p>{isRegister ? 'Register to save properties and contact owners directly.' : 'Login to choose how you want to get started.'}</p>
      <form onSubmit={submit}>
        {isRegister && <label>Full name<input required name="fullName" value={form.fullName} onChange={updateField} placeholder="Your full name" /></label>}
        <label>Email address<input required name="email" type="email" value={form.email} onChange={updateField} placeholder="you@example.com" /></label>
        {isRegister && <label>Mobile number<input required name="phone" type="tel" pattern="[0-9]{10}" value={form.phone} onChange={updateField} placeholder="10-digit mobile number" /></label>}
        <label>Password<input required name="password" type="password" minLength="6" value={form.password} onChange={updateField} placeholder="Minimum 6 characters" /></label>
        {isRegister && <label className="check"><input required type="checkbox" /> I agree to the Terms and Privacy Policy.</label>}
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="auth-submit" disabled={loading}>{loading ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}</button>
      </form>
      <button className="switch-auth" onClick={onSwitch}>
        {isRegister ? 'Already have an account? Login' : 'New to NoBroker? Register'}
      </button>
    </section>
  </div>;
}
