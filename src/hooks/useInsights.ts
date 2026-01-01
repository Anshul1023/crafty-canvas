import { useMemo } from "react";
import { useExpenses, Expense } from "@/contexts/ExpenseContext";
import { parseISO, format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";

interface Insight {
  id: string;
  type: "spending" | "saving" | "category" | "warning";
  title: string;
  description: string;
  value?: number;
  trend?: "up" | "down" | "neutral";
}

export function useInsights(): Insight[] {
  const { expenses, budgets, getSpentByCategory, getTotalSpent } = useExpenses();

  return useMemo(() => {
    const insights: Insight[] = [];
    const now = new Date();
    
    // Get expenses by month
    const getExpensesInMonth = (date: Date): Expense[] => {
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      return expenses.filter((e) => {
        const expenseDate = parseISO(e.date);
        return isWithinInterval(expenseDate, { start, end });
      });
    };

    const currentMonthExpenses = getExpensesInMonth(now);
    const lastMonthExpenses = getExpensesInMonth(subMonths(now, 1));
    const twoMonthsAgoExpenses = getExpensesInMonth(subMonths(now, 2));

    const currentMonthTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const twoMonthsAgoTotal = twoMonthsAgoExpenses.reduce((sum, e) => sum + e.amount, 0);

    // Month-over-month spending comparison
    if (lastMonthTotal > 0) {
      const percentChange = ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
      
      if (percentChange > 10) {
        insights.push({
          id: "spending-increase",
          type: "warning",
          title: "Spending Alert",
          description: `You've spent ${Math.abs(Math.round(percentChange))}% more this month than last month`,
          value: percentChange,
          trend: "up",
        });
      } else if (percentChange < -10) {
        insights.push({
          id: "spending-decrease",
          type: "saving",
          title: "Great Savings!",
          description: `You've spent ${Math.abs(Math.round(percentChange))}% less this month compared to last month`,
          value: Math.abs(lastMonthTotal - currentMonthTotal),
          trend: "down",
        });
      }
    }

    // Category trend analysis
    const getCategoryTotalInMonth = (category: string, monthExpenses: Expense[]): number => {
      return monthExpenses
        .filter((e) => e.category === category)
        .reduce((sum, e) => sum + e.amount, 0);
    };

    const categories = [...new Set(expenses.map((e) => e.category))];
    
    categories.forEach((category) => {
      const current = getCategoryTotalInMonth(category, currentMonthExpenses);
      const lastMonth = getCategoryTotalInMonth(category, lastMonthExpenses);
      const twoMonthsAgo = getCategoryTotalInMonth(category, twoMonthsAgoExpenses);

      // Check for consecutive increase
      if (current > lastMonth && lastMonth > twoMonthsAgo && twoMonthsAgo > 0) {
        insights.push({
          id: `category-increase-${category}`,
          type: "category",
          title: `${category} Trending Up`,
          description: `${category} spending has increased for 2 consecutive months`,
          trend: "up",
        });
      }
    });

    // Budget warnings
    budgets.forEach((budget) => {
      const spent = getSpentByCategory(budget.category);
      const percentage = (spent / budget.limit) * 100;

      if (percentage >= 100) {
        insights.push({
          id: `budget-exceeded-${budget.id}`,
          type: "warning",
          title: "Budget Exceeded",
          description: `You've exceeded your ${budget.category} budget by ₹${(spent - budget.limit).toLocaleString("en-IN")}`,
          value: spent - budget.limit,
          trend: "up",
        });
      } else if (percentage >= 80) {
        insights.push({
          id: `budget-warning-${budget.id}`,
          type: "warning",
          title: "Budget Warning",
          description: `You've used ${Math.round(percentage)}% of your ${budget.category} budget`,
          value: percentage,
          trend: "neutral",
        });
      }
    });

    // Savings calculation
    if (lastMonthTotal > currentMonthTotal) {
      const saved = lastMonthTotal - currentMonthTotal;
      if (saved > 500) {
        insights.push({
          id: "monthly-savings",
          type: "saving",
          title: "Monthly Savings",
          description: `You saved ₹${saved.toLocaleString("en-IN")} compared to last month`,
          value: saved,
          trend: "down",
        });
      }
    }

    // Top spending category
    if (currentMonthExpenses.length > 0) {
      const categoryTotals = categories.map((cat) => ({
        category: cat,
        total: getCategoryTotalInMonth(cat, currentMonthExpenses),
      }));
      
      const topCategory = categoryTotals.sort((a, b) => b.total - a.total)[0];
      
      if (topCategory && topCategory.total > 0) {
        const percentage = Math.round((topCategory.total / currentMonthTotal) * 100);
        insights.push({
          id: "top-category",
          type: "spending",
          title: "Top Spending",
          description: `${topCategory.category} is your highest expense (${percentage}% of total)`,
          value: topCategory.total,
          trend: "neutral",
        });
      }
    }

    return insights.slice(0, 5); // Limit to 5 insights
  }, [expenses, budgets, getSpentByCategory]);
}
