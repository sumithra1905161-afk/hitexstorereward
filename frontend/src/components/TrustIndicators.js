import React from 'react';
import { DollarSign, Users, Store, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { trustIndicators } from '@/lib/mockDataEnhanced';
import { formatDiamonds, inrToDiamonds } from '@/lib/diamondUtils';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';

export const TrustIndicators = () => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;

  const indicators = [
    {
      icon: DollarSign,
      value: formatDiamonds(inrToDiamonds(trustIndicators.total_distributed)),
      label: te.trust.distributed,
      color: '#10B981'
    },
    {
      icon: Users,
      value: `${(trustIndicators.active_users / 1000).toFixed(1)}K+`,
      label: te.trust.activeUsers,
      color: '#3B82F6'
    },
    {
      icon: Store,
      value: `${trustIndicators.partner_stores}+`,
      label: te.trust.partnerStores,
      color: '#F59E0B'
    },
    {
      icon: TrendingUp,
      value: `${(trustIndicators.monthly_transactions / 1000).toFixed(0)}K+`,
      label: te.trust.transactions,
      color: '#8B5CF6'
    }
  ];

  return (
    <section className="px-6 py-16 bg-[#000000]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {indicators.map((item, index) => (
            <div
              key={index}
              className="text-center space-y-3"
            >
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-3xl font-black tracking-tight" style={{ color: item.color }}>
                  {item.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-[#A1A1AA] font-semibold mt-1">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
