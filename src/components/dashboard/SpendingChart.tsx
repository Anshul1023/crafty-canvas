import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Jan", expenses: 2400, income: 4000 },
  { name: "Feb", expenses: 1398, income: 3000 },
  { name: "Mar", expenses: 3800, income: 5000 },
  { name: "Apr", expenses: 3908, income: 4780 },
  { name: "May", expenses: 2800, income: 5890 },
  { name: "Jun", expenses: 3800, income: 4390 },
  { name: "Jul", expenses: 2500, income: 4490 },
  { name: "Aug", expenses: 2900, income: 5200 },
  { name: "Sep", expenses: 3200, income: 4800 },
  { name: "Oct", expenses: 2800, income: 5100 },
  { name: "Nov", expenses: 3400, income: 5300 },
  { name: "Dec", expenses: 2100, income: 5500 },
];

export function SpendingChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Spending Overview</h3>
          <p className="text-sm text-muted-foreground">Income vs Expenses</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="text-xs">
            Monthly
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Weekly
          </Button>
        </div>
      </div>
      
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(142, 70%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 90%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(220, 10%, 50%)', fontSize: 12 }}
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(220, 14%, 90%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
              formatter={(value: number, name: string) => [
                `₹${value.toLocaleString()}`,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(142, 70%, 45%)"
              strokeWidth={2}
              fill="url(#incomeGradient)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(217, 91%, 60%)"
              strokeWidth={2}
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-info" />
          <span className="text-sm text-muted-foreground">Expenses</span>
        </div>
      </div>
    </div>
  );
}
