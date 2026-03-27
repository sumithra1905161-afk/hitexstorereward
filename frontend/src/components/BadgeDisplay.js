import React from 'react';
import { Trophy, Lock } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { achievements } from '@/lib/mockDataEnhanced';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const BadgeDisplay = ({ userAchievements, limit = 3 }) => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  
  const unlockedBadges = achievements.filter(a => a.unlocked).slice(0, limit);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-[#10B981]" />
        <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
          {te.achievements.title}
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {unlockedBadges.map((badge) => (
          <div
            key={badge.id}
            className="relative bg-[#09090B] border-2 rounded-lg p-4 text-center hover:scale-105 transition-transform"
            style={{ borderColor: badge.color }}
          >
            <div 
              className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${badge.color}20` }}
            >
              🏆
            </div>
            <p className="text-xs font-bold text-white truncate">
              {lang === 'hi' ? badge.nameHi : badge.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
