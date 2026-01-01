import { createContext, useContext, useState, ReactNode } from "react";
import { differenceInDays, parseISO, format, addMonths, addYears } from "date-fns";

export interface Bill {
  id: string;
  name: string;
  provider: string;
  amount: number;
  dueDate: string;
  isRecurring: boolean;
  frequency: "monthly" | "yearly" | "one-time";
  isPaid: boolean;
  paidDate?: string;
}

interface BillsContextType {
  bills: Bill[];
  addBill: (bill: Omit<Bill, "id">) => void;
  updateBill: (id: string, updates: Partial<Bill>) => void;
  deleteBill: (id: string) => void;
  markAsPaid: (id: string) => void;
  getDueSoonBills: () => Bill[];
  getUpcomingBills: () => Bill[];
  getPaidThisMonth: () => Bill[];
  getOverdueBills: () => Bill[];
  getTotalDue: () => number;
}

const BillsContext = createContext<BillsContextType | undefined>(undefined);

const initialBills: Bill[] = [
  {
    id: "1",
    name: "Electricity Bill",
    provider: "City Power Co.",
    amount: 2200,
    dueDate: "2026-01-05",
    isRecurring: true,
    frequency: "monthly",
    isPaid: false,
  },
  {
    id: "2",
    name: "Internet Service",
    provider: "FastNet Inc.",
    amount: 999,
    dueDate: "2026-01-08",
    isRecurring: true,
    frequency: "monthly",
    isPaid: false,
  },
  {
    id: "3",
    name: "Rent Payment",
    provider: "Sunset Apartments",
    amount: 15000,
    dueDate: "2026-01-01",
    isRecurring: true,
    frequency: "monthly",
    isPaid: false,
  },
  {
    id: "4",
    name: "Phone Bill",
    provider: "Mobile Plus",
    amount: 599,
    dueDate: "2025-12-20",
    isRecurring: true,
    frequency: "monthly",
    isPaid: true,
    paidDate: "2025-12-18",
  },
  {
    id: "5",
    name: "Gym Membership",
    provider: "FitLife Gym",
    amount: 1500,
    dueDate: "2025-12-15",
    isRecurring: true,
    frequency: "monthly",
    isPaid: true,
    paidDate: "2025-12-14",
  },
  {
    id: "6",
    name: "Car Insurance",
    provider: "SafeDrive Insurance",
    amount: 12000,
    dueDate: "2026-01-15",
    isRecurring: true,
    frequency: "yearly",
    isPaid: false,
  },
  {
    id: "7",
    name: "Netflix Subscription",
    provider: "Netflix",
    amount: 649,
    dueDate: "2026-01-10",
    isRecurring: true,
    frequency: "monthly",
    isPaid: false,
  },
];

export function BillsProvider({ children }: { children: ReactNode }) {
  const [bills, setBills] = useState<Bill[]>(initialBills);

  const addBill = (bill: Omit<Bill, "id">) => {
    const newBill = { ...bill, id: Date.now().toString() };
    setBills((prev) => [...prev, newBill]);
  };

  const updateBill = (id: string, updates: Partial<Bill>) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const deleteBill = (id: string) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  const markAsPaid = (id: string) => {
    setBills((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        
        const paidBill = {
          ...b,
          isPaid: true,
          paidDate: format(new Date(), "yyyy-MM-dd"),
        };

        // If recurring, create next bill
        if (b.isRecurring && b.frequency !== "one-time") {
          const currentDue = parseISO(b.dueDate);
          const nextDue = b.frequency === "monthly" 
            ? addMonths(currentDue, 1) 
            : addYears(currentDue, 1);
          
          const nextBill: Bill = {
            ...b,
            id: Date.now().toString(),
            dueDate: format(nextDue, "yyyy-MM-dd"),
            isPaid: false,
            paidDate: undefined,
          };
          
          setTimeout(() => {
            setBills((prev) => [...prev, nextBill]);
          }, 0);
        }

        return paidBill;
      })
    );
  };

  const getDueSoonBills = (): Bill[] => {
    const today = new Date();
    return bills.filter((b) => {
      if (b.isPaid) return false;
      const dueDate = parseISO(b.dueDate);
      const daysUntilDue = differenceInDays(dueDate, today);
      return daysUntilDue >= 0 && daysUntilDue <= 3;
    });
  };

  const getUpcomingBills = (): Bill[] => {
    const today = new Date();
    return bills.filter((b) => {
      if (b.isPaid) return false;
      const dueDate = parseISO(b.dueDate);
      const daysUntilDue = differenceInDays(dueDate, today);
      return daysUntilDue > 3 && daysUntilDue <= 30;
    });
  };

  const getOverdueBills = (): Bill[] => {
    const today = new Date();
    return bills.filter((b) => {
      if (b.isPaid) return false;
      const dueDate = parseISO(b.dueDate);
      return differenceInDays(dueDate, today) < 0;
    });
  };

  const getPaidThisMonth = (): Bill[] => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return bills.filter((b) => {
      if (!b.isPaid || !b.paidDate) return false;
      const paidDate = parseISO(b.paidDate);
      return paidDate.getMonth() === currentMonth && paidDate.getFullYear() === currentYear;
    });
  };

  const getTotalDue = (): number => {
    return bills
      .filter((b) => !b.isPaid)
      .reduce((sum, b) => sum + b.amount, 0);
  };

  return (
    <BillsContext.Provider
      value={{
        bills,
        addBill,
        updateBill,
        deleteBill,
        markAsPaid,
        getDueSoonBills,
        getUpcomingBills,
        getPaidThisMonth,
        getOverdueBills,
        getTotalDue,
      }}
    >
      {children}
    </BillsContext.Provider>
  );
}

export function useBills() {
  const context = useContext(BillsContext);
  if (context === undefined) {
    throw new Error("useBills must be used within a BillsProvider");
  }
  return context;
}
