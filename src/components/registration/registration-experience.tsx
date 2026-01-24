"use client";

import { useState } from "react";

import {
  membershipPlans,
  type RegistrationFormData,
} from "@/lib/registration";

const faqs = [
  {
    question: "What happens after I submit?",
    answer:
      "A membership specialist will reach out within one business day to finalize billing, schedule onboarding, and issue your RFID card.",
  },
  {
    question: "Do I have to choose personal training now?",
    answer:
      "No. You can enroll for membership alone and add training later. This form simply helps us match you sooner if you opt in now.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All submissions are transmitted over HTTPS and reviewed only by our membership and trainer teams.",
  },
];

const initialFormState: RegistrationFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  goals: "",
  membershipPlan: membershipPlans[0].id,
  addTraining: false,
  trainingFocus: "",
  trainerPreference: "",
  availability: "",
  consentPolicies: false,
  consentComms: true,
  honeypot: "",
};

type FormErrors = Partial<Record<keyof RegistrationFormData | "form", string>>;

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function RegistrationExperience() {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmissionState>("idle");

  function updateField<K extends keyof RegistrationFormData>(key: K, value: RegistrationFormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleTraining(value: boolean) {
    updateField("addTraining", value);
    if (!value) {
      setFormData((prev) => ({
        ...prev,
        trainingFocus: "",
        trainerPreference: "",
        availability: "",
      }));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrors(result?.errors ?? { form: "Something went wrong. Please try again." });
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData(initialFormState);
    } catch (error) {
      console.error("registration submit error", error);
      setErrors({ form: "Network error. Please retry." });
      setStatus("error");
    }
  }

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-white/5 bg-white/5/40 p-8 shadow-card backdrop-blur">
        <p className="text-sm uppercase tracking-[0.4em] text-white/60">Join the experience</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Membership + Personal Training Registration
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Tell us about your goals, choose a membership tier, and optionally reserve a personal training slot.
          Our team will review and follow up within one business day.
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden /> Real human onboarding
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden /> RFID-ready memberships
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/70" aria-hidden /> Cancel anytime prior to activation
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Choose your membership</h2>
            <p className="text-white/70">All plans include unlimited gym access, locker usage, and member events.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {membershipPlans.map((plan) => {
              const isSelected = formData.membershipPlan === plan.id;
              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => updateField("membershipPlan", plan.id)}
                  className={`rounded-3xl border px-5 py-6 text-left transition ${
                    isSelected
                      ? "border-primary bg-primary/10 text-white"
                      : "border-white/10 bg-black/30 text-white/70 hover:border-white/40"
                  }`}
                >
                  <p className="text-sm uppercase tracking-widest text-white/60">{plan.name}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">
                    {plan.price}
                    <span className="text-sm font-normal text-white/60"> {plan.cadence}</span>
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
          {errors.membershipPlan ? (
            <p className="text-sm text-red-300">{errors.membershipPlan}</p>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6" aria-live="polite">
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="First name"
                id="firstName"
                value={formData.firstName}
                onChange={(event) => updateField("firstName", event.target.value)}
                error={errors.firstName}
              />
              <Field
                label="Last name"
                id="lastName"
                value={formData.lastName}
                onChange={(event) => updateField("lastName", event.target.value)}
                error={errors.lastName}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field
                label="Email"
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                error={errors.email}
              />
              <Field
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                error={errors.phone}
              />
            </div>
            <div>
              <label className="text-sm text-white/70" htmlFor="goals">
                Tell us about your goals
              </label>
              <textarea
                id="goals"
                value={formData.goals}
                onChange={(event) => updateField("goals", event.target.value)}
                className="mt-2 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
                rows={4}
                placeholder="e.g., Build strength, improve mobility, prepare for competition"
              />
              {errors.goals ? <p className="mt-1 text-sm text-red-300">{errors.goals}</p> : null}
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-base font-semibold text-white">Add personal training</p>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={formData.addTraining}
                    onChange={(event) => toggleTraining(event.target.checked)}
                    className="h-4 w-4 rounded border-white/30 bg-transparent"
                  />
                  Include personal training
                </label>
              </div>
              {formData.addTraining ? (
                <div className="mt-4 space-y-4">
                  <Field
                    label="Training focus"
                    id="trainingFocus"
                    value={formData.trainingFocus ?? ""}
                    onChange={(event) => updateField("trainingFocus", event.target.value)}
                    error={errors.trainingFocus}
                    placeholder="Mobility, strength, conditioning..."
                  />
                  <Field
                    label="Trainer preference"
                    id="trainerPreference"
                    value={formData.trainerPreference ?? ""}
                    onChange={(event) => updateField("trainerPreference", event.target.value)}
                    error={errors.trainerPreference}
                    placeholder="Energy level, coaching style, certification"
                  />
                  <Field
                    label="Availability windows"
                    id="availability"
                    value={formData.availability ?? ""}
                    onChange={(event) => updateField("availability", event.target.value)}
                    error={errors.availability}
                    placeholder="Weekday mornings, weekends after 2pm, etc."
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={formData.consentPolicies}
                  onChange={(event) => updateField("consentPolicies", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
                />
                I agree to the gym policies, membership agreement, and acknowledge that final activation occurs after staff review.
              </label>
              {errors.consentPolicies ? (
                <p className="text-sm text-red-300">{errors.consentPolicies}</p>
              ) : null}
              <label className="flex items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={formData.consentComms}
                  onChange={(event) => updateField("consentComms", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent"
                />
                Keep me posted on events and personal training availability.
              </label>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={formData.honeypot ?? ""}
              onChange={(event) => updateField("honeypot", event.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {errors.form ? <p className="text-sm text-red-300">{errors.form}</p> : null}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center rounded-3xl border border-white/20 bg-white/10 px-6 py-4 text-base font-semibold text-white transition hover:bg-white/15 disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting..." : "Submit registration"}
            </button>

            {status === "success" ? (
              <div className="rounded-3xl border border-primary/30 bg-primary/10 p-5 text-white">
                <p className="text-lg font-semibold">Thank you! 🎉</p>
                <p className="text-sm text-white/80">
                  Your registration is in our queue. Expect a confirmation call or email within one business day.
                  You can continue exploring the site while we prepare your onboarding kit.
                </p>
              </div>
            ) : null}
          </form>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase text-white/60">Why train with us</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Hybrid coaching for real life</h3>
            <p className="mt-3 text-white/70">
              Combine RFID-enabled gym access with personalized programming and biometric check-ins. Share your availability
              and we will line up the right coach before your first visit.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>• 1:1 onboarding session</li>
              <li>• Locker + towel service included on Premium+</li>
              <li>• Custom progress dashboard in development</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase text-white/60">FAQs</p>
            <div className="mt-4 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <p className="font-semibold text-white">{faq.question}</p>
                  <p className="text-sm text-white/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

type FieldProps = {
  label: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  placeholder?: string;
};

function Field({ label, id, value, onChange, error, type = "text", placeholder }: FieldProps) {
  return (
    <div>
      <label className="text-sm text-white/70" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-3xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none"
      />
      {error ? <p className="mt-1 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
