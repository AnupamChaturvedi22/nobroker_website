import AuthForm from '../components/AuthForm';

export default function LoginPage({ onClose, onSuccess, onRegister }) {
  return <AuthForm mode="login" onClose={onClose} onSuccess={onSuccess} onSwitch={onRegister} />;
}
