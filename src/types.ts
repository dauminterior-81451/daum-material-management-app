export type UserRole = 'admin';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  memo: string;
}

export interface Site {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  customer: CustomerInfo;
}

export interface EstimateItem {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  unit: string;
}

export interface TradeSection {
  id: string;
  name: string;
  order: number;
  items: EstimateItem[];
}

export interface EstimateVersion {
  id: string;
  siteId: string;
  versionLabel: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  vatIncluded: boolean;
  notes: string;
  sections: TradeSection[];
}

export interface EmailLog {
  id: string;
  estimateId: string;
  sentAt: string;
  status: 'success' | 'failed';
  toEmail: string;
  subject: string;
  body: string;
}

export interface ViewTracking {
  estimateId: string;
  linkVisited: boolean;
  firstViewedAt?: string;
  lastViewedAt?: string;
  viewCount: number;
  pdfDownloaded: boolean;
}
