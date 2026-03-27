import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { mockUser } from '@/lib/mockData';
import { tierBenefits } from '@/lib/mockDataEnhanced';
import { formatCurrency } from '@/lib/utils';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const TierStatus = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  const currentTier = tierBenefits[mockUser.tier];
  
  const getTierOrder = () => ['bronze', 'silver', 'gold', 'platinum'];
  const getNextTier = () => {
    const tiers = getTierOrder();
    const currentIndex = tiers.indexOf(mockUser.tier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };
  
  const nextTierKey = getNextTier();
  const nextTier = nextTierKey ? tierBenefits[nextTierKey] : null;
  const volumeToNext = nextTier ? nextTier.minVolume - mockUser.monthly_volume : 0;
  const progress = nextTier ? ((mockUser.monthly_volume / nextTier.minVolume) * 100) : 100;

  return (
    <div className="bg-gradient-to-br from-[#09090B] to-[#000000] border-2 rounded-lg p-6 space-y-6"
      style={{ borderColor: currentTier.color }}
    >
      {/* Current Tier */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${currentTier.color}30`, border: `2px solid ${currentTier.color}` }}
          >
            🏆
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
              {te.tier.currentTier}
            </p>
            <p className="text-2xl font-black" style={{ color: currentTier.color }}>
              {lang === 'hi' ? currentTier.nameHi : currentTier.name}
            </p>
            <p className="text-xs text-[#71717A] mt-1">
              {currentTier.cashback}% {te.tier.benefits}
            </p>
          </div>
        </div>
      </div>

      {/* Progress to Next Tier */}
      {nextTier && (
        <div className="space-y-3 pt-6 border-t border-[#222222]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#71717A]">{te.tier.progress} {lang === 'hi' ? nextTier.nameHi : nextTier.name}</span>
            <span className="text-[#10B981] font-semibold">{Math.round(progress)}%</span>
          </div>
          
          <div className="w-full bg-[#222222] rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                backgroundColor: nextTier.color
              }}
            />
          </div>
          
          <p className="text-xs text-center text-[#71717A]">
            {formatCurrency(volumeToNext)} {te.tier.volumeNeeded}
          </p>
        </div>
      )}

      {/* Benefits */}
      <div className="pt-6 border-t border-[#222222]">
        <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
          {te.tier.benefits}
        </p>
        <ul className="space-y-2">
          {(lang === 'hi' ? currentTier.benefitsHi : currentTier.benefits).map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[#A1A1AA]">
              <span className="text-[#10B981] mt-0.5">•</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
