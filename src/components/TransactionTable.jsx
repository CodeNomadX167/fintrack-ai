import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

function TransactionTable({ transactions }) {
  const navigate = useNavigate();

  const { deleteTransaction } = useContext(TransactionContext);

  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const handleConfirmDelete = () => {
    deleteTransaction(transactionToDelete.id);
    setTransactionToDelete(null);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[800px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Description
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Category
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Type
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Amount
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm text-gray-600">
                  {transaction.date}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {transaction.description}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {transaction.category}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.type === "Income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>

                <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/edit-transaction/${transaction.id}`)
                    }
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => setTransactionToDelete(transaction)}
                    className="ml-2 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-900">
              Delete Transaction?
            </h2>

            <p className="mt-2 text-gray-500">
              Are you sure you want to delete this transaction?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setTransactionToDelete(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TransactionTable;