
import { mockMutualFunds } from "@/utils/mockData";

export type MutualFund = typeof mockMutualFunds[number] & {
  trending?: boolean;
};

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'transaction' | 'sip' | 'market' | 'system';
}

export interface Transaction {
  id: string;
  type: 'investment' | 'redemption';
  fundId: string;
  amount: number;
  units: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: 'upi' | 'netbanking';
}

export interface WatchlistItem {
  id: string;
  fundId: string;
  addedDate: Date;
  notes?: string;
}

export interface MarketNews {
  id: string;
  title: string;
  snippet: string;
  content: string;
  date: Date;
  source: string;
  imageUrl?: string;
  category: 'market' | 'funds' | 'economy' | 'policy';
}

export interface SIPInvestment {
  id: string;
  fundId: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: Date;
  nextDate: Date;
  status: 'active' | 'paused' | 'completed';
  totalInvested: number;
  currentValue: number;
}

export interface MarketIndex {
  name: string;
  value: string;
  change: string;
  changePercent: number;
  trending: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type?: 'transaction' | 'sip' | 'market' | 'system';
}
