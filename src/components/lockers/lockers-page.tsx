"use client";

import { useEffect, useMemo, useState } from "react";
import { DoorClosed, DoorOpen, Search, ShieldAlert } from "lucide-react";

import { EmptyState, LoadingState } from "@/components/ui/ui-states";
import {
  filterLockers,
  getLockerSession,
  lockers,
  lockerSessions,
  type Locker,
  type LockerOccupancy,
  type LockerSession,
  type LockerZone,
} from "@/lib/lockers";
import { cn } from "@/lib/utils";

const zoneFilters: Array<{ label: string; value: LockerZone | "all" }> = [
  { label: "All zones", value: "all" },
  { label: "Main", value: "Main" },
  { label: "VIP", value: "VIP" },
  { label: "Women", value: "Women" },
];

const occupancyFilters: Array<{ label: string; value: LockerOccupancy | "all" }> = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Occupied", value: "occupied" },
];

export function LockersPage() {
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState<LockerZone | "all">("all");
  const [occupancy, setOccupancy] = useState<LockerOccupancy | "all">("all");
  const [selected, setSelected] = useState<Locker | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [sessions] = useState<LockerSession[]>(lockerSessions);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const filteredLockers = useMemo(
    () => filterLockers(lockers, query, zone, occupancy),
    [query, zone, occupancy]
  );

  const occupiedCount = lockers.filter((locker) => locker.occupancy === "occupied").length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase text-white/60">Locker sessions</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Track live locker occupancy</h1>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/60">
            <DoorClosed className="h-3 w-3" /> {occupiedCount}/{lockers.length} occupied
          </span>
        </div>
        <p className="text-white/70">
          Lockers are claimed by RFID tap at the locker reader and released when the member logs out at the cashier.
        </p>
      </header>

      <Toolbar
        query={query}
        onQueryChange={setQuery}
        zone={zone}
        onZoneChange={setZone}
        occupancy={occupancy}
        onOccupancyChange={setOccupancy}
      />

      {isLoading ? (
        <LoadingState label="Loading lockers..." />
      ) : filteredLockers.length === 0 ? (
        <EmptyState title="No lockers match" description="Adjust the filters or refine the search query." />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredLockers.map((locker) => {
            const session = getLockerSession(sessions, locker.id);
            const isOccupied = locker.occupancy === "occupied";

            return (
              <article
                key={locker.id}
                className="rounded-3xl border border-white/5 bg-white/5/40 p-5 shadow-card backdrop-blur transition hover:border-white/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">{locker.zone} zone</p>
                    <p className="mt-2 text-2xl font-semibold text-white">Locker {locker.number}</p>
                  </div>
                  <span
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.3em]",
                      isOccupied
                        ? "border-rose-400/40 bg-rose-400/10 text-rose-100"
                        : "border-emerald-400/40 bg-emerald-400/10 text-emerald-100"
                    )}
                  >
                    {isOccupied ? <DoorClosed className="h-3.5 w-3.5" /> : <DoorOpen className="h-3.5 w-3.5" />}
                    {isOccupied ? "Occupied" : "Available"}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-white/70">
                  {isOccupied && session ? (
                    <>
                      <p className="text-white/80">
                        <span className="text-white/50">Member:</span> {session.memberName}
                      </p>
                      <p>
                        <span className="text-white/50">RFID:</span> {session.rfid}
                      </p>
                      <p>
                        <span className="text-white/50">Claimed:</span> {session.claimedAt}
                      </p>
                    </>
                  ) : (
                    <p className="text-white/60">Ready for the next RFID tap-in.</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(locker)}
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  View session
                </button>
              </article>
            );
          })}
        </section>
      )}

      <LockerDrawer locker={selected} sessions={sessions} onClose={() => setSelected(null)} />
    </div>
  );
}

function Toolbar({
  query,
  onQueryChange,
  zone,
  onZoneChange,
  occupancy,
  onOccupancyChange,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  zone: LockerZone | "all";
  onZoneChange: (value: LockerZone | "all") => void;
  occupancy: LockerOccupancy | "all";
  onOccupancyChange: (value: LockerOccupancy | "all") => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5/40 p-5 shadow-card backdrop-blur">
      <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/70">
        <Search className="h-4 w-4" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by locker number or zone"
          className="w-full bg-transparent text-white placeholder:text-white/40 focus:outline-none"
        />
      </label>
      <div className="flex flex-wrap gap-3">
        {zoneFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onZoneChange(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.3em] transition",
              zone === filter.value
                ? "border-primary bg-primary/20 text-white"
                : "border-white/10 bg-transparent text-white/60 hover:border-white/30"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {occupancyFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onOccupancyChange(filter.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.3em] transition",
              occupancy === filter.value
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

function LockerDrawer({
  locker,
  sessions,
  onClose,
}: {
  locker: Locker | null;
  sessions: LockerSession[];
  onClose: () => void;
}) {
  if (!locker) return null;

  const session = getLockerSession(sessions, locker.id);
  const isOccupied = locker.occupancy === "occupied";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-canvas-subtle p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Locker session</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Locker {locker.number} · {locker.zone}
            </h2>
            <p className="text-white/60">{isOccupied ? "Occupied" : "Available"}</p>
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
          {isOccupied && session ? (
            <>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Claimed session</p>
                <p className="mt-2 text-white">
                  <span className="text-white/50">Member:</span> {session.memberName}
                </p>
                <p className="text-white/60">
                  <span className="text-white/50">RFID:</span> {session.rfid}
                </p>
                <p className="text-white/60">
                  <span className="text-white/50">Claimed at:</span> {session.claimedAt}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">Session duration</p>
                <p className="mt-2 text-white/80">In preview builds, duration updates once backend timestamps are wired.</p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">No active session</p>
              <p className="mt-2 text-white/70">This locker is available and waiting for an RFID tap-in.</p>
            </div>
          )}
        </div>

        <div className="mt-auto space-y-3">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60"
          >
            <ShieldAlert className="h-4 w-4" /> Force release (coming soon)
          </button>
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white/60"
          >
            Flag maintenance (coming soon)
          </button>
        </div>
      </aside>
    </div>
  );
}
