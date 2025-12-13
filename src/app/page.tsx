import { FAQ } from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import {
  HowItWorks,
  HowItWorksWaveBottom,
  HowItWorksWaveTop,
} from "@/components/landing/how-it-works";
import {
  WaveDividerBottom,
  WaveDividerTop,
  WhyUs,
} from "@/components/landing/why-us";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#D9F1F3]">
      <Header />
      <Hero />
      <WaveDividerTop />
      <WhyUs />
      <WaveDividerBottom />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorksWaveTop />
      <HowItWorks />
      <HowItWorksWaveBottom />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
}
