import type { Metadata } from "next";

import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "Elevate Lifestyle & Fitness | RFID-first wellness",
  description:
    "Explore Elevate Lifestyle & Fitness – premium memberships, personal training, and wellness labs with RFID convenience.",
};

export default function HomePage() {
  return <LandingPage />;
}
