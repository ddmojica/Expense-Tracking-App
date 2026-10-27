# 💳 Expense Tracker

A **local-first**, single-page expense tracker built with **Vite 4 · React 18 · TypeScript · Tailwind CSS 3**.

All data is persisted to **`localStorage`** — no server, no sign-up, works 100% offline after first load.

---

## Features

| Feature | Details |
|---|---|
| 📊 **Summary Dashboard** | Total Balance, Income, Expenses, and Savings Rate |
| ➕ **Add Transaction** | Amount, description, date, category picker |
| 🗑️ **Delete & Clear** | Per-row delete (hover) + "Clear all" with confirmation |
| 🏷️ **17 Categories** | 6 income · 11 expense, each with emoji icons |
| 🌑 **Dark UI** | Slate-based dark palette, works without `prefers-color-scheme` |
| 💾 **localStorage** | Auto-saves on every change; survives refresh & offline use |

---

## Project Structure

```
expense-tracker/
├── src/
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Entry point
│   ├── index.css                  # Tailwind directives
│   ├── types.ts                   # Shared TypeScript types
│   ├── vite-env.d.ts              # Vite environment types
│   ├── hooks/
│   │   └── useTransactions.ts     # localStorage hook
│   ├── data/
│   │   └── categories.ts          # Category definitions
│   └── components/
│       ├── Dashboard.tsx          # Summary cards
│       ├── AddTransactionForm.tsx # Form with category picker
│       └── TransactionList.tsx    # Transaction list with delete
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── package.json
```

---

## Running (via Antigravity's bundled Node)

Because this machine's PATH doesn't have a system `node`/`npm`, use the helper scripts that invoke the Electron-based Node bundled with Antigravity:

### Dev Server

```sh
# In the project root:
~/Library/Application\ Support/Antigravity/bin/agy-node dev.cjs
```

Then open **http://localhost:5173** in your browser.

### Production Build

```sh
~/Library/Application\ Support/Antigravity/bin/agy-node build.cjs
# Output → dist/
```

---

## Running with system Node (if available)

```sh
npm install
npm run dev      # → http://localhost:5173
npm run build    # → dist/
```
