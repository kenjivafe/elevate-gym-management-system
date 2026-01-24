"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BadgeCheck, Fingerprint, Search, UserCheck, UserCog } from "lucide-react";

import { EmptyState, LoadingState } from "@/components/ui/ui-states";
import {
  employees,
  filterEmployees,
  type AttendanceStatus,
  type Employee,
  type EmployeeRole,
} from "@/lib/employees";
import { cn } from "@/lib/utils";

const statusFilters: Array<{ label: string; value: AttendanceStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "On Track", value: "on-track" },
  { label: "Warning", value: "warning" },
  { label: "Missed", value: "missed" },
];

const roleFilters: Array<{ label: string; value: EmployeeRole | "all" }> = [
  { label: "All roles", value: "all" },
  { label: "Coaches", value: "Coach" },
  { label: "Front Desk", value: "Front Desk" },
  { label: "Operations", value: "Operations" },
  { label: "Maintenance", value: "Maintenance" },
  { label: "Sales", value: "Sales" },
];

export function EmployeesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<AttendanceStatus | "all">("all");
  const [role, setRole] = useState<EmployeeRole | "all">("all");
  const [selected, setSelected] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, query, status, role),
    [query, status, role]
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase text-white/60">Staff attendance</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Keep employees on cadence</h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/60">
            <UserCog className="h-3 w-3" /> {employees.length} mock employees
          </span>
        </div>
        <p className="text-white/70">
          Search by name, filter by attendance compliance or role, and open the drawer to view biometric IDs,
          shift windows, and recent logs.
        </p>
      </header>

      <Toolbar
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        role={role}
        onRoleChange={setRole}
      />

      {isLoading ? (
        <LoadingState label="Loading employees..." />
      ) : filteredEmployees.length === 0 ? (
        <EmptyState
          title="No employees match"
          description="Adjust your attendance filters or clear the search query."
        />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredEmployees.map((employee) => (
            <article
              key={employee.id}
              className="rounded-3xl border border-white/5 bg-white/5/40 p-5 shadow-card backdrop-blur transition hover:border-white/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold">
                    {initials(employee.name)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{employee.name}</p>
                    <p className="text-sm text-white/60">{employee.role}</p>
                    <p className="text-xs text-white/50">{employee.email}</p>
                  </div>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em]", badgeStyles(employee.compliance))}>
                  {statusLabel(employee.compliance)}
                </span>
              </div>
              <dl className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em]">Shift window</dt>
                  <dd>{employee.shiftWindow}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em]">Last check-in</dt>
                  <dd>{employee.lastCheckIn}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em]">Streak</dt>
                  <dd>{employee.attendanceStreak} days</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setSelected(employee)}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Review logs
              </button>
            </article>
          ))}
        </section>
      )}

      <EmployeeDrawer employee={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  role,
  onRoleChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  status: AttendanceStatus | "all";
  onStatusChange: (value: AttendanceStatus | "all") => void;
  role: EmployeeRole | "all";
  onRoleChange: (value: EmployeeRole | "all") => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5/40 p-5 shadow-card backdrop-blur">
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/70">
        <Search className="h-4 w-4" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search employees by name or email"
          className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        {statusFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onStatusChange(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.3em] transition",
              status === filter.value
                ? "border-primary bg-primary/20 text-white"
                : "border-white/10 bg-transparent text-white/60 hover:border-white/30"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {roleFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onRoleChange(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.3em] transition",
              role === filter.value
                ? "border-white bg-white/20 text-black"
                : "border-white/10 bg-transparent text-white/60 hover:border-white/30"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmployeeDrawer({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-canvas-subtle p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Employee profile</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{employee.name}</h2>
            <p className="text-white/60">{employee.email}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60"
          >
            Close
          </button>
        </div>
        <div className="mt-6 space-y-5 text-sm text-white/70">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold">
              {initials(employee.name)}
            </div>
            <div>
              <p>{employee.role}</p>
              <p className="text-white/50">Shift: {employee.shiftWindow}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Biometric ID</p>
            <div className="mt-2 flex items-center gap-2 text-white">
              <Fingerprint className="h-4 w-4" /> {employee.biometricId}
            </div>
            <p className="text-white/60">Last check-in: {employee.lastCheckIn}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Attendance streak</p>
            <p className="mt-2 text-3xl font-semibold text-white">{employee.attendanceStreak} days</p>
            <span className={cn("mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em]", badgeStyles(employee.compliance))}>
              {badgeIcon(employee.compliance)}
              {statusLabel(employee.compliance)}
            </span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Recent attendance</p>
            <ul className="mt-3 space-y-2 text-white/80">
              {employee.attendance.map((event) => (
                <li key={event.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm">
                  <div>
                    <p className="font-medium text-white">{event.date}</p>
                    <p className="text-white/50">{event.note}</p>
                  </div>
                  <span className={cn("rounded-full px-3 py-1 text-xs uppercase tracking-[0.3em]", badgeStyles(event.status))}>
                    {statusLabel(event.status)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60"
          >
            <AlertTriangle className="h-4 w-4" /> Notify manager (coming soon)
          </button>
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60"
          >
            <BadgeCheck className="h-4 w-4" /> Mark excused (coming soon)
          </button>
        </div>
      </aside>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function badgeStyles(status: AttendanceStatus) {
  if (status === "on-track") {
    return "border border-emerald-400/40 bg-emerald-400/10 text-emerald-200";
  }
  if (status === "warning") {
    return "border border-amber-300/40 bg-amber-300/10 text-amber-100";
  }
  return "border border-rose-400/40 bg-rose-400/10 text-rose-100";
}

function statusLabel(status: AttendanceStatus) {
  if (status === "on-track") return "On Track";
  if (status === "warning") return "Warning";
  return "Missed";
}

function badgeIcon(status: AttendanceStatus) {
  if (status === "on-track") {
    return <UserCheck className="h-3.5 w-3.5" />;
  }
  if (status === "warning") {
    return <AlertTriangle className="h-3.5 w-3.5" />;
  }
  return <AlertTriangle className="h-3.5 w-3.5" />;
}
