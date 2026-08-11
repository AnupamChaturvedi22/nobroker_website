import Brand from '../../components/Brand';

export default function AdminDashboard({ admin, onLogout }) {
  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard-header">
        <Brand />
        <button onClick={onLogout}>Sign out</button>
      </header>
      <section className="admin-dashboard-content">
        <p className="admin-login-eyebrow">ADMINISTRATION</p>
        <h1>Welcome, {admin.fullName}</h1>
        <p>Your administrator session is active. Management tools can be added here as the platform grows.</p>
      </section>
    </main>
  );
}
