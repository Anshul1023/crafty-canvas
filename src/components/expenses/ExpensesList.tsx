import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const expenses = [
  { id: 1, name: "Netflix Subscription", category: "Entertainment", date: "Dec 23, 2024", amount: 15.99, icon: "🎬" },
  { id: 2, name: "Grocery Store", category: "Food & Drinks", date: "Dec 21, 2024", amount: 127.45, icon: "🛒" },
  { id: 3, name: "Uber Ride", category: "Transport", date: "Dec 21, 2024", amount: 24.50, icon: "🚗" },
  { id: 4, name: "Amazon Purchase", category: "Shopping", date: "Dec 20, 2024", amount: 89.99, icon: "📦" },
  { id: 5, name: "Coffee Shop", category: "Food & Drinks", date: "Dec 19, 2024", amount: 8.50, icon: "☕" },
  { id: 6, name: "Gas Station", category: "Transport", date: "Dec 18, 2024", amount: 45.00, icon: "⛽" },
  { id: 7, name: "Gym Membership", category: "Health", date: "Dec 15, 2024", amount: 50.00, icon: "💪" },
  { id: 8, name: "Restaurant Dinner", category: "Food & Drinks", date: "Dec 14, 2024", amount: 85.00, icon: "🍽️" },
];

const categoryColors: Record<string, string> = {
  "Entertainment": "bg-chart-3/10 text-chart-3",
  "Food & Drinks": "bg-chart-1/10 text-chart-1",
  "Transport": "bg-chart-2/10 text-chart-2",
  "Shopping": "bg-chart-4/10 text-chart-4",
  "Health": "bg-chart-5/10 text-chart-5",
};

export function ExpensesList() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Transaction</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Date</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Amount</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                      {expense.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{expense.name}</p>
                      <p className="text-xs text-muted-foreground sm:hidden">{expense.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full",
                    categoryColors[expense.category] || "bg-muted text-muted-foreground"
                  )}>
                    {expense.category}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground hidden md:table-cell">
                  {expense.date}
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold text-foreground">-${expense.amount.toFixed(2)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 text-destructive">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
