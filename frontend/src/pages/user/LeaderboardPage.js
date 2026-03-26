import React from 'react';
import { Trophy } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { mockLeaderboard, mockPrizes } from '@/lib/mockData';
import { formatCurrency, formatMobileNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function LeaderboardPage() {
  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            Monthly Leaderboard
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Top 10 performers this month. Top 3 win exclusive prizes!
          </p>
        </section>

        {/* Prizes Section */}
        <section data-testid="prizes-section" className="space-y-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            This Month's Prizes
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPrizes.map((prize) => (
              <div
                key={prize.id}
                data-testid={`prize-card-${prize.rank}`}
                className="bg-transparent border border-[#10B981] rounded-lg overflow-hidden relative shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={prize.image_url}
                    alt={prize.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-[#10B981]" />
                    <span className="text-[#10B981] font-bold text-sm uppercase tracking-wide">
                      {prize.description}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {prize.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leaderboard */}
        <section data-testid="leaderboard-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Top 10 This Month
          </p>
          <div className="space-y-3">
            {mockLeaderboard.map((user) => {
              const isTopThree = user.rank <= 3;
              return (
                <div
                  key={user.id}
                  data-testid={`leaderboard-item-${user.rank}`}
                  className={cn(
                    "rounded-lg p-6 flex items-center gap-4 transition-colors",
                    isTopThree
                      ? "bg-transparent border border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                      : "bg-transparent border border-[#222222] hover:border-[#10B981]"
                  )}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#09090B] border border-[#222222] flex items-center justify-center">
                    <span
                      className={cn(
                        "font-mono font-black text-xl",
                        isTopThree ? "text-[#10B981]" : "text-[#A1A1AA]"
                      )}
                    >
                      {user.rank}
                    </span>
                  </div>
                  <img
                    src={user.avatar_url}
                    alt={user.full_name}
                    className="w-12 h-12 rounded-full object-cover border border-[#222222]"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base mb-1">
                      {user.full_name}
                    </h3>
                    <p className="text-[#A1A1AA] text-sm">
                      {formatMobileNumber(user.mobile_no)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={cn(
                        "font-mono font-black text-xl",
                        isTopThree ? "text-[#10B981]" : "text-white"
                      )}
                    >
                      {formatCurrency(user.monthly_volume)}
                    </p>
                    <p className="text-[#71717A] text-xs mt-1 uppercase tracking-wide">
                      Volume
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </UserLayout>
  );
}
