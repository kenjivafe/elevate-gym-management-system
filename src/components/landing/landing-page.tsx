import type { Route } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Star, Users } from "lucide-react";

const registerHref = "/register" as Route;
const dashboardHref = "/dashboard" as Route;

const programs = [
  {
    title: "Membership Tiers",
    description: "RFID-enabled access, locker service, and community events across Standard, Premium, and Elite tiers.",
    badge: "New member promo",
  },
  {
    title: "Personal Training",
    description: "Goal-driven 1:1 coaching with biometric check-ins and tailored programming for every lifestyle.",
    badge: "Limited slots",
  },
  {
    title: "Wellness Lab",
    description: "Recovery lounge, mobility labs, and nutrition intensives guided by Elevate specialists.",
    badge: "Coming soon",
  },
];

const testimonials = [
  {
    quote:
      "Elevate blends tech and human coaching better than any studio we’ve piloted. Our members love tap-and-train simplicity.",
    name: "Lara Mendoza",
    role: "Studio Director, Pulse Collective",
  },
  {
    quote: "The RFID locker + dashboard concept gives our trainers real context before each session. Huge unlock.",
    name: "Jared Singh",
    role: "Head Coach",
  },
];

export function LandingPage() {
  return (
    <div className="overflow-hidden relative text-white bg-canvas">
      <div className="absolute inset-0 opacity-70 bg-mesh-glow" aria-hidden />
      <div className="relative z-10">
        <HeroSection />
        <ProgramSection />
        <TestimonialSection />
        <CtaBand />
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="px-6 pt-16 pb-12 lg:px-14 lg:pb-20">
      <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
            <Sparkles className="w-4 h-4 text-accent" /> Elevate Lifestyle & Fitness
          </span>
          <h1 className="text-4xl font-semibold tracking-tight leading-tight sm:text-5xl">
            Unlock premium wellness with RFID convenience and hybrid coaching.
          </h1>
          <p className="text-lg text-white/75">
            Elevate combines a frictionless check-in experience with curated training pathways, biometric attendance, and
            concierge-level service. Preview the experience or join the waitlist below.
          </p>
          <div className="flex flex-wrap gap-4">
            <PrimaryCta href={registerHref}>Join Elevate</PrimaryCta>
            <SecondaryCta href={dashboardHref}>View Dashboard Preview</SecondaryCta>
          </div>
          <dl className="grid gap-4 text-sm sm:grid-cols-3 text-white/70">
            <div>
              <dt className="text-xs uppercase tracking-[0.3em]">Members Served</dt>
              <dd className="text-2xl font-semibold text-white">1.2k+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em]">RFID Lockers</dt>
              <dd className="text-2xl font-semibold text-white">85</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.3em]">Trainers Online</dt>
              <dd className="text-2xl font-semibold text-white">32</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur">
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-6">
            <p className="text-sm uppercase tracking-[0.4em] text-white/60">RFID journey</p>
            <h2 className="mt-3 text-2xl font-semibold">Tap in, train, and recover</h2>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex gap-3 items-start">
                <span className="mt-1 w-2 h-2 rounded-full bg-primary" aria-hidden />
                Seamless RFID card unlocks lockers, attendance, and PT studio access.
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 w-2 h-2 rounded-full bg-accent" aria-hidden />
                Dashboard surfaces KPIs for owners while members follow guided routines.
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 w-2 h-2 rounded-full bg-white/60" aria-hidden />
                Concierge follow-up confirms plans, PT match, and wellness add-ons.
              </li>
            </ul>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs uppercase tracking-[0.4em] text-white/60">
              <Users className="mb-3 w-5 h-5 text-white" /> Trusted by hybrid studios
            </div>
          </div>
        </div>
        {/* <div className="flex items-center justify-center rounded-[32px] border border-white/10 bg-black/20 p-6 shadow-card backdrop-blur">
          <Image
            src="/brand/elevate-logo.png"
            alt="Elevate Lifestyle & Fitness logo"
            width={360}
            height={240}
            className="h-auto w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
            priority
          />
        </div> */}
      </div>
    </section>
  );
}

function ProgramSection() {
  return (
    <section className="px-6 py-16 bg-canvas-subtle lg:px-14">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">Programs</p>
            <h2 className="text-3xl font-semibold tracking-tight">Design your flow</h2>
            <p className="text-white/70">Mix-and-match membership tiers with optional personal training and wellness labs.</p>
          </div>
          <SecondaryCta href={registerHref} icon>
            Compare tiers
          </SecondaryCta>
        </header>
        <div className="grid gap-6 mt-10 md:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.title}
              className="p-6 rounded-3xl border backdrop-blur transition border-white/10 bg-white/5 shadow-card hover:-translate-y-1 hover:border-white/30"
            >
              <p className="text-xs uppercase tracking-[0.4em] text-white/50">{program.badge}</p>
              <h3 className="mt-4 text-2xl font-semibold">{program.title}</h3>
              <p className="mt-3 text-sm text-white/70">{program.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialSection() {
  return (
    <section className="px-6 py-16 lg:px-14">
      <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-gradient-to-br from-primary/20 to-accent/20 p-8 shadow-card">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="max-w-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold">Clinics + studios trust Elevate</h2>
            <p className="mt-3 text-white/75">
              Pilot partners use our dashboard to anticipate demand, review attendance, and schedule PT talent before guests
              arrive.
            </p>
          </div>
          <div className="grid flex-1 gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="p-5 rounded-3xl border border-white/20 bg-black/30 text-white/80">
                <Star className="w-5 h-5 text-accent" />
                <blockquote className="mt-3 text-sm leading-relaxed">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.3em] text-white/60">
                  {testimonial.name}
                  <br />
                  <span className="tracking-normal normal-case text-white/50">{testimonial.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="px-6 pb-16 lg:px-14">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-center shadow-card">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Ready?</p>
        <h2 className="mt-3 text-3xl font-semibold">Step into Elevate Lifestyle & Fitness</h2>
        <p className="mt-2 text-white/70">
          Use the dashboard preview to align stakeholders, then invite members to register using the public form.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <PrimaryCta href={registerHref}>Join Elevate</PrimaryCta>
          <SecondaryCta href={dashboardHref} icon>
            View Dashboard Preview
          </SecondaryCta>
        </div>
      </div>
    </section>
  );
}

function PrimaryCta({ href, children }: { href: Route; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-primary/20 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:-translate-y-0.5"
    >
      {children}
      <ArrowUpRight className="w-4 h-4" />
    </Link>
  );
}

function SecondaryCta({ href, children, icon }: { href: Route; children: React.ReactNode; icon?: boolean }) {
  return (
    <Link
      href={href}
      className="inline-flex gap-2 items-center px-6 py-3 text-sm font-semibold text-white rounded-full border transition border-white/20 bg-white/10 hover:bg-white/15"
    >
      {children}
      {icon ? <ArrowUpRight className="w-4 h-4" /> : null}
    </Link>
  );
}
