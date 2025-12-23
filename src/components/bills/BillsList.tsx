import { AlertCircle, CheckCircle2, Clock, MoreHorizontal, Bell, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const bills = [
  {
    id: 1,
    name: "Electricity Bill",
    provider: "City Power Co.",
    amount: 125.00,
    dueDate: "Dec 25, 2024",
    status: "due-soon",
    daysLeft: 2,
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 2,
    name: "Internet Service",
    provider: "FastNet Inc.",
    amount: 79.99,
    dueDate: "Dec 28, 2024",
    status: "upcoming",
    daysLeft: 5,
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 3,
    name: "Rent Payment",
    provider: "Sunset Apartments",
    amount: 1500.00,
    dueDate: "Jan 01, 2025",
    status: "upcoming",
    daysLeft: 9,
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 4,
    name: "Phone Bill",
    provider: "Mobile Plus",
    amount: 45.00,
    dueDate: "Dec 20, 2024",
    status: "paid",
    daysLeft: 0,
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 5,
    name: "Gym Membership",
    provider: "FitLife Gym",
    amount: 50.00,
    dueDate: "Dec 15, 2024",
    status: "paid",
    daysLeft: 0,
    isRecurring: true,
    frequency: "Monthly",
  },
  {
    id: 6,
    name: "Car Insurance",
    provider: "SafeDrive Insurance",
    amount: 180.00,
    dueDate: "Jan 05, 2025",
    status: "upcoming",
    daysLeft: 13,
    isRecurring: true,
    frequency: "Monthly",
  },
];

export function BillsList() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Bill</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden md:table-cell">Due Date</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground hidden sm:table-cell">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Amount</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {bills.map((bill) => (
              <tr key={bill.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
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
                      <p className="font-medium text-foreground">{bill.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{bill.provider}</p>
                        {bill.isRecurring && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Repeat className="w-3 h-3" />
                            {bill.frequency}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 hidden md:table-cell">
                  <p className="text-sm text-foreground">{bill.dueDate}</p>
                  {bill.status !== "paid" && (
                    <p className={cn(
                      "text-xs font-medium",
                      bill.status === "due-soon" ? "text-warning" : "text-muted-foreground"
                    )}>
                      {bill.daysLeft} days left
                    </p>
                  )}
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  <span className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full",
                    bill.status === "due-soon" && "bg-warning/10 text-warning",
                    bill.status === "upcoming" && "bg-info/10 text-info",
                    bill.status === "paid" && "bg-success/10 text-success"
                  )}>
                    {bill.status === "due-soon" && "Due Soon"}
                    {bill.status === "upcoming" && "Upcoming"}
                    {bill.status === "paid" && "Paid"}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="font-semibold text-foreground">${bill.amount.toFixed(2)}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  {bill.status !== "paid" ? (
                    <Button size="sm" variant="outline" className="gap-1">
                      Pay Now
                    </Button>
                  ) : (
                    <span className="text-xs text-success font-medium">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
