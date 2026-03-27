import React from 'react';
import { DollarSign, TrendingUp, Users, Gift } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { formatDiamonds, diamondsToINR } from '@/lib/diamondUtils';
import { useLanguage } from '@/lib/LanguageContext';
import { mockUser } from '@/lib/mockData';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const QuickStats = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;

  const stats = [
    {
      icon: DollarSign,
      label: te.stats.totalEarned,
      value: formatDiamonds(mockUser.total_earned_diamonds || 226253),
      sublabel: `${formatCurrency(diamondsToINR(mockUser.total_earned_diamonds || 226253))}`,
      color: '#10B981'
    },
    {
      icon: TrendingUp,
      label: te.stats.thisMonth,
      value: formatCurrency(mockUser.monthly_volume),
      sublabel: 'Volume',
      color: '#3B82F6'
    },
    {
      icon: Users,
      label: te.stats.referralEarnings,
      value: formatDiamonds(26001), // 5200.25 * 5
      sublabel: `${formatCurrency(5200.25)}`,
      color: '#8B5CF6'
    },
    {
      icon: Gift,
      label: te.stats.scratchWins,
      value: formatDiamonds(10600), // 2120 * 5
      sublabel: `${formatCurrency(2120)}`,
      color: '#F59E0B'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#09090B] border border-[#222222] rounded-lg p-6 hover:border-[#10B981] transition-colors"
        >
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
            style={{ backgroundColor: `${stat.color}20` }}
          >
            <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
          </div>
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-2">
            {stat.label}
          </p>
          <p className="text-2xl font-mono font-black text-white mb-1 break-words">
            {stat.value}
          </p>
          <p className="text-xs text-[#71717A]">
            {stat.sublabel}
          </p>
        </div>
      ))}
    </div>
  );
};
