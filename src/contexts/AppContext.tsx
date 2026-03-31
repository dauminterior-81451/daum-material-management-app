import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';
import { repository } from '../services/repository';
import { EmailLog, EstimateVersion, Site } from '../types';

interface AppContextValue {
  sites: Site[];
  estimates: EstimateVersion[];
  emailLogs: EmailLog[];
  tracking: ReturnType<typeof repository.getAll>['tracking'];
  refresh: () => void;
  saveSite: (site: Site) => void;
  removeSite: (siteId: string) => void;
  saveEstimate: (estimate: EstimateVersion) => void;
  addEmailLog: (log: Omit<EmailLog, 'id' | 'sentAt'>) => void;
  markView: (estimateId: string) => void;
  markPdfDownload: (estimateId: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, setState] = useState(repository.getAll());

  const refresh = () => setState(repository.getAll());

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      refresh,
      saveSite(site) {
        setState(repository.upsertSite(site));
      },
      removeSite(siteId) {
        setState(repository.deleteSite(siteId));
      },
      saveEstimate(estimate) {
        setState(repository.upsertEstimate(estimate));
      },
      addEmailLog(log) {
        setState(repository.appendEmailLog(log));
      },
      markView(estimateId) {
        setState(repository.trackView(estimateId));
      },
      markPdfDownload(estimateId) {
        setState(repository.markPdfDownloaded(estimateId));
      },
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppData = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('AppProvider 누락');
  return ctx;
};
