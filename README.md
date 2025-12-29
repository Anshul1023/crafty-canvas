# Expense Tracker

A modern, feature-rich expense tracking application built with React and TypeScript. Track your spending, manage budgets, monitor bills, and gain insights into your financial habits.

## Features

- **Dashboard Overview** - Get a quick snapshot of your financial health with spending charts, category breakdowns, and upcoming bills
- **Expense Management** - Add, edit, and categorize your daily expenses with ease
- **Budget Planning** - Set and monitor budgets for different spending categories
- **Bill Tracking** - Never miss a payment with bill reminders and due date tracking
- **Analytics** - Visualize your spending patterns with interactive charts and reports
- **Cross-Platform** - Available as a web app and native Android/iOS application

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API, TanStack Query
- **Charts**: Recharts
- **Routing**: React Router v6
- **Mobile**: Capacitor for native Android/iOS builds
- **Backend**: Supabase (Database, Authentication)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Mobile App Build (Android)

1. Build the web app:
```bash
npm run build
```

2. Add the Android platform:
```bash
npx cap add android
```

3. Sync the build:
```bash
npx cap sync android
```

4. Open in Android Studio:
```bash
npx cap open android
```

5. Build the APK from Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

## Project Structure

```
src/
├── components/
│   ├── dashboard/     # Dashboard widgets and charts
│   ├── expenses/      # Expense management components
│   ├── bills/         # Bill tracking components
│   ├── layout/        # App layout components
│   └── ui/            # Reusable UI components
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Route pages
└── lib/               # Utility functions
```

## Screenshots

*Coming soon*

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Developed with passion for better financial management.
