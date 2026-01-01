import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";
import { InsightsCard } from "@/components/dashboard/InsightsCard";
import { useExpenses } from "@/contexts/ExpenseContext";

const Index = () => {
  const { getTotalSpent, getTotalBudget } = useExpenses();
  
  const totalSpent = getTotalSpent();
  const totalBudget = getTotalBudget();
  const remaining = totalBudget - totalSpent;

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your finances today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Monthly Budget"
            value={`₹${totalBudget.toLocaleString("en-IN")}`}
            change="This month"
            changeType="neutral"
            icon={Wallet}
            iconBgClass="bg-primary/10"
          />
          <StatCard
            title="Total Spent"
            value={`₹${totalSpent.toLocaleString("en-IN")}`}
            change={`${totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0}% of budget`}
            changeType={totalSpent > totalBudget ? "negative" : "neutral"}
            icon={TrendingUp}
            iconBgClass="bg-info/10"
          />
          <StatCard
            title="Remaining"
            value={`₹${Math.abs(remaining).toLocaleString("en-IN")}`}
            change={remaining >= 0 ? "Available" : "Over budget"}
            changeType={remaining >= 0 ? "positive" : "negative"}
            icon={TrendingDown}
            iconBgClass={remaining >= 0 ? "bg-success/10" : "bg-destructive/10"}
          />
          <StatCard
            title="Savings Goal"
            value="₹10,000"
            change="Target"
            changeType="neutral"
            icon={PiggyBank}
            iconBgClass="bg-warning/10"
          />
        </div>

        {/* Charts & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <div>
            <InsightsCard />
          </div>
        </div>

        {/* Category Breakdown & Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryBreakdown />
          <UpcomingBills />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />
      </div>
    </AppLayout>
  );
};

export default Index;
