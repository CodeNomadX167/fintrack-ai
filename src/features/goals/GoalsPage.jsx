import { useState } from "react";
import GoalCard from "./GoalCard";
import CreateGoalForm from "./CreateGoalForm";

function GoalsPage() {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("fintrack_goals");

    if (savedGoals) {
      return JSON.parse(savedGoals);
    }

    const defaultGoals = [
      {
        id: 1,
        name: "Emergency Fund",
        targetAmount: 50000,
        savedAmount: 20000,
        targetDate: "2026-12-31",
        description: "Emergency savings",
      },
      {
        id: 2,
        name: "New Laptop",
        targetAmount: 80000,
        savedAmount: 30000,
        targetDate: "2027-06-30",
        description: "Savings for a new laptop",
      },
    ];

    localStorage.setItem(
      "fintrack_goals",
      JSON.stringify(defaultGoals)
    );

    return defaultGoals;
  });

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateGoal = (newGoal) => {
    const goal = {
      id: Date.now(),
      ...newGoal,
      savedAmount: 0,
    };

    setGoals((previousGoals) => {
      const updatedGoals = [...previousGoals, goal];

      localStorage.setItem(
        "fintrack_goals",
        JSON.stringify(updatedGoals)
      );

      return updatedGoals;
    });

    setShowCreateForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Financial Goals
          </h1>

          <p className="mt-1 text-gray-500">
            Track your savings goals
          </p>
        </div>

        {!showCreateForm && (
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            + Create Goal
          </button>
        )}
      </div>

      {/* Create Goal Form */}
      {showCreateForm && (
        <div className="mb-8">
          <CreateGoalForm
            onCreate={handleCreateGoal}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      )}

      {/* Goals List */}
      {!showCreateForm && (
        <>
          {goals.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {goals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200">

              <h2 className="text-xl font-semibold text-gray-900">
                No goals yet
              </h2>

              <p className="mt-2 text-gray-500">
                Create your first financial goal to start
                tracking your savings.
              </p>

              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                + Create Goal
              </button>

            </div>
          )}
        </>
      )}
    </div>
  );
}

export default GoalsPage;