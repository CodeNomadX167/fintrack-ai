import { useParams, useNavigate } from "react-router-dom";

function GoalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedGoals =
    localStorage.getItem("fintrack_goals");

  const goals = savedGoals
    ? JSON.parse(savedGoals)
    : [];

  const goal = goals.find(
    (item) => item.id === Number(id)
  );

  // Goal not found
  if (!goal) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="mx-auto max-w-3xl">

          <h1 className="text-2xl font-bold text-gray-900">
            Goal not found
          </h1>

          <p className="mt-2 text-gray-500">
            The financial goal you are looking for
            does not exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/goals")}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Back to Goals
          </button>

        </div>

      </div>
    );
  }

  const remaining = Math.max(
    goal.targetAmount - goal.savedAmount,
    0
  );

  const progress =
    goal.targetAmount > 0
      ? Math.min(
          (goal.savedAmount / goal.targetAmount) * 100,
          100
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="mx-auto max-w-3xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/goals")}
          className="mb-5 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Goals
        </button>

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            {goal.name}
          </h1>

          <p className="mt-1 text-gray-500">
            Financial Goal Details
          </p>

        </div>

        {/* Details Card */}
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

          {/* Amount Grid */}
          <div className="grid gap-4 sm:grid-cols-3">

            {/* Target */}
            <div className="rounded-lg bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Target
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                ₹{goal.targetAmount.toLocaleString("en-IN")}
              </p>

            </div>

            {/* Saved */}
            <div className="rounded-lg bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Saved
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                ₹{goal.savedAmount.toLocaleString("en-IN")}
              </p>

            </div>

            {/* Remaining */}
            <div className="rounded-lg bg-gray-50 p-4">

              <p className="text-sm text-gray-500">
                Remaining
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                ₹{remaining.toLocaleString("en-IN")}
              </p>

            </div>

          </div>

          {/* Progress */}
          <div className="mt-8">

            <div className="mb-2 flex justify-between">

              <span className="font-medium text-gray-700">
                Progress
              </span>

              <span className="font-semibold text-gray-900">
                {progress.toFixed(1)}%
              </span>

            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          {/* Target Date */}
          <div className="mt-8 border-t border-gray-200 pt-6">

            <p className="text-sm text-gray-500">
              Target Date
            </p>

            <p className="mt-1 font-semibold text-gray-900">
              {goal.targetDate}
            </p>

          </div>

          {/* Description */}
          <div className="mt-6">

            <p className="text-sm text-gray-500">
              Description
            </p>

            <p className="mt-1 text-gray-700">
              {goal.description ||
                "No description provided."}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default GoalDetailsPage;