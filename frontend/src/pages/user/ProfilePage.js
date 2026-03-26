import React from 'react';
import { User, Phone, Wallet, TrendingUp } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { mockUser } from '@/lib/mockData';
import { formatCurrency, formatMobileNumber } from '@/lib/utils';

export default function ProfilePage() {
  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={mockUser.avatar_url}
            alt={mockUser.full_name}
            data-testid="user-avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#10B981]"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
              {mockUser.full_name}
            </h1>
            <p className="text-[#A1A1AA] font-mono text-base">
              {formatMobileNumber(mockUser.mobile_no)}
            </p>
          </div>
        </section>

        {/* Profile Details */}
        <section data-testid="profile-details-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Account Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPI ID */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  UPI ID
                </p>
              </div>
              <p className="text-white font-mono text-lg">
                {mockUser.upi_id}
              </p>
            </div>

            {/* Phone */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Mobile Number
                </p>
              </div>
              <p className="text-white font-mono text-lg">
                {formatMobileNumber(mockUser.mobile_no)}
              </p>
            </div>

            {/* Balance */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Available Balance
                </p>
              </div>
              <p className="text-[#10B981] font-mono text-2xl font-black">
                {formatCurrency(mockUser.balance)}
              </p>
            </div>

            {/* Monthly Volume */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Monthly Volume
                </p>
              </div>
              <p className="text-white font-mono text-2xl font-black">
                {formatCurrency(mockUser.monthly_volume)}
              </p>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-col sm:flex-row gap-4">
          <button
            data-testid="edit-profile-btn"
            className="flex-1 bg-[#10B981] text-black font-bold uppercase tracking-wide hover:bg-[#059669] transition-colors rounded-md px-6 py-4"
          >
            Edit Profile
          </button>
          <button
            data-testid="update-upi-btn"
            className="flex-1 bg-transparent border border-[#222222] text-white hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-md px-6 py-4 font-bold uppercase tracking-wide"
          >
            Update UPI
          </button>
        </section>
      </div>
    </UserLayout>
  );
}
