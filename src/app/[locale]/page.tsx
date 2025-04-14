import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AboutUsSection from "@/components/AboutUsSection";

export default function Home() {
  return (
    <div className=" min-h-screen">
      <Hero />
      <ServicesSection />
      <AboutUsSection />
    </div>
  );
}
