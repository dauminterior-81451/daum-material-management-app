import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SiteList from './pages/Admin/SiteList';
import SiteForm from './pages/Admin/SiteForm';
import UserMgmt from './pages/Admin/UserMgmt';
import SiteDetail from './pages/Staff/SiteDetail';
import SiteView from './pages/Client/SiteView';
import Sidebar from './components/Layout/Sidebar';
import { useAuth } from './contexts/AuthContext';
import { FurnitureDrawingSamplePage } from './features/furniture-drawing';

export default function App() {
  const { role } = useAuth();
  const location = useLocation();

  if (!role && location.pathname.startsWith('/furniture-drawing')) {
    return (
      <Routes>
        <Route path="/furniture-drawing" element={<FurnitureDrawingSamplePage />} />
      </Routes>
    );
  }

  if (!role) return <div>Loading...</div>;
  return (
    <div className="flex">
      {role !== 'client' && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/furniture-drawing" element={<FurnitureDrawingSamplePage />} />
          {role === 'admin' && (
            <>
              <Route path="/" element={<SiteList />} />
              <Route path="/site/new" element={<SiteForm />} />
              <Route path="/site/:siteId/users" element={<UserMgmt />} />
            </>
          )}
          {role !== 'admin' && (
            <Route path="*" element={<Navigate to="/site/1/work/demolition" replace />} />
          )}
          {role !== 'admin' && (
            <Route path="/site/:siteId/work/:workId" element={<SiteDetail />} />
          )}
          {role === 'client' && (
            <Route path="/site/:siteId/view" element={<SiteView />} />
          )}
        </Routes>
      </div>
    </div>
  );
}
