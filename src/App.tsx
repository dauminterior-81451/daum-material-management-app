import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import AppShell from './layout/AppShell';
import ClientEstimatePage from './pages/ClientEstimatePage';
import EstimateEditorPage from './pages/EstimateEditorPage';
import LoginPage from './pages/LoginPage';
import SiteDetailPage from './pages/SiteDetailPage';
import SiteListPage from './pages/SiteListPage';

function ProtectedLayout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <AppShell />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/client/estimate/:estimateId" element={<ClientEstimatePage />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="sites" element={<SiteListPage />} />
        <Route path="sites/:siteId" element={<SiteDetailPage />} />
        <Route path="sites/:siteId/estimates/new" element={<EstimateEditorPage />} />
        <Route path="sites/:siteId/estimates/:estimateId" element={<EstimateEditorPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/sites" replace />} />
    </Routes>
  );
}
