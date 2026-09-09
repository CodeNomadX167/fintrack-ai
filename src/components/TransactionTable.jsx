function TransactionTable({ transactions }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full min-w-[700px]">

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
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default TransactionTable;