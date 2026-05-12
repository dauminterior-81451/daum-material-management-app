import React from 'react';
import { MaterialField } from '../config/worksConfig';

interface Props {
  data: any;
  fields: MaterialField[];
  onSave: (data: any) => void;
  onDelete: () => void;
}

export default function MaterialCard({ data, fields, onSave, onDelete }: Props) {
  const [editData, setEditData] = React.useState(data);
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      {fields.map(f => (
        <div key={f.key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{f.label}</label>
          {f.type === 'text' || f.type === 'number' ? (
            <input
              type={f.type}
              value={editData[f.key] || ''}
              onChange={e => setEditData({ ...editData, [f.key]: e.target.value })}
              className="mt-1 block w-full border rounded p-1"
            />
          ) : f.type === 'memo' ? (
            <textarea
              value={editData[f.key] || ''}
              onChange={e => setEditData({ ...editData, [f.key]: e.target.value })}
              className="mt-1 block w-full border rounded p-1"
            />
          ) : f.type === 'image' ? (
            <input
              type="file"
              accept="image/*"
              onChange={async e => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setEditData({ ...editData, [f.key]: url });
                }
              }}
            />
          ) : null}
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <button onClick={() => onSave(editData)} className="btn-primary py-1 px-3">
          저장
        </button>
        <button onClick={onDelete} className="text-red-500 py-1 px-3">
          삭제
        </button>
      </div>
    </div>
  );
}
