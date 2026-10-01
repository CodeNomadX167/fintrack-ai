import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 text-[var(--text-primary)]">
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--primary-soft)] text-[var(--primary)]">
          <SearchX size={38} />
        </div>

        <p className="text-7xl font-black tracking-tight text-[var(--primary)]">
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold md:text-3xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)] md:text-base">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card-bg)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--bg-tertiary)]"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            <Home size={17} />
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;