import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppData } from '../contexts/AppContext';
import { formatCurrency, nowIso } from '../lib/format';
import { EstimateItem, EstimateVersion, TradeSection } from '../types';

const uid = () => Math.random().toString(36).slice(2, 10);

const createEmptyEstimate = (siteId: string): EstimateVersion => ({
  id: uid(),
  siteId,
  versionLabel: '1차',
  createdAt: nowIso(),
  updatedAt: nowIso(),
  createdBy: '관리자',
  vatIncluded: true,
  notes: '',
  sections: [],
});

export default function EstimateEditorPage() {
  const { siteId, estimateId } = useParams();
  const nav = useNavigate();
  const { estimates, saveEstimate } = useAppData();

  const existing = useMemo(() => estimates.find((e) => e.id === estimateId), [estimates, estimateId]);
  const [estimate, setEstimate] = useState<EstimateVersion>(() =>
    existing ? structuredClone(existing) : createEmptyEstimate(siteId!),
  );

  useEffect(() => {
    setEstimate(existing ? structuredClone(existing) : createEmptyEstimate(siteId!));
  }, [existing, siteId]);

  const updateSection = (sectionId: string, updater: (section: TradeSection) => TradeSection) => {
    setEstimate((prev) => ({
      ...prev,
      sections: prev.sections.map((section) => (section.id === sectionId ? updater(section) : section)),
    }));
  };

  const addSection = () => {
    setEstimate((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        { id: uid(), name: `신규 공정 ${prev.sections.length + 1}`, order: prev.sections.length + 1, items: [] },
      ],
    }));
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    setEstimate((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.sections.length) return prev;
      const sections = [...prev.sections];
      [sections[index], sections[target]] = [sections[target], sections[index]];
      return { ...prev, sections: sections.map((s, idx) => ({ ...s, order: idx + 1 })) };
    });
  };

  const addItem = (sectionId: string) => {
    updateSection(sectionId, (section) => ({
      ...section,
      items: [...section.items, { id: uid(), name: '신규 항목', description: '', unitPrice: 0, quantity: 1, unit: '식' }],
    }));
  };

  const updateItem = (sectionId: string, itemId: string, patch: Partial<EstimateItem>) => {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.map((item) => (item.id === itemId ? { ...item, ...patch } : item)),
    }));
  };

  const removeItem = (sectionId: string, itemId: string) => {
    updateSection(sectionId, (section) => ({
      ...section,
      items: section.items.filter((item) => item.id !== itemId),
    }));
  };

  const removeSection = (sectionId: string) => {
    setEstimate((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== sectionId).map((section, idx) => ({ ...section, order: idx + 1 })),
    }));
  };

  const subtotal = (section: TradeSection) => section.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const supply = estimate.sections.reduce((sum, section) => sum + subtotal(section), 0);
  const vat = estimate.vatIncluded ? Math.round(supply * 0.1) : 0;

  const handleSave = () => {
    saveEstimate({ ...estimate, updatedAt: nowIso() });
    nav(`/sites/${siteId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4">
        <div className="flex gap-3">
          <input
            className="rounded border px-2 py-1"
            value={estimate.versionLabel}
            onChange={(e) => setEstimate((prev) => ({ ...prev, versionLabel: e.target.value }))}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={estimate.vatIncluded}
              onChange={(e) => setEstimate((prev) => ({ ...prev, vatIncluded: e.target.checked }))}
            />
            부가세 10% 적용
          </label>
        </div>
        <div className="space-x-2">
          <button className="rounded border px-3 py-1.5" onClick={addSection}>공정 추가</button>
          <button className="rounded bg-stone-900 px-3 py-1.5 text-white" onClick={handleSave}>저장</button>
        </div>
      </div>

      {estimate.sections.map((section, sectionIndex) => (
        <section key={section.id} className="rounded-xl border border-stone-200 bg-white p-4">
          <div className="mb-3 flex items-center gap-2">
            <input
              className="rounded border px-2 py-1 font-medium"
              value={section.name}
              onChange={(e) => updateSection(section.id, (s) => ({ ...s, name: e.target.value }))}
            />
            <button className="rounded border px-2 py-1 text-xs" onClick={() => moveSection(sectionIndex, -1)}>↑</button>
            <button className="rounded border px-2 py-1 text-xs" onClick={() => moveSection(sectionIndex, 1)}>↓</button>
            <button className="rounded border px-2 py-1 text-xs text-red-600" onClick={() => removeSection(section.id)}>삭제</button>
          </div>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 rounded border border-stone-200 p-2 text-sm">
                <input className="col-span-2 rounded border px-2 py-1" value={item.name} onChange={(e) => updateItem(section.id, item.id, { name: e.target.value })} />
                <input className="col-span-3 rounded border px-2 py-1" value={item.description} onChange={(e) => updateItem(section.id, item.id, { description: e.target.value })} />
                <input type="number" className="col-span-2 rounded border px-2 py-1" value={item.unitPrice} onChange={(e) => updateItem(section.id, item.id, { unitPrice: Number(e.target.value) || 0 })} />
                <input type="number" className="col-span-1 rounded border px-2 py-1" value={item.quantity} onChange={(e) => updateItem(section.id, item.id, { quantity: Number(e.target.value) || 0 })} />
                <input className="col-span-1 rounded border px-2 py-1" value={item.unit} onChange={(e) => updateItem(section.id, item.id, { unit: e.target.value })} />
                <div className="col-span-2 rounded bg-stone-100 px-2 py-1">{formatCurrency(item.unitPrice * item.quantity)}</div>
                <button className="col-span-1 rounded border text-red-600" onClick={() => removeItem(section.id, item.id)}>X</button>
              </div>
            ))}
            <button className="rounded border border-dashed px-3 py-1.5 text-sm" onClick={() => addItem(section.id)}>항목 추가</button>
          </div>
          <p className="mt-3 text-right text-sm font-semibold">소계 {formatCurrency(subtotal(section))}</p>
        </section>
      ))}

      <section className="rounded-xl border border-stone-200 bg-white p-4 text-right">
        <p>공급가액 {formatCurrency(supply)}</p>
        <p>부가세 {formatCurrency(vat)}</p>
        <p className="text-xl font-semibold text-amber-700">총액 {formatCurrency(supply + vat)}</p>
      </section>

      <Link className="inline-block rounded bg-amber-700 px-4 py-2 text-white" to={`/client/estimate/${estimate.id}`} target="_blank">
        고객용 미리보기
      </Link>
    </div>
  );
}
