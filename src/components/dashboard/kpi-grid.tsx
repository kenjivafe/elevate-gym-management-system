"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import type { Kpi } from "@/lib/mock-data";
import { kpis } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { LoadingState } from "@/components/ui/ui-states";

export function KpiGrid() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingState label="Loading KPI tiles..." />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`kpi-skeleton-${index}`}
              className="h-32 rounded-3xl border border-white/5 bg-white/5/30 shadow-card backdrop-blur animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi: Kpi) => (
        <article
          key={kpi.label}
          className="rounded-3xl border border-white/5 bg-white/5/30 p-5 shadow-card backdrop-blur"
        >
          <p className="text-sm font-medium text-white/70">{kpi.label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
            {kpi.value}
          </p>
          <div
            className={cn(
              "mt-4 flex items-center gap-1.5 text-sm font-semibold",
              kpi.trend === "up" ? "text-primary" : "text-red-400"
            )}
          >
            {kpi.trend === "up" ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span>{kpi.delta}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
