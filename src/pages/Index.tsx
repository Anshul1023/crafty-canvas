import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { UpcomingBills } from "@/components/dashboard/UpcomingBills";

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your finances today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Balance"
            value="$24,563.00"
            change="+12.5%"
            changeType="positive"
            icon={Wallet}
            iconBgClass="bg-primary/10"
          />
          <StatCard
            title="Monthly Income"
            value="$5,500.00"
            change="+8.2%"
            changeType="positive"
            icon={TrendingUp}
            iconBgClass="bg-success/10"
          />
          <StatCard
            title="Monthly Expenses"
            value="$2,847.50"
            change="-4.3%"
            changeType="positive"
            icon={TrendingDown}
            iconBgClass="bg-info/10"
          />
          <StatCard
            title="Savings Goal"
            value="$8,200.00"
            change="82%"
            changeType="neutral"
            icon={PiggyBank}
            iconBgClass="bg-warning/10"
          />
        </div>

        {/* Charts & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SpendingChart />
          </div>
          <div>
            <CategoryBreakdown />
          </div>
        </div>

        {/* Transactions & Bills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions />
          <UpcomingBills />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
