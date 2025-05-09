import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AboutUsSection from "@/components/AboutUsSection";
import ContactUsSection from "@/components/ContactUsSection";
import TrustOnUsSection from "@/components/TrustOnUsSection";

export default function Home() {
  return (
    <div className=" min-h-screen">
      <Hero />
      <ServicesSection />
      <AboutUsSection />
      <TrustOnUsSection />
      <ContactUsSection />
    </div>
  );
}
