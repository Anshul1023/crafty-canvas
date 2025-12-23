import { AppLayout } from "@/components/layout/AppLayout";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { name: "Jan", expenses: 2400 },
  { name: "Feb", expenses: 1398 },
  { name: "Mar", expenses: 3800 },
  { name: "Apr", expenses: 3908 },
  { name: "May", expenses: 2800 },
  { name: "Jun", expenses: 3800 },
  { name: "Jul", expenses: 2500 },
  { name: "Aug", expenses: 2900 },
  { name: "Sep", expenses: 3200 },
  { name: "Oct", expenses: 2800 },
  { name: "Nov", expenses: 3400 },
  { name: "Dec", expenses: 2100 },
];

const categoryData = [
  { name: "Food & Drinks", value: 450, color: "hsl(142, 70%, 45%)" },
  { name: "Transport", value: 180, color: "hsl(217, 91%, 60%)" },
  { name: "Entertainment", value: 120, color: "hsl(280, 65%, 60%)" },
  { name: "Shopping", value: 340, color: "hsl(38, 92%, 50%)" },
  { name: "Utilities", value: 220, color: "hsl(340, 75%, 55%)" },
];

const Analytics = () => {
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Insights into your spending patterns</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Average Monthly Spending</p>
            <p className="text-2xl font-bold text-foreground mt-1">$2,917</p>
            <p className="text-xs text-success mt-1">-8% from last year</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Highest Spending Month</p>
            <p className="text-2xl font-bold text-foreground mt-1">April</p>
            <p className="text-xs text-muted-foreground mt-1">$3,908 total</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-sm text-muted-foreground">Top Category</p>
            <p className="text-2xl font-bold text-foreground mt-1">Food & Drinks</p>
            <p className="text-xs text-muted-foreground mt-1">34% of spending</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Monthly Spending Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 14%, 90%)', borderRadius: '8px' }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Expenses']}
                  />
                  <Area type="monotone" dataKey="expenses" stroke="hsl(142, 70%, 45%)" strokeWidth={2} fill="url(#expenseGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground mb-4">Spending by Category</h3>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`$${value}`, name]}
                    contentStyle={{ backgroundColor: 'hsl(0, 0%, 100%)', border: '1px solid hsl(220, 14%, 90%)', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-xs text-muted-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
