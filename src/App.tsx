import { Routes, Route, Navigate } from 'react-router-dom';
import SiteList from './pages/Admin/SiteList';
import SiteForm from './pages/Admin/SiteForm';
import UserMgmt from './pages/Admin/UserMgmt';
import SiteDetail from './pages/Staff/SiteDetail';
import SiteView from './pages/Client/SiteView';
import Sidebar from './components/Layout/Sidebar';
import { useAuth } from './contexts/AuthContext';

export default function App() {
  const { role } = useAuth();
  if (!role) return <div>Loading...</div>;
  return (
    <div className="flex">
      {role !== 'client' && <Sidebar />}
      <div className="flex-1">
        <Routes>
          {role === 'admin' && (
            <>
              <Route path="/" element={<SiteList />} />
              <Route path="/site/new" element={<SiteForm />} />
              <Route path="/site/:siteId/users" element={<UserMgmt />} />
            </>
          )}
          {role !== 'admin' && <Navigate to="/site/1/work/demolition" replace />}
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
