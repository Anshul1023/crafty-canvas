import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    name: "Netflix Subscription",
    category: "Entertainment",
    date: "Dec 23, 2024",
    amount: -15.99,
    icon: "🎬",
  },
  {
    id: 2,
    name: "Salary Deposit",
    category: "Income",
    date: "Dec 22, 2024",
    amount: 5500.00,
    icon: "💰",
  },
  {
    id: 3,
    name: "Grocery Store",
    category: "Food & Drinks",
    date: "Dec 21, 2024",
    amount: -127.45,
    icon: "🛒",
  },
  {
    id: 4,
    name: "Uber Ride",
    category: "Transport",
    date: "Dec 21, 2024",
    amount: -24.50,
    icon: "🚗",
  },
  {
    id: 5,
    name: "Amazon Purchase",
    category: "Shopping",
    date: "Dec 20, 2024",
    amount: -89.99,
    icon: "📦",
  },
];

export function RecentTransactions() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Your latest activity</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                {transaction.icon}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{transaction.name}</p>
                <p className="text-xs text-muted-foreground">{transaction.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={cn(
                  "font-semibold text-sm",
                  transaction.amount > 0 ? "text-success" : "text-foreground"
                )}>
                  {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">{transaction.date}</p>
              </div>
              <div className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center",
                transaction.amount > 0 ? "bg-success/10" : "bg-destructive/10"
              )}>
                {transaction.amount > 0 ? (
                  <ArrowDownRight className="w-3 h-3 text-success" />
                ) : (
                  <ArrowUpRight className="w-3 h-3 text-destructive" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
