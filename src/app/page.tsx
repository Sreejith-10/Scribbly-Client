import { NavBar } from '@/components/ui/navbar';
import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/feature-section';
import { HowItWorksSection } from '@/components/sections/how-it-works-section';
import { TestimonialsSection } from '@/components/sections/testimonial-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { FAQSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';
import { NewsletterSection } from '@/components/sections/newsletter-section';
import { Footer } from '@/components/sections/footer';

export default function LandingPage() {
  return (
    <div className='min-h-screen'>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
