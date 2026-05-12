import React from 'react';
import { Link } from 'react-router-dom';
import useFirestoreCRUD from '../../hooks/useFirestoreCRUD';

export default function SiteList() {
  const { items: sites } = useFirestoreCRUD('sites');
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">현장 목록</h1>
      <Link to="/site/new" className="btn-primary mb-4 inline-block">
        현장 추가
      </Link>
      <ul>
        {sites.map(s => (
          <li key={s.id} className="mb-2">
            <Link to={`/site/${s.id}/users`} className="text-blue-600 underline">
              {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
