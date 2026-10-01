import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  FileText,
  Hash,
  Tag,
  Wallet,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { transactions = [] } = useContext(TransactionContext);

  const transaction = transactions.find(
    (item) => String(item.id) === String(id)
  );

  const formatAmount = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return "₹0";
    }

    return `₹${numericAmount.toLocaleString("en-IN")}`;
  };

  const handleBack = () => {
    navigate("/transactions");
  };

  // Invalid Transaction ID
  if (!transaction) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <Navbar />

        <div className="flex">
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <main className="flex min-w-0 flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
            <section
              className="
                w-full max-w-2xl rounded-2xl border
                border-[var(--border-color)]
                bg-[var(--card-bg)]
                p-6 text-center
                shadow-[var(--shadow-sm)]
                sm:p-10
              "
            >
              <div
                className="
                  mx-auto flex h-16 w-16 items-center justify-center
                  rounded-full bg-[var(--bg-tertiary)]
                  text-[var(--text-muted)]
                "
              >
                <FileText size={28} />
              </div>

              <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
                Transaction Not Found
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
                The transaction you are looking for does not exist
                or may have been removed.
              </p>

              <button
                type="button"
                onClick={handleBack}
                className="
                  mt-6 inline-flex items-center justify-center gap-2
                  rounded-xl bg-[var(--primary)]
                  px-5 py-3 text-sm font-semibold text-white
                  shadow-sm transition
                  hover:opacity-90
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]/30
                "
              >
                <ArrowLeft size={17} />
                Back to Transactions
              </button>
            </section>
          </main>
        </div>
      </div>
    );
  }

  const isIncome =
    String(transaction.type).toLowerCase() === "income";

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      <Navbar />

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            className="
              mb-6 inline-flex items-center gap-2 rounded-xl
              border border-[var(--border-color)]
              bg-[var(--card-bg)]
              px-4 py-2.5 text-sm font-semibold
              text-[var(--text-primary)]
              transition hover:bg-[var(--bg-secondary)]
              focus:outline-none
              focus:ring-2
              focus:ring-[var(--primary)]/30
            "
          >
            <ArrowLeft size={17} />
            Back to Transactions
          </button>

          {/* Page Header */}
          <header className="mb-6">
            <p className="text-sm font-semibold text-[var(--primary)]">
              Transactions
            </p>

            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Transaction Details
            </h1>

            <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
              Complete information about this transaction.
            </p>
          </header>

          {/* Main Transaction Card */}
          <section
            className="
              overflow-hidden rounded-2xl border
              border-[var(--border-color)]
              bg-[var(--card-bg)]
              shadow-[var(--shadow-sm)]
            "
          >
            {/* Summary Header */}
            <div
              className="
                border-b border-[var(--border-color)]
                bg-[var(--bg-secondary)]
                p-5 sm:p-7
              "
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className={`
                      flex h-14 w-14 shrink-0 items-center
                      justify-center rounded-2xl
                      ${
                        isIncome
                          ? "bg-green-500/10 text-green-600 dark:text-green-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }
                    `}
                  >
                    <CircleDollarSign size={27} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                      Transaction
                    </p>

                    <h2 className="mt-1 truncate text-lg font-bold sm:text-xl">
                      {transaction.description || "Untitled Transaction"}
                    </h2>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs font-medium text-[var(--text-muted)]">
                    Amount
                  </p>

                  <p
                    className={`
                      mt-1 text-2xl font-bold sm:text-3xl
                      ${
                        isIncome
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    `}
                  >
                    {isIncome ? "+" : "-"}
                    {formatAmount(transaction.amount)}
                  </p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 sm:p-7">
              <h3 className="mb-5 text-lg font-semibold">
                Transaction Information
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Description */}
                <DetailItem
                  icon={<FileText size={18} />}
                  label="Description"
                  value={transaction.description || "Not available"}
                />

                {/* Amount */}
                <DetailItem
                  icon={<CircleDollarSign size={18} />}
                  label="Amount"
                  value={formatAmount(transaction.amount)}
                />

                {/* Type */}
                <div
                  className="
                    rounded-xl border
                    border-[var(--border-color)]
                    bg-[var(--bg-secondary)]
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        flex h-9 w-9 items-center justify-center
                        rounded-lg
                        ${
                          isIncome
                            ? "bg-green-500/10 text-green-600 dark:text-green-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }
                      `}
                    >
                      <CircleDollarSign size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-[var(--text-muted)]">
                        Type
                      </p>

                      <span
                        className={`
                          mt-1 inline-flex rounded-full px-2.5 py-1
                          text-xs font-semibold
                          ${
                            isIncome
                              ? "bg-green-500/10 text-green-600 dark:text-green-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400"
                          }
                        `}
                      >
                        {transaction.type || "Not available"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <DetailItem
                  icon={<Tag size={18} />}
                  label="Category"
                  value={transaction.category || "Not available"}
                />

                {/* Date */}
                <DetailItem
                  icon={<CalendarDays size={18} />}
                  label="Date"
                  value={transaction.date || "Not available"}
                />

                {/* Account */}
                {transaction.account && (
                  <DetailItem
                    icon={<Wallet size={18} />}
                    label="Account"
                    value={transaction.account}
                  />
                )}

                {/* Payment Method */}
                {transaction.paymentMethod && (
                  <DetailItem
                    icon={<Wallet size={18} />}
                    label="Payment Method"
                    value={transaction.paymentMethod}
                  />
                )}

                {/* Transaction ID */}
                <DetailItem
                  icon={<Hash size={18} />}
                  label="Transaction ID"
                  value={`#${transaction.id}`}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => {
  return (
    <div
      className="
        rounded-xl border
        border-[var(--border-color)]
        bg-[var(--bg-secondary)]
        p-4
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-lg bg-[var(--primary-soft)]
            text-[var(--primary)]
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[var(--text-muted)]">
            {label}
          </p>

          <p className="mt-1 break-words text-sm font-semibold">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;