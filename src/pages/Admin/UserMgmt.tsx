import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function UserMgmt() {
  const { siteId } = useParams();
  const [roles, setRoles] = useState({ admins: [], staffs: [], clients: [] });
  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, 'sites', siteId!));
      setRoles((snap.data() as any).roles);
    }
    load();
  }, [siteId]);

  const updateRole = async () => {
    await setDoc(doc(db, 'sites', siteId!), { roles }, { merge: true });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">사용자 관리</h1>
      {(['admins', 'staffs', 'clients'] as const).map(key => (
        <div key={key} className="mb-4">
          <label className="block font-medium">{key}</label>
          <textarea
            value={roles[key].join(',')}
            onChange={e => setRoles({ ...roles, [key]: e.target.value.split(',') })}
            placeholder="uid1,uid2"
            className="border p-2 w-full"
          />
        </div>
      ))}
      <button onClick={updateRole} className="btn-primary">
        저장
      </button>
    </div>
}