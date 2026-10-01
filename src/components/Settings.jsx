import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  LogOut,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
  X,
} from "lucide-react";

const THEME_OPTIONS = [
  {
    id: "light",
    name: "Light",
    description: "Clean and bright",
    icon: Sun,
  },
  {
    id: "dark",
    name: "Dark",
    description: "Easy on the eyes",
    icon: Moon,
  },
  {
    id: "warm",
    name: "Warm",
    description: "Soft and comfortable",
    icon: Palette,
  },
];

const Settings = () => {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("fintrack-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fintrack-theme", theme);
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 text-[var(--text-primary)] transition-colors duration-300 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-white shadow-md">
              <Shield size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Settings
              </h1>

              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Manage your account and application preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <section className="mb-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-[var(--shadow-md)] transition-colors duration-300 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--primary)]">
              <Palette size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Appearance
              </h2>

              <p className="text-sm text-[var(--text-muted)]">
                Choose how FinTrack AI looks.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {THEME_OPTIONS.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleThemeChange(option.id)}
                  className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[var(--primary)] bg-[var(--bg-tertiary)] shadow-md"
                      : "border-[var(--border-color)] hover:border-[var(--primary)] hover:bg-[var(--bg-tertiary)]"
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                      <Check size={13} />
                    </span>
                  )}

                  <div
                    className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 className="font-semibold">
                    {option.name}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Account Settings */}
        <section className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-[var(--shadow-md)] transition-colors duration-300 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--primary)]">
              <User size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold">
                Account Settings
              </h2>

              <p className="text-sm text-[var(--text-muted)]">
                Manage your account information and security.
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {/* Edit Profile */}
            <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-color)] p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">
                  Edit Profile
                </h3>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Update your name, email and phone number.
                </p>
              </div>

              <Link
                to="/profile"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
              >
                Edit Profile
              </Link>
            </div>

            {/* Change Password */}
            <div className="flex flex-col gap-4 rounded-xl border border-[var(--border-color)] p-4 transition hover:shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">
                  Change Password
                </h3>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Update your account password securely.
                </p>
              </div>

              <Link
                to="/change-password"
                className="rounded-lg bg-[var(--primary)] px-4 py-2 text-center text-sm font-medium text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
              >
                Change Password
              </Link>
            </div>

            {/* Logout */}
            <div className="flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50/40 p-4 dark:border-red-900/50 dark:bg-red-950/20 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-medium">
                  Logout
                </h3>

                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Sign out from your FinTrack AI account.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-[var(--text-primary)] shadow-2xl">

            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/50">
                <LogOut size={21} />
              </div>

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                aria-label="Close logout dialog"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="logout-title"
              className="text-xl font-semibold"
            >
              Logout
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Are you sure you want to logout from your FinTrack AI account?
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="rounded-lg border border-[var(--border-color)] px-5 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--bg-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;