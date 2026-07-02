import AnimatedBackground from "@/components/landing/AnimatedBackground";
import Hero from "@/components/landing/Hero";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";


export default function Page() {
  return (
    <>
      <AnimatedBackground />
      <Hero />
      {/* <Stats /> */}
      <Features />
      <HowItWorks />
      {/* <Testimonials /> */}
      <CTA/> 
      {/* <Footer/> */}
    </>
  );
}