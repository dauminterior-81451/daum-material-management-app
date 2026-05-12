import type { Millimeter } from './drawing';

export type WardrobeChannelPosition = 'top' | 'bottom' | 'left' | 'right' | 'back';

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

export interface WardrobeEndPanelSideSpec {
  width: Millimeter;
  thickness: Millimeter;
}

export interface WardrobeEndPanelSpec {
  left: WardrobeEndPanelSideSpec;
  right: WardrobeEndPanelSideSpec;
}

export interface WardrobeInnerCabinetSpec {
  id: string;
  label: string;
  width: Millimeter;
  height: Millimeter;
  depth: Millimeter;
  shelfCount: number;
}

export interface WardrobeToeKickSpec {
  height: Millimeter;
}

export interface WardrobeChannelSpec {
  enabled: boolean;
  position: WardrobeChannelPosition;
  width: Millimeter;
  height: Millimeter;
  depth: Millimeter;
}

export interface WardrobeSpec {
  size: WardrobeSizeSpec;
  thickness: WardrobeThicknessSpec;
  endPanels: WardrobeEndPanelSpec;
  innerCabinets: WardrobeInnerCabinetSpec[];
  toeKick: WardrobeToeKickSpec;
  channel: WardrobeChannelSpec;
}
