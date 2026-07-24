import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import BrowsingPage from './pages/BrowsingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PropertyChoicePage from './pages/PropertyChoicePage';
import ListPropertyVerification from './pages/ListPropertyVerification';

function PublicRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();
  const authenticated = loggedInUser => { login(loggedInUser); navigate('/choices', { replace: true }); };
  if (user) return <Navigate to="/choices" replace />;
  return <><BrowsingPage onLogin={() => navigate('/login')} onRegister={() => navigate('/register')} />
    {location.pathname === '/login' && <LoginPage onClose={() => navigate('/')} onSuccess={authenticated} onRegister={() => navigate('/register')} />}
    {location.pathname === '/register' && <RegisterPage onClose={() => navigate('/')} onSuccess={authenticated} onLogin={() => navigate('/login')} />}
  </>;
}

function ChoiceRoute() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [listingVerification, setListingVerification] = useState(false);
  const [notice, setNotice] = useState('');
  if (!user) return <Navigate to="/" replace />;
  const notify = text => { setNotice(text); window.setTimeout(() => setNotice(''), 2600); };
  const choosePath = action => action === 'List' ? setListingVerification(true) : notify(`Opening ${action.toLowerCase()} home options.`);
  return <><PropertyChoicePage user={user} onChoice={choosePath} onLogout={() => { logout(); navigate('/'); }} />
    {listingVerification && <ListPropertyVerification user={user} onClose={() => setListingVerification(false)} onComplete={() => { setListingVerification(false); notify('Verification complete. Your property listing is ready to create.'); }} />}
    {notice && <div className="toast">{notice}</div>}
  </>;
}

export default function App() {
  return <Routes><Route path="/choices" element={<ChoiceRoute />} /><Route path="*" element={<PublicRoutes />} /></Routes>;
}
