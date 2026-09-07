import { lazy, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { Skeleton } from './components/ui/Skeleton';
import { AdminGate } from './components/AdminGate';

// El panel de administración no debe viajar en el bundle del comprador.
const AdminDashboard = lazy(() =>
  import('./components/AdminDashboard').then((m) => ({ default: m.AdminDashboard })),
);

function AdminRoute() {
  const navigate = useNavigate();
  return (
    <AdminGate>
      <Suspense fallback={<div className="p-12"><Skeleton className="h-screen" /></div>}>
        <AdminDashboard onLogout={() => navigate('/')} />
      </Suspense>
    </AdminGate>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/producto/:slug" element={<ProductPage />} />
      </Route>
      <Route path="/admin" element={<AdminRoute />} />
    </Routes>
  );
}
