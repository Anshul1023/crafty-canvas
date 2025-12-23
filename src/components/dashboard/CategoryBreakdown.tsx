import { cn } from "@/lib/utils";

const categories = [
  { name: "Food & Drinks", amount: 450, budget: 600, color: "bg-chart-1", percentage: 75 },
  { name: "Transport", amount: 180, budget: 200, color: "bg-chart-2", percentage: 90 },
  { name: "Entertainment", amount: 120, budget: 150, color: "bg-chart-3", percentage: 80 },
  { name: "Shopping", amount: 340, budget: 400, color: "bg-chart-4", percentage: 85 },
  { name: "Utilities", amount: 220, budget: 250, color: "bg-chart-5", percentage: 88 },
];

export function CategoryBreakdown() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Budget by Category</h3>
        <p className="text-sm text-muted-foreground">This month's spending</p>
      </div>
      
      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{category.name}</span>
              <span className="text-muted-foreground">
                ${category.amount} <span className="text-muted-foreground/60">/ ${category.budget}</span>
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all duration-500", category.color)}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
