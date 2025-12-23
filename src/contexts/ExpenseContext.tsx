import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  color: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateBudget: (id: string, updates: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;
  getSpentByCategory: (category: string) => number;
  getTotalSpent: () => number;
  getTotalBudget: () => number;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Sample data - replace with API calls to your backend
const initialExpenses: Expense[] = [
  { id: "1", description: "Grocery Shopping", amount: 2500, category: "Food & Drinks", date: "2024-01-15", paymentMethod: "UPI" },
  { id: "2", description: "Restaurant Dinner", amount: 1800, category: "Food & Drinks", date: "2024-01-14", paymentMethod: "Card" },
  { id: "3", description: "Metro Card Recharge", amount: 500, category: "Transport", date: "2024-01-13", paymentMethod: "UPI" },
  { id: "4", description: "Uber Rides", amount: 1200, category: "Transport", date: "2024-01-12", paymentMethod: "Card" },
  { id: "5", description: "Netflix Subscription", amount: 649, category: "Entertainment", date: "2024-01-10", paymentMethod: "Card" },
  { id: "6", description: "Movie Tickets", amount: 800, category: "Entertainment", date: "2024-01-08", paymentMethod: "UPI" },
  { id: "7", description: "Amazon Shopping", amount: 3500, category: "Shopping", date: "2024-01-07", paymentMethod: "Card" },
  { id: "8", description: "Electricity Bill", amount: 2200, category: "Utilities", date: "2024-01-05", paymentMethod: "Net Banking" },
  { id: "9", description: "Medicine", amount: 450, category: "Health", date: "2024-01-03", paymentMethod: "UPI" },
];

const initialBudgets: Budget[] = [
  { id: "1", category: "Food & Drinks", limit: 8000, color: "bg-chart-1" },
  { id: "2", category: "Transport", limit: 3000, color: "bg-chart-2" },
  { id: "3", category: "Entertainment", limit: 2000, color: "bg-chart-3" },
  { id: "4", category: "Shopping", limit: 5000, color: "bg-chart-4" },
  { id: "5", category: "Utilities", limit: 4000, color: "bg-chart-5" },
  { id: "6", category: "Health", limit: 2000, color: "bg-primary" },
];

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);

  const addExpense = (expense: Omit<Expense, "id">) => {
    // TODO: Replace with API call
    // await fetch('/api/expenses', { method: 'POST', body: JSON.stringify(expense) })
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    // TODO: Replace with API call
    // await fetch(`/api/expenses/${id}`, { method: 'DELETE' })
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const addBudget = (budget: Omit<Budget, "id">) => {
    // TODO: Replace with API call
    const newBudget = { ...budget, id: Date.now().toString() };
    setBudgets((prev) => [...prev, newBudget]);
  };

  const updateBudget = (id: string, updates: Partial<Budget>) => {
    // TODO: Replace with API call
    setBudgets((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBudget = (id: string) => {
    // TODO: Replace with API call
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };

  // Auto-calculate spent amount by category
  const getSpentByCategory = (category: string): number => {
    return expenses
      .filter((e) => e.category === category)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getTotalSpent = (): number => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const getTotalBudget = (): number => {
    return budgets.reduce((sum, b) => sum + b.limit, 0);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budgets,
        addExpense,
        deleteExpense,
        addBudget,
        updateBudget,
        deleteBudget,
        getSpentByCategory,
        getTotalSpent,
        getTotalBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}
