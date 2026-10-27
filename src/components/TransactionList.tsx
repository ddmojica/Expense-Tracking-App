import { useState } from 'react';
import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { Transaction } from '../types';
import { getCategoryById } from '../data/categories';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  // Append noon time to avoid timezone day-shift on ISO date strings
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const category = getCategoryById(transaction.category);
  const isIncome = transaction.type === 'income';

  return (
    <li className="flex items-center gap-4 py-3.5 px-4 rounded-xl hover:bg-slate-700/30 transition-colors group">
      {/* Icon */}
      <div
        className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
          isIncome ? 'bg-emerald-900/40' : 'bg-rose-900/40'
        }`}
      >
        {category?.emoji ?? (isIncome ? '💰' : '🧾')}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-slate-200 text-sm font-medium truncate">{transaction.description}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-slate-500 text-xs">{category?.label}</span>
          <span className="text-slate-700 text-xs">·</span>
          <span className="text-slate-500 text-xs">{formatDate(transaction.date)}</span>
        </div>
      </div>

      {/* Amount + Delete */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-1">
          {isIncome ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-rose-400" />
          )}
          <span
            className={`text-sm font-semibold tabular-nums ${
              isIncome ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {formatCurrency(transaction.amount)}
          </span>
        </div>

        <button
          onClick={() => onDelete(transaction.id)}
          title="Delete transaction"
          className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-600 hover:text-rose-400 hover:bg-rose-900/20 rounded-lg transition-all duration-150"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}

export function TransactionList({ transactions, onDelete, onClearAll }: TransactionListProps) {
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <div className="bg-slate-800/70 rounded-2xl border border-slate-700/60 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/60">
        <h2 className="text-slate-200 font-semibold text-lg">
          Recent Transactions
          {transactions.length > 0 && (
            <span className="ml-2 text-xs text-slate-500 font-normal">
              ({transactions.length} {transactions.length === 1 ? 'entry' : 'entries'})
            </span>
          )}
        </h2>
        {transactions.length > 0 && (
          <div className="flex items-center gap-2">
            {confirmClear ? (
              <>
                <span className="text-slate-400 text-xs">Sure?</span>
                <button
                  onClick={() => { onClearAll(); setConfirmClear(false); }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* List */}
      {transactions.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-4xl mb-3">💸</p>
          <p className="text-slate-400 text-sm font-medium">No transactions yet</p>
          <p className="text-slate-600 text-xs mt-1">Add your first transaction above</p>
        </div>
      ) : (
        <ul className="px-2 py-2 divide-y divide-slate-700/30">
          {transactions.map((t) => (
            <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
