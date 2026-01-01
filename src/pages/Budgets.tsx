import { useState } from "react";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useExpenses, Budget } from "@/contexts/ExpenseContext";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { FloatingAddButton } from "@/components/common/FloatingAddButton";

const availableCategories = [
  "Food & Drinks",
  "Transport",
  "Entertainment",
  "Shopping",
  "Utilities",
  "Health",
  "Education",
  "Other",
];

const colorOptions = [
  { value: "bg-chart-1", label: "Orange" },
  { value: "bg-chart-2", label: "Teal" },
  { value: "bg-chart-3", label: "Blue" },
  { value: "bg-chart-4", label: "Yellow" },
  { value: "bg-chart-5", label: "Red" },
  { value: "bg-primary", label: "Primary" },
];

type BudgetState = "normal" | "warning" | "exceeded";

const getBudgetState = (percentage: number): BudgetState => {
  if (percentage >= 100) return "exceeded";
  if (percentage >= 80) return "warning";
  return "normal";
};

const budgetStateStyles: Record<BudgetState, { badge: string; progress: string; text: string }> = {
  normal: {
    badge: "bg-success/10 text-success",
    progress: "bg-success",
    text: "On Track",
  },
  warning: {
    badge: "bg-warning/10 text-warning",
    progress: "bg-warning",
    text: "Nearing Limit",
  },
  exceeded: {
    badge: "bg-destructive/10 text-destructive",
    progress: "bg-destructive",
    text: "Over Budget",
  },
};

const Budgets = () => {
  const { budgets, getSpentByCategory, getTotalSpent, getTotalBudget, addBudget, updateBudget, deleteBudget } = useExpenses();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // Form state
  const [formCategory, setFormCategory] = useState("");
  const [formLimit, setFormLimit] = useState("");
  const [formColor, setFormColor] = useState("bg-chart-1");

  const totalBudget = getTotalBudget();
  const totalSpent = getTotalSpent();
  const remaining = totalBudget - totalSpent;
  const overallPercentage = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;
  const overallState = getBudgetState(overallPercentage);

  const existingCategories = budgets.map((b) => b.category);
  const availableCategoriesForNew = availableCategories.filter(
    (c) => !existingCategories.includes(c)
  );

  const resetForm = () => {
    setFormCategory("");
    setFormLimit("");
    setFormColor("bg-chart-1");
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setEditingBudget(null);
    setIsAddDialogOpen(true);
  };

  const handleOpenEditDialog = (budget: Budget) => {
    setFormCategory(budget.category);
    setFormLimit(budget.limit.toString());
    setFormColor(budget.color);
    setEditingBudget(budget);
    setIsAddDialogOpen(true);
  };

  const handleSubmit = () => {
    const limit = parseFloat(formLimit);
    if (!formCategory || isNaN(limit) || limit <= 0) {
      toast.error("Please fill all fields correctly");
      return;
    }

    if (editingBudget) {
      updateBudget(editingBudget.id, { limit, color: formColor });
      toast.success("Budget updated successfully");
    } else {
      addBudget({ category: formCategory, limit, color: formColor });
      toast.success("Budget created successfully");
    }

    setIsAddDialogOpen(false);
    resetForm();
    setEditingBudget(null);
  };

  const handleDelete = (id: string) => {
    deleteBudget(id);
    toast.success("Budget deleted successfully");
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in pb-20 md:pb-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Budget Guardian</h1>
            <p className="text-muted-foreground mt-1">Set limits and prevent overspending</p>
          </div>
          <Button 
            className="gradient-primary border-0 gap-2 hidden md:flex"
            onClick={handleOpenAddDialog}
          >
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
            <div className="flex items-center justify-between mb-2">
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full", budgetStateStyles[overallState].badge)}>
                {budgetStateStyles[overallState].text}
              </span>
              <span className="text-sm text-muted-foreground">{overallPercentage}%</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", budgetStateStyles[overallState].progress)} 
                style={{ width: `${Math.min(overallPercentage, 100)}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Budget Cards - Spent auto-calculated from expenses */}
        {budgets.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <p className="text-muted-foreground">No budgets set yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Create a budget to start tracking your spending limits
            </p>
            <Button 
              className="gradient-primary border-0 gap-2 mt-4"
              onClick={handleOpenAddDialog}
            >
              <Plus className="w-4 h-4" />
              Create Your First Budget
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgets.map((budget) => {
              const spent = getSpentByCategory(budget.category);
              const percentage = budget.limit > 0 ? Math.round((spent / budget.limit) * 100) : 0;
              const state = getBudgetState(percentage);
              const remaining = budget.limit - spent;
              
              return (
                <div key={budget.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">{budget.category}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "text-xs font-medium px-2 py-1 rounded-full",
                        budgetStateStyles[state].badge
                      )}>
                        {budgetStateStyles[state].text}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={() => handleOpenEditDialog(budget)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="gap-2 text-destructive"
                            onClick={() => handleDelete(budget.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-bold text-foreground">
                        ₹{spent.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        of ₹{budget.limit.toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", budgetStateStyles[state].progress)}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className={cn(
                        remaining >= 0 ? "text-muted-foreground" : "text-destructive font-medium"
                      )}>
                        {remaining >= 0 
                          ? `₹${remaining.toLocaleString("en-IN")} left`
                          : `₹${Math.abs(remaining).toLocaleString("en-IN")} over`
                        }
                      </span>
                      <span className="text-muted-foreground">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Add Button for Mobile */}
      <FloatingAddButton onClick={handleOpenAddDialog} />

      {/* Add/Edit Budget Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {editingBudget ? "Edit Budget" : "Create Budget"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Category</Label>
              {editingBudget ? (
                <Input value={formCategory} disabled />
              ) : (
                <Select value={formCategory} onValueChange={setFormCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCategoriesForNew.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="space-y-2">
              <Label>Monthly Limit (₹)</Label>
              <Input
                type="number"
                placeholder="e.g., 5000"
                value={formLimit}
                onChange={(e) => setFormLimit(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Color</Label>
              <Select value={formColor} onValueChange={setFormColor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-2">
                        <div className={cn("w-4 h-4 rounded-full", color.value)} />
                        {color.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 gradient-primary border-0"
                onClick={handleSubmit}
              >
                {editingBudget ? "Save Changes" : "Create Budget"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Budgets;
