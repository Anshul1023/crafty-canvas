import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExpenses } from "@/contexts/ExpenseContext";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

const categoryIcons: Record<string, string> = {
  "Entertainment": "🎬",
  "Food & Drinks": "🍽️",
  "Transport": "🚗",
  "Shopping": "🛒",
  "Health": "💊",
  "Utilities": "💡",
  "Education": "📚",
  "Other": "📦",
};

export function RecentTransactions() {
  const { expenses } = useExpenses();
  const navigate = useNavigate();
  
  const recentExpenses = expenses.slice(0, 5);

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Your latest activity</p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary"
          onClick={() => navigate("/expenses")}
        >
          View All
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {recentExpenses.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-muted-foreground text-sm">No transactions yet</p>
          </div>
        ) : (
          recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                  {categoryIcons[expense.category] || "📦"}
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{expense.description}</p>
                  <p className="text-xs text-muted-foreground">{expense.category}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold text-sm text-foreground">
                    -₹{expense.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(expense.date)}</p>
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-destructive/10">
                  <ArrowUpRight className="w-3 h-3 text-destructive" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
