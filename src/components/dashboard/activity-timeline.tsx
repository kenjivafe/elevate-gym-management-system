import { timeline } from "@/lib/mock-data";
import { EmptyState } from "@/components/ui/ui-states";

export function ActivityTimeline() {
  if (!timeline.length) {
    return (
      <EmptyState
        title="No recent activity"
        description="Timeline entries will appear once backend events are connected."
      />
    );
  }

  return (
    <div className="rounded-3xl border border-white/5 bg-white/5/40 p-6 shadow-card backdrop-blur">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-tight">Recent Activity</h3>
        <span className="text-xs uppercase text-white/50">Mock data</span>
      </div>
      <ol className="mt-6 space-y-5">
        {timeline.map((entry) => (
          <li key={entry.id} className="relative pl-8">
            <span className="absolute left-0 top-2 block h-2 w-2 rounded-full bg-primary" aria-hidden />
            <div className="text-sm text-white/60">{entry.timestamp}</div>
            <p className="text-base font-medium text-white">{entry.title}</p>
            <p className="text-sm text-white/70">{entry.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
