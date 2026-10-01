import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  IndianRupee,
  PieChart,
  TrendingUp,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";

function Analytics() {
  const navigate = useNavigate();
  const { transactions = [] } = useContext(TransactionContext);

  const getAmount = (transaction) => {
    const amount = Number(transaction?.amount);
    return Number.isFinite(amount) ? amount : 0;
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const analytics = useMemo(() => {
    let income = 0;
    let expense = 0;

    const categoryMap = {};

    transactions.forEach((transaction) => {
      const amount = getAmount(transaction);
      const type = transaction?.type;
      const category = transaction?.category || "Other";

      if (type === "income") {
        income += amount;
      }

      if (type === "expense") {
        expense += amount;

        categoryMap[category] = (categoryMap[category] || 0) + amount;
      }
    });

    const savings = income - expense;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    const categories = Object.entries(categoryMap)
      .map(([name, amount]) => ({
        name,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      income,
      expense,
      savings,
      savingsRate,
      categories,
    };
  }, [transactions]);

  const maxCategoryAmount =
    analytics.categories.length > 0
      ? Math.max(...analytics.categories.map((item) => item.amount))
      : 0;

  const expensePercentage =
    analytics.income > 0
      ? Math.min((analytics.expense / analytics.income) * 100, 100)
      : 0;

  const hasData = transactions.length > 0;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <section className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                    Financial Insights
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Analytics
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
                  Understand your income, expenses, savings and spending
                  patterns.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-semibold transition hover:bg-[var(--bg-tertiary)]"
              >
                View Transactions
              </button>
            </div>
          </section>

          {!hasData ? (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card-bg)] p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <BarChart3 size={30} />
              </div>

              <h2 className="text-xl font-bold">
                No analytics available yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                Add some income and expense transactions to start seeing your
                financial insights.
              </p>

              <button
                type="button"
                onClick={() => navigate("/add-transaction")}
                className="mt-5 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Add Transaction
              </button>
            </div>
          ) : (
            <>
              {/* Summary Cards */}
              <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <AnalyticsCard
                  title="Total Income"
                  value={formatCurrency(analytics.income)}
                  icon={<ArrowUpRight size={21} />}
                  iconClass="text-green-600 bg-green-50"
                />

                <AnalyticsCard
                  title="Total Expenses"
                  value={formatCurrency(analytics.expense)}
                  icon={<ArrowDownRight size={21} />}
                  iconClass="text-red-600 bg-red-50"
                />

                <AnalyticsCard
                  title="Net Savings"
                  value={formatCurrency(analytics.savings)}
                  icon={<IndianRupee size={21} />}
                  iconClass="text-blue-600 bg-blue-50"
                />

                <AnalyticsCard
                  title="Savings Rate"
                  value={`${analytics.savingsRate.toFixed(1)}%`}
                  icon={<TrendingUp size={21} />}
                  iconClass="text-amber-600 bg-amber-50"
                />
              </section>

              {/* Income vs Expense */}
              <section className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm md:p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="font-bold">Income vs Expenses</h2>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Overall financial comparison
                      </p>
                    </div>

                    <div className="rounded-xl bg-[var(--primary-soft)] p-3 text-[var(--primary)]">
                      <BarChart3 size={21} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <ProgressRow
                      label="Income"
                      amount={analytics.income}
                      percentage={100}
                      barClass="bg-green-500"
                      formatCurrency={formatCurrency}
                    />

                    <ProgressRow
                      label="Expenses"
                      amount={analytics.expense}
                      percentage={expensePercentage}
                      barClass="bg-red-500"
                      formatCurrency={formatCurrency}
                    />
                  </div>

                  <div className="mt-6 border-t border-[var(--border)] pt-5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--text-muted)]">
                        Remaining after expenses
                      </span>

                      <span
                        className={`font-bold ${
                          analytics.savings >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {formatCurrency(analytics.savings)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expense Categories */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm md:p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h2 className="font-bold">Expense Categories</h2>
                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Where your money is being spent
                      </p>
                    </div>

                    <div className="rounded-xl bg-[var(--primary-soft)] p-3 text-[var(--primary)]">
                      <PieChart size={21} />
                    </div>
                  </div>

                  {analytics.categories.length === 0 ? (
                    <div className="py-8 text-center text-sm text-[var(--text-muted)]">
                      No expense categories available.
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {analytics.categories.map((category) => {
                        const percentage =
                          maxCategoryAmount > 0
                            ? (category.amount / maxCategoryAmount) * 100
                            : 0;

                        return (
                          <div key={category.name}>
                            <div className="mb-2 flex items-center justify-between gap-4">
                              <span className="truncate text-sm font-medium">
                                {category.name}
                              </span>

                              <span className="shrink-0 text-sm font-semibold">
                                {formatCurrency(category.amount)}
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                              <div
                                className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>

              {/* Financial Health */}
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm md:p-6">
                <div className="mb-6">
                  <h2 className="font-bold">Financial Overview</h2>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Quick view of your current financial position.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <OverviewItem
                    label="Transactions"
                    value={transactions.length}
                  />

                  <OverviewItem
                    label="Income Sources"
                    value={
                      transactions.filter(
                        (transaction) => transaction?.type === "income"
                      ).length
                    }
                  />

                  <OverviewItem
                    label="Expense Records"
                    value={
                      transactions.filter(
                        (transaction) => transaction?.type === "expense"
                      ).length
                    }
                  />
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   Analytics Card
   ========================================================= */

function AnalyticsCard({ title, value, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--text-muted)]">
            {title}
          </p>

          <p className="mt-2 text-xl font-bold md:text-2xl">{value}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconClass}`}>{icon}</div>
      </div>
    </div>
  );
}

/* =========================================================
   Progress Row
   ========================================================= */

function ProgressRow({
  label,
  amount,
  percentage,
  barClass,
  formatCurrency,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-semibold">{label}</span>

        <span className="text-sm font-bold">
          {formatCurrency(amount)}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
        <div
          className={`h-full rounded-full ${barClass} transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   Overview Item
   ========================================================= */

function OverviewItem({ label, value }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
      <p className="text-sm text-[var(--text-muted)]">{label}</p>

      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Analytics;