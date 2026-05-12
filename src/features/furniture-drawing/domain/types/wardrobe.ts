export type Millimeter = number;

export type ChannelPosition = 'top' | 'bottom' | 'left' | 'right' | 'back';

export interface WardrobeSizeSpec {
  width: Millimeter;
  height: Millimeter;
  depth: Millimeter;
}

export interface WardrobeThicknessSpec {
  carcass: Millimeter;
  door: Millimeter;
  innerCarcass: Millimeter;
  shelf: Millimeter;
  backPanel: Millimeter;
}

export interface EndPanelSpec {
  width: Millimeter;
  thickness: Millimeter;
}

export interface WardrobeEndPanelSpec {
  left: EndPanelSpec;
  right: EndPanelSpec;
}

export interface WardrobeInnerModuleSpec {
  id: string;
  label: string;
  width: Millimeter;
  shelfCount: number;
}

export interface WardrobeToeKickSpec {
  height: Millimeter;
}

export interface WardrobeChannelSpec {
  enabled: boolean;
  position: ChannelPosition;
  width: Millimeter;
  height: Millimeter;
  depth: Millimeter;
}

export interface WardrobeSpec {
  size: WardrobeSizeSpec;
  thickness: WardrobeThicknessSpec;
  endPanels: WardrobeEndPanelSpec;
  innerModules: WardrobeInnerModuleSpec[];
  toeKick: WardrobeToeKickSpec;
  channel: WardrobeChannelSpec;
}

export type WardrobePartKind =
  | 'outline'
  | 'leftEndPanel'
  | 'rightEndPanel'
  | 'leftSide'
  | 'rightSide'
  | 'topPanel'
  | 'bottomPanel'
  | 'innerDivider'
  | 'shelf'
  | 'backPanel'
  | 'toeKick'
  | 'channel';

export interface DrawingRect {
  id: string;
  kind: WardrobePartKind;
  label: string;
  x: Millimeter;
  y: Millimeter;
  width: Millimeter;
  height: Millimeter;
}

export interface DrawingDimension {
  id: string;
  label: string;
  orientation: 'horizontal' | 'vertical';
  x1: Millimeter;
  y1: Millimeter;
  x2: Millimeter;
  y2: Millimeter;
  offset: Millimeter;
}

export interface WardrobeDrawingModel {
  size: WardrobeSizeSpec;
  rects: DrawingRect[];
  dimensions: DrawingDimension[];
  notes: string[];
}
