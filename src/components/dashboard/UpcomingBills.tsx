import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bills = [
  {
    id: 1,
    name: "Electricity Bill",
    amount: 125.00,
    dueDate: "Dec 25, 2024",
    status: "due-soon",
    daysLeft: 2,
  },
  {
    id: 2,
    name: "Internet Service",
    amount: 79.99,
    dueDate: "Dec 28, 2024",
    status: "upcoming",
    daysLeft: 5,
  },
  {
    id: 3,
    name: "Rent Payment",
    amount: 1500.00,
    dueDate: "Jan 01, 2025",
    status: "upcoming",
    daysLeft: 9,
  },
  {
    id: 4,
    name: "Phone Bill",
    amount: 45.00,
    dueDate: "Dec 20, 2024",
    status: "paid",
    daysLeft: 0,
  },
];

export function UpcomingBills() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-border">
        <div>
          <h3 className="font-semibold text-foreground">Upcoming Bills</h3>
          <p className="text-sm text-muted-foreground">Don't miss payments</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>
      
      <div className="divide-y divide-border">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                bill.status === "due-soon" && "bg-warning/10",
                bill.status === "upcoming" && "bg-info/10",
                bill.status === "paid" && "bg-success/10"
              )}>
                {bill.status === "due-soon" && <AlertCircle className="w-5 h-5 text-warning" />}
                {bill.status === "upcoming" && <Clock className="w-5 h-5 text-info" />}
                {bill.status === "paid" && <CheckCircle2 className="w-5 h-5 text-success" />}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{bill.name}</p>
                <p className="text-xs text-muted-foreground">{bill.dueDate}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-foreground text-sm">₹{bill.amount.toFixed(2)}</p>
              {bill.status === "paid" ? (
                <span className="text-xs text-success font-medium">Paid</span>
              ) : (
                <span className={cn(
                  "text-xs font-medium",
                  bill.status === "due-soon" ? "text-warning" : "text-muted-foreground"
                )}>
                  {bill.daysLeft} days left
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
