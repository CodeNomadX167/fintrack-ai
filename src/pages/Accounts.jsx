import { useState } from "react";

function Accounts() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "HDFC Bank",
      type: "Bank",
      balance: 25000,
    },
    {
      id: 2,
      name: "Cash",
      type: "Cash",
      balance: 5000,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const [error, setError] = useState("");

  // Stores the ID of account being edited
  const [editingAccountId, setEditingAccountId] = useState(null);

  // Add Account
  const handleAddAccount = (e) => {
    e.preventDefault();

    if (!accountName.trim()) {
      setError("Account name is required");
      return;
    }

    if (!accountType) {
      setError("Account type is required");
      return;
    }

    if (initialBalance === "") {
      setError("Initial balance is required");
      return;
    }

    if (Number(initialBalance) < 0) {
      setError("Initial balance cannot be negative");
      return;
    }

    const newAccount = {
      id: Date.now(),
      name: accountName.trim(),
      type: accountType,
      balance: Number(initialBalance),
    };

    setAccounts([...accounts, newAccount]);

    setAccountName("");
    setAccountType("");
    setInitialBalance("");
    setError("");
    setShowForm(false);
  };

  // Start Editing Account
  const handleEdit = (account) => {
    setEditingAccountId(account.id);
    setAccountName(account.name);
    setAccountType(account.type);
    setInitialBalance(account.balance);
    setError("");
    setShowForm(true);
  };

  // Update Account
  const handleUpdateAccount = (e) => {
    e.preventDefault();

    if (!accountName.trim()) {
      setError("Account name is required");
      return;
    }

    if (!accountType) {
      setError("Account type is required");
      return;
    }

    if (initialBalance === "") {
      setError("Initial balance is required");
      return;
    }

    if (Number(initialBalance) < 0) {
      setError("Initial balance cannot be negative");
      return;
    }

    setAccounts(
      accounts.map((account) =>
        account.id === editingAccountId
          ? {
              ...account,
              name: accountName.trim(),
              type: accountType,
              balance: Number(initialBalance),
            }
          : account
      )
    );

    // Reset form
    setAccountName("");
    setAccountType("");
    setInitialBalance("");
    setError("");
    setShowForm(false);
    setEditingAccountId(null);
  };

  // Cancel Form
  const handleCancel = () => {
    setAccountName("");
    setAccountType("");
    setInitialBalance("");
    setError("");
    setShowForm(false);
    setEditingAccountId(null);
  };

  // Delete Account
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );

    if (confirmed) {
      setAccounts(
        accounts.filter((account) => account.id !== id)
      );
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Financial Accounts
          </h1>

          <p className="text-gray-500">
            Manage your bank, cash and other accounts
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setError("");
            setEditingAccountId(null);
            setAccountName("");
            setAccountType("");
            setInitialBalance("");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Account
        </button>
      </div>

      {/* Add / Edit Account Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            {editingAccountId
              ? "Edit Account"
              : "Add Account"}
          </h2>

          <form
            onSubmit={
              editingAccountId
                ? handleUpdateAccount
                : handleAddAccount
            }
          >

            {/* Account Name */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Account Name
              </label>

              <input
                type="text"
                value={accountName}
                onChange={(e) =>
                  setAccountName(e.target.value)
                }
                placeholder="HDFC Bank"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Account Type */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Account Type
              </label>

              <select
                value={accountType}
                onChange={(e) =>
                  setAccountType(e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">
                  Select Account Type
                </option>

                <option value="Bank">
                  Bank
                </option>

                <option value="Cash">
                  Cash
                </option>

                <option value="Wallet">
                  Wallet
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>

            {/* Initial Balance */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Initial Balance
              </label>

              <input
                type="number"
                value={initialBalance}
                onChange={(e) =>
                  setInitialBalance(e.target.value)
                }
                placeholder="25000"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-4">
                {error}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3">

              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                {editingAccountId
                  ? "Save Changes"
                  : "Add Account"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Account List */}
      {accounts.length === 0 ? (

        <div className="bg-white p-8 rounded-xl text-center">
          <p className="text-gray-500">
            No accounts found
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {accounts.map((account) => (

            <div
              key={account.id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <div className="flex items-center justify-between">

                {/* Account Information */}
                <div>
                  <h3 className="font-semibold text-lg">
                    {account.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {account.type}
                  </p>
                </div>

                {/* Balance + Actions */}
                <div className="text-right">

                  <p className="text-lg font-bold">
                    ₹{account.balance.toLocaleString("en-IN")}
                  </p>

                  <div className="flex gap-2 mt-2">

                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(account)}
                      className="px-3 py-1 border rounded-lg text-blue-600"
                    >
                      Edit
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        handleDelete(account.id)
                      }
                      className="px-3 py-1 border rounded-lg text-red-500"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Accounts;