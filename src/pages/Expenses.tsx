import { useState } from "react";
import { Plus, Filter, Download, Search } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpensesList } from "@/components/expenses/ExpensesList";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { FloatingAddButton } from "@/components/common/FloatingAddButton";
import { useExpenses, Expense } from "@/contexts/ExpenseContext";
import { toast } from "sonner";

const Expenses = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { expenses, addExpense } = useExpenses();

  const lastCategory = expenses.length > 0 ? expenses[0].category : "Food & Drinks";

  const handleAddExpense = (data: Omit<Expense, "id">) => {
    addExpense(data);
    toast.success("Expense added successfully");
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Expenses</h1>
            <p className="text-muted-foreground mt-1">Track and manage your spending</p>
          </div>
          <Button 
            className="gradient-primary border-0 gap-2 hidden md:flex"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Expense
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search expenses..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Expenses List */}
        <ExpensesList />
      </div>

      {/* Floating Add Button for Mobile */}
      <FloatingAddButton onClick={() => setIsAddDialogOpen(true)} />

      {/* Add Expense Dialog */}
      <AddExpenseDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddExpense}
        lastCategory={lastCategory}
      />
    </AppLayout>
  );
};

export default Expenses;
