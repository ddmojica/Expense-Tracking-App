import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface DashboardProps {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function Dashboard({ balance, totalIncome, totalExpenses }: DashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {/* Balance Card */}
      <div className="sm:col-span-3 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-6 border border-slate-600/50 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-slate-600/50 rounded-lg">
            <Wallet className="w-5 h-5 text-slate-300" />
          </div>
          <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Balance</span>
        </div>
        <p className={`text-4xl font-bold tracking-tight ${balance >= 0 ? 'text-white' : 'text-rose-400'}`}>
          {formatCurrency(balance)}
        </p>
        <p className="text-slate-500 text-sm mt-1">
          {balance >= 0 ? "You're in the green 🎉" : "Spending exceeds income ⚠️"}
        </p>
      </div>

      {/* Income Card */}
      <div className="bg-slate-800/60 rounded-2xl p-5 border border-emerald-900/40 shadow-md hover:border-emerald-700/50 transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-emerald-900/50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Income</span>
        </div>
        <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalIncome)}</p>
      </div>

      {/* Expenses Card */}
      <div className="bg-slate-800/60 rounded-2xl p-5 border border-rose-900/40 shadow-md hover:border-rose-700/50 transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-rose-900/50 rounded-lg">
            <TrendingDown className="w-4 h-4 text-rose-400" />
          </div>
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Expenses</span>
        </div>
        <p className="text-2xl font-bold text-rose-400">{formatCurrency(totalExpenses)}</p>
      </div>

      {/* Savings Rate Card */}
      <div className="bg-slate-800/60 rounded-2xl p-5 border border-blue-900/40 shadow-md hover:border-blue-700/50 transition-colors">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 bg-blue-900/50 rounded-lg">
            <span className="text-blue-400 text-sm">%</span>
          </div>
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Savings Rate</span>
        </div>
        <p className="text-2xl font-bold text-blue-400">
          {totalIncome > 0 ? `${Math.max(0, Math.round(((totalIncome - totalExpenses) / totalIncome) * 100))}%` : '—'}
        </p>
      </div>
    </div>
  );
}
