import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFirestoreCRUD from '../../hooks/useFirestoreCRUD';

export default function SiteForm() {
  const navigate = useNavigate();
  const { addItem } = useFirestoreCRUD('sites');
  const [name, setName] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = await addItem({ name, roles: { admins: [], staffs: [], clients: [] } });
    navigate(`/site/${docRef.id}/users`);
  };
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">새 현장 추가</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="현장 이름"
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="btn-primary">
          저장
        </button>
      </form>
    </div>
  );
}
