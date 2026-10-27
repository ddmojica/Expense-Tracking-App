import { useState } from 'react';
import { PlusCircle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import type { FormData, TransactionType } from '../types';
import { getCategoriesForType } from '../data/categories';

interface AddTransactionFormProps {
  onAdd: (data: Omit<import('../types').Transaction, 'id'>) => void;
}

const today = new Date().toISOString().split('T')[0];

const DEFAULT_FORM: FormData = {
  type: 'expense',
  amount: '',
  description: '',
  category: 'food',
  date: today,
};

export function AddTransactionForm({ onAdd }: AddTransactionFormProps) {
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);
  const [error, setError] = useState('');

  const categories = getCategoriesForType(form.type);

  function handleTypeChange(type: TransactionType) {
    const defaultCat = type === 'income' ? 'salary' : 'food';
    setForm((f) => ({ ...f, type, category: defaultCat }));
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseFloat(form.amount);
    if (!form.description.trim()) {
      setError('Please enter a description.');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }
    if (!form.category) {
      setError('Please select a category.');
      return;
    }
    onAdd({
      type: form.type,
      amount,
      description: form.description.trim(),
      category: form.category,
      date: form.date || today,
    });
    setForm((f) => ({ ...DEFAULT_FORM, type: f.type, category: f.category, date: f.date }));
    setError('');
  }

  return (
    <div className="bg-slate-800/70 rounded-2xl border border-slate-700/60 shadow-lg p-6 mb-8">
      <h2 className="text-slate-200 font-semibold text-lg mb-5 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-violet-400" />
        Add Transaction
      </h2>

      {/* Type Toggle */}
      <div className="flex gap-2 mb-5 p-1 bg-slate-900/60 rounded-xl">
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            form.type === 'expense'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-900/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowDownCircle className="w-4 h-4" />
          Expense
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            form.type === 'income'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ArrowUpCircle className="w-4 h-4" />
          Income
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Description */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
            Description
          </label>
          <input
            type="text"
            placeholder="e.g. Grocery run, Monthly salary..."
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full bg-slate-900/60 border border-slate-600/60 rounded-lg px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-colors text-sm"
          />
        </div>

        {/* Amount + Date row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                className="w-full bg-slate-900/60 border border-slate-600/60 rounded-lg pl-8 pr-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-colors text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full bg-slate-900/60 border border-slate-600/60 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-violet-500/70 focus:ring-1 focus:ring-violet-500/30 transition-colors text-sm [color-scheme:dark]"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-slate-400 text-xs font-medium mb-1.5 uppercase tracking-wider">
            Category
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: cat.id }))}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border text-xs transition-all duration-150 ${
                  form.category === cat.id
                    ? form.type === 'income'
                      ? 'bg-emerald-900/50 border-emerald-600/60 text-emerald-300'
                      : 'bg-rose-900/50 border-rose-600/60 text-rose-300'
                    : 'border-slate-700/50 text-slate-400 hover:border-slate-500/60 hover:text-slate-300'
                }`}
              >
                <span className="text-base">{cat.emoji}</span>
                <span className="leading-tight text-center">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-rose-400 text-sm bg-rose-900/20 border border-rose-800/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 shadow-lg ${
            form.type === 'income'
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
              : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/40'
          }`}
        >
          Add {form.type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}
