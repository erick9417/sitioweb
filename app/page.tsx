import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Lab from "@/components/Lab";
import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--color-light)] text-[var(--color-dark)]">
      <Navbar />
      <Hero />
      <Features />
      <Lab />
      <About />
      <Benefits />
      <Testimonials />
      <Contact />
      <WhatsAppFloat />
    </main>
  );
}
