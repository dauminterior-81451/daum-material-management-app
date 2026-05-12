export interface MaterialField { key: string; label: string; type: 'text' | 'number' | 'image' | 'memo'; }
export interface WorkConfig { id: string; name: string; displayOrder: number; materialFields: MaterialField[]; }
export const WORKS: WorkConfig[] = [
  { id: 'demolition', name: '철거', displayOrder: 1, materialFields: [
    { key: 'name', label: '자재명', type: 'text' },
    { key: 'spec', label: '규격', type: 'text' },
    { key: 'quantity', label: '수량', type: 'number' },
    { key: 'location', label: '위치', type: 'text' },
    { key: 'image', label: '이미지', type: 'image' },
    { key: 'memo', label: '메모', type: 'memo' }
  ]},
  // TODO: 나머지 26개 공정 추가
];
