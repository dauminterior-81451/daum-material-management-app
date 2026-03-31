import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AppShell() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-stone-100 text-stone-800">
      <header className="border-b border-stone-200 bg-white/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/sites" className="text-lg font-semibold tracking-tight text-stone-900">
            다움인테리어 견적 플랫폼
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-stone-500">{user?.name}</span>
            <button className="rounded-md border border-stone-300 px-3 py-1.5" onClick={logout}>
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
