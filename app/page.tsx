import BgGradient from "@/components/common/BgGradient";
import CTASection from "@/components/Home/CTASection";

import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import PricingSection from "@/components/Home/PricingSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        {/* <DemoSection /> */}
        <HowItWorks />
        <PricingSection />
        <CTASection />
      </div>
    </div>
  );
}
