import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  WalletCards,
  PiggyBank,
  Target,
  BarChart3,
  FileText,
  User,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    label: "Categories",
    path: "/categories",
    icon: Tags,
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: WalletCards,
  },
  {
    label: "Budgets",
    path: "/budgets",
    icon: PiggyBank,
  },
  {
    label: "Goals",
    path: "/goals",
    icon: Target,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

const accountItems = [
  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors duration-300 md:flex">
      {/* Brand */}
      <div className="border-b border-[var(--border-color)] px-5 py-5">
        <h2 className="text-xl font-bold tracking-tight">
          FinTrack{" "}
          <span className="text-[var(--primary)]">AI</span>
        </h2>

        <p className="mt-1 text-xs text-[var(--text-muted)]">
          Smart Finance Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Main Menu
        </p>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--bg-tertiary)] text-[var(--primary)] shadow-sm"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      strokeWidth={isActive ? 2.4 : 2}
                      className="shrink-0"
                    />

                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Account */}
        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Account
          </p>

          <div className="space-y-1">
            {accountItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[var(--bg-tertiary)] text-[var(--primary)] shadow-sm"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        strokeWidth={isActive ? 2.4 : 2}
                        className="shrink-0"
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--border-color)] p-4">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-3">
          <p className="text-xs font-semibold text-[var(--text-primary)]">
            FinTrack AI
          </p>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Personal Finance Dashboard
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;