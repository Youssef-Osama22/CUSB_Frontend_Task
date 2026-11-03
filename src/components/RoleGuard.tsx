import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import type { Role } from '../types';

interface Props {
  /** The role(s) that are allowed to access the child routes */
  allow: Role | Role[];
}

/**
 * UX-only route guard.
 * - Not logged in  → redirect to /login, preserving the intended URL in location state.
 * - Wrong role     → redirect to /.
 * - Correct role   → render child routes via <Outlet />.
 *
 * The real protection is the backend (403 responses). This guard is purely
 * to give the user a good experience.
 */
export default function RoleGuard({ allow }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  // Not logged in → send to /login and remember where they wanted to go
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const allowed = Array.isArray(allow) ? allow : [allow];

  // Logged in but wrong role → send home
  if (!allowed.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

