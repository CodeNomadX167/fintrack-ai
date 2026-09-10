import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import { useNavigate } from "react-router-dom";

import { List, TrendingUp, TrendingDown } from "lucide-react";

function Transactions() {
  const navigate = useNavigate();
  const transactions = [
    {
      id: 1,
      date: "01 Sep 2026",
      description: "Salary",
      category: "Income",
      type: "Income",
      amount: 25000,
    },
    {
      id: 2,
      date: "02 Sep 2026",
      description: "Grocery",
      category: "Food",
      type: "Expense",
      amount: 1200,
    },
    {
      id: 3,
      date: "03 Sep 2026",
      description: "Freelance Work",
      category: "Freelancing",
      type: "Income",
      amount: 5000,
    },
    {
      id: 4,
      date: "04 Sep 2026",
      description: "Electricity Bill",
      category: "Bills",
      type: "Expense",
      amount: 850,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Transactions
              </h1>

              <p className="mt-2 text-gray-500">
                Track and manage all your income and expenses.
              </p>
            </div>

           <button
  onClick={() => navigate("/add-transaction")}
  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
>
  + Add Transaction
</button>
          </div>

          {/* Transaction Summary */}
          <div className="mb-8">
            <h2 className="mb-5 text-lg font-semibold text-gray-800">
              Transaction Summary
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                title="Total Transactions"
                value="4"
                icon={<List size={22} />}
                description="Total recorded transactions"
              />

              <StatCard
                title="Total Income"
                value="₹30,000"
                icon={<TrendingUp size={22} />}
                description="Total money received"
              />

              <StatCard
                title="Total Expenses"
                value="₹2,050"
                icon={<TrendingDown size={22} />}
                description="Total money spent"
              />
            </div>

            {/* Transactions Table */}
            <div>
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Recent Transactions
              </h2>

              <TransactionTable transactions={transactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Transactions;
