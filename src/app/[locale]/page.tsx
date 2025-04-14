import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen">
      <div className="snap-start">
        <Hero />
      </div>
      <div className="snap-start">
        <ServicesSection />
      </div>
    </div>
  );
}
