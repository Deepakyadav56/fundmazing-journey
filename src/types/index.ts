
import { mockMutualFunds } from "@/utils/mockData";

export type MutualFund = typeof mockMutualFunds[number];

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
