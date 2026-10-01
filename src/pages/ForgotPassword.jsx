import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  Mail,
  Send,
  ShieldCheck,
  XCircle,
} from "lucide-react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    /*
      TEMPORARY API SIMULATION

      Later replace this with:
      POST /auth/forgot-password

      Example request:
      {
        email: trimmedEmail
      }
    */

    setTimeout(() => {
      setIsLoading(false);
      setSuccess(
        "If an account exists with this email, a password reset link has been sent."
      );
    }, 800);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError("");
    setSuccess("");
  };

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

        {/* Card */}
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
              <Mail size={26} />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
              Forgot Password?
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[var(--text-muted)]">
              Enter your registered email and we&apos;ll help you
              reset your password.
            </p>
          </div>

          {/* Form */}
          <div className="px-6 pb-7 sm:px-8 sm:pb-8">

            {/* Success */}
            {success && (
              <div
                className="
                  mb-5 flex items-start gap-3 rounded-xl border
                  border-green-500/20 bg-green-500/10
                  px-4 py-3 text-sm
                  text-green-700 dark:text-green-400
                "
                role="status"
                aria-live="polite"
              >
                <CheckCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <div>
                  <p className="font-medium">
                    Request submitted
                  </p>

                  <p className="mt-1 leading-5">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                className="
                  mb-5 flex items-start gap-3 rounded-xl border
                  border-red-500/20 bg-red-500/10
                  px-4 py-3 text-sm
                  text-red-700 dark:text-red-400
                "
                role="alert"
                aria-live="assertive"
              >
                <XCircle
                  size={19}
                  className="mt-0.5 shrink-0"
                />

                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* Email */}
              <div>
                <label
                  htmlFor="forgot-password-email"
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
                    id="forgot-password-email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                      error ? "forgot-password-error" : undefined
                    }
                    className={`
                      w-full rounded-xl border
                      bg-[var(--input-bg)]
                      py-3 pl-11 pr-4
                      text-[var(--text-primary)]
                      outline-none transition
                      placeholder:text-[var(--text-muted)]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      ${
                        error
                          ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-[var(--border-color)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                      }
                    `}
                  />
                </div>

                {error && (
                  <p
                    id="forgot-password-error"
                    className="mt-1.5 text-sm text-red-500"
                  >
                    {error}
                  </p>
                )}
              </div>

              {/* Submit */}
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

                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Send Reset Link
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
                    Your account is protected
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    For security, we won&apos;t reveal whether
                    an email is registered with FinTrack AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="
                  inline-flex items-center gap-2
                  text-sm font-semibold
                  text-[var(--primary)]
                  transition hover:opacity-80
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[var(--primary)]/30
                  rounded-lg
                "
              >
                <ArrowLeft size={16} />
                Back to Login
              </Link>
            </div>
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

export default ForgotPassword;