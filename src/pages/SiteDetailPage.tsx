import { FormEvent, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppData } from '../contexts/AppContext';
import { formatCurrency, formatDateTime } from '../lib/format';
import { emailService } from '../services/emailService';

const totals = (estimate: any) => {
  const supply = estimate.sections.reduce((acc: number, section: any) => acc + section.items.reduce((s: number, item: any) => s + item.unitPrice * item.quantity, 0), 0);
  const vat = estimate.vatIncluded ? Math.round(supply * 0.1) : 0;
  return { supply, vat, total: supply + vat };
};

export default function SiteDetailPage() {
  const { siteId } = useParams();
  const { sites, estimates, tracking, emailLogs, addEmailLog } = useAppData();
  const site = sites.find((s) => s.id === siteId);
  const siteEstimates = useMemo(() => estimates.filter((e) => e.siteId === siteId), [estimates, siteId]);
  const [mail, setMail] = useState({ toEmail: site?.customer.email ?? '', subject: '', body: '' });

  if (!site) return <p>현장을 찾을 수 없습니다.</p>;

  const send = async (estimateId: string, e: FormEvent) => {
    e.preventDefault();
    const link = `${window.location.origin}/client/estimate/${estimateId}`;
    const result = await emailService.send({ to: mail.toEmail, subject: mail.subject, body: mail.body, estimateLink: link });
    addEmailLog({ estimateId, status: result.success ? 'success' : 'failed', toEmail: mail.toEmail, subject: mail.subject, body: `${mail.body}\n${link}` });
    alert(result.success ? '발송 기록이 저장되었습니다.' : '발송 실패로 기록되었습니다.');
  };

  return (
    <div className="space-y-5">
      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <h2 className="text-xl font-semibold">{site.name}</h2>
        <p className="mt-1 text-sm text-stone-600">고객 {site.customer.name} · {site.customer.phone} · {site.customer.email}</p>
        <p className="mt-1 text-sm text-stone-500">{site.customer.address}</p>
        <p className="mt-2 rounded bg-stone-50 p-3 text-sm">상담 메모: {site.customer.memo}</p>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">견적서 버전</h3>
          <Link className="rounded bg-amber-700 px-3 py-2 text-sm text-white" to={`/sites/${site.id}/estimates/new`}>새 버전 작성</Link>
        </div>
        <div className="space-y-3">
          {siteEstimates.map((estimate) => {
            const total = totals(estimate);
            const track = tracking.find((t) => t.estimateId === estimate.id);
            return (
              <div key={estimate.id} className="rounded-lg border border-stone-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">{estimate.versionLabel}</p>
                    <p className="text-xs text-stone-500">업데이트: {formatDateTime(estimate.updatedAt)}</p>
                  </div>
                  <p className="font-semibold text-amber-700">{formatCurrency(total.total)}</p>
                </div>
                <div className="mt-2 flex gap-2 text-sm">
                  <Link className="rounded border border-stone-300 px-2 py-1" to={`/sites/${site.id}/estimates/${estimate.id}`}>편집</Link>
                  <Link className="rounded border border-stone-300 px-2 py-1" to={`/client/estimate/${estimate.id}`} target="_blank">고객 미리보기</Link>
                </div>
                <p className="mt-2 text-xs text-stone-500">열람 {track?.viewCount ?? 0}회 / 첫 열람 {track?.firstViewedAt ? formatDateTime(track.firstViewedAt) : '-'}</p>
                <form className="mt-3 grid gap-2 rounded bg-stone-50 p-3 text-sm" onSubmit={(e) => send(estimate.id, e)}>
                  <input className="rounded border border-stone-300 px-2 py-1" placeholder="받는 이메일" value={mail.toEmail} onChange={(e) => setMail((m) => ({ ...m, toEmail: e.target.value }))} />
                  <input className="rounded border border-stone-300 px-2 py-1" placeholder="제목" value={mail.subject} onChange={(e) => setMail((m) => ({ ...m, subject: e.target.value }))} />
                  <textarea className="rounded border border-stone-300 px-2 py-1" rows={2} placeholder="본문" value={mail.body} onChange={(e) => setMail((m) => ({ ...m, body: e.target.value }))} />
                  <button className="rounded bg-stone-900 px-3 py-1.5 text-white">발송 기록 저장</button>
                </form>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="mb-3 text-lg font-semibold">발송 기록</h3>
        <div className="space-y-2 text-sm">
          {emailLogs.filter((log) => siteEstimates.some((e) => e.id === log.estimateId)).map((log) => (
            <p key={log.id} className="rounded border border-stone-200 p-2">
              {formatDateTime(log.sentAt)} / {log.toEmail} / {log.status}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
