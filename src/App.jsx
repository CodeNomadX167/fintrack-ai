import { BrowserRouter, Route, Routes } from "react-router-dom";

// Authentication
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Transactions
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetails from "./pages/TransactionDetails";

// Finance Modules
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";

// Goals
import GoalsPage from "./features/goals/GoalsPage";
import GoalDetailsPage from "./features/goals/GoalDetailsPage";

// Account
import Profile from "./pages/Profile";
import Settings from "./components/Settings";
import ChangePassword from "./pages/ChangePassword";

import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== AUTHENTICATION ==================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ==================== DASHBOARD ==================== */}

        <Route path="/" element={<Dashboard />} />

        {/* ==================== TRANSACTIONS ==================== */}

        <Route path="/transactions" element={<Transactions />} />

        <Route path="/add-transaction" element={<AddTransaction />} />

        <Route
          path="/edit-transaction/:id"
          element={<AddTransaction />}
        />

        <Route
          path="/transactions/:id"
          element={<TransactionDetails />}
        />

        {/* ==================== FINANCE MODULES ==================== */}

        <Route path="/categories" element={<Categories />} />

        <Route path="/accounts" element={<Accounts />} />

        <Route path="/budgets" element={<Budgets />} />

        {/* ==================== GOALS ==================== */}

        <Route path="/goals" element={<GoalsPage />} />

        <Route path="/goals/:id" element={<GoalDetailsPage />} />

        {/* ==================== ACCOUNT ==================== */}

        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Settings />} />

        <Route
          path="/change-password"
          element={<ChangePassword />}
        />

        <Route path="*" element={<NotFound />} />

        {/* ====================  Analytics & Reports ==================== */}

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/reports" element={<Reports />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;