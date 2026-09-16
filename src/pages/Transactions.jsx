import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { List, TrendingUp, TrendingDown } from "lucide-react";

function Transactions() {
  const navigate = useNavigate();

  const { transactions } = useContext(TransactionContext);

  const [searchText, setSearchText] = useState("");

  // Filter transactions based on description or category
  const filteredTransactions = transactions.filter((transaction) => {
    const search = searchText.toLowerCase();

    return (
      transaction.description.toLowerCase().includes(search) ||
      transaction.category.toLowerCase().includes(search)
    );
  });

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

              {/* Search Input */}
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="🔍 Search transactions..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <TransactionTable transactions={filteredTransactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Transactions;