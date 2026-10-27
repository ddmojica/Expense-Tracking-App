import { useTransactions } from './hooks/useTransactions';
import { Dashboard } from './components/Dashboard';
import { AddTransactionForm } from './components/AddTransactionForm';
import { TransactionList } from './components/TransactionList';

export default function App() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    clearAll,
    totalIncome,
    totalExpenses,
    balance,
  } = useTransactions();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/50">
              <span className="text-lg">💳</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-100 leading-none">Expense Tracker</h1>
              <p className="text-slate-500 text-xs mt-0.5">Local-first · Data stays on your device</p>
            </div>
          </div>
        </header>

        {/* Dashboard */}
        <Dashboard
          balance={balance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
        />

        {/* Add Transaction Form */}
        <AddTransactionForm onAdd={addTransaction} />

        {/* Transaction List */}
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
          onClearAll={clearAll}
        />

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-slate-700 text-xs">
            All data is stored locally in your browser · No server, no cloud
          </p>
        </footer>
      </div>
    </div>
  );
}
