import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Guide from "@/components/Guide";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Join from "@/components/Join";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const {userId} = await auth();
  if(userId) redirect('/home');
  return (
    <div className="bg-background text-foreground">
      <Hero/>
      <Guide/>
      <Features/>
      <Pricing/>
      <Join/>
      <Footer/>
    </div>
  );
}