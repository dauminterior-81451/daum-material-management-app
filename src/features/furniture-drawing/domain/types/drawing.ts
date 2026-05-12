export type Millimeter = number;

export interface DrawingPoint {
  x: Millimeter;
  y: Millimeter;
}

export interface DrawingRect {
  id: string;
  kind: string;
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
  start: DrawingPoint;
  end: DrawingPoint;
  offset: Millimeter;
}

export interface FrontElevationDrawingModel {
  unit: 'mm';
  title: string;
  width: Millimeter;
  height: Millimeter;
  rects: DrawingRect[];
  dimensions: DrawingDimension[];
  notes: string[];
}
