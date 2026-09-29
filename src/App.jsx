import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetails from "./pages/TransactionDetails";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";

import GoalsPage from "./features/goals/GoalsPage";
import GoalDetailsPage from "./features/goals/GoalDetailsPage";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Transactions */}
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/add-transaction" element={<AddTransaction />} />

        <Route path="/edit-transaction/:id" element={<AddTransaction />} />

        <Route path="/transactions/:id" element={<TransactionDetails />} />

        {/* Other Modules */}
        <Route path="/categories" element={<Categories />} />

        <Route path="/accounts" element={<Accounts />} />

        <Route path="/budgets" element={<Budgets />} />

        {/* Goals */}
        <Route path="/goals" element={<GoalsPage />} />

        <Route path="/goals/:id" element={<GoalDetailsPage />} />

        {/* Profile */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
