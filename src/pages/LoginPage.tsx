import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../api/apiSlice';
import type { Role } from '../types';

const ACCOUNTS: { role: Role; label: string }[] = [
  { role: 'member', label: 'Log in as Member' },
  { role: 'hr',     label: 'Log in as HR' },
  { role: 'admin',  label: 'Log in as Admin' },
];

export default function LoginPage() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  // RoleGuard passes the originally-requested location via router state
  const location = useLocation();
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/';

  const handleLogin = async (role: Role) => {
    await login(role).unwrap();
    // Send the user back to where they came from (or home)
    navigate(from, { replace: true });
  };

  return (
    <section className="mx-auto max-w-sm text-center">
      <h1 className="mb-2 text-2xl font-bold">Log in</h1>
      <p className="mb-6 text-sm text-gray-600">Demo accounts, no password needed.</p>
      <div className="flex flex-col gap-3">
        {ACCOUNTS.map(({ role, label }) => (
          <button
            key={role}
            disabled={isLoading}
            onClick={() => handleLogin(role)}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
