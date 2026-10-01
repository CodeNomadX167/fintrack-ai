import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { TransactionContext } from "../context/TransactionContext";

function TransactionTable({ transactions = [] }) {
  const navigate = useNavigate();
  const { deleteTransaction } = useContext(TransactionContext);

  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleConfirmDelete = () => {
    if (!transactionToDelete?.id) return;

    deleteTransaction(transactionToDelete.id);
    setTransactionToDelete(null);
  };

  const formatAmount = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
      return "₹0";
    }

    return `₹${numericAmount.toLocaleString("en-IN")}`;
  };

  return (
    <>
      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-8 text-center shadow-[var(--shadow-sm)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
            <Eye size={24} />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
            No transactions found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
            Your transactions will appear here once you add your first income
            or expense.
          </p>
        </div>
      ) : (
        /* Transactions Table */
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] shadow-[var(--shadow-sm)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              {/* Table Header */}
              <thead className="border-b border-[var(--border)] bg-[var(--bg-tertiary)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Description
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Type
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {transactions.map((transaction) => {
                  const isIncome =
                    String(transaction?.type || "").toLowerCase() === "income";

                  return (
                    <tr
                      key={transaction.id}
                      className="border-b border-[var(--border)] last:border-0 transition-colors hover:bg-[var(--bg-tertiary)]"
                    >
                      {/* Date */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-[var(--text-secondary)]">
                        {transaction.date || "—"}
                      </td>

                      {/* Description */}
                      <td className="max-w-[220px] px-6 py-4">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                          {transaction.description || "Untitled transaction"}
                        </p>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">
                        {transaction.category || "Uncategorized"}
                      </td>

                      {/* Type */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${
                            isIncome
                              ? "border-[var(--success)]/30 bg-[var(--success-soft)] text-[var(--success)]"
                              : "border-[var(--danger)]/30 bg-[var(--danger-soft)] text-[var(--danger)]"
                          }`}
                        >
                          {transaction.type || "Unknown"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-[var(--text-primary)]">
                        {formatAmount(transaction.amount)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          {/* View */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/transactions/${transaction.id}`
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            aria-label={`View ${
                              transaction.description || "transaction"
                            }`}
                            title="View transaction"
                          >
                            <Eye size={16} />
                            <span>View</span>
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/edit-transaction/${transaction.id}`
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--primary)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            aria-label={`Edit ${
                              transaction.description || "transaction"
                            }`}
                            title="Edit transaction"
                          >
                            <Pencil size={16} />
                            <span>Edit</span>
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              setTransactionToDelete(transaction)
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--danger)] transition hover:bg-[var(--danger-soft)] hover:text-[var(--danger)] focus:outline-none focus:ring-2 focus:ring-[var(--danger)]"
                            aria-label={`Delete ${
                              transaction.description || "transaction"
                            }`}
                            title="Delete transaction"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Table Hint */}
          <div className="border-t border-[var(--border)] px-4 py-3 text-center text-xs text-[var(--text-muted)] md:hidden">
            Swipe horizontally to view all transaction details.
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {transactionToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-transaction-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-[var(--text-primary)] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--danger)]/30 bg-[var(--danger-soft)] text-[var(--danger)]">
                <AlertTriangle size={22} />
              </div>

              <button
                type="button"
                onClick={() => setTransactionToDelete(null)}
                className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                aria-label="Close delete dialog"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="delete-transaction-title"
              className="mt-5 text-xl font-semibold"
            >
              Delete Transaction?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[var(--text-primary)]">
                {transactionToDelete.description || "this transaction"}
              </span>
              ? This action cannot be undone.
            </p>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setTransactionToDelete(null)}
                className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--danger)] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--danger)]"
              >
                <Trash2 size={16} />
                Delete Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionTable;