export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: string; // ISO date string
}

export interface FormData {
  type: TransactionType;
  amount: string;
  description: string;
  category: string;
  date: string;
}
