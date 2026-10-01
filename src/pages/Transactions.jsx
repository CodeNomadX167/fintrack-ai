import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  List,
  Plus,
  Search,
  X,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionTable from "../components/TransactionTable";
import { TransactionContext } from "../context/TransactionContext";

function Transactions() {
  const navigate = useNavigate();
  const { transactions = [] } = useContext(TransactionContext);

  const [searchText, setSearchText] = useState("");

  /* -----------------------------
     Safe numeric helper
  ----------------------------- */
  const getAmount = (transaction) => {
    const amount = Number(transaction?.amount);
    return Number.isFinite(amount) ? amount : 0;
  };

  /* -----------------------------
     Currency formatter
  ----------------------------- */
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  /* -----------------------------
     Transaction summary
  ----------------------------- */
  const summary = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      const amount = getAmount(transaction);

      if (transaction?.type === "income") {
        income += amount;
      } else if (transaction?.type === "expense") {
        expense += amount;
      }
    });

    return {
      totalTransactions: transactions.length,
      totalIncome: income,
      totalExpense: expense,
    };
  }, [transactions]);

  /* -----------------------------
     Search / Filter
  ----------------------------- */
  const filteredTransactions = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      const description = String(transaction?.description || "").toLowerCase();
      const category = String(transaction?.category || "").toLowerCase();
      const type = String(transaction?.type || "").toLowerCase();
      const paymentMethod = String(
        transaction?.paymentMethod || ""
      ).toLowerCase();

      return (
        description.includes(search) ||
        category.includes(search) ||
        type.includes(search) ||
        paymentMethod.includes(search)
      );
    });
  }, [transactions, searchText]);

  const hasTransactions = transactions.length > 0;
  const hasSearchResults = filteredTransactions.length > 0;

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
          {/* Page Header */}
          <section className="mb-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary)]">
                    Finance
                  </span>

                  <span className="text-xs text-[var(--text-muted)]">
                    {summary.totalTransactions}{" "}
                    {summary.totalTransactions === 1
                      ? "transaction"
                      : "transactions"}
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] md:text-3xl">
                  Transactions
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)] md:text-base">
                  Track, search and manage all your income and expenses from
                  one place.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/add-transaction")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 sm:w-auto"
              >
                <Plus size={18} />
                Add Transaction
              </button>
            </div>
          </section>

          {/* Summary */}
          <section className="mb-8">
            <div className="mb-5">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Transaction Summary
              </h2>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Overview of your recorded financial activity.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <StatCard
                title="Total Transactions"
                value={summary.totalTransactions.toString()}
                icon={<List size={22} />}
                description="Total recorded transactions"
              />

              <StatCard
                title="Total Income"
                value={formatCurrency(summary.totalIncome)}
                icon={<ArrowUpRight size={22} />}
                description="Total money received"
              />

              <StatCard
                title="Total Expenses"
                value={formatCurrency(summary.totalExpense)}
                icon={<ArrowDownRight size={22} />}
                description="Total money spent"
              />
            </div>
          </section>

          {/* Transactions */}
          <section>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  Recent Transactions
                </h2>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  View and manage your transaction history.
                </p>
              </div>

              {searchText && (
                <p className="text-sm text-[var(--text-muted)]">
                  {filteredTransactions.length} result
                  {filteredTransactions.length !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

            {/* Search */}
            <div className="mb-5">
              <div className="relative">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />

                <input
                  type="text"
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder="Search by description, category, type..."
                  aria-label="Search transactions"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--input-bg)] py-3 pl-11 pr-11 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                />

                {searchText && (
                  <button
                    type="button"
                    onClick={() => setSearchText("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X size={17} />
                  </button>
                )}
              </div>
            </div>

            {/* Empty State */}
            {!hasTransactions && (
              <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card-bg)] p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-[var(--primary)]">
                  <List size={26} />
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  No transactions yet
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                  Start tracking your finances by adding your first income or
                  expense transaction.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/add-transaction")}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <Plus size={18} />
                  Add First Transaction
                </button>
              </div>
            )}

            {/* No Search Results */}
            {hasTransactions && !hasSearchResults && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-muted)]">
                  <Search size={25} />
                </div>

                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  No matching transactions
                </h3>

                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Try a different keyword or clear the search.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchText("")}
                  className="mt-5 rounded-xl border border-[var(--border)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition hover:bg-[var(--bg-secondary)]"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Table */}
            {hasSearchResults && (
              <TransactionTable transactions={filteredTransactions} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default Transactions;