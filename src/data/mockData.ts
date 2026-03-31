import { EstimateVersion, Site, ViewTracking } from '../types';
import { nowIso } from '../lib/format';

const t = nowIso();

export const initialSites: Site[] = [
  {
    id: 'site-1',
    name: '서초 더블유 아파트 34평',
    createdAt: t,
    updatedAt: t,
    customer: {
      name: '정원교',
      phone: '010-3073-5885',
      email: 'architect2010@naver.com',
      address: '서울 서초구 서초대로 101',
      memo: '부분 철거 후 확장형 리모델링 요청',
    },
  },
];

export const initialEstimates: EstimateVersion[] = [
  {
    id: 'est-1',
    siteId: 'site-1',
    versionLabel: '1차',
    createdAt: t,
    updatedAt: t,
    createdBy: '관리자',
    vatIncluded: true,
    notes: '욕실 자재는 국산 프리미엄 기준',
    sections: [
      {
        id: 'sec-1',
        name: '철거',
        order: 1,
        items: [
          { id: 'item-1', name: '일반철거', description: '벽체철거/주방타일철거', unitPrice: 1400000, quantity: 1, unit: '식' },
          { id: 'item-2', name: '욕실철거', description: '바닥타일철거', unitPrice: 300000, quantity: 2, unit: '실' },
        ],
      },
      {
        id: 'sec-2',
        name: '설비공사',
        order: 2,
        items: [
          { id: 'item-3', name: '배관 연장', description: '주방배관 이동', unitPrice: 450000, quantity: 2, unit: '개소' },
        ],
      },
    ],
  },
];

export const initialTracking: ViewTracking[] = [
  { estimateId: 'est-1', linkVisited: false, viewCount: 0, pdfDownloaded: false },
];
