import { quickActions } from "@/lib/mock-data";
import { DisabledHint } from "@/components/ui/ui-states";

export function QuickActions() {
  return (
    <section className="rounded-3xl border border-white/5 bg-white/5/30 p-6 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-lg font-semibold tracking-tight">Quick Actions</h3>
        <DisabledHint label="Prototype" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            disabled
            className="group rounded-2xl border border-white/10 bg-canvas-subtle/60 px-4 py-5 text-left text-white/80 transition hover:border-white/30"
          >
            <p className="text-base font-semibold text-white">{action.label}</p>
            <p className="mt-2 text-sm text-white/60">{action.description}</p>
            {action.badge ? (
              <span className="mt-4 inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                {action.badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
