import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { ArrowRight, Gift, Users, Trophy, QrCode, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      <AppHeader variant="auth" />
      
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 max-w-6xl mx-auto">
        <div className="text-center space-y-8 fade-in">
          <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981] px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs uppercase tracking-wider text-[#10B981] font-bold">
              {t('landing.trustedBy')}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none">
            {t('landing.heroTitle')}
            <br />
            <span className="text-[#10B981]">{t('landing.heroTitleAccent')}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
            {t('landing.heroSubtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Button
              onClick={() => navigate('/login')}
              className="bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide px-8 py-6 text-base rounded-md transition-colors w-full sm:w-auto"
            >
              {t('landing.getStarted')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={() => navigate('/storekeeper-login')}
              className="bg-transparent border border-[#222222] text-white hover:border-[#10B981] hover:text-[#10B981] font-bold uppercase tracking-wide px-8 py-6 text-base rounded-md transition-colors w-full sm:w-auto"
            >
              {t('landing.storekeeperLogin')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-[#09090B] border-y border-[#222222]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-4">
              {t('landing.featuresLabel')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              {t('landing.featuresTitle')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-8 hover:border-[#10B981] transition-colors group">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                <Gift className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#10B981] transition-colors">
                {t('landing.feature1Title')}
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                {t('landing.feature1Desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-8 hover:border-[#10B981] transition-colors group">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#10B981] transition-colors">
                {t('landing.feature2Title')}
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                {t('landing.feature2Desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-8 hover:border-[#10B981] transition-colors group">
              <div className="w-12 h-12 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-[#10B981] transition-colors">
                {t('landing.feature3Title')}
              </h3>
              <p className="text-[#A1A1AA] leading-relaxed">
                {t('landing.feature3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-4">
            {t('landing.howItWorksLabel')}
          </p>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            {t('landing.howItWorksTitle')}
          </h2>
        </div>
        
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-black text-2xl font-black">1</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">{t('landing.step1Title')}</h3>
              <p className="text-[#A1A1AA] leading-relaxed">{t('landing.step1Desc')}</p>
            </div>
            <div className="w-full md:w-64 h-40 bg-[#09090B] border border-[#222222] rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-[#10B981]" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="w-16 h-16 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-black text-2xl font-black">2</span>
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-2xl font-bold mb-3">{t('landing.step2Title')}</h3>
              <p className="text-[#A1A1AA] leading-relaxed">{t('landing.step2Desc')}</p>
            </div>
            <div className="w-full md:w-64 h-40 bg-[#09090B] border border-[#222222] rounded-lg flex items-center justify-center">
              <Gift className="w-16 h-16 text-[#10B981]" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-16 h-16 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-black text-2xl font-black">3</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">{t('landing.step3Title')}</h3>
              <p className="text-[#A1A1AA] leading-relaxed">{t('landing.step3Desc')}</p>
            </div>
            <div className="w-full md:w-64 h-40 bg-[#09090B] border border-[#222222] rounded-lg flex items-center justify-center">
              <Zap className="w-16 h-16 text-[#10B981]" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-b from-[#000000] via-[#09090B] to-[#000000] border-y border-[#222222]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            {t('landing.ctaTitle')}
          </h2>
          <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
            {t('landing.ctaSubtitle')}
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide px-12 py-6 text-lg rounded-md transition-colors"
          >
            {t('landing.ctaButton')}
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#222222]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#10B981] rounded-md flex items-center justify-center">
              <span className="text-black font-black text-lg">H</span>
            </div>
            <h3 className="text-xl font-black">
              {t('brand.name')} <span className="text-[#10B981]">{t('brand.accent')}</span>
            </h3>
          </div>
          <p className="text-[#71717A] text-sm">
            {t('brand.tagline')}
          </p>
          <p className="text-[#71717A] text-xs mt-6">
            © 2025 Hitex Spares. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
