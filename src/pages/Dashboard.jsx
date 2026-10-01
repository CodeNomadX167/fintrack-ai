import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  RefreshCw,
} from "lucide-react";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Temporary local data.
  // Later this will come from the backend API.
  const localFinancialData = {
    totalIncome: 50000,
    totalExpense: 30000,
    totalBalance: 20000,
  };

  useEffect(() => {
    const loadDashboard = () => {
      try {
        setIsLoading(true);
        setHasError(false);

        // Temporary API simulation.
        // Backend integration will replace this later.
        setTimeout(() => {
          const {
            totalIncome,
            totalExpense,
            totalBalance,
          } = localFinancialData;

          const savings = totalIncome - totalExpense;

          setDashboardData({
            totalBalance,
            totalIncome,
            totalExpense,
            savings,
          });

          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Dashboard loading error:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const statCards = dashboardData
    ? [
        {
          title: "Total Balance",
          value: formatCurrency(dashboardData.totalBalance),
          icon: <Wallet size={22} />,
          description: "Current available balance",
        },
        {
          title: "Total Income",
          value: formatCurrency(dashboardData.totalIncome),
          icon: <TrendingUp size={22} />,
          description: "Total money received",
        },
        {
          title: "Total Expense",
          value: formatCurrency(dashboardData.totalExpense),
          icon: <TrendingDown size={22} />,
          description: "Total money spent",
        },
        {
          title: "Savings",
          value: formatCurrency(dashboardData.savings),
          icon: <PiggyBank size={22} />,
          description: "Income minus expenses",
        },
      ]
    : [];

  const savingsRate =
    dashboardData && dashboardData.totalIncome > 0
      ? Math.round(
          (dashboardData.savings / dashboardData.totalIncome) * 100
        )
      : 0;

  const expenseRatio =
    dashboardData && dashboardData.totalIncome > 0
      ? Math.round(
          (dashboardData.totalExpense / dashboardData.totalIncome) * 100
        )
      : 0;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

          {/* Welcome Section */}
          <section className="mb-8">
            <div>
              <p className="mb-2 text-sm font-semibold text-[var(--primary)]">
                Financial Dashboard
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Welcome to FinTrack AI
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Here is an overview of your financial performance.
              </p>
            </div>
          </section>

          {/* Loading State */}
          {isLoading && (
            <section
              className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 shadow-[var(--shadow-sm)]"
              aria-live="polite"
            >
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border-color)] border-t-[var(--primary)]" />

                <div>
                  <p className="font-medium">
                    Loading dashboard...
                  </p>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Preparing your financial overview.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Error State */}
          {!isLoading && hasError && (
            <section
              className="rounded-2xl border border-red-300 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/20"
              role="alert"
            >
              <h2 className="text-lg font-semibold text-red-800 dark:text-red-300">
                Unable to load dashboard
              </h2>

              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                Something went wrong while loading your financial data.
              </p>

              <button
                type="button"
                onClick={handleRetry}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </section>
          )}

          {/* Empty State */}
          {!isLoading && !hasError && !dashboardData && (
            <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-8 text-center shadow-[var(--shadow-sm)]">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-tertiary)]">
                <Wallet
                  size={24}
                  className="text-[var(--primary)]"
                />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                No financial data yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm text-[var(--text-muted)]">
                Add your first transaction to start tracking your
                financial activity.
              </p>
            </section>
          )}

          {/* Financial Overview */}
          {!isLoading && !hasError && dashboardData && (
            <>
              <section>
                <div className="mb-5">
                  <h2 className="text-lg font-semibold sm:text-xl">
                    Financial Overview
                  </h2>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Your current income, expenses and savings.
                  </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {statCards.map((card) => (
                    <StatCard
                      key={card.title}
                      title={card.title}
                      value={card.value}
                      icon={card.icon}
                      description={card.description}
                    />
                  ))}
                </div>
              </section>

              {/* Dashboard Summary */}
              <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

                {/* Savings Rate */}
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                      Savings Rate
                    </p>

                    <div className="rounded-lg bg-[var(--bg-tertiary)] p-2 text-[var(--primary)]">
                      <PiggyBank size={18} />
                    </div>
                  </div>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-bold">
                      {savingsRate}%
                    </span>

                    <span className="pb-1 text-sm text-[var(--text-muted)]">
                      of income saved
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                    <div
                      className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          Math.max(savingsRate, 0),
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-[var(--text-muted)]">
                    Savings = income minus expenses.
                  </p>
                </div>

                {/* Expense Ratio */}
                <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)]">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--text-secondary)]">
                      Expense Ratio
                    </p>

                    <div className="rounded-lg bg-red-50 p-2 text-red-600 dark:bg-red-950/30 dark:text-red-400">
                      <TrendingDown size={18} />
                    </div>
                  </div>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-3xl font-bold">
                      {expenseRatio}%
                    </span>

                    <span className="pb-1 text-sm text-[var(--text-muted)]">
                      of income spent
                    </span>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                    <div
                      className="h-full rounded-full bg-red-500 transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          Math.max(expenseRatio, 0),
                          100
                        )}%`,
                      }}
                    />
                  </div>

                  <p className="mt-3 text-xs text-[var(--text-muted)]">
                    Expense ratio = expenses divided by income.
                  </p>
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;