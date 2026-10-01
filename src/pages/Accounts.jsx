import { useState } from "react";
import {
  Landmark,
  Wallet,
  Banknote,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  CircleDollarSign,
  CreditCard,
} from "lucide-react";

const INITIAL_ACCOUNTS = [
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
];

const ACCOUNT_TYPES = ["Bank", "Cash", "Wallet", "Other"];

const EMPTY_FORM = {
  name: "",
  type: "",
  balance: "",
};

function Accounts() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editingAccountId, setEditingAccountId] = useState(null);
  const [error, setError] = useState("");

  const totalBalance = accounts.reduce(
    (total, account) => total + (Number(account.balance) || 0),
    0
  );

  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  const getAccountIcon = (type) => {
    switch (type) {
      case "Bank":
        return Landmark;

      case "Cash":
        return Banknote;

      case "Wallet":
        return Wallet;

      default:
        return CreditCard;
    }
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setError("");
    setEditingAccountId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setError("");
    setEditingAccountId(null);
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const balance = formData.balance;

    if (!name) {
      return "Account name is required.";
    }

    if (name.length > 50) {
      return "Account name cannot exceed 50 characters.";
    }

    if (!formData.type) {
      return "Account type is required.";
    }

    if (balance === "") {
      return "Initial balance is required.";
    }

    const numericBalance = Number(balance);

    if (!Number.isFinite(numericBalance)) {
      return "Please enter a valid balance.";
    }

    if (numericBalance < 0) {
      return "Initial balance cannot be negative.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const accountData = {
      name: formData.name.trim(),
      type: formData.type,
      balance: Number(formData.balance),
    };

    if (editingAccountId !== null) {
      setAccounts((previousAccounts) =>
        previousAccounts.map((account) =>
          account.id === editingAccountId
            ? {
                ...account,
                ...accountData,
              }
            : account
        )
      );
    } else {
      setAccounts((previousAccounts) => [
        ...previousAccounts,
        {
          id: Date.now(),
          ...accountData,
        },
      ]);
    }

    resetForm();
  };

  const handleEdit = (account) => {
    setEditingAccountId(account.id);

    setFormData({
      name: account.name,
      type: account.type,
      balance: String(account.balance),
    });

    setError("");
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const account = accounts.find(
      (item) => item.id === id
    );

    if (!account) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${account.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setAccounts((previousAccounts) =>
      previousAccounts.filter(
        (item) => item.id !== id
      )
    );

    if (editingAccountId === id) {
      resetForm();
    }
  };

  return (
    <div
      className="
        min-h-screen bg-[var(--bg-primary)]
        px-4 py-6 sm:px-6 lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div
          className="
            mb-7 flex flex-col gap-5
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-xl bg-[var(--primary-soft)]
                  text-[var(--primary-color)]
                "
              >
                <Landmark size={22} />
              </div>

              <div>
                <h1
                  className="
                    text-2xl font-bold
                    text-[var(--text-primary)]
                    sm:text-3xl
                  "
                >
                  Financial Accounts
                </h1>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Manage your bank, cash and other accounts.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-[var(--primary-color)]
              px-5 py-3 text-sm font-semibold text-white
              shadow-sm transition-all duration-200
              hover:-translate-y-0.5 hover:opacity-90
            "
          >
            <Plus size={18} />
            Add Account
          </button>
        </div>

        {/* Summary */}
        <div
          className="
            mb-7 rounded-2xl
            border border-[var(--border-color)]
            bg-[var(--bg-secondary)]
            p-5 shadow-sm
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl bg-emerald-100
                text-emerald-600
                dark:bg-emerald-900/30
                dark:text-emerald-400
              "
            >
              <CircleDollarSign size={22} />
            </div>

            <div>
              <p className="text-sm text-[var(--text-muted)]">
                Total Account Balance
              </p>

              <p className="mt-0.5 text-2xl font-bold text-[var(--text-primary)]">
                {formatCurrency(totalBalance)}
              </p>
            </div>
          </div>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div
            className="
              mb-7 overflow-hidden rounded-2xl
              border border-[var(--border-color)]
              bg-[var(--bg-secondary)]
              shadow-sm
            "
          >
            {/* Form Header */}
            <div
              className="
                flex items-center justify-between
                border-b border-[var(--border-color)]
                px-5 py-4 sm:px-6
              "
            >
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  {editingAccountId !== null
                    ? "Edit Account"
                    : "Add New Account"}
                </h2>

                <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                  {editingAccountId !== null
                    ? "Update your account details."
                    : "Add an account to track your finances."}
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                aria-label="Close account form"
                className="
                  rounded-lg p-2
                  text-[var(--text-muted)]
                  transition
                  hover:bg-[var(--bg-primary)]
                  hover:text-[var(--text-primary)]
                "
              >
                <X size={19} />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-5 sm:p-6"
            >
              <div className="grid gap-5 md:grid-cols-3">

                {/* Account Name */}
                <div>
                  <label
                    htmlFor="account-name"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Account Name
                  </label>

                  <input
                    id="account-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. HDFC Bank"
                    maxLength={50}
                    autoComplete="off"
                    className="
                      w-full rounded-xl
                      border border-[var(--input-border)]
                      bg-[var(--input-bg)]
                      px-4 py-3 text-sm
                      text-[var(--text-primary)]
                      outline-none transition
                      placeholder:text-[var(--text-muted)]
                      focus:border-[var(--primary-color)]
                      focus:ring-2
                      focus:ring-[var(--primary-color)]/20
                    "
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label
                    htmlFor="account-type"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Account Type
                  </label>

                  <select
                    id="account-type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl
                      border border-[var(--input-border)]
                      bg-[var(--input-bg)]
                      px-4 py-3 text-sm
                      text-[var(--text-primary)]
                      outline-none transition
                      focus:border-[var(--primary-color)]
                      focus:ring-2
                      focus:ring-[var(--primary-color)]/20
                    "
                  >
                    <option value="">
                      Select Account Type
                    </option>

                    {ACCOUNT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Balance */}
                <div>
                  <label
                    htmlFor="initial-balance"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Initial Balance
                  </label>

                  <div className="relative">
                    <span
                      className="
                        pointer-events-none absolute left-4 top-1/2
                        -translate-y-1/2
                        text-sm font-semibold
                        text-[var(--text-muted)]
                      "
                    >
                      ₹
                    </span>

                    <input
                      id="initial-balance"
                      name="balance"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.balance}
                      onChange={handleChange}
                      placeholder="25000"
                      className="
                        w-full rounded-xl
                        border border-[var(--input-border)]
                        bg-[var(--input-bg)]
                        py-3 pl-8 pr-4 text-sm
                        text-[var(--text-primary)]
                        outline-none transition
                        placeholder:text-[var(--text-muted)]
                        focus:border-[var(--primary-color)]
                        focus:ring-2
                        focus:ring-[var(--primary-color)]/20
                      "
                    />
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  className="
                    mt-5 rounded-xl border border-red-200
                    bg-red-50 px-4 py-3
                    text-sm font-medium text-red-600
                    dark:border-red-900/50
                    dark:bg-red-900/20
                    dark:text-red-400
                  "
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* Actions */}
              <div
                className="
                  mt-6 flex flex-col-reverse gap-3
                  sm:flex-row sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    rounded-xl
                    border border-[var(--border-color)]
                    bg-[var(--bg-primary)]
                    px-5 py-2.5 text-sm font-semibold
                    text-[var(--text-primary)]
                    transition
                    hover:border-[var(--primary-color)]
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-[var(--primary-color)]
                    px-5 py-2.5 text-sm font-semibold text-white
                    transition hover:opacity-90
                  "
                >
                  {editingAccountId !== null ? (
                    <>
                      <Save size={17} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Add Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Account List */}
        {accounts.length === 0 ? (
          <div
            className="
              rounded-2xl border border-dashed
              border-[var(--border-color)]
              bg-[var(--bg-secondary)]
              px-6 py-14 text-center shadow-sm
            "
          >
            <div
              className="
                mx-auto flex h-16 w-16 items-center justify-center
                rounded-2xl bg-[var(--primary-soft)]
                text-[var(--primary-color)]
              "
            >
              <Landmark size={28} />
            </div>

            <h2
              className="
                mt-5 text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              No Accounts Yet
            </h2>

            <p
              className="
                mx-auto mt-2 max-w-md
                text-sm leading-6
                text-[var(--text-muted)]
              "
            >
              Add your first bank, cash, or wallet account
              to start managing your finances.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="
                mt-6 inline-flex items-center gap-2
                rounded-xl bg-[var(--primary-color)]
                px-5 py-3 text-sm font-semibold text-white
                transition hover:opacity-90
              "
            >
              <Plus size={18} />
              Add Your First Account
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                Your Accounts
              </h2>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {accounts.length}{" "}
                {accounts.length === 1 ? "account" : "accounts"} connected.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {accounts.map((account) => {
                const AccountIcon = getAccountIcon(account.type);

                return (
                  <div
                    key={account.id}
                    className="
                      group rounded-2xl
                      border border-[var(--border-color)]
                      bg-[var(--bg-secondary)]
                      p-5 shadow-sm
                      transition-all duration-300
                      hover:-translate-y-1 hover:shadow-lg
                    "
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className="
                            flex h-11 w-11 shrink-0
                            items-center justify-center
                            rounded-xl bg-[var(--primary-soft)]
                            text-[var(--primary-color)]
                          "
                        >
                          <AccountIcon size={21} />
                        </div>

                        <div className="min-w-0">
                          <h3
                            className="
                              truncate text-base font-bold
                              text-[var(--text-primary)]
                            "
                          >
                            {account.name}
                          </h3>

                          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                            {account.type}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Balance */}
                    <div
                      className="
                        mt-6 rounded-xl
                        border border-[var(--border-color)]
                        bg-[var(--bg-primary)]
                        p-4
                      "
                    >
                      <p className="text-xs font-medium text-[var(--text-muted)]">
                        Current Balance
                      </p>

                      <p
                        className="
                          mt-1 text-2xl font-bold
                          text-[var(--text-primary)]
                        "
                      >
                        {formatCurrency(account.balance)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(account)}
                        className="
                          inline-flex flex-1 items-center
                          justify-center gap-2 rounded-xl
                          border border-[var(--border-color)]
                          bg-[var(--bg-primary)]
                          px-3 py-2.5 text-sm font-semibold
                          text-[var(--text-primary)]
                          transition
                          hover:border-[var(--primary-color)]
                          hover:text-[var(--primary-color)]
                        "
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(account.id)
                        }
                        className="
                          inline-flex flex-1 items-center
                          justify-center gap-2 rounded-xl
                          border border-red-200
                          bg-red-50 px-3 py-2.5
                          text-sm font-semibold text-red-600
                          transition
                          hover:bg-red-100
                          dark:border-red-900/50
                          dark:bg-red-900/20
                          dark:text-red-400
                          dark:hover:bg-red-900/30
                        "
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Accounts;