import { cn } from "@/lib/utils";

export type CardTemplate = {
  memberName: string;
  membershipTier: string;
  expiry: string;
  favoriteColor: string;
  accentColor: string;
  avatarSeed: string;
};

const tierBadges: Record<string, string> = {
  Platinum: "bg-white text-black",
  Gold: "bg-[#facc15] text-black",
  Silver: "bg-white/30 text-white",
};

function initialsFromName(name: string) {
  const [first = "U", second = "I"] = name.split(" ");
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
}

export function CardPreview({ template }: { template: CardTemplate }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6 shadow-card">
      <div className="absolute inset-0" aria-hidden>
        <div
          className="absolute -inset-10 opacity-60 blur-3xl"
          style={{
            background: `linear-gradient(130deg, ${template.favoriteColor}, ${template.accentColor})`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_transparent_45%)]" />
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-white/60">Elevate</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
            {template.memberName || "Member Name"}
          </p>
        </div>
        <div className="flex flex-col items-end text-right text-sm text-white/70">
          <span>EXP</span>
          <span className="text-lg font-semibold text-white">{template.expiry || "MM/YYYY"}</span>
        </div>
      </div>
      <div className="relative z-10 mt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 text-xl font-semibold text-white"
            style={{ background: `${template.favoriteColor}30` }}
          >
            {initialsFromName(template.memberName)}
          </div>
          <div>
            <p className="text-sm text-white/70">Tier</p>
            <span
              className={cn(
                "mt-1 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                tierBadges[template.membershipTier] ?? "bg-white/20 text-white"
              )}
            >
              {template.membershipTier}
            </span>
          </div>
        </div>
        <div className="relative h-12 w-20 rounded-xl border border-white/20 bg-white/10">
          <div className="absolute inset-[6px] rounded-lg border border-white/30" />
          <div className="absolute inset-y-1 left-1 w-1 rounded-full bg-white/40" />
        </div>
      </div>
      <div className="mt-10 rounded-3xl bg-white/10 p-4 text-sm text-white/80">
        <p>RFID Locker + Biometrics Access</p>
        <p className="text-xs text-white/60">UI preview only · data not stored</p>
      </div>
    </div>
  );
}
