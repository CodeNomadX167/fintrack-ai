import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const INITIAL_FORM_DATA = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function ChangePassword() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const validateForm = () => {
    const newErrors = {};

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = formData;

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 8) {
      newErrors.newPassword =
        "New password must be at least 8 characters.";
    }

    if (
      currentPassword &&
      newPassword &&
      currentPassword === newPassword
    ) {
      newErrors.newPassword =
        "New password must be different from current password.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    clearMessages();
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleSubmit = () => {
    clearMessages();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    /*
      TEMPORARY API SIMULATION

      Later replace this setTimeout with:
      PUT /users/me/password
      or
      POST /auth/change-password
    */

    setTimeout(() => {
      try {
        setIsLoading(false);

        setSuccessMessage("Password updated successfully.");

        setFormData(INITIAL_FORM_DATA);
        setErrors({});

        setShowPasswords({
          currentPassword: false,
          newPassword: false,
          confirmPassword: false,
        });

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (error) {
        console.error("Password update error:", error);

        setIsLoading(false);
        setErrorMessage(
          "Something went wrong. Please try again."
        );
      }
    }, 800);
  };

  const getInputClassName = (field) => {
    const hasError = Boolean(errors[field]);

    return `
      w-full rounded-xl border bg-[var(--input-bg)] px-4 py-3 pr-12
      text-[var(--text-primary)] outline-none transition
      placeholder:text-[var(--text-muted)]
      ${
        hasError
          ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
          : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
      }
      disabled:cursor-not-allowed disabled:opacity-60
    `;
  };

  const passwordFields = [
    {
      key: "currentPassword",
      id: "current-password",
      label: "Current Password",
      placeholder: "Enter current password",
      autoComplete: "current-password",
    },
    {
      key: "newPassword",
      id: "new-password",
      label: "New Password",
      placeholder: "Enter new password",
      autoComplete: "new-password",
    },
    {
      key: "confirmPassword",
      id: "confirm-password",
      label: "Confirm New Password",
      placeholder: "Confirm new password",
      autoComplete: "new-password",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">

        {/* Header */}
        <header className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-[var(--primary)]">
            <ShieldCheck size={18} />

            <span className="text-sm font-semibold">
              Account Security
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            Change Password
          </h1>

          <p className="mt-2 text-sm text-[var(--text-muted)] sm:text-base">
            Update your account password securely.
          </p>
        </header>

        {/* Main Card */}
        <section
          className="
            overflow-hidden rounded-2xl border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            shadow-sm
          "
        >
          {/* Card Header */}
          <div
            className="
              border-b border-[var(--border-color)]
              px-5 py-6 sm:px-8
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-xl bg-[var(--primary-soft)]
                  text-[var(--primary)]
                "
              >
                <LockKeyhole size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-[var(--text-primary)]">
                  Password Security
                </h2>

                <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                  Keep your account protected with a strong password.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-5 py-6 sm:px-8">

            {/* Success */}
            {successMessage && (
              <div
                className="
                  mb-5 flex items-start gap-3 rounded-xl border
                  border-green-500/20 bg-green-500/10 px-4 py-3
                  text-sm text-green-700 dark:text-green-400
                "
                role="status"
              >
                <CheckCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{successMessage}</span>
              </div>
            )}

            {/* Error */}
            {errorMessage && (
              <div
                className="
                  mb-5 flex items-start gap-3 rounded-xl border
                  border-red-500/20 bg-red-500/10 px-4 py-3
                  text-sm text-red-700 dark:text-red-400
                "
                role="alert"
              >
                <XCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{errorMessage}</span>
              </div>
            )}

            {/* Password Fields */}
            <div className="space-y-5">
              {passwordFields.map((field) => {
                const isVisible = showPasswords[field.key];

                return (
                  <div key={field.key}>
                    <label
                      htmlFor={field.id}
                      className="
                        mb-2 block text-sm font-medium
                        text-[var(--text-primary)]
                      "
                    >
                      {field.label}
                    </label>

                    <div className="relative">
                      <input
                        id={field.id}
                        type={isVisible ? "text" : "password"}
                        autoComplete={field.autoComplete}
                        value={formData[field.key]}
                        disabled={isLoading}
                        onChange={(event) =>
                          handleChange(
                            field.key,
                            event.target.value
                          )
                        }
                        placeholder={field.placeholder}
                        className={getInputClassName(field.key)}
                        aria-invalid={Boolean(errors[field.key])}
                        aria-describedby={
                          errors[field.key]
                            ? `${field.id}-error`
                            : undefined
                        }
                      />

                      <button
                        type="button"
                        onClick={() =>
                          togglePasswordVisibility(field.key)
                        }
                        disabled={isLoading}
                        className="
                          absolute right-3 top-1/2
                          -translate-y-1/2 rounded-lg
                          p-1.5 text-[var(--text-muted)]
                          transition hover:bg-[var(--bg-secondary)]
                          hover:text-[var(--text-primary)]
                          disabled:cursor-not-allowed
                        "
                        aria-label={
                          isVisible
                            ? `Hide ${field.label}`
                            : `Show ${field.label}`
                        }
                      >
                        {isVisible ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {errors[field.key] && (
                      <p
                        id={`${field.id}-error`}
                        className="mt-1.5 text-sm text-red-500"
                      >
                        {errors[field.key]}
                      </p>
                    )}

                    {field.key === "newPassword" && (
                      <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                        Password must contain at least 8 characters.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Security Note */}
            <div
              className="
                mt-6 rounded-xl border
                border-[var(--border-color)]
                bg-[var(--bg-secondary)] p-4
              "
            >
              <div className="flex gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[var(--primary)]"
                />

                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    Security tip
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    Use a unique password that you do not reuse
                    on other websites or applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <Link
                to="/settings"
                className="
                  flex w-full items-center justify-center
                  rounded-xl border
                  border-[var(--border-color)]
                  px-5 py-3 text-sm font-semibold
                  text-[var(--text-primary)]
                  transition hover:bg-[var(--bg-secondary)]
                  focus:outline-none focus:ring-2
                  focus:ring-[var(--primary)]/30
                  sm:w-1/2
                "
              >
                Cancel
              </Link>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl bg-[var(--primary)]
                  px-5 py-3 text-sm font-semibold text-white
                  shadow-sm transition
                  hover:opacity-90
                  focus:outline-none focus:ring-2
                  focus:ring-[var(--primary)]/30
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-1/2
                "
              >
                {isLoading ? (
                  <>
                    <span
                      className="
                        h-4 w-4 animate-spin rounded-full
                        border-2 border-white border-t-transparent
                      "
                    />

                    Updating...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={17} />
                    Update Password
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ChangePassword;