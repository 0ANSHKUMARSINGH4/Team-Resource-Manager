import React, { useEffect } from 'react'
import { LandingNavbar } from '../components/LandingNavbar'
import { HeroSection } from '../components/HeroSection'
import { LogoCloud } from '../components/LogoCloud'
import { FeatureBentoGrid } from '../components/FeatureBentoGrid'
import { CrmComparisonTable } from '../components/CrmComparisonTable'
import { TestimonialsSection } from '../components/TestimonialsSection'
import { PricingSection } from '../components/PricingSection'
import { CtaBanner } from '../components/CtaBanner'
import { LandingFooter } from '../components/LandingFooter'

export const LandingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Team Resource Manager | Modern Enterprise CRM & Resource Engine'
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100 font-sans selection:bg-primary/20 selection:text-primary transition-colors">
      <LandingNavbar />
      <main>
        <HeroSection />
        <LogoCloud />
        <FeatureBentoGrid />
        <CrmComparisonTable />
        <TestimonialsSection />
        <PricingSection />
        <CtaBanner />
      </main>
      <LandingFooter />
    </div>
  )
}

export default LandingPage
