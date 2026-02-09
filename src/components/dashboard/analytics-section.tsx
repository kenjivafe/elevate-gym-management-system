"use client";

import { Activity, ArrowDownRight, ArrowUpRight, Minus, PieChart } from "lucide-react";

import {
  analyticsBreakdowns,
  analyticsSeries,
  formatPercent,
  normalizeSeries,
  summarizeSeries,
} from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function AnalyticsSection() {
  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase text-white/60">Analytics</p>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Performance trends</h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
          Mock data
        </span>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {analyticsSeries.map((series) => (
          <TrendCard key={series.label} label={series.label} values={series.values} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {analyticsBreakdowns.map((breakdown) => (
          <BreakdownCard key={breakdown.title} title={breakdown.title} items={breakdown.items} />
        ))}
      </div>
    </section>
  );
}

function TrendCard({ label, values }: { label: string; values: number[] }) {
  const summary = summarizeSeries(values);
  const normalized = normalizeSeries(values);

  return (
    <article className="rounded-3xl border border-white/5 bg-white/5/30 p-5 shadow-card backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/70">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{summary.current.toLocaleString()}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white/70">
          <Activity className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1" aria-hidden>
        {normalized.map((value, index) => (
          <div
            key={`${label}-bar-${index}`}
            className="w-full rounded-full bg-white/10"
            style={{ height: `${Math.max(6, value * 36)}px` }}
          />
        ))}
      </div>

      <div
        className={cn(
          "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold",
          summary.direction === "up"
            ? "text-primary"
            : summary.direction === "down"
              ? "text-red-400"
              : "text-white/60"
        )}
      >
        {summary.direction === "up" ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : summary.direction === "down" ? (
          <ArrowDownRight className="h-4 w-4" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
        <span>{formatPercent(summary.deltaPercent)} vs yesterday</span>
      </div>
    </article>
  );
}

function BreakdownCard({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: number }>;
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <article className="rounded-3xl border border-white/5 bg-white/5/30 p-5 shadow-card backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-white/70">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{total.toLocaleString()}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white/70">
          <PieChart className="h-5 w-5" />
        </div>
      </div>

      <ul className="mt-5 space-y-3 text-sm text-white/70">
        {items.map((item) => {
          const ratio = total === 0 ? 0 : item.value / total;
          return (
            <li key={item.label} className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-white/80">{item.label}</span>
                <span className="text-white/60">{Math.round(ratio * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-primary/70" style={{ width: `${ratio * 100}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
