import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { TransactionContext } from "../context/TransactionContext";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { transactions } = useContext(TransactionContext);

  const transaction = transactions.find(
    (item) => item.id === Number(id)
  );

  // Invalid Transaction ID
  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="flex">
          <div className="hidden md:block">
            <Sidebar />
          </div>

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900">
                Transaction not found
              </h1>

              <p className="mt-2 text-gray-500">
                The transaction you are looking for does not exist.
              </p>

              <button
                type="button"
                onClick={() => navigate("/transactions")}
                className="mt-6 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
              >
                ← Back to Transactions
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/transactions")}
            className="mb-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            ← Back to Transactions
          </button>

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Transaction Details
            </h1>

            <p className="mt-2 text-gray-500">
              Complete information about this transaction.
            </p>
          </div>

          {/* Transaction Details Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-semibold text-gray-900">
              Transaction Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* Description */}
              <div>
                <p className="text-sm text-gray-500">
                  Description
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {transaction.description}
                </p>
              </div>

              {/* Amount */}
              <div>
                <p className="text-sm text-gray-500">
                  Amount
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  ₹{transaction.amount.toLocaleString("en-IN")}
                </p>
              </div>

              {/* Type */}
              <div>
                <p className="text-sm text-gray-500">
                  Type
                </p>

                <p
                  className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                    transaction.type === "Income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.type}
                </p>
              </div>

              {/* Category */}
              <div>
                <p className="text-sm text-gray-500">
                  Category
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {transaction.category}
                </p>
              </div>

              {/* Date */}
              <div>
                <p className="text-sm text-gray-500">
                  Date
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  {transaction.date}
                </p>
              </div>

              {/* Transaction ID */}
              <div>
                <p className="text-sm text-gray-500">
                  Transaction ID
                </p>

                <p className="mt-1 text-base font-semibold text-gray-900">
                  #{transaction.id}
                </p>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TransactionDetails;