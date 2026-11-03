import { Outlet, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleGuard from './components/RoleGuard';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailsPage from './pages/EventDetailsPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import HrDashboardPage from './pages/hr/HrDashboardPage';
import HrApplicationsPage from './pages/hr/HrApplicationsPage';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin-only routes */}
        <Route element={<RoleGuard allow="admin" />}>
          <Route path="/admin" element={<AdminEventsPage />} />
        </Route>

        {/* HR-only routes */}
        <Route element={<RoleGuard allow="hr" />}>
          <Route path="/hr" element={<HrDashboardPage />} />
          <Route path="/hr/applications" element={<HrApplicationsPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
