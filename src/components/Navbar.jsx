import { Bell, Search, User } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/95 text-[var(--text-primary)] backdrop-blur transition-colors duration-300">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          className="shrink-0"
          aria-label="FinTrack AI Dashboard"
        >
          <h1 className="text-lg font-bold tracking-tight sm:text-xl">
            FinTrack{" "}
            <span className="text-[var(--primary)]">AI</span>
          </h1>

          <p className="hidden text-xs text-[var(--text-muted)] sm:block">
            Smart Finance Management
          </p>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Search */}
          <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 sm:flex"
          >
            <Search size={19} />
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-secondary)] transition hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
          >
            <Bell size={19} />

            {/* Notification indicator */}
            <span
              className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"
              aria-hidden="true"
            />
          </button>

          {/* Profile */}
          <Link
            to="/profile"
            aria-label="Open profile"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-tertiary)] text-[var(--primary)] transition hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
          >
            <User size={19} />
          </Link>

        </div>
      </div>
    </header>
  );
}

export default Navbar;