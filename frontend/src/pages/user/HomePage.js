import React from 'react';
import { Gift, UserPlus, MapPin } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { mockUser, mockScratchCards } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const unscratched = mockScratchCards.filter(c => !c.scratched).length;

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Balance Section */}
        <section data-testid="balance-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Available Balance
          </p>
          <h1 
            data-testid="user-balance" 
            className="text-6xl sm:text-7xl lg:text-8xl font-mono font-black text-white tracking-tighter"
          >
            {formatCurrency(mockUser.balance)}
          </h1>
          <button
            data-testid="withdraw-balance-btn"
            className="mt-6 bg-[#10B981] text-black font-bold uppercase tracking-wide hover:bg-[#059669] transition-colors rounded-md px-8 py-4 text-sm"
          >
            Withdraw to UPI
          </button>
        </section>

        {/* Quick Actions */}
        <section data-testid="quick-actions-section" className="space-y-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Quick Actions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Scratch Cards */}
            <Link
              to="/user/scratch-cards"
              data-testid="scratch-cards-btn"
              className="bg-transparent border border-[#222222] hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-lg p-6 text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <Gift className="w-8 h-8 text-[#10B981]" />
                {unscratched > 0 && (
                  <span className="bg-[#10B981] text-black font-bold text-xs px-2 py-1 rounded-full">
                    {unscratched} NEW
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Scratch Cards</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Scratch & win bonus rewards
              </p>
            </Link>

            {/* Invite Colleague */}
            <Link
              to="/user/referrals"
              data-testid="invite-colleague-btn"
              className="bg-transparent border border-[#222222] hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-lg p-6 text-left group"
            >
              <UserPlus className="w-8 h-8 mb-4 text-[#10B981]" />
              <h3 className="text-lg font-bold text-white mb-2">Invite Colleague</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Earn 2% on their purchases
              </p>
            </Link>

            {/* Find Store */}
            <button
              data-testid="find-store-btn"
              className="bg-transparent border border-[#222222] hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-lg p-6 text-left group"
            >
              <MapPin className="w-8 h-8 mb-4 text-[#10B981]" />
              <h3 className="text-lg font-bold text-white mb-2">Find Store</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Locate nearest partner store
              </p>
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section data-testid="stats-section" className="grid grid-cols-2 gap-6">
          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
              Monthly Volume
            </p>
            <p className="text-3xl font-mono font-black text-white">
              {formatCurrency(mockUser.monthly_volume)}
            </p>
          </div>
          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
              Rank This Month
            </p>
            <p className="text-3xl font-mono font-black text-[#10B981]">
              #3
            </p>
          </div>
        </section>
      </div>
    </UserLayout>
  );
}
