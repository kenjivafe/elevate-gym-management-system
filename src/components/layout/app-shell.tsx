import type { Route } from "next";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import {
  BadgeCheck,
  CreditCard,
  GaugeCircle,
  KeyRound,
  LayoutDashboard,
  Palette,
  Settings,
  UserCog,
  Users,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
  href?: Route;
};

const dashboardRoute = "/dashboard" as Route;
const membersRoute = "/dashboard/members" as Route;
const employeesRoute = "/dashboard/employees" as Route;
const lockersRoute = "/dashboard/lockers" as Route;

const navItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, href: dashboardRoute },
  { label: "Members", icon: Users, href: membersRoute },
  { label: "Employees", icon: UserCog, href: employeesRoute },
  { label: "Lockers", icon: KeyRound, href: lockersRoute },
  { label: "Card Designer", icon: CreditCard },
  { label: "Attendance", icon: GaugeCircle },
  { label: "Brand Studio", icon: Palette },
  { label: "Settings", icon: Settings },
];

export function AppShell({
  children,
  activeHref = dashboardRoute,
}: {
  children: ReactNode;
  activeHref?: Route;
}) {
  return (
    <div className="min-h-screen text-white bg-canvas">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="px-6 py-8 border-r bg-canvas-subtle border-border-subtle/40">
          <Link href={dashboardRoute} className="flex gap-3 items-center text-lg font-semibold tracking-tight">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <BadgeCheck className="w-5 h-5" />
            </div>
            Elevate Lifestyle & Fitness
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.4em] text-white/40">Ops preview</p>
          <nav className="mt-8 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.href && item.href === activeHref;
              const baseClasses =
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition";

              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`${baseClasses} ${
                      isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              }

              return (
                <button
                  key={item.label}
                  className={`${baseClasses} text-white/40 opacity-60 cursor-not-allowed`}
                  type="button"
                  disabled
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="p-4 mt-10 text-sm bg-gradient-to-br rounded-2xl from-primary/20 to-accent/20 text-white/80">
            <p className="font-semibold text-white">UI Preview Build</p>
            <p className="mt-1 text-xs">
              Interactions are limited to mock flows until services are wired.
            </p>
          </div>
        </aside>
        <main className="overflow-hidden relative bg-canvas">
          <div className="absolute inset-0 opacity-80 bg-mesh-glow" aria-hidden />
          <div className="flex relative z-10 flex-col gap-8 p-6 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
