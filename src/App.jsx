import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import TransactionDetails from "./pages/TransactionDetails";
import Categories from "./pages/Categories";
import Accounts from "./pages/Accounts";
import Budgets from "./pages/Budgets";

import GoalsPage from "./features/goals/GoalsPage";
import GoalDetailsPage from "./features/goals/GoalDetailsPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Dashboard */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={<Transactions />}
        />

        <Route
          path="/add-transaction"
          element={<AddTransaction />}
        />

        <Route
          path="/edit-transaction/:id"
          element={<AddTransaction />}
        />

        <Route
          path="/transactions/:id"
          element={<TransactionDetails />}
        />

        {/* Other Modules */}
        <Route
          path="/categories"
          element={<Categories />}
        />

        <Route
          path="/accounts"
          element={<Accounts />}
        />

        <Route
          path="/budgets"
          element={<Budgets />}
        />

        {/* Goals */}
        <Route
          path="/goals"
          element={<GoalsPage />}
        />

        <Route
          path="/goals/:id"
          element={<GoalDetailsPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;