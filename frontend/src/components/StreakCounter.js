import React from 'react';
import { Flame } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { mockUser } from '@/lib/mockData';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const StreakCounter = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  const streak = mockUser.daily_streak || 0;
  
  const getStreakColor = (days) => {
    if (days >= 30) return '#EF4444'; // Red - Hot
    if (days >= 14) return '#F59E0B'; // Orange - Warm
    if (days >= 7) return '#10B981'; // Green - Growing
    return '#3B82F6'; // Blue - Starting
  };

  const color = getStreakColor(streak);

  return (
    <div className="bg-gradient-to-r from-[#09090B] to-[#000000] border border-[#222222] rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${color}20` }}
          >
            <Flame className="w-8 h-8" style={{ color }} />
          </div>
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
              {te.streak.title}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black" style={{ color }}>
                {streak}
              </span>
              <span className="text-lg font-semibold text-white">
                {te.streak.days}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold" style={{ color }}>
            {te.streak.keepItGoing}
          </p>
          <p className="text-xs text-[#71717A] mt-1">
            {te.streak.loginDaily}
          </p>
        </div>
      </div>
    </div>
  );
};
