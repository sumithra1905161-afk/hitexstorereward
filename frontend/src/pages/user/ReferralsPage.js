import React from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { mockUser, mockReferrals } from '@/lib/mockData';
import { formatCurrency, formatMobileNumber, generateReferralLink, shareOnWhatsApp } from '@/lib/utils';

export default function ReferralsPage() {
  const [copied, setCopied] = React.useState(false);
  const referralLink = generateReferralLink(mockUser.mobile_no);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    shareOnWhatsApp(referralLink, mockUser.full_name);
  };

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            Referral Hub
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Invite colleagues and earn 2% on their purchases forever.
          </p>
        </section>

        {/* Referral Link */}
        <section data-testid="referral-link-section" className="bg-transparent border border-[#222222] rounded-lg p-6 sm:p-8 space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Your Referral Link
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              readOnly
              value={referralLink}
              data-testid="referral-link-input"
              className="flex-1 bg-[#09090B] border border-[#222222] rounded-md text-white px-4 py-3 font-mono text-sm focus:outline-none focus:border-[#10B981]"
            />
            <button
              onClick={handleCopy}
              data-testid="copy-referral-link-btn"
              className="bg-transparent border border-[#222222] text-white hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-md px-6 py-3 flex items-center justify-center gap-2 font-bold uppercase text-sm tracking-wide"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleShare}
              data-testid="share-whatsapp-btn"
              className="bg-[#10B981] text-black font-bold uppercase tracking-wide hover:bg-[#059669] transition-colors rounded-md px-6 py-3 flex items-center justify-center gap-2 text-sm"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </section>

        {/* 2% Tracker */}
        <section data-testid="crew-members-section" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
              Your Crew ({mockReferrals.length} Members)
            </p>
          </div>

          <div className="space-y-3">
            {mockReferrals.map((referral) => (
              <div
                key={referral.id}
                data-testid={`referral-item-${referral.id}`}
                className="bg-transparent border border-[#222222] rounded-lg p-6 flex items-center gap-4 hover:border-[#10B981] transition-colors"
              >
                <img
                  src={referral.avatar_url}
                  alt={referral.full_name}
                  className="w-12 h-12 rounded-full object-cover border border-[#222222]"
                />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1">
                    {referral.full_name}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm">
                    {formatMobileNumber(referral.mobile_no)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[#10B981] font-mono font-bold text-lg">
                    {formatCurrency(referral.lifetime_contribution)}
                  </p>
                  <p className="text-[#71717A] text-xs mt-1">
                    Lifetime Earned
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </UserLayout>
  );
}
