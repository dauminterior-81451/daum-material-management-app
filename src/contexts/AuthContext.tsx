import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { AdminUser } from '../types';

interface AuthValue {
  user: AdminUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const DEFAULT_USER: AdminUser = {
  id: 'admin-1',
  email: 'admin@dauminterior.com',
  name: '다움 관리자',
  role: 'admin',
};

const AuthContext = createContext<AuthValue | null>(null);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AdminUser | null>(null);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      login(email, password) {
        const ok = email === DEFAULT_USER.email && password === 'daum1234!';
        if (ok) setUser(DEFAULT_USER);
        return ok;
      },
      logout() {
        setUser(null);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthProvider 누락');
  return ctx;
};
