import { initialEstimates, initialSites, initialTracking } from '../data/mockData';
import { nowIso } from '../lib/format';
import { EmailLog, EstimateVersion, Site, ViewTracking } from '../types';

interface DatabaseState {
  sites: Site[];
  estimates: EstimateVersion[];
  emailLogs: EmailLog[];
  tracking: ViewTracking[];
}

const STORAGE_KEY = 'daum-estimate-mvp';

const createInitialState = (): DatabaseState => ({
  sites: initialSites,
  estimates: initialEstimates,
  emailLogs: [],
  tracking: initialTracking,
});

const loadState = (): DatabaseState => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = createInitialState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  return JSON.parse(raw) as DatabaseState;
};

const saveState = (state: DatabaseState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const uid = () => Math.random().toString(36).slice(2, 10);

export const repository = {
  getAll() {
    return loadState();
  },

  upsertSite(site: Site) {
    const state = loadState();
    const exists = state.sites.some((s) => s.id === site.id);
    if (exists) {
      state.sites = state.sites.map((s) => (s.id === site.id ? { ...site, updatedAt: nowIso() } : s));
    } else {
      state.sites.unshift({ ...site, id: site.id || uid(), createdAt: nowIso(), updatedAt: nowIso() });
    }
    saveState(state);
    return state;
  },

  deleteSite(siteId: string) {
    const state = loadState();
    state.sites = state.sites.filter((s) => s.id !== siteId);
    const deletedEstimateIds = state.estimates.filter((e) => e.siteId === siteId).map((e) => e.id);
    state.estimates = state.estimates.filter((e) => e.siteId !== siteId);
    state.emailLogs = state.emailLogs.filter((l) => !deletedEstimateIds.includes(l.estimateId));
    state.tracking = state.tracking.filter((t) => !deletedEstimateIds.includes(t.estimateId));
    saveState(state);
    return state;
  },

  upsertEstimate(estimate: EstimateVersion) {
    const state = loadState();
    const exists = state.estimates.some((e) => e.id === estimate.id);
    const estimateId = estimate.id || uid();

    if (exists) {
      state.estimates = state.estimates.map((e) =>
        e.id === estimateId ? { ...estimate, id: estimateId, updatedAt: nowIso() } : e,
      );
    } else {
      const newEstimate = {
        ...estimate,
        id: estimateId,
        createdAt: estimate.createdAt || nowIso(),
        updatedAt: nowIso(),
      };
      state.estimates.unshift(newEstimate);
      if (!state.tracking.some((t) => t.estimateId === estimateId)) {
        state.tracking.push({ estimateId, linkVisited: false, viewCount: 0, pdfDownloaded: false });
      }
    }

    saveState(state);
    return state;
  },

  appendEmailLog(log: Omit<EmailLog, 'id' | 'sentAt'>) {
    const state = loadState();
    state.emailLogs.unshift({ ...log, id: uid(), sentAt: nowIso() });
    saveState(state);
    return state;
  },

  trackView(estimateId: string) {
    const state = loadState();
    state.tracking = state.tracking.map((item) => {
      if (item.estimateId !== estimateId) return item;
      const now = nowIso();
      return {
        ...item,
        linkVisited: true,
        firstViewedAt: item.firstViewedAt ?? now,
        lastViewedAt: now,
        viewCount: item.viewCount + 1,
      };
    });
    saveState(state);
    return state;
  },

  markPdfDownloaded(estimateId: string) {
    const state = loadState();
    state.tracking = state.tracking.map((item) =>
      item.estimateId === estimateId ? { ...item, pdfDownloaded: true } : item,
    );
    saveState(state);
    return state;
  },
};

export type AppDatabase = ReturnType<typeof repository.getAll>;
