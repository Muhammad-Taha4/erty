import { createFileRoute } from "@tanstack/react-router";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Journal from "@/components/landing/Journal";
import Vision from "@/components/landing/Vision";
import SelectedWorks from "@/components/landing/SelectedWorks";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import Showcase from "@/components/landing/Showcase";

import Founder from "@/components/landing/Founder";
import Stats from "@/components/landing/Stats";
import FAQ from "@/components/landing/FAQ";
import Contact from "@/components/landing/Contact";
import ScrollFX from "@/components/landing/ScrollFX";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QYLMORA — Help Customers Buy Jewelry With Confidence" },
      { name: "description", content: "QYLMORA is building immersive 3D visualization and virtual try-on experiences that help jewelry brands create more confident buying journeys." },
      { property: "og:title", content: "QYLMORA — Help Customers Buy Jewelry With Confidence" },
      { property: "og:description", content: "Immersive 3D and virtual try-on experiences for jewelry brands." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-bg text-text-primary font-body min-h-screen">
      <Navbar />
      <ScrollFX />
      <Hero />
      <Problem />
      <Journal />
      <Vision />
      <SelectedWorks />
      <HowItWorks />
      <Benefits />
      <Showcase />
      <Stats />
      <Founder />
      <FAQ />
      <Contact />
    </main>
  );
}
