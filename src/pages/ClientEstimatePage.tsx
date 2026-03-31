import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppData } from '../contexts/AppContext';
import { formatCurrency, formatDateTime } from '../lib/format';

export default function ClientEstimatePage() {
  const { estimateId } = useParams();
  const { estimates, sites, markView, markPdfDownload } = useAppData();
  const estimate = estimates.find((e) => e.id === estimateId);

  useEffect(() => {
    if (estimateId) markView(estimateId);
  }, [estimateId, markView]);

  if (!estimate) return <p className="p-6">유효하지 않은 견적 링크입니다.</p>;

  const site = sites.find((s) => s.id === estimate.siteId);
  const supply = estimate.sections.reduce((acc, section) => acc + section.items.reduce((s, item) => s + item.unitPrice * item.quantity, 0), 0);
  const vat = estimate.vatIncluded ? Math.round(supply * 0.1) : 0;

  return (
    <div className="min-h-screen bg-stone-100 p-4 sm:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <header className="mb-8 border-b border-stone-200 pb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-700">Daum Interior</p>
          <h1 className="mt-2 text-3xl font-semibold text-stone-900">인테리어 제안 견적서</h1>
          <p className="mt-3 text-sm text-stone-600">회사명 다움인테리어 · 고객명 {site?.customer.name} · 현장명 {site?.name}</p>
          <p className="text-sm text-stone-500">작성일 {formatDateTime(estimate.updatedAt)}</p>
        </header>

        <div className="space-y-4">
          {estimate.sections.map((section) => (
            <section key={section.id} className="rounded-xl border border-stone-200 p-4">
              <h2 className="text-lg font-semibold">{section.name}</h2>
              <div className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <article key={item.id} className="rounded-lg bg-stone-50 p-3">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-stone-500">{item.description}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(item.unitPrice * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-xs text-stone-500">{formatCurrency(item.unitPrice)} × {item.quantity}{item.unit}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-8 rounded-xl bg-stone-900 p-5 text-stone-100">
          <p>공급가액 {formatCurrency(supply)}</p>
          <p>부가세 {formatCurrency(vat)}</p>
          <p className="text-2xl font-semibold">총액 {formatCurrency(supply + vat)}</p>
          <button className="mt-4 rounded bg-white px-4 py-2 text-sm font-medium text-stone-900" onClick={() => markPdfDownload(estimate.id)}>
            PDF 다운로드(추적)
          </button>
        </footer>
      </div>
    </div>
  );
}
