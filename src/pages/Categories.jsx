import { useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const [error, setError] = useState("");

  // Stores the ID of the category currently being edited
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  // Add Category
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
        category.name.toLowerCase() ===
          categoryName.trim().toLowerCase() &&
        category.type === categoryType
    );

    if (duplicate) {
      setError("Category already exists");
      return;
    }

    // Create new custom category
    const newCategory = {
      id: Date.now(),
      name: categoryName.trim(),
      type: categoryType,
      categoryType: "custom",
    };

    // Add category
    setCategories([...categories, newCategory]);

    // Reset form
    setCategoryName("");
    setCategoryType("");
    setError("");
    setShowForm(false);
  };

  // Start Editing Category
  const handleEdit = (category) => {
    // Default category cannot be edited
    if (category.categoryType === "default") {
      return;
    }

    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setCategoryType(category.type);
    setError("");
    setShowForm(true);
  };

  // Update Category
  const handleUpdateCategory = (e) => {
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
        category.id !== editingCategoryId &&
        category.name.toLowerCase() ===
          categoryName.trim().toLowerCase() &&
        category.type === categoryType
    );

    if (duplicate) {
      setError("Category already exists");
      return;
    }

    // Update category
    setCategories(
      categories.map((category) =>
        category.id === editingCategoryId
          ? {
              ...category,
              name: categoryName.trim(),
              type: categoryType,
            }
          : category
      )
    );

    // Reset edit form
    setCategoryName("");
    setCategoryType("");
    setError("");
    setShowForm(false);
    setEditingCategoryId(null);
  };

  // Cancel Form
  const handleCancel = () => {
    setCategoryName("");
    setCategoryType("");
    setError("");
    setShowForm(false);
    setEditingCategoryId(null);
  };

  // Delete Category
  const handleDelete = (id) => {
    const category = categories.find(
      (category) => category.id === id
    );

    // Prevent deleting default category
    if (category.categoryType === "default") {
      return;
    }

    // Delete confirmation
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
            setEditingCategoryId(null);
            setCategoryName("");
            setCategoryType("");
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Category
        </button>
      </div>

      {/* Add / Edit Category Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">

          <h2 className="text-lg font-semibold mb-4">
            {editingCategoryId
              ? "Edit Category"
              : "Add Category"}
          </h2>

          <form
            onSubmit={
              editingCategoryId
                ? handleUpdateCategory
                : handleAddCategory
            }
          >

            {/* Category Name */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">
                Category Name
              </label>

              <input
                type="text"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName(e.target.value)
                }
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
                onChange={(e) =>
                  setCategoryType(e.target.value)
                }
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
                {editingCategoryId
                  ? "Save Changes"
                  : "Add Category"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Empty State / Category List */}
      {categories.length === 0 ? (
        <div className="bg-white p-8 rounded-xl text-center">
          <p className="text-gray-500">
            No categories found
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border-b"
            >

              {/* Category Information */}
              <div>
                <h3 className="font-semibold">
                  {category.name}
                </h3>

                <span className="text-sm text-gray-500">
                  {category.type}
                </span>

                <span className="text-xs text-blue-600 block">
                  {category.categoryType === "default"
                    ? "Default"
                    : "Custom"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(category)}
                  disabled={
                    category.categoryType === "default"
                  }
                  className={`px-3 py-1 border rounded-lg ${
                    category.categoryType === "default"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600"
                  }`}
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(category.id)}
                  disabled={
                    category.categoryType === "default"
                  }
                  className={`px-3 py-1 border rounded-lg ${
                    category.categoryType === "default"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-red-500"
                  }`}
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