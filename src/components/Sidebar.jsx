import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="min-h-screen w-56 border-r border-gray-200 bg-white p-5">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        Menu
      </h3>

      <div className="space-y-2">

        {/* Dashboard */}
        <Link
          to="/"
          className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Dashboard
        </Link>

        {/* Transactions */}
        <Link
          to="/transactions"
          className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Transactions
        </Link>

        {/* Categories */}
        <Link
          to="/categories"
          className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Categories
        </Link>

        {/* Accounts */}
        <Link
          to="/accounts"
          className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Accounts
        </Link>

        {/* Budgets */}
        <Link
          to="/budgets"
          className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Budgets
        </Link>

        {/* Goals */}
        <Link
          to="/goals"
          className="block cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
        >
          Goals
        </Link>

        {/* Analytics */}
        <p className="cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
          Analytics
        </p>

        {/* Reports */}
        <p className="cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
          Reports
        </p>

        {/* Profile */}
        <p className="cursor-pointer rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100">
          Profile
        </p>

      </div>
    </aside>
  );
}

export default Sidebar;