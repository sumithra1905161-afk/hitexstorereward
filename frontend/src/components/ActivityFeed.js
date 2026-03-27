import React from 'react';
import { ShoppingCart, UserPlus, Gift, ArrowDownCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';
import { recentActivity } from '@/lib/mockDataEnhanced';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const ActivityFeed = ({ limit = 5 }) => {
  const { lang, t } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  
  const iconMap = {
    purchase: ShoppingCart,
    referral_commission: UserPlus,
    scratch_win: Gift,
    withdrawal: ArrowDownCircle
  };

  const activities = limit ? recentActivity.slice(0, limit) : recentActivity;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
          {te.activity.title}
        </p>
        {limit && (
          <button className="text-xs text-[#10B981] hover:text-[#059669] font-semibold uppercase tracking-wide">
            {te.activity.viewAll}
          </button>
        )}
      </div>
      
      <div className="space-y-2">
        {activities.map((activity) => {
          const Icon = iconMap[activity.type] || ShoppingCart;
          return (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-[#09090B] border border-[#222222] rounded-lg hover:border-[#10B981] transition-colors"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${activity.color}20` }}
              >
                <Icon className="w-5 h-5" style={{ color: activity.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {lang === 'hi' ? activity.titleHi : activity.title}
                </p>
                <p className="text-xs text-[#71717A]">
                  {new Date(activity.timestamp).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-mono font-bold ${
                  activity.amount > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}>
                  {activity.points}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
