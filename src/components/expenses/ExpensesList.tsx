import { useState } from "react";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useExpenses, Expense } from "@/contexts/ExpenseContext";
import { AddExpenseDialog } from "./AddExpenseDialog";
import { DeleteExpenseDialog } from "./DeleteExpenseDialog";
import { toast } from "sonner";

const categoryColors: Record<string, string> = {
  "Entertainment": "bg-chart-3/10 text-chart-3",
  "Food & Drinks": "bg-chart-1/10 text-chart-1",
  "Transport": "bg-chart-2/10 text-chart-2",
  "Shopping": "bg-chart-4/10 text-chart-4",
  "Health": "bg-chart-5/10 text-chart-5",
  "Utilities": "bg-primary/10 text-primary",
  "Education": "bg-info/10 text-info",
  "Other": "bg-muted text-muted-foreground",
};

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

export function ExpensesList() {
  const { expenses, addExpense, deleteExpense } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [deletingExpense, setDeletingExpense] = useState<Expense | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const lastCategory = expenses.length > 0 ? expenses[0].category : "Food & Drinks";

  const handleAddExpense = (data: Omit<Expense, "id">) => {
    addExpense(data);
    toast.success("Expense added successfully");
  };

  const handleEditExpense = (data: Omit<Expense, "id">) => {
    if (editingExpense) {
      // Delete old and add new with same logic
      deleteExpense(editingExpense.id);
      addExpense(data);
      toast.success("Expense updated successfully");
      setEditingExpense(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingExpense) {
      deleteExpense(deletingExpense.id);
      toast.success("Expense deleted successfully");
      setDeletingExpense(null);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <>
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
              {expenses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center">
                    <p className="text-muted-foreground">No expenses yet</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      Click "Add Expense" to record your first expense
                    </p>
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-lg">
                          {categoryIcons[expense.category] || "📦"}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{expense.description}</p>
                          <div className="flex items-center gap-2 sm:hidden">
                            <span className={cn(
                              "text-xs font-medium px-2 py-0.5 rounded-full",
                              categoryColors[expense.category] || "bg-muted text-muted-foreground"
                            )}>
                              {expense.category}
                            </span>
                          </div>
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
                      {formatDate(expense.date)}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold text-foreground">-₹{expense.amount.toLocaleString("en-IN")}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => setEditingExpense(expense)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => setDeletingExpense(expense)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <AddExpenseDialog
        open={isAddDialogOpen || !!editingExpense}
        onOpenChange={(open) => {
          if (!open) {
            setIsAddDialogOpen(false);
            setEditingExpense(null);
          }
        }}
        onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
        expense={editingExpense}
        lastCategory={lastCategory}
      />

      {/* Delete Confirmation */}
      <DeleteExpenseDialog
        open={!!deletingExpense}
        onOpenChange={(open) => !open && setDeletingExpense(null)}
        onConfirm={handleDeleteConfirm}
        expenseName={deletingExpense?.description}
      />
    </>
  );
}

// Export a way to open the add dialog from parent
export { ExpensesList as default };
