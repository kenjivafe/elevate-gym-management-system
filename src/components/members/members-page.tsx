"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Snowflake, Star, Users } from "lucide-react";

import { EmptyState, LoadingState } from "@/components/ui/ui-states";
import { members, filterMembers, type Member, type MemberStatus, type MemberTier } from "@/lib/members";
import { cn } from "@/lib/utils";

const statusFilters: Array<{ label: string; value: MemberStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Frozen", value: "frozen" },
  { label: "Pending", value: "pending" },
];

const tierFilters: Array<{ label: string; value: MemberTier | "all" }> = [
  { label: "All", value: "all" },
  { label: "Standard", value: "Standard" },
  { label: "Premium", value: "Premium" },
  { label: "Elite", value: "Elite" },
  { label: "Student", value: "Student" },
];

export function MembersPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<MemberStatus | "all">("all");
  const [tier, setTier] = useState<MemberTier | "all">("all");
  const [selected, setSelected] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredMembers = useMemo(() => filterMembers(members, query, status, tier), [query, status, tier]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase text-white/60">Member directory</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Monitor member momentum</h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/60">
            <Users className="h-3 w-3" /> {members.length} mock profiles
          </span>
        </div>
        <p className="text-white/70">
          Filter by membership tier or status, preview attendance streaks, and open a detail drawer for profile context.
        </p>
      </header>

      <Toolbar
        query={query}
        onQueryChange={setQuery}
        status={status}
        onStatusChange={setStatus}
        tier={tier}
        onTierChange={setTier}
      />

      {isLoading ? (
        <LoadingState label="Loading members..." />
      ) : filteredMembers.length === 0 ? (
        <EmptyState title="No members match" description="Adjust your filters or clear the search query." />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="rounded-3xl border border-white/5 bg-white/5/40 p-5 shadow-card backdrop-blur transition hover:border-white/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold">
                    {initials(member.name)}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-white/60">{member.email}</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
                  {member.tier}
                </span>
              </div>
              <dl className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em]">Status</dt>
                  <dd className="flex items-center gap-1 text-white">
                    {statusIcon(member.status)} {member.status}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em]">Last check-in</dt>
                  <dd>{member.lastCheckIn}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em]">Streak</dt>
                  <dd>{member.attendanceStreak} days</dd>
                </div>
              </dl>
              <button
                type="button"
                onClick={() => setSelected(member)}
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                View details
              </button>
            </article>
          ))}
        </section>
      )}

      <MemberDrawer member={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Toolbar({
  query,
  onQueryChange,
  status,
  onStatusChange,
  tier,
  onTierChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  status: MemberStatus | "all";
  onStatusChange: (value: MemberStatus | "all") => void;
  tier: MemberTier | "all";
  onTierChange: (value: MemberTier | "all") => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5/40 p-5 shadow-card backdrop-blur">
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/70">
        <Search className="h-4 w-4" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search members by name or email"
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
        {tierFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onTierChange(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.3em] transition",
              tier === filter.value
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

function MemberDrawer({ member, onClose }: { member: Member | null; onClose: () => void }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-canvas-subtle p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Member profile</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{member.name}</h2>
            <p className="text-white/60">{member.email}</p>
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
              {initials(member.name)}
            </div>
            <div>
              <p>{member.phone}</p>
              <p className="text-white/50">{member.favoriteCoach}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Membership</p>
            <p className="mt-2 text-white">{member.tier}</p>
            <p className="text-white/60">Status: {member.status}</p>
            <p className="text-white/60">RFID: {member.rfid}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Attendance streak</p>
            <p className="mt-2 text-3xl font-semibold text-white">{member.attendanceStreak} days</p>
            <p className="text-white/60">Last check-in: {member.lastCheckIn}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Goals</p>
            <p className="mt-2 text-white/80">{member.goals}</p>
          </div>
        </div>
        <div className="mt-auto space-y-3">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60"
          >
            Freeze membership (coming soon)
          </button>
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60"
          >
            Resend RFID card (coming soon)
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

function statusIcon(status: MemberStatus) {
  if (status === "active") {
    return <Star className="h-4 w-4 text-primary" />;
  }
  if (status === "frozen") {
    return <Snowflake className="h-4 w-4 text-white/60" />;
  }
  return <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />;
}
