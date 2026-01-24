import type { Metadata } from "next";

import { RegistrationExperience } from "@/components/registration/registration-experience";

export const metadata: Metadata = {
  title: "Register for Membership | GymPulse",
  description:
    "Public enrollment page for GymPulse memberships and personal training add-ons. Submit goals and our team will confirm within one business day.",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-canvas px-4 py-12 text-white lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <RegistrationExperience />
      </div>
    </main>
  );
}
