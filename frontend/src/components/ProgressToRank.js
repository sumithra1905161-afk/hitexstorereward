import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { mockUser, mockLeaderboard } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const ProgressToRank = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  
  const currentRank = 3;
  const nextUser = mockLeaderboard.find(u => u.rank === currentRank - 1);
  const volumeGap = nextUser ? nextUser.monthly_volume - mockUser.monthly_volume : 0;
  const progress = nextUser ? ((mockUser.monthly_volume / nextUser.monthly_volume) * 100) : 100;

  return (
    <div className="bg-[#09090B] border border-[#222222] rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#10B981]" />
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            {te.progress.toNextRank}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[#10B981]">
            #{currentRank - 1}
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#71717A]">Current</span>
          <span className="text-white font-semibold">#{currentRank}</span>
        </div>
        
        <div className="w-full bg-[#222222] rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-[#10B981] to-[#059669] h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-[#71717A]">{formatCurrency(volumeGap)} more needed</span>
          <span className="text-[#10B981] font-semibold">{Math.round(progress)}%</span>
        </div>
      </div>
      
      <p className="text-xs text-center text-[#10B981] font-semibold">
        {te.progress.keepGoing}
      </p>
    </div>
  );
};
