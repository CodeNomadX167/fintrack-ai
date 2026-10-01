import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
  XCircle,
} from "lucide-react";

const INITIAL_FORM_DATA = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setServerError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    // Name validation
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (name.length > 80) {
      newErrors.name = "Name must not exceed 80 characters.";
    }

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters.";
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = (event) => {
    event.preventDefault();

    setServerError("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    /*
      TEMPORARY API SIMULATION

      Later replace this with:

      POST /auth/signup

      Request:
      {
        name,
        email,
        password
      }

      Backend should create the user and return:
      {
        token,
        user
      }
    */

    setTimeout(() => {
      try {
        setIsLoading(false);

        setSuccessMessage(
          "Account created successfully. Redirecting to login..."
        );

        setFormData(INITIAL_FORM_DATA);
        setErrors({});

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        console.error("Signup error:", error);

        setIsLoading(false);
        setServerError(
          "Something went wrong. Please try again."
        );
      }
    }, 800);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const getInputClassName = (field, hasIcon = false) => `
    w-full rounded-xl border
    bg-[var(--input-bg)]
    py-3 text-[var(--text-primary)]
    outline-none transition
    placeholder:text-[var(--text-muted)]
    disabled:cursor-not-allowed
    disabled:opacity-60
    ${hasIcon ? "pl-11 pr-4" : "px-4"}
    ${
      errors[field]
        ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
        : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
    }
  `;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-4 py-8 text-[var(--text-primary)] transition-colors duration-300 sm:px-6">

      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute -left-24 -top-24 h-72 w-72 rounded-full
            bg-[var(--primary)] opacity-[0.07] blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-24 -right-24 h-72 w-72 rounded-full
            bg-[var(--primary)] opacity-[0.07] blur-3xl
          "
        />
      </div>

      <main className="relative z-10 w-full max-w-md">

        {/* Brand */}
        <div className="mb-6 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2"
            aria-label="FinTrack AI"
          >
            <span
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl bg-[var(--primary)]
                text-lg font-bold text-white shadow-sm
              "
            >
              F
            </span>

            <span className="text-xl font-bold tracking-tight">
              FinTrack AI
            </span>
          </Link>
        </div>

        {/* Signup Card */}
        <section
          className="
            overflow-hidden rounded-2xl border
            border-[var(--border-color)]
            bg-[var(--card-bg)]
            shadow-[var(--shadow-md)]
          "
        >
          {/* Header */}
          <div className="px-6 pb-5 pt-7 text-center sm:px-8 sm:pt-8">
            <div
              className="
                mx-auto flex h-14 w-14 items-center justify-center
                rounded-2xl bg-[var(--primary-soft)]
                text-[var(--primary)]
              "
            >
              <UserPlus size={26} />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Create Account
            </h1>

            <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
              Create your FinTrack AI account and start managing
              your finances.
            </p>
          </div>

          {/* Form */}
          <div className="px-6 pb-7 sm:px-8 sm:pb-8">

            {/* Server Error */}
            {serverError && (
              <div
                className="
                  mb-5 flex items-start gap-3 rounded-xl border
                  border-red-500/20 bg-red-500/10
                  px-4 py-3 text-sm text-red-700
                  dark:text-red-400
                "
                role="alert"
              >
                <XCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{serverError}</span>
              </div>
            )}

            {/* Success */}
            {successMessage && (
              <div
                className="
                  mb-5 flex items-start gap-3 rounded-xl border
                  border-green-500/20 bg-green-500/10
                  px-4 py-3 text-sm text-green-700
                  dark:text-green-400
                "
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSignup} noValidate>

              {/* Name */}
              <div className="mb-5">
                <label
                  htmlFor="signup-name"
                  className="
                    mb-2 block text-sm font-medium
                    text-[var(--text-primary)]
                  "
                >
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="
                      pointer-events-none absolute left-4 top-1/2
                      -translate-y-1/2
                      text-[var(--text-muted)]
                    "
                  />

                  <input
                    id="signup-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    disabled={isLoading}
                    maxLength={80}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name
                        ? "signup-name-error"
                        : undefined
                    }
                    className={getInputClassName("name", true)}
                  />
                </div>

                {errors.name && (
                  <p
                    id="signup-name-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="signup-email"
                  className="
                    mb-2 block text-sm font-medium
                    text-[var(--text-primary)]
                  "
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="
                      pointer-events-none absolute left-4 top-1/2
                      -translate-y-1/2
                      text-[var(--text-muted)]
                    "
                  />

                  <input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    disabled={isLoading}
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email
                        ? "signup-email-error"
                        : undefined
                    }
                    className={getInputClassName("email", true)}
                  />
                </div>

                {errors.email && (
                  <p
                    id="signup-email-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-5">
                <label
                  htmlFor="signup-password"
                  className="
                    mb-2 block text-sm font-medium
                    text-[var(--text-primary)]
                  "
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="
                      pointer-events-none absolute left-4 top-1/2
                      -translate-y-1/2
                      text-[var(--text-muted)]
                    "
                  />

                  <input
                    id="signup-password"
                    type={
                      showPasswords.password
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={formData.password}
                    disabled={isLoading}
                    onChange={(event) =>
                      handleChange(
                        "password",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "signup-password-error"
                        : "signup-password-hint"
                    }
                    className={`
                      ${getInputClassName("password", true)}
                      pr-12
                    `}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility("password")
                    }
                    disabled={isLoading}
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2 rounded-lg p-1.5
                      text-[var(--text-muted)]
                      transition hover:bg-[var(--bg-secondary)]
                      hover:text-[var(--text-primary)]
                      disabled:cursor-not-allowed
                    "
                    aria-label={
                      showPasswords.password
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPasswords.password ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password ? (
                  <p
                    id="signup-password-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {errors.password}
                  </p>
                ) : (
                  <p
                    id="signup-password-hint"
                    className="mt-1.5 text-xs text-[var(--text-muted)]"
                  >
                    Use at least 8 characters.
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label
                  htmlFor="signup-confirm-password"
                  className="
                    mb-2 block text-sm font-medium
                    text-[var(--text-primary)]
                  "
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="
                      pointer-events-none absolute left-4 top-1/2
                      -translate-y-1/2
                      text-[var(--text-muted)]
                    "
                  />

                  <input
                    id="signup-confirm-password"
                    type={
                      showPasswords.confirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    disabled={isLoading}
                    onChange={(event) =>
                      handleChange(
                        "confirmPassword",
                        event.target.value
                      )
                    }
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={
                      errors.confirmPassword
                        ? "signup-confirm-password-error"
                        : undefined
                    }
                    className={`
                      ${getInputClassName(
                        "confirmPassword",
                        true
                      )}
                      pr-12
                    `}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(
                        "confirmPassword"
                      )
                    }
                    disabled={isLoading}
                    className="
                      absolute right-3 top-1/2
                      -translate-y-1/2 rounded-lg p-1.5
                      text-[var(--text-muted)]
                      transition hover:bg-[var(--bg-secondary)]
                      hover:text-[var(--text-primary)]
                      disabled:cursor-not-allowed
                    "
                    aria-label={
                      showPasswords.confirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showPasswords.confirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p
                    id="signup-confirm-password-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Create Account */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  flex w-full items-center justify-center gap-2
                  rounded-xl bg-[var(--primary)]
                  px-5 py-3 text-sm font-semibold text-white
                  shadow-sm transition
                  hover:opacity-90
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]/30
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {isLoading ? (
                  <>
                    <span
                      className="
                        h-4 w-4 animate-spin rounded-full
                        border-2 border-white
                        border-t-transparent
                      "
                    />

                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={17} />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Security Info */}
            <div
              className="
                mt-5 rounded-xl border
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
                  <p className="text-sm font-medium">
                    Your information is secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    Your password will be securely handled by
                    the backend authentication system.
                  </p>
                </div>
              </div>
            </div>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              Already have an account?

              <Link
                to="/login"
                className="
                  ml-1 font-semibold
                  text-[var(--primary)]
                  transition hover:opacity-80
                "
              >
                Login
              </Link>
            </p>
          </div>
        </section>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-[var(--text-muted)]">
          FinTrack AI • Smart Finance Management
        </p>
      </main>
    </div>
  );
}

export default Signup;