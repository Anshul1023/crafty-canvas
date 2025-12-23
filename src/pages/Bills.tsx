import { Plus, Filter, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { BillsList } from "@/components/bills/BillsList";

const Bills = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Bills & Reminders</h1>
            <p className="text-muted-foreground mt-1">Never miss a payment deadline</p>
          </div>
          <Button className="gradient-primary border-0 gap-2">
            <Plus className="w-4 h-4" />
            Add Bill
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
            <p className="text-sm text-warning font-medium">Due Soon</p>
            <p className="text-2xl font-bold text-foreground mt-1">$204.99</p>
            <p className="text-xs text-muted-foreground mt-1">2 bills in next 3 days</p>
          </div>
          <div className="bg-info/10 border border-info/20 rounded-xl p-4">
            <p className="text-sm text-info font-medium">Upcoming</p>
            <p className="text-2xl font-bold text-foreground mt-1">$1,579.99</p>
            <p className="text-xs text-muted-foreground mt-1">4 bills this month</p>
          </div>
          <div className="bg-success/10 border border-success/20 rounded-xl p-4">
            <p className="text-sm text-success font-medium">Paid This Month</p>
            <p className="text-2xl font-bold text-foreground mt-1">$890.00</p>
            <p className="text-xs text-muted-foreground mt-1">6 bills completed</p>
          </div>
        </div>

        {/* Bills List */}
        <BillsList />
      </div>
    </AppLayout>
  );
};

export default Bills;
