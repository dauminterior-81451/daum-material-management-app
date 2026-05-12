import { WORKS } from '../../config/worksConfig';
import { Link, useParams } from 'react-router-dom';

export default function Sidebar() {
  const { siteId } = useParams();
  return (
    <aside className="w-64 bg-gray-50 h-screen">
      <nav className="p-4">
        {WORKS.sort((a, b) => a.displayOrder - b.displayOrder).map(work => (
          <Link
            key={work.id}
            to={`/site/${siteId}/work/${work.id}`}
            className="block py-2 px-3 hover:bg-gray-100 rounded"
          >
            {work.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
