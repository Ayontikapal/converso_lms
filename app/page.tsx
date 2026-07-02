import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Guide from "@/components/Guide";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <Hero/>
      <Guide/>
      <Features/>
      <Pricing/>
      <Footer/>
    </div>
  );
}