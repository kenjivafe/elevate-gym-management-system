"use client";

import { useState } from "react";

import { initialCardTemplate } from "@/lib/mock-data";
import { DisabledHint } from "@/components/ui/ui-states";
import { CardPreview, type CardTemplate } from "./card-preview";

const tiers = ["Platinum", "Gold", "Silver", "Standard"];

export function CardDesigner() {
  const [template, setTemplate] = useState<CardTemplate>(initialCardTemplate);

  function updateTemplate(partial: Partial<CardTemplate>) {
    setTemplate((prev) => ({ ...prev, ...partial }));
  }

  return (
    <section className="space-y-4 rounded-3xl border border-white/5 bg-white/5/30 p-6 shadow-card backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase text-white/60">Membership card designer</p>
          <h3 className="text-2xl font-semibold tracking-tight text-white">Live preview</h3>
        </div>
        <DisabledHint label="Save disabled until backend ready" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
        <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
          <div>
            <label className="text-sm text-white/60" htmlFor="memberName">
              Member name
            </label>
            <input
              id="memberName"
              type="text"
              value={template.memberName}
              onChange={(event) => updateTemplate({ memberName: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
              placeholder="Jordan Rivera"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-white/60" htmlFor="membershipTier">
                Tier
              </label>
              <select
                id="membershipTier"
                value={template.membershipTier}
                onChange={(event) => updateTemplate({ membershipTier: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white focus:border-primary focus:outline-none"
              >
                {tiers.map((tier) => (
                  <option key={tier} value={tier} className="bg-canvas text-white">
                    {tier}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-white/60" htmlFor="expiry">
                Expiry
              </label>
              <input
                id="expiry"
                type="text"
                value={template.expiry}
                onChange={(event) => updateTemplate({ expiry: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                placeholder="12/2026"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-white/60" htmlFor="favoriteColor">
                Primary color
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <input
                  id="favoriteColor"
                  type="color"
                  value={template.favoriteColor}
                  onChange={(event) => updateTemplate({ favoriteColor: event.target.value })}
                  className="h-10 w-16 cursor-pointer rounded-2xl border border-white/10 bg-transparent"
                />
                <input
                  type="text"
                  value={template.favoriteColor}
                  onChange={(event) => updateTemplate({ favoriteColor: event.target.value })}
                  className="flex-1 bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/60" htmlFor="accentColor">
                Accent color
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <input
                  id="accentColor"
                  type="color"
                  value={template.accentColor}
                  onChange={(event) => updateTemplate({ accentColor: event.target.value })}
                  className="h-10 w-16 cursor-pointer rounded-2xl border border-white/10 bg-transparent"
                />
                <input
                  type="text"
                  value={template.accentColor}
                  onChange={(event) => updateTemplate({ accentColor: event.target.value })}
                  className="flex-1 bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60" htmlFor="avatarSeed">
              Avatar seed
            </label>
            <input
              id="avatarSeed"
              type="text"
              value={template.avatarSeed}
              onChange={(event) => updateTemplate({ avatarSeed: event.target.value })}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white/60"
          >
            Save template (coming soon)
          </button>
        </form>
        <CardPreview template={template} />
      </div>
    </section>
  );
}
