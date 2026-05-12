import type { WardrobeSpec } from '../types/wardrobe';

export const sampleWardrobeSpec: WardrobeSpec = {
  size: {
    width: 2400,
    height: 2300,
    depth: 600,
  },
  thickness: {
    carcass: 18,
    door: 18,
    innerCarcass: 18,
    shelf: 18,
    backPanel: 5,
  },
  endPanels: {
    left: {
      width: 60,
      thickness: 18,
    },
    right: {
      width: 60,
      thickness: 18,
    },
  },
  innerModules: [
    {
      id: 'module-left',
      label: '속장 1',
      width: 760,
      shelfCount: 2,
    },
    {
      id: 'module-center',
      label: '속장 2',
      width: 760,
      shelfCount: 3,
    },
    {
      id: 'module-right',
      label: '속장 3',
      width: 760,
      shelfCount: 2,
    },
  ],
  toeKick: {
    height: 100,
  },
  channel: {
    enabled: true,
    position: 'bottom',
    width: 2280,
    height: 40,
    depth: 30,
  },
};
