import { cn } from "@/lib/utils";
import { useExpenses } from "@/contexts/ExpenseContext";

type BudgetState = "normal" | "warning" | "exceeded";

const getBudgetState = (percentage: number): BudgetState => {
  if (percentage >= 100) return "exceeded";
  if (percentage >= 80) return "warning";
  return "normal";
};

const stateColors: Record<BudgetState, string> = {
  normal: "bg-success",
  warning: "bg-warning",
  exceeded: "bg-destructive",
};

export function CategoryBreakdown() {
  const { budgets, getSpentByCategory } = useExpenses();

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Budget by Category</h3>
        <p className="text-sm text-muted-foreground">This month's spending</p>
      </div>
      
      <div className="space-y-4">
        {budgets.slice(0, 5).map((budget) => {
          const spent = getSpentByCategory(budget.category);
          const percentage = budget.limit > 0 ? Math.round((spent / budget.limit) * 100) : 0;
          const state = getBudgetState(percentage);
          
          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{budget.category}</span>
                <span className="text-muted-foreground">
                  ₹{spent.toLocaleString("en-IN")}{" "}
                  <span className="text-muted-foreground/60">
                    / ₹{budget.limit.toLocaleString("en-IN")}
                  </span>
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", stateColors[state])}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
