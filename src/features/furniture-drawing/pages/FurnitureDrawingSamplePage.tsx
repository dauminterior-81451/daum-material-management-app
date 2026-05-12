import WardrobeFrontElevationSvg from '../components/WardrobeFrontElevationSvg';
import { buildWardrobeDrawingModel } from '../domain/wardrobe/buildWardrobeDrawingModel';
import { sampleWardrobeSpec } from '../domain/wardrobe/sampleWardrobeSpec';

const drawingModel = buildWardrobeDrawingModel(sampleWardrobeSpec);

export default function FurnitureDrawingSamplePage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <section className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">Furniture Drawing MVP</p>
          <h1 className="mt-2 text-2xl font-bold">붙박이장 발주 도면 자동 생성 샘플</h1>
          <p className="mt-2 text-sm text-slate-600">
            샘플 입력 Spec을 계산 모델로 변환한 뒤 SVG 정면도 미리보기로 렌더링합니다.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">입력 Spec</h2>
              <p className="text-sm text-slate-500">단위: mm</p>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">전체 W/H/D</dt>
                <dd className="font-medium">
                  {sampleWardrobeSpec.size.width} / {sampleWardrobeSpec.size.height} / {sampleWardrobeSpec.size.depth}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">몸통 / 문짝</dt>
                <dd className="font-medium">
                  {sampleWardrobeSpec.thickness.carcass}T / {sampleWardrobeSpec.thickness.door}T
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">속장 / 선반 / 뒷판</dt>
                <dd className="font-medium">
                  {sampleWardrobeSpec.thickness.innerCarcass}T / {sampleWardrobeSpec.thickness.shelf}T /{' '}
                  {sampleWardrobeSpec.thickness.backPanel}T
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">EP 좌/우</dt>
                <dd className="font-medium">
                  {sampleWardrobeSpec.endPanels.left.width}×{sampleWardrobeSpec.endPanels.left.thickness}T /{' '}
                  {sampleWardrobeSpec.endPanels.right.width}×{sampleWardrobeSpec.endPanels.right.thickness}T
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">걸레받이</dt>
                <dd className="font-medium">H {sampleWardrobeSpec.toeKick.height}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">찬넬</dt>
                <dd className="font-medium">
                  {sampleWardrobeSpec.channel.position} / {sampleWardrobeSpec.channel.width}×
                  {sampleWardrobeSpec.channel.height}×{sampleWardrobeSpec.channel.depth}
                </dd>
              </div>
            </dl>

            <div className="border-t pt-4">
              <h3 className="font-semibold">속장 사이즈</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {sampleWardrobeSpec.innerModules.map((module) => (
                  <li key={module.id} className="flex justify-between gap-4">
                    <span>{module.label}</span>
                    <span className="font-medium text-slate-900">
                      W {module.width} / 선반 {module.shelfCount}개
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="space-y-4 rounded-xl bg-white p-5 shadow-sm">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">SVG 정면도 미리보기</h2>
                <p className="text-sm text-slate-500">입력 Spec → 계산 모델 → SVG 렌더링</p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">MVP</span>
            </div>
            <WardrobeFrontElevationSvg model={drawingModel} />
            <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <h3 className="font-semibold text-slate-800">계산 메모</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {drawingModel.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
