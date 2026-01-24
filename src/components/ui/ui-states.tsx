type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Loading preview..." }: LoadingStateProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border-subtle/40 bg-white/5 px-4 py-3 text-sm text-white/70">
      <span className="h-2 w-2 animate-ping rounded-full bg-primary" aria-hidden />
      {label}
    </div>
  );
}

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-border-subtle/60 bg-white/5 p-6 text-center text-white/70">
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
}

type DisabledHintProps = {
  label: string;
};

export function DisabledHint({ label }: DisabledHintProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-xs uppercase tracking-wide text-white/70">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
        <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 2.8V5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <circle cx="5" cy="7" r="0.6" fill="currentColor" />
      </svg>
      {label}
    </div>
  );
}
