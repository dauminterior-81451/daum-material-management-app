import { useParams } from 'react-router-dom';
import { WORKS } from '../../config/worksConfig';
import useFirestoreCRUD from '../../hooks/useFirestoreCRUD';
import MaterialCard from '../../components/MaterialCard';

export default function SiteDetail() {
  const { siteId, workId } = useParams<{ siteId: string; workId: string }>();
  const work = WORKS.find(w => w.id === workId)!;
  const { items, addItem, updateItem, removeItem } = useFirestoreCRUD(
    `sites/${siteId}/works/${workId}/materials`
  );
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">{work.name} 자재 관리</h1>
      <button onClick={() => addItem({})} className="btn-primary mb-4">
        자재 추가
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(m => (
          <MaterialCard
            key={m.id}
            data={m}
            fields={work.materialFields}
            onSave={d => updateItem(m.id, d)}
            onDelete={() => removeItem(m.id)}
          />
        ))}
      </div>
    </div>
}