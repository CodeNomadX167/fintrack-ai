import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  FileText,
  IndianRupee,
  PieChart,
  TrendingUp,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";

function Reports() {
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

  const report = useMemo(() => {
    let income = 0;
    let expense = 0;
    const expenseCategories = {};

    transactions.forEach((transaction) => {
      const amount = getAmount(transaction);

      if (transaction?.type === "income") {
        income += amount;
      }

      if (transaction?.type === "expense") {
        expense += amount;

        const category = transaction?.category || "Other";

        expenseCategories[category] =
          (expenseCategories[category] || 0) + amount;
      }
    });

    const savings = income - expense;

    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    const categories = Object.entries(expenseCategories)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: expense > 0 ? (amount / expense) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      income,
      expense,
      savings,
      savingsRate,
      categories,
      totalTransactions: transactions.length,
      incomeTransactions: transactions.filter(
        (transaction) => transaction?.type === "income"
      ).length,
      expenseTransactions: transactions.filter(
        (transaction) => transaction?.type === "expense"
      ).length,
    };
  }, [transactions]);

  const hasTransactions = transactions.length > 0;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          {/* Header */}
          <section className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                    Financial Report
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Reports
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">
                  A clear summary of your financial activity and spending
                  distribution.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-4 py-2.5 text-sm font-semibold transition hover:bg-[var(--bg-tertiary)]"
              >
                <FileText size={17} />
                View Transactions
              </button>
            </div>
          </section>

          {!hasTransactions ? (
            /* Empty State */
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card-bg)] p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                <FileText size={30} />
              </div>

              <h2 className="text-xl font-bold">
                No report data available
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                Add some financial transactions to generate your first
                financial report.
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
              {/* Summary */}
              <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <ReportCard
                  title="Total Income"
                  value={formatCurrency(report.income)}
                  icon={<ArrowUpRight size={21} />}
                  iconClass="bg-green-50 text-green-600"
                />

                <ReportCard
                  title="Total Expenses"
                  value={formatCurrency(report.expense)}
                  icon={<ArrowDownRight size={21} />}
                  iconClass="bg-red-50 text-red-600"
                />

                <ReportCard
                  title="Net Savings"
                  value={formatCurrency(report.savings)}
                  icon={<IndianRupee size={21} />}
                  iconClass="bg-blue-50 text-blue-600"
                />

                <ReportCard
                  title="Savings Rate"
                  value={`${report.savingsRate.toFixed(1)}%`}
                  icon={<TrendingUp size={21} />}
                  iconClass="bg-amber-50 text-amber-600"
                />
              </section>

              {/* Income / Expense Report */}
              <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm md:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-3 text-[var(--primary)]">
                      <BarChart3 size={21} />
                    </div>

                    <div>
                      <h2 className="font-bold">
                        Income & Expense Summary
                      </h2>

                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Overall money movement
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <SummaryRow
                      label="Income"
                      value={formatCurrency(report.income)}
                      icon={<ArrowUpRight size={18} />}
                      valueClass="text-green-600"
                    />

                    <SummaryRow
                      label="Expenses"
                      value={formatCurrency(report.expense)}
                      icon={<ArrowDownRight size={18} />}
                      valueClass="text-red-600"
                    />

                    <div className="border-t border-[var(--border)] pt-5">
                      <SummaryRow
                        label="Net Savings"
                        value={formatCurrency(report.savings)}
                        icon={<TrendingUp size={18} />}
                        valueClass={
                          report.savings >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Transaction Distribution */}
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm md:p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-[var(--primary-soft)] p-3 text-[var(--primary)]">
                      <PieChart size={21} />
                    </div>

                    <div>
                      <h2 className="font-bold">
                        Transaction Distribution
                      </h2>

                      <p className="mt-1 text-sm text-[var(--text-muted)]">
                        Breakdown of recorded transactions
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <DistributionItem
                      label="All Transactions"
                      value={report.totalTransactions}
                    />

                    <DistributionItem
                      label="Income Records"
                      value={report.incomeTransactions}
                    />

                    <DistributionItem
                      label="Expense Records"
                      value={report.expenseTransactions}
                    />
                  </div>
                </div>
              </section>

              {/* Category Report */}
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm md:p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-[var(--primary-soft)] p-3 text-[var(--primary)]">
                    <PieChart size={21} />
                  </div>

                  <div>
                    <h2 className="font-bold">
                      Expense Category Report
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      See how your total expenses are distributed.
                    </p>
                  </div>
                </div>

                {report.categories.length === 0 ? (
                  <div className="rounded-xl bg-[var(--bg-tertiary)] p-8 text-center text-sm text-[var(--text-muted)]">
                    No expense category data available.
                  </div>
                ) : (
                  <div className="space-y-5">
                    {report.categories.map((category) => (
                      <div key={category.name}>
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {category.name}
                            </p>

                            <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                              {category.percentage.toFixed(1)}% of expenses
                            </p>
                          </div>

                          <span className="shrink-0 text-sm font-bold">
                            {formatCurrency(category.amount)}
                          </span>
                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-[var(--bg-tertiary)]">
                          <div
                            className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                            style={{
                              width: `${Math.min(
                                category.percentage,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   Report Card
   ========================================================= */

function ReportCard({ title, value, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--text-muted)]">
            {title}
          </p>

          <p className="mt-2 truncate text-xl font-bold md:text-2xl">
            {value}
          </p>
        </div>

        <div className={`shrink-0 rounded-xl p-3 ${iconClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   Summary Row
   ========================================================= */

function SummaryRow({ label, value, icon, valueClass }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className={`rounded-lg bg-[var(--bg-tertiary)] p-2 ${valueClass}`}>
          {icon}
        </span>

        <span className="text-sm font-medium">{label}</span>
      </div>

      <span className={`text-sm font-bold md:text-base ${valueClass}`}>
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   Distribution Item
   ========================================================= */

function DistributionItem({ label, value }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
      <p className="text-sm text-[var(--text-muted)]">{label}</p>

      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

export default Reports;