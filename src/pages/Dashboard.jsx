import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank
} from "lucide-react";
function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Dashboard Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome to FinTrack AI
            </h1>

            <p className="mt-2 text-gray-500">
              Here is an overview of your financial performance.
            </p>
          </div>

          {/* Financial Overview Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-5">
              Financial Overview
            </h2>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

  <StatCard
    title="Total Balance"
    value="₹20,000"
    icon={<Wallet size={22} />}
    description="Current available balance"
  />

  <StatCard
    title="Total Income"
    value="₹50,000"
    icon={<TrendingUp size={22} />}
    description="Total money received"
  />

  <StatCard
    title="Total Expense"
    value="₹30,000"
    icon={<TrendingDown size={22} />}
    description="Total money spent"
  />

  <StatCard
    title="Savings"
    value="₹20,000"
    icon={<PiggyBank size={22} />}
    description="Remaining balance"
  />

</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;