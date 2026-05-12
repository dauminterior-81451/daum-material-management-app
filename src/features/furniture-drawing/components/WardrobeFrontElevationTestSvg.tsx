import { sampleWardrobeFrontElevationModel } from '../domain/samples/sampleWardrobeDrawingModel';
import type { DrawingDimension, DrawingRect, FrontElevationDrawingModel } from '../domain/types/drawing';

interface WardrobeFrontElevationTestSvgProps {
  model?: FrontElevationDrawingModel;
}

const rectStyleByKind: Record<string, { fill: string; stroke: string; strokeDasharray?: string }> = {
  outline: { fill: 'none', stroke: '#111827' },
  'end-panel': { fill: '#fef3c7', stroke: '#92400e' },
  'inner-cabinet': { fill: '#eff6ff', stroke: '#2563eb' },
  'toe-kick': { fill: '#e0e7ff', stroke: '#4338ca' },
  channel: { fill: '#fee2e2', stroke: '#b91c1c' },
};

function getRectStyle(kind: string) {
  return rectStyleByKind[kind] ?? { fill: '#f8fafc', stroke: '#64748b' };
}

function RectShape({ rect }: { rect: DrawingRect }) {
  const style = getRectStyle(rect.kind);
  const shouldShowLabel = rect.kind !== 'outline' && rect.width >= 50 && rect.height >= 40;

  return (
    <g>
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        fill={style.fill}
        stroke={style.stroke}
        strokeWidth={rect.kind === 'outline' ? 5 : 3}
        strokeDasharray={style.strokeDasharray}
      />
      {shouldShowLabel && (
        <text
          x={rect.x + rect.width / 2}
          y={rect.y + rect.height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="Arial, sans-serif"
          fontSize={36}
          fill="#0f172a"
        >
          {rect.label}
        </text>
      )}
    </g>
  );
}

function DimensionShape({ dimension }: { dimension: DrawingDimension }) {
  const isHorizontal = dimension.orientation === 'horizontal';
  const x1 = isHorizontal ? dimension.start.x : dimension.start.x + dimension.offset;
  const y1 = isHorizontal ? dimension.start.y + dimension.offset : dimension.start.y;
  const x2 = isHorizontal ? dimension.end.x : dimension.end.x + dimension.offset;
  const y2 = isHorizontal ? dimension.end.y + dimension.offset : dimension.end.y;

  return (
    <g stroke="#111827" fill="#111827" strokeWidth={3}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <line x1={dimension.start.x} y1={dimension.start.y} x2={x1} y2={y1} strokeWidth={2} />
      <line x1={dimension.end.x} y1={dimension.end.y} x2={x2} y2={y2} strokeWidth={2} />
      <text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 - 12}
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontSize={42}
        stroke="none"
      >
        {dimension.label}
      </text>
    </g>
  );
}

export default function WardrobeFrontElevationTestSvg({
  model = sampleWardrobeFrontElevationModel,
}: WardrobeFrontElevationTestSvgProps) {
  const margin = 180;
  const viewBox = `${-margin} ${-margin} ${model.width + margin * 2} ${model.height + margin * 2}`;

  return (
    <svg role="img" aria-label={model.title} viewBox={viewBox} width="100%">
      <title>{model.title}</title>
      <rect x={-margin} y={-margin} width={model.width + margin * 2} height={model.height + margin * 2} fill="#ffffff" />
      {model.rects.map((rect) => (
        <RectShape key={rect.id} rect={rect} />
      ))}
      {model.dimensions.map((dimension) => (
        <DimensionShape key={dimension.id} dimension={dimension} />
      ))}
    </svg>
  );
}
