import { useState, useEffect } from 'react';
import type { Transaction } from '../types';

const STORAGE_KEY = 'expense-tracker-transactions';

function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Transaction[];
  } catch {
    return [];
  }
}

function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...transaction,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const clearAll = () => {
    setTransactions([]);
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    clearAll,
    totalIncome,
    totalExpenses,
    balance,
  };
}
