import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExpenses } from "@/contexts/ExpenseContext";

const Budgets = () => {
  const { budgets, getSpentByCategory, getTotalSpent, getTotalBudget } = useExpenses();

  const totalBudget = getTotalBudget();
  const totalSpent = getTotalSpent();
  const remaining = totalBudget - totalSpent;
  const overallPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Budgets</h1>
            <p className="text-muted-foreground mt-1">Set and track spending limits</p>
          </div>
          <Button className="gradient-primary border-0 gap-2">
            <Plus className="w-4 h-4" />
            Create Budget
          </Button>
        </div>

        {/* Summary - Auto-calculated */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Monthly Budget</p>
              <p className="text-3xl font-bold text-foreground">₹{totalBudget.toLocaleString("en-IN")}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Spent so far</p>
              <p className="text-3xl font-bold text-foreground">₹{totalSpent.toLocaleString("en-IN")}</p>
              <p className={cn("text-sm", remaining >= 0 ? "text-success" : "text-destructive")}>
                {remaining >= 0 ? `₹${remaining.toLocaleString("en-IN")} remaining` : `₹${Math.abs(remaining).toLocaleString("en-IN")} over budget`}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full", overallPercentage > 100 ? "bg-destructive" : "gradient-primary")} 
                style={{ width: `${Math.min(overallPercentage, 100)}%` }} 
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">{overallPercentage}% of budget used</p>
          </div>
        </div>

        {/* Budget Cards - Spent auto-calculated from expenses */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const spent = getSpentByCategory(budget.category);
            const percentage = budget.limit > 0 ? Math.round((spent / budget.limit) * 100) : 0;
            const isOverBudget = percentage >= 90;
            
            return (
              <div key={budget.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">{budget.category}</h3>
                  <span className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    isOverBudget ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success"
                  )}>
                    {percentage}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Spent</span>
                    <span className="font-medium text-foreground">₹{spent.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", budget.color)}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Limit</span>
                    <span className="text-muted-foreground">₹{budget.limit.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Budgets;
