import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const budgets = [
  { id: 1, name: "Food & Drinks", spent: 450, limit: 600, color: "bg-chart-1" },
  { id: 2, name: "Transport", spent: 180, limit: 200, color: "bg-chart-2" },
  { id: 3, name: "Entertainment", spent: 120, limit: 150, color: "bg-chart-3" },
  { id: 4, name: "Shopping", spent: 340, limit: 400, color: "bg-chart-4" },
  { id: 5, name: "Utilities", spent: 220, limit: 250, color: "bg-chart-5" },
  { id: 6, name: "Health", spent: 50, limit: 100, color: "bg-primary" },
];

const Budgets = () => {
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

        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Monthly Budget</p>
              <p className="text-3xl font-bold text-foreground">₹1,700.00</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Spent so far</p>
              <p className="text-3xl font-bold text-foreground">₹1,360.00</p>
              <p className="text-sm text-success">₹340.00 remaining</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full gradient-primary rounded-full" style={{ width: "80%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">80% of budget used</p>
          </div>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const percentage = Math.round((budget.spent / budget.limit) * 100);
            const isOverBudget = percentage >= 90;
            
            return (
              <div key={budget.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">{budget.name}</h3>
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
                    <span className="font-medium text-foreground">₹{budget.spent}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all", budget.color)}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Limit</span>
                    <span className="text-muted-foreground">₹{budget.limit}</span>
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
