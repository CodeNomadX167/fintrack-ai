import { useState } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  FolderTree,
  Pencil,
  Plus,
  ReceiptText,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Food",
    type: "Expense",
    categoryType: "default",
  },
  {
    id: 2,
    name: "Shopping",
    type: "Expense",
    categoryType: "default",
  },
  {
    id: 3,
    name: "Salary",
    type: "Income",
    categoryType: "default",
  },
  {
    id: 4,
    name: "Transport",
    type: "Expense",
    categoryType: "default",
  },
];

const EMPTY_FORM = {
  name: "",
  type: "",
};

function Categories() {
  const [categories, setCategories] = useState(
    INITIAL_CATEGORIES
  );

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);

  const [error, setError] = useState("");

  const [editingCategoryId, setEditingCategoryId] =
    useState(null);

  const defaultCount = categories.filter(
    (category) => category.categoryType === "default"
  ).length;

  const customCount = categories.filter(
    (category) => category.categoryType === "custom"
  ).length;

  const incomeCount = categories.filter(
    (category) => category.type === "Income"
  ).length;

  const expenseCount = categories.filter(
    (category) => category.type === "Expense"
  ).length;

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setError("");
    setEditingCategoryId(null);
    setShowForm(false);
  };

  const openAddForm = () => {
    setFormData(EMPTY_FORM);
    setError("");
    setEditingCategoryId(null);
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
    const trimmedName = formData.name.trim();

    if (!trimmedName) {
      return "Category name is required.";
    }

    if (trimmedName.length > 40) {
      return "Category name cannot exceed 40 characters.";
    }

    if (!formData.type) {
      return "Category type is required.";
    }

    const duplicate = categories.some(
      (category) =>
        category.id !== editingCategoryId &&
        category.name.toLowerCase() ===
          trimmedName.toLowerCase() &&
        category.type === formData.type
    );

    if (duplicate) {
      return "Category already exists.";
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

    const trimmedName = formData.name.trim();

    if (editingCategoryId !== null) {
      setCategories((previousCategories) =>
        previousCategories.map((category) =>
          category.id === editingCategoryId
            ? {
                ...category,
                name: trimmedName,
                type: formData.type,
              }
            : category
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: trimmedName,
        type: formData.type,
        categoryType: "custom",
      };

      setCategories((previousCategories) => [
        ...previousCategories,
        newCategory,
      ]);
    }

    resetForm();
  };

  const handleEdit = (category) => {
    if (category.categoryType === "default") {
      return;
    }

    setEditingCategoryId(category.id);

    setFormData({
      name: category.name,
      type: category.type,
    });

    setError("");
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const category = categories.find(
      (item) => item.id === id
    );

    if (!category || category.categoryType === "default") {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setCategories((previousCategories) =>
      previousCategories.filter(
        (item) => item.id !== id
      )
    );

    if (editingCategoryId === id) {
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
                <FolderTree size={22} />
              </div>

              <div>
                <h1
                  className="
                    text-2xl font-bold
                    text-[var(--text-primary)]
                    sm:text-3xl
                  "
                >
                  Categories
                </h1>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Organize your income and expense categories.
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
            Add Category
          </button>
        </div>

        {/* Summary */}
        <div className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Total */}
          <div
            className="
              rounded-2xl border border-[var(--border-color)]
              bg-[var(--bg-secondary)] p-5 shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-[var(--primary-soft)]
                  text-[var(--primary-color)]
                "
              >
                <FolderTree size={19} />
              </div>

              <span className="text-xs font-medium text-[var(--text-muted)]">
                Total
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
              {categories.length}
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Available categories
            </p>
          </div>

          {/* Income */}
          <div
            className="
              rounded-2xl border border-[var(--border-color)]
              bg-[var(--bg-secondary)] p-5 shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-emerald-100 text-emerald-600
                  dark:bg-emerald-900/30
                  dark:text-emerald-400
                "
              >
                <ArrowUpCircle size={19} />
              </div>

              <span className="text-xs font-medium text-[var(--text-muted)]">
                Income
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
              {incomeCount}
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Income categories
            </p>
          </div>

          {/* Expense */}
          <div
            className="
              rounded-2xl border border-[var(--border-color)]
              bg-[var(--bg-secondary)] p-5 shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-red-100 text-red-600
                  dark:bg-red-900/30
                  dark:text-red-400
                "
              >
                <ArrowDownCircle size={19} />
              </div>

              <span className="text-xs font-medium text-[var(--text-muted)]">
                Expense
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
              {expenseCount}
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Expense categories
            </p>
          </div>

          {/* Custom */}
          <div
            className="
              rounded-2xl border border-[var(--border-color)]
              bg-[var(--bg-secondary)] p-5 shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-xl bg-purple-100 text-purple-600
                  dark:bg-purple-900/30
                  dark:text-purple-400
                "
              >
                <ReceiptText size={19} />
              </div>

              <span className="text-xs font-medium text-[var(--text-muted)]">
                Custom
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-[var(--text-primary)]">
              {customCount}
            </p>

            <p className="mt-1 text-sm text-[var(--text-muted)]">
              User-created categories
            </p>
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
                flex items-start justify-between gap-4
                border-b border-[var(--border-color)]
                px-5 py-5 sm:px-7
              "
            >
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">
                  {editingCategoryId !== null
                    ? "Edit Category"
                    : "Add Category"}
                </h2>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {editingCategoryId !== null
                    ? "Update your custom category."
                    : "Create a custom income or expense category."}
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                aria-label="Close category form"
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
              className="p-5 sm:p-7"
            >
              <div className="grid gap-5 md:grid-cols-2">

                {/* Name */}
                <div>
                  <label
                    htmlFor="category-name"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Category Name
                  </label>

                  <input
                    id="category-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Groceries"
                    maxLength={40}
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

                {/* Type */}
                <div>
                  <label
                    htmlFor="category-type"
                    className="
                      mb-2 block text-sm font-semibold
                      text-[var(--text-primary)]
                    "
                  >
                    Category Type
                  </label>

                  <select
                    id="category-type"
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
                      Select Type
                    </option>

                    <option value="Expense">
                      Expense
                    </option>

                    <option value="Income">
                      Income
                    </option>
                  </select>
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
                  border-t border-[var(--border-color)]
                  pt-6 sm:flex-row sm:justify-end
                "
              >
                <button
                  type="button"
                  onClick={resetForm}
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl
                    border border-[var(--border-color)]
                    bg-[var(--bg-primary)]
                    px-5 py-2.5
                    text-sm font-semibold
                    text-[var(--text-primary)]
                    transition
                    hover:border-[var(--primary-color)]
                  "
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl bg-[var(--primary-color)]
                    px-5 py-2.5
                    text-sm font-semibold text-white
                    transition hover:opacity-90
                  "
                >
                  {editingCategoryId !== null ? (
                    <>
                      <Pencil size={17} />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus size={17} />
                      Add Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Category List */}
        {categories.length === 0 ? (
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
              <FolderTree size={29} />
            </div>

            <h2
              className="
                mt-5 text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              No Categories Yet
            </h2>

            <p
              className="
                mx-auto mt-2 max-w-md
                text-sm leading-6
                text-[var(--text-muted)]
              "
            >
              Create your first custom category to organize
              your transactions.
            </p>

            <button
              type="button"
              onClick={openAddForm}
              className="
                mt-6 inline-flex items-center gap-2
                rounded-xl bg-[var(--primary-color)]
                px-5 py-3
                text-sm font-semibold text-white
                transition hover:opacity-90
              "
            >
              <Plus size={18} />
              Create Category
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                All Categories
              </h2>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Default categories are protected. Custom categories
                can be edited or deleted.
              </p>
            </div>

            <div
              className="
                overflow-hidden rounded-2xl
                border border-[var(--border-color)]
                bg-[var(--bg-secondary)]
                shadow-sm
              "
            >
              {categories.map((category, index) => {
                const isDefault =
                  category.categoryType === "default";

                const isIncome = category.type === "Income";

                return (
                  <div
                    key={category.id}
                    className={`
                      flex flex-col gap-4 p-5
                      transition-colors
                      sm:flex-row sm:items-center
                      sm:justify-between
                      ${
                        index !== categories.length - 1
                          ? "border-b border-[var(--border-color)]"
                          : ""
                      }
                      hover:bg-[var(--bg-primary)]
                    `}
                  >
                    {/* Category Info */}
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`
                          flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-xl
                          ${
                            isIncome
                              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          }
                        `}
                      >
                        {isIncome ? (
                          <ArrowUpCircle size={21} />
                        ) : (
                          <ArrowDownCircle size={21} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className="
                              truncate text-base font-bold
                              text-[var(--text-primary)]
                            "
                          >
                            {category.name}
                          </h3>

                          {isDefault && (
                            <span
                              className="
                                inline-flex items-center gap-1
                                rounded-full
                                bg-[var(--primary-soft)]
                                px-2.5 py-1
                                text-[10px] font-bold uppercase
                                tracking-wide
                                text-[var(--primary-color)]
                              "
                            >
                              <ShieldCheck size={11} />
                              Default
                            </span>
                          )}

                          {!isDefault && (
                            <span
                              className="
                                rounded-full bg-purple-100
                                px-2.5 py-1
                                text-[10px] font-bold uppercase
                                tracking-wide text-purple-700
                                dark:bg-purple-900/30
                                dark:text-purple-400
                              "
                            >
                              Custom
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm text-[var(--text-muted)]">
                          {category.type} category
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 sm:shrink-0">
                      <button
                        type="button"
                        onClick={() => handleEdit(category)}
                        disabled={isDefault}
                        title={
                          isDefault
                            ? "Default categories cannot be edited"
                            : "Edit category"
                        }
                        className={`
                          inline-flex flex-1 items-center
                          justify-center gap-2
                          rounded-xl border px-4 py-2.5
                          text-sm font-semibold
                          transition sm:flex-none
                          ${
                            isDefault
                              ? "cursor-not-allowed border-[var(--border-color)] text-[var(--text-muted)] opacity-60"
                              : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
                          }
                        `}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(category.id)
                        }
                        disabled={isDefault}
                        title={
                          isDefault
                            ? "Default categories cannot be deleted"
                            : "Delete category"
                        }
                        className={`
                          inline-flex flex-1 items-center
                          justify-center gap-2
                          rounded-xl border px-4 py-2.5
                          text-sm font-semibold
                          transition sm:flex-none
                          ${
                            isDefault
                              ? "cursor-not-allowed border-[var(--border-color)] text-[var(--text-muted)] opacity-60"
                              : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                          }
                        `}
                      >
                        <Trash2 size={15} />
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

export default Categories;