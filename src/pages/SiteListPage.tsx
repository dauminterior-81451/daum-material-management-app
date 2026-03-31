import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../contexts/AppContext';
import { Site } from '../types';

const emptySite: Site = {
  id: '',
  name: '',
  createdAt: '',
  updatedAt: '',
  customer: { name: '', phone: '', email: '', address: '', memo: '' },
};

export default function SiteListPage() {
  const { sites, saveSite, removeSite } = useAppData();
  const [editing, setEditing] = useState<Site>(emptySite);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSite(editing);
    setEditing(emptySite);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">현장 목록</h2>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-sm">{sites.length}개</span>
        </div>
        <div className="space-y-3">
          {sites.map((site) => (
            <article key={site.id} className="rounded-lg border border-stone-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{site.name}</p>
                  <p className="text-sm text-stone-500">{site.customer.name} · {site.customer.phone}</p>
                </div>
                <div className="space-x-2 text-sm">
                  <button className="rounded border px-2 py-1" onClick={() => setEditing(site)}>수정</button>
                  <button className="rounded border px-2 py-1 text-red-600" onClick={() => removeSite(site.id)}>삭제</button>
                </div>
              </div>
              <div className="mt-4 flex gap-3 text-sm">
                <Link className="rounded bg-amber-700 px-3 py-1.5 text-white" to={`/sites/${site.id}`}>상세</Link>
                <Link className="rounded border border-stone-300 px-3 py-1.5" to={`/sites/${site.id}/estimates/new`}>견적 작성</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-semibold">현장 {editing.id ? '수정' : '생성'}</h3>
        <form onSubmit={submit} className="space-y-2 text-sm">
          {[
            ['현장명', 'name'],
            ['고객명', 'customer.name'],
            ['연락처', 'customer.phone'],
            ['이메일', 'customer.email'],
            ['주소', 'customer.address'],
            ['상담 메모', 'customer.memo'],
          ].map(([label, key]) => (
            <label key={key} className="block">
              {label}
              <input
                className="mt-1 w-full rounded border border-stone-300 px-2 py-1.5"
                value={key === 'name' ? editing.name : editing.customer[key.split('.')[1] as keyof Site['customer']]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (key === 'name') setEditing((prev) => ({ ...prev, name: value }));
                  else {
                    const customerKey = key.split('.')[1] as keyof Site['customer'];
                    setEditing((prev) => ({ ...prev, customer: { ...prev.customer, [customerKey]: value } }));
                  }
                }}
              />
            </label>
          ))}
          <button className="mt-2 w-full rounded bg-stone-900 px-3 py-2 text-white">저장</button>
        </form>
      </section>
    </div>
  );
}
