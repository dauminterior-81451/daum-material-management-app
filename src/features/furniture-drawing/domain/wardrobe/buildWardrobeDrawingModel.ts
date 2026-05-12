import type { DrawingDimension, DrawingRect, WardrobeDrawingModel, WardrobeSpec } from '../types/wardrobe';

const rect = (item: DrawingRect): DrawingRect => item;
const dimension = (item: DrawingDimension): DrawingDimension => item;

export function buildWardrobeDrawingModel(spec: WardrobeSpec): WardrobeDrawingModel {
  const { size, thickness, endPanels, innerModules, toeKick, channel } = spec;
  const rects: DrawingRect[] = [];
  const dimensions: DrawingDimension[] = [];
  const notes: string[] = [
    `몸통 ${thickness.carcass}T / 문짝 ${thickness.door}T / 속장 ${thickness.innerCarcass}T`,
    `선반 ${thickness.shelf}T / 뒷판 ${thickness.backPanel}T`,
  ];

  rects.push(
    rect({
      id: 'outline',
      kind: 'outline',
      label: '전체 외곽',
      x: 0,
      y: 0,
      width: size.width,
      height: size.height,
    }),
  );

  if (endPanels.left.width > 0) {
    rects.push(
      rect({
        id: 'left-end-panel',
        kind: 'leftEndPanel',
        label: `좌 EP ${endPanels.left.width}`,
        x: 0,
        y: 0,
        width: endPanels.left.width,
        height: size.height,
      }),
    );
  }

  if (endPanels.right.width > 0) {
    rects.push(
      rect({
        id: 'right-end-panel',
        kind: 'rightEndPanel',
        label: `우 EP ${endPanels.right.width}`,
        x: size.width - endPanels.right.width,
        y: 0,
        width: endPanels.right.width,
        height: size.height,
      }),
    );
  }

  const bodyX = endPanels.left.width;
  const bodyWidth = size.width - endPanels.left.width - endPanels.right.width;
  const usableHeight = size.height - toeKick.height - thickness.carcass * 2;
  const bodyTop = thickness.carcass;
  const bodyBottomY = size.height - toeKick.height - thickness.carcass;

  rects.push(
    rect({
      id: 'left-side',
      kind: 'leftSide',
      label: `${thickness.carcass}T`,
      x: bodyX,
      y: 0,
      width: thickness.carcass,
      height: size.height - toeKick.height,
    }),
    rect({
      id: 'right-side',
      kind: 'rightSide',
      label: `${thickness.carcass}T`,
      x: bodyX + bodyWidth - thickness.carcass,
      y: 0,
      width: thickness.carcass,
      height: size.height - toeKick.height,
    }),
    rect({
      id: 'top-panel',
      kind: 'topPanel',
      label: `상판 ${thickness.carcass}T`,
      x: bodyX,
      y: 0,
      width: bodyWidth,
      height: thickness.carcass,
    }),
    rect({
      id: 'bottom-panel',
      kind: 'bottomPanel',
      label: `하판 ${thickness.carcass}T`,
      x: bodyX,
      y: bodyBottomY,
      width: bodyWidth,
      height: thickness.carcass,
    }),
    rect({
      id: 'back-panel',
      kind: 'backPanel',
      label: `뒷판 ${thickness.backPanel}T`,
      x: bodyX + thickness.carcass,
      y: bodyTop,
      width: bodyWidth - thickness.carcass * 2,
      height: usableHeight,
    }),
  );

  let moduleX = bodyX + thickness.carcass;
  innerModules.forEach((module, index) => {
    if (index > 0) {
      rects.push(
        rect({
          id: `${module.id}-left-divider`,
          kind: 'innerDivider',
          label: `${thickness.innerCarcass}T`,
          x: moduleX,
          y: bodyTop,
          width: thickness.innerCarcass,
          height: usableHeight,
        }),
      );
      moduleX += thickness.innerCarcass;
    }

    const shelfGap = usableHeight / (module.shelfCount + 1);
    for (let shelfIndex = 1; shelfIndex <= module.shelfCount; shelfIndex += 1) {
      const shelfCenterY = bodyTop + shelfGap * shelfIndex;
      rects.push(
        rect({
          id: `${module.id}-shelf-${shelfIndex}`,
          kind: 'shelf',
          label: `선반 ${thickness.shelf}T`,
          x: moduleX,
          y: shelfCenterY - thickness.shelf / 2,
          width: module.width,
          height: thickness.shelf,
        }),
      );
    }

    dimensions.push(
      dimension({
        id: `${module.id}-width-dimension`,
        label: `${module.label} ${module.width}`,
        orientation: 'horizontal',
        x1: moduleX,
        y1: size.height,
        x2: moduleX + module.width,
        y2: size.height,
        offset: 80,
      }),
    );

    moduleX += module.width;
  });

  if (toeKick.height > 0) {
    rects.push(
      rect({
        id: 'toe-kick',
        kind: 'toeKick',
        label: `걸레받이 ${toeKick.height}`,
        x: bodyX,
        y: size.height - toeKick.height,
        width: bodyWidth,
        height: toeKick.height,
      }),
    );
  }

  if (channel.enabled) {
    const channelX = bodyX + Math.max(0, (bodyWidth - channel.width) / 2);
    const channelY = channel.position === 'top' ? 0 : size.height - toeKick.height - channel.height;
    rects.push(
      rect({
        id: 'channel',
        kind: 'channel',
        label: `찬넬 ${channel.width}×${channel.height}`,
        x: channelX,
        y: channelY,
        width: Math.min(channel.width, bodyWidth),
        height: channel.height,
      }),
    );
    notes.push(`찬넬 위치 ${channel.position} / W${channel.width} H${channel.height} D${channel.depth}`);
  }

  dimensions.push(
    dimension({
      id: 'overall-width',
      label: `W ${size.width}`,
      orientation: 'horizontal',
      x1: 0,
      y1: 0,
      x2: size.width,
      y2: 0,
      offset: -90,
    }),
    dimension({
      id: 'overall-height',
      label: `H ${size.height}`,
      orientation: 'vertical',
      x1: size.width,
      y1: 0,
      x2: size.width,
      y2: size.height,
      offset: 90,
    }),
    dimension({
      id: 'toe-kick-height',
      label: `걸레받이 ${toeKick.height}`,
      orientation: 'vertical',
      x1: bodyX + bodyWidth,
      y1: size.height - toeKick.height,
      x2: bodyX + bodyWidth,
      y2: size.height,
      offset: 45,
    }),
  );

  return {
    size,
    rects,
    dimensions,
    notes,
  };
}
