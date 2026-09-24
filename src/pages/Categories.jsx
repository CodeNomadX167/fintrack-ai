import { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Food",
      type: "Expense",
    },
    {
      id: 2,
      name: "Shopping",
      type: "Expense",
    },
    {
      id: 3,
      name: "Salary",
      type: "Income",
    },
    {
      id: 4,
      name: "Transport",
      type: "Expense",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const [error, setError] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();

    // Name validation
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    // Type validation
    if (!categoryType) {
      setError("Category type is required");
      return;
    }

    // Duplicate validation
    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === categoryName.trim().toLowerCase() &&
        category.type === categoryType
    );

    if (duplicate) {
      setError("Category already exists");
      return;
    }

    // Add new category
    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
      type: categoryType,
    };

    setCategories([...categories, newCategory]);

    // Reset form
    setCategoryName("");
    setCategoryType("");
    setError("");
    setShowForm(false);
  };

  const handleCancel = () => {
    setCategoryName("");
    setCategoryType("");
    setError("");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (confirmed) {
      setCategories(
        categories.filter((category) => category.id !== id)
      );
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500">
            Manage your finance categories
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setError("");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            Add Category
          </h2>

          <form onSubmit={handleAddCategory}>

            {/* Category Name */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Category Name
              </label>

              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Food"
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            {/* Category Type */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Type
              </label>

              <select
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
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
                Add Category
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Empty State */}
      {categories.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center">
          <p className="text-gray-500">
            No categories found
          </p>
        </div>
      ) : (
        /* Category List */
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border-b"
            >

              <div>
                <h3 className="font-semibold">
                  {category.name}
                </h3>

                <span className="text-sm text-gray-500">
                  {category.type}
                </span>
              </div>

              <div className="flex gap-2">

                <button
                  className="px-3 py-1 border rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-3 py-1 border rounded-lg text-red-500"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Categories;