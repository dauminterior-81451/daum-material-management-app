import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

type Role = 'admin' | 'staff' | 'client' | null;
const AuthContext = createContext<{ role: Role }>({ role: null });
export function useAuth() { return useContext(AuthContext); }
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  useEffect(() => {
    return onAuthStateChanged(auth, async user => {
      if (user) {
        const snap = await getDoc(doc(db, 'users', user.uid));
        setRole(snap.data()?.role || null);
      } else setRole(null);
    });
  }, []);
  return <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>;
}
