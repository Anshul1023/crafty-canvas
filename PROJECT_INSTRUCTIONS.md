# Expense Tracker - Project Instructions

This document provides comprehensive context for AI assistants to continue development on this project.

## Project Overview

**Name:** Expense Tracker  
**Type:** Cross-platform expense tracking application  
**Platforms:** Web (React) + Native Mobile (Android/iOS via Capacitor)

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library (Radix UI based)
- **CSS Variables** - Design tokens in `src/index.css`

### State Management
- **React Context API** - Global state (expenses, budgets, auth)
- **TanStack Query** - Server state management

### Data Visualization
- **Recharts** - Charts and graphs

### Mobile
- **Capacitor** - Native mobile app wrapper
- Configured for Android and iOS builds

### Backend
- **Supabase** - Database, Authentication, Edge Functions
- Project uses Supabase for data persistence (when connected)

---

## Project Structure

```
expense-tracker/
├── src/
│   ├── components/
│   │   ├── dashboard/        # Dashboard widgets
│   │   │   ├── CategoryBreakdown.tsx
│   │   │   ├── RecentTransactions.tsx
│   │   │   ├── SpendingChart.tsx
│   │   │   ├── StatCard.tsx
│   │   │   └── UpcomingBills.tsx
│   │   ├── expenses/         # Expense management
│   │   │   └── ExpensesList.tsx
│   │   ├── bills/            # Bill tracking
│   │   │   └── BillsList.tsx
│   │   ├── layout/           # App layout components
│   │   │   ├── AppLayout.tsx
│   │   │   ├── AppSidebar.tsx
│   │   │   ├── MobileSidebar.tsx
│   │   │   └── TopBar.tsx
│   │   └── ui/               # shadcn/ui components
│   ├── contexts/
│   │   └── ExpenseContext.tsx  # Expense & budget state
│   ├── hooks/
│   │   ├── useAuth.tsx         # Authentication hook
│   │   ├── use-mobile.tsx      # Mobile detection
│   │   └── use-toast.ts        # Toast notifications
│   ├── pages/
│   │   ├── Index.tsx           # Dashboard (home)
│   │   ├── Expenses.tsx        # Expense management
│   │   ├── Bills.tsx           # Bill tracking
│   │   ├── Budgets.tsx         # Budget planning
│   │   ├── Analytics.tsx       # Spending analytics
│   │   ├── Settings.tsx        # User settings
│   │   ├── Auth.tsx            # Login/Signup
│   │   └── NotFound.tsx        # 404 page
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts       # Supabase client (auto-generated)
│   │       └── types.ts        # Database types (auto-generated)
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn, etc.)
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles & design tokens
├── public/                     # Static assets
├── supabase/
│   └── config.toml             # Supabase configuration
├── capacitor.config.ts         # Capacitor mobile config
├── tailwind.config.ts          # Tailwind configuration
├── vite.config.ts              # Vite configuration
└── package.json
```

---

## Design System

### Color Tokens (HSL Format)
All colors are defined as CSS variables in `src/index.css`. **Never use direct colors in components.**

```css
/* Example usage in components */
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="bg-muted text-muted-foreground"
className="border-border"
```

### Key Design Tokens
- `--background` / `--foreground` - Main background and text
- `--primary` / `--primary-foreground` - Primary brand color
- `--secondary` / `--secondary-foreground` - Secondary UI elements
- `--muted` / `--muted-foreground` - Muted/subtle elements
- `--accent` / `--accent-foreground` - Accent highlights
- `--destructive` / `--destructive-foreground` - Error/delete actions
- `--border` - Border color
- `--ring` - Focus ring color
- `--card` / `--card-foreground` - Card backgrounds
- `--popover` / `--popover-foreground` - Popover backgrounds

### Dark Mode
The app supports dark mode via the `dark` class on the root element. All color tokens have dark mode variants.

---

## Key Patterns & Conventions

### Component Structure
```tsx
// Standard component pattern
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface MyComponentProps {
  title: string;
  className?: string;
}

const MyComponent = ({ title, className }: MyComponentProps) => {
  return (
    <div className={cn("base-styles", className)}>
      {title}
    </div>
  );
};

export default MyComponent;
```

### Using Context
```tsx
// Expense context usage
import { useExpenses } from "@/contexts/ExpenseContext";

const MyComponent = () => {
  const { expenses, addExpense, deleteExpense, getTotalSpent } = useExpenses();
  // ...
};
```

### Using Authentication
```tsx
import { useAuth } from "@/hooks/useAuth";

const MyComponent = () => {
  const { user, loading, signIn, signUp, signOut } = useAuth();
  // ...
};
```

### Toast Notifications
```tsx
import { useToast } from "@/hooks/use-toast";

const MyComponent = () => {
  const { toast } = useToast();
  
  const handleAction = () => {
    toast({
      title: "Success",
      description: "Action completed successfully",
    });
  };
};
```

### Layout Pattern
All pages use the `AppLayout` wrapper:
```tsx
import AppLayout from "@/components/layout/AppLayout";

const MyPage = () => {
  return (
    <AppLayout>
      {/* Page content */}
    </AppLayout>
  );
};
```

---

## Data Models

### Expense
```typescript
interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod?: string;
}
```

### Budget
```typescript
interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}
```

### User
```typescript
interface User {
  id: string;
  email: string;
  name: string;
}
```

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | Index | Dashboard with overview |
| `/expenses` | Expenses | Manage expenses |
| `/bills` | Bills | Bill tracking & reminders |
| `/budgets` | Budgets | Budget planning |
| `/analytics` | Analytics | Spending analytics |
| `/settings` | Settings | User preferences |
| `/auth` | Auth | Login/Signup |

---

## Mobile Development (Capacitor)

### Configuration
```typescript
// capacitor.config.ts
{
  appId: 'app.lovable.project...',
  appName: 'Expense Tracker',
  webDir: 'dist'
}
```

### Build Commands
```bash
# Build web app
npm run build

# Add Android platform (first time)
npx cap add android

# Sync changes to native project
npx cap sync android

# Open in Android Studio
npx cap open android
```

### APK Location
After building in Android Studio:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## Important Notes

1. **shadcn/ui Components**: Located in `src/components/ui/`. These are pre-configured and can be customized.

2. **Path Aliases**: Use `@/` for imports from `src/`:
   ```typescript
   import { Button } from "@/components/ui/button";
   ```

3. **Responsive Design**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).

4. **Icons**: Use `lucide-react` for icons:
   ```typescript
   import { Plus, Trash, Edit } from "lucide-react";
   ```

5. **Forms**: Use `react-hook-form` with `zod` for validation.

6. **Date Handling**: Use `date-fns` for date manipulation.

7. **State Persistence**: Currently using React Context with mock data. For production, integrate with Supabase.

---

## Common Tasks

### Adding a New Page
1. Create component in `src/pages/NewPage.tsx`
2. Wrap content in `AppLayout`
3. Add route in `src/App.tsx`
4. Add navigation link in `AppSidebar.tsx`

### Adding a New Component
1. Create in appropriate folder under `src/components/`
2. Use TypeScript interfaces for props
3. Use `cn()` for conditional classNames
4. Follow existing component patterns

### Adding a New shadcn Component
```bash
npx shadcn-ui@latest add [component-name]
```

### Modifying Design Tokens
1. Edit `src/index.css` for color variables
2. Edit `tailwind.config.ts` for extending Tailwind

---

## Current State & TODOs

### Implemented
- ✅ Dashboard with stats and charts
- ✅ Expense list view
- ✅ Bill tracking page
- ✅ Budget management page
- ✅ Analytics page
- ✅ Settings page
- ✅ Authentication flow (mock)
- ✅ Mobile-responsive layout
- ✅ Capacitor mobile setup

### Potential Enhancements
- [ ] Connect to real database (Supabase)
- [ ] Add expense creation/edit forms
- [ ] Implement real authentication
- [ ] Add data export (CSV/PDF)
- [ ] Push notifications for bills
- [ ] Receipt photo upload
- [ ] Multi-currency support
- [ ] Recurring expenses
- [ ] Financial goals tracking

---

## File-by-File Summary

| File | Purpose |
|------|---------|
| `App.tsx` | Root component, routing, providers |
| `ExpenseContext.tsx` | Global expense/budget state |
| `useAuth.tsx` | Authentication state & methods |
| `AppLayout.tsx` | Main layout wrapper |
| `AppSidebar.tsx` | Desktop navigation sidebar |
| `MobileSidebar.tsx` | Mobile navigation drawer |
| `StatCard.tsx` | Dashboard stat display card |
| `SpendingChart.tsx` | Line/bar chart for spending |
| `CategoryBreakdown.tsx` | Pie chart for categories |
| `index.css` | Global styles, CSS variables |
| `tailwind.config.ts` | Tailwind customization |

---

*Last Updated: January 2026*
