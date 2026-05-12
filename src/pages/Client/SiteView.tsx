import { useParams } from 'react-router-dom';
import { WORKS } from '../../config/worksConfig';
import useFirestoreCRUD from '../../hooks/useFirestoreCRUD';

export default function SiteView() {
  const { siteId, workId } = useParams<{ siteId: string; workId: string }>();
  const work = WORKS.find(w => w.id === workId)!;
  const { items } = useFirestoreCRUD(`sites/${siteId}/works/${workId}/materials`);
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">{work.name} 자재 현황</h1>
      <ul className="space-y-2">
        {items.map(m => (
          <li key={m.id} className="border p-3 rounded">
            {work.materialFields.map(f => (
              <div key={f.key}>
                <strong>{f.label}:</strong> {m[f.key]}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
