import type { DrawingDimension, DrawingRect, WardrobeDrawingModel, WardrobePartKind } from '../domain/types/wardrobe';

interface WardrobeFrontElevationSvgProps {
  model: WardrobeDrawingModel;
}

const partStyles: Record<WardrobePartKind, { fill: string; stroke: string; strokeDasharray?: string }> = {
  outline: { fill: 'none', stroke: '#111827' },
  leftEndPanel: { fill: '#fef3c7', stroke: '#92400e' },
  rightEndPanel: { fill: '#fef3c7', stroke: '#92400e' },
  leftSide: { fill: '#e5e7eb', stroke: '#374151' },
  rightSide: { fill: '#e5e7eb', stroke: '#374151' },
  topPanel: { fill: '#e5e7eb', stroke: '#374151' },
  bottomPanel: { fill: '#e5e7eb', stroke: '#374151' },
  innerDivider: { fill: '#dbeafe', stroke: '#1d4ed8' },
  shelf: { fill: '#eff6ff', stroke: '#2563eb' },
  backPanel: { fill: '#f9fafb', stroke: '#9ca3af', strokeDasharray: '10 8' },
  toeKick: { fill: '#e0e7ff', stroke: '#4338ca' },
  channel: { fill: '#fee2e2', stroke: '#b91c1c' },
};

function getTextPosition(rect: DrawingRect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2,
  };
}

function DimensionLine({ dimension }: { dimension: DrawingDimension }) {
  const isHorizontal = dimension.orientation === 'horizontal';
  const lineX1 = isHorizontal ? dimension.x1 : dimension.x1 + dimension.offset;
  const lineY1 = isHorizontal ? dimension.y1 + dimension.offset : dimension.y1;
  const lineX2 = isHorizontal ? dimension.x2 : dimension.x2 + dimension.offset;
  const lineY2 = isHorizontal ? dimension.y2 + dimension.offset : dimension.y2;
  const labelX = (lineX1 + lineX2) / 2;
  const labelY = (lineY1 + lineY2) / 2;

  return (
    <g className="dimension-line" stroke="#111827" fill="#111827" strokeWidth={3}>
      <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} />
      <line x1={dimension.x1} y1={dimension.y1} x2={lineX1} y2={lineY1} strokeWidth={2} />
      <line x1={dimension.x2} y1={dimension.y2} x2={lineX2} y2={lineY2} strokeWidth={2} />
      {isHorizontal ? (
        <>
          <line x1={lineX1} y1={lineY1 - 18} x2={lineX1} y2={lineY1 + 18} />
          <line x1={lineX2} y1={lineY2 - 18} x2={lineX2} y2={lineY2 + 18} />
        </>
      ) : (
        <>
          <line x1={lineX1 - 18} y1={lineY1} x2={lineX1 + 18} y2={lineY1} />
          <line x1={lineX2 - 18} y1={lineY2} x2={lineX2 + 18} y2={lineY2} />
        </>
      )}
      <text
        x={labelX}
        y={labelY - 12}
        textAnchor="middle"
        fontSize={42}
        fontFamily="Arial, sans-serif"
        stroke="none"
      >
        {dimension.label}
      </text>
    </g>
  );
}

export default function WardrobeFrontElevationSvg({ model }: WardrobeFrontElevationSvgProps) {
  const margin = 180;
  const viewBox = [
    -margin,
    -margin,
    model.size.width + margin * 2,
    model.size.height + margin * 2,
  ].join(' ');

  return (
    <svg
      role="img"
      aria-label="붙박이장 정면도 SVG 미리보기"
      viewBox={viewBox}
      className="w-full rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <title>붙박이장 정면도</title>
      <rect x={-margin} y={-margin} width={model.size.width + margin * 2} height={model.size.height + margin * 2} fill="#ffffff" />
      <g>
        {model.rects.map((item) => {
          const style = partStyles[item.kind];
          const textPosition = getTextPosition(item);
          const showLabel = item.width > 35 && item.height > 35 && item.kind !== 'outline';

          return (
            <g key={item.id}>
              <rect
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={item.kind === 'outline' ? 5 : 3}
                strokeDasharray={style.strokeDasharray}
              />
              {showLabel && (
                <text
                  x={textPosition.x}
                  y={textPosition.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={36}
                  fontFamily="Arial, sans-serif"
                  fill="#111827"
                >
                  {item.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
      <g>
        {model.dimensions.map((item) => (
          <DimensionLine key={item.id} dimension={item} />
        ))}
      </g>
    </svg>
  );
}
