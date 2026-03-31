import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@dauminterior.com');
  const [password, setPassword] = useState('daum1234!');
  const [error, setError] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!login(email, password)) {
      setError('로그인 정보가 올바르지 않습니다.');
      return;
    }
    nav('/sites');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Daum Interior</p>
        <h1 className="mt-2 text-2xl font-semibold text-stone-900">관리자 로그인</h1>
        <div className="mt-6 space-y-4">
          <label className="block text-sm">
            이메일
            <input className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="block text-sm">
            비밀번호
            <input type="password" className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-md bg-amber-700 px-4 py-2 font-medium text-white hover:bg-amber-800">로그인</button>
        </div>
      </form>
    </div>
  );
}
