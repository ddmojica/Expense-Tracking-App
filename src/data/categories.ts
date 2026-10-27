import type { TransactionType } from '../types';

export interface Category {
  id: string;
  label: string;
  emoji: string;
}

export const INCOME_CATEGORIES: Category[] = [
  { id: 'salary', label: 'Salary', emoji: '💼' },
  { id: 'freelance', label: 'Freelance', emoji: '💻' },
  { id: 'investment', label: 'Investment', emoji: '📈' },
  { id: 'gift', label: 'Gift', emoji: '🎁' },
  { id: 'rental', label: 'Rental', emoji: '🏠' },
  { id: 'other-income', label: 'Other', emoji: '💰' },
];

export const EXPENSE_CATEGORIES: Category[] = [
  { id: 'food', label: 'Food & Dining', emoji: '🍔' },
  { id: 'transport', label: 'Transport', emoji: '🚗' },
  { id: 'housing', label: 'Housing', emoji: '🏡' },
  { id: 'utilities', label: 'Utilities', emoji: '⚡' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'education', label: 'Education', emoji: '📚' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'subscriptions', label: 'Subscriptions', emoji: '📱' },
  { id: 'other-expense', label: 'Other', emoji: '🧾' },
];

export function getCategoriesForType(type: TransactionType): Category[] {
  return type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
}

export function getCategoryById(id: string): Category | undefined {
  return [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES].find((c) => c.id === id);
}
