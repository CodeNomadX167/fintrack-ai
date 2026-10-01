import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");

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
  };

  const validateForm = () => {
    const newErrors = {};

    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (event) => {
    event.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    /*
      TEMPORARY API SIMULATION

      Later replace this with:
      POST /auth/login

      Example request:
      {
        email: formData.email.trim(),
        password: formData.password
      }

      Expected backend response:
      {
        token: "...",
        user: {...}
      }
    */

    setTimeout(() => {
      try {
        const demoToken = "demo-login-token";

        localStorage.setItem("token", demoToken);

        setIsLoading(false);

        navigate("/");
      } catch (error) {
        console.error("Login error:", error);

        setIsLoading(false);
        setServerError(
          "Something went wrong. Please try again."
        );
      }
    }, 800);
  };

  const inputClassName = (field) => `
    w-full rounded-xl border
    bg-[var(--input-bg)]
    py-3 text-[var(--text-primary)]
    outline-none transition
    placeholder:text-[var(--text-muted)]
    disabled:cursor-not-allowed
    disabled:opacity-60
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

        {/* Login Card */}
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
              <LogIn size={26} />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Sign in to continue to your financial dashboard.
            </p>
          </div>

          {/* Form */}
          <div className="px-6 pb-7 sm:px-8 sm:pb-8">

            {/* Server Error */}
            {serverError && (
              <div
                className="
                  mb-5 rounded-xl border
                  border-red-500/20 bg-red-500/10
                  px-4 py-3 text-sm
                  text-red-700 dark:text-red-400
                "
                role="alert"
              >
                {serverError}
              </div>
            )}

            <form onSubmit={handleLogin} noValidate>

              {/* Email */}
              <div className="mb-5">
                <label
                  htmlFor="login-email"
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
                    id="login-email"
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
                      errors.email ? "login-email-error" : undefined
                    }
                    className={`${inputClassName("email")} pl-11 pr-4`}
                  />
                </div>

                {errors.email && (
                  <p
                    id="login-email-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="login-password"
                    className="
                      text-sm font-medium
                      text-[var(--text-primary)]
                    "
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="
                      text-xs font-semibold
                      text-[var(--primary)]
                      transition hover:opacity-80
                    "
                  >
                    Forgot Password?
                  </Link>
                </div>

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
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={formData.password}
                    disabled={isLoading}
                    onChange={(event) =>
                      handleChange("password", event.target.value)
                    }
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password
                        ? "login-password-error"
                        : undefined
                    }
                    className={`${inputClassName("password")} pl-11 pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
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
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p
                    id="login-password-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  mt-5 flex w-full items-center justify-center gap-2
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

                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={17} />
                    Login
                  </>
                )}
              </button>
            </form>

            {/* Security Note */}
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
                    Secure Sign In
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    Your account credentials are protected.
                    Never share your password with anyone.
                  </p>
                </div>
              </div>
            </div>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
              Don&apos;t have an account?

              <Link
                to="/signup"
                className="
                  ml-1 font-semibold
                  text-[var(--primary)]
                  transition hover:opacity-80
                "
              >
                Sign Up
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

export default Login;