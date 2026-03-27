import React, { useState } from 'react';
import { Gift, UserPlus, MapPin, QrCode as QrCodeIcon, Clock, AlertCircle, History, TrendingUp } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { UserLayout } from '@/components/Layout';
import { mockUser, mockScratchCards } from '@/lib/mockData';
import { formatCurrency, formatMobileNumber } from '@/lib/utils';
import { formatDiamonds, diamondsToINR, formatDiamondsWithINR } from '@/lib/diamondUtils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/LanguageContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// Import new components
import { ActivityFeed } from '@/components/ActivityFeed';
import { QuickStats } from '@/components/QuickStats';
import { StreakCounter } from '@/components/StreakCounter';
import { ProgressToRank } from '@/components/ProgressToRank';
import { BadgeDisplay } from '@/components/BadgeDisplay';

export default function HomePage() {
  const { t } = useLanguage();
  const unscratched = mockScratchCards.filter(c => !c.scratched).length;
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({ diamonds: '', upi_id: mockUser.upi_id });
  const [pendingWithdrawal, setPendingWithdrawal] = useState(mockUser.pending_withdrawal);

  // Calculate INR conversion in real-time
  const withdrawalINR = withdrawForm.diamonds ? diamondsToINR(parseFloat(withdrawForm.diamonds)) : 0;

  const handleWithdrawClick = () => {
    if (pendingWithdrawal) {
      toast.error(t('home.cannotWithdrawMultiple'), {
        duration: 5000,
      });
      return;
    }
    setWithdrawForm({ diamonds: '', upi_id: mockUser.upi_id });
    setIsWithdrawOpen(true);
  };

  const handleWithdraw = () => {
    const diamondsToWithdraw = parseFloat(withdrawForm.diamonds);
    
    if (diamondsToWithdraw > mockUser.balance_diamonds) {
      toast.error(t('home.insufficientBalance'));
      return;
    }
    
    if (diamondsToWithdraw < 2500) {
      toast.error('Minimum withdrawal is 2,500 💎 (₹500)');
      return;
    }
    
    if (diamondsToWithdraw > 250000) {
      toast.error('Maximum withdrawal is 250,000 💎 (₹50,000)');
      return;
    }
    
    const inrAmount = diamondsToINR(diamondsToWithdraw);
    
    // Create pending withdrawal
    const withdrawal = {
      diamonds: diamondsToWithdraw,
      amount: inrAmount,
      upi_id: withdrawForm.upi_id,
      requested_at: new Date().toISOString(),
      status: 'pending'
    };
    
    setPendingWithdrawal(withdrawal);
    mockUser.pending_withdrawal = withdrawal;
    
    toast.success(t('home.withdrawalSuccess'), {
      description: `${formatDiamonds(diamondsToWithdraw)} → ${formatCurrency(inrAmount)} to ${withdrawForm.upi_id}`,
      duration: 5000,
    });
    setIsWithdrawOpen(false);
    setWithdrawForm({ diamonds: '', upi_id: mockUser.upi_id });
  };

  const balanceInfo = formatDiamondsWithINR(mockUser.balance_diamonds);

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-12 space-y-8 sm:space-y-12 fade-in">
        {/* Streak Counter */}
        <StreakCounter />

        {/* Pending Withdrawal Alert */}
        {pendingWithdrawal && (
          <section className="bg-[#F59E0B]/10 border-2 border-[#F59E0B] rounded-lg p-6 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#F59E0B] rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-bold text-[#F59E0B] uppercase tracking-wide">
                  {t('home.withdrawalPending')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      {t('home.pendingWithdrawalAmount')}
                    </p>
                    <p className="text-2xl font-mono font-black text-[#F59E0B]">
                      {formatDiamonds(pendingWithdrawal.diamonds)}
                    </p>
                    <p className="text-sm text-[#A1A1AA] mt-1">
                      = {formatCurrency(pendingWithdrawal.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      {t('home.pendingWithdrawalUpi')}
                    </p>
                    <p className="text-sm font-mono text-white">
                      {pendingWithdrawal.upi_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      {t('home.pendingWithdrawalDate')}
                    </p>
                    <p className="text-sm text-white">
                      {new Date(pendingWithdrawal.requested_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Your withdrawal is being processed and will be completed within 24 hours.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Balance Section */}
        <section data-testid="balance-section" className="space-y-4">
          <div className="flex items-center gap-3">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
              {t('home.availableBalance')}
            </p>
            <div className="bg-[#10B981]/10 border border-[#10B981] px-3 py-1 rounded-full">
              <p className="text-xs font-bold text-[#10B981]">{t('home.earnRate')}</p>
            </div>
          </div>
          <h1 
            data-testid="user-balance" 
            className="text-4xl sm:text-6xl lg:text-8xl font-mono font-black text-white tracking-tighter break-words flex items-baseline gap-4"
          >
            {balanceInfo.formatted}
          </h1>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#10B981]" />
            <p className="text-lg font-semibold text-[#10B981]">
              {t('common.worth')} {balanceInfo.inrFormatted}
            </p>
            <span className="text-[#71717A] text-sm">({t('home.conversionRate')})</span>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
            <button
              onClick={handleWithdrawClick}
              disabled={pendingWithdrawal !== null}
              data-testid="withdraw-balance-btn"
              className={`font-bold uppercase tracking-wide transition-colors rounded-md px-6 sm:px-8 py-3 sm:py-4 text-sm ${
                pendingWithdrawal
                  ? 'bg-[#333333] text-[#71717A] cursor-not-allowed'
                  : 'bg-[#10B981] text-black hover:bg-[#059669]'
              }`}
            >
              {pendingWithdrawal ? t('home.withdrawalPending') : t('home.withdrawToUpi')}
            </button>
            <button
              onClick={() => setIsQrOpen(true)}
              data-testid="show-qr-home-btn"
              className="bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black font-bold uppercase tracking-wide transition-colors rounded-md px-6 sm:px-8 py-3 sm:py-4 text-sm flex items-center justify-center gap-2"
            >
              <QrCodeIcon className="w-5 h-5" />
              {t('home.showMyQr')}
            </button>
            <Link
              to="/user/withdrawal-history"
              className="bg-transparent border border-[#333333] text-[#A1A1AA] hover:border-[#10B981] hover:text-[#10B981] font-bold uppercase tracking-wide transition-colors rounded-md px-6 sm:px-8 py-3 sm:py-4 text-sm flex items-center justify-center gap-2"
            >
              <History className="w-5 h-5" />
              {t('home.viewHistory')}
            </Link>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <QuickStats />

        {/* Two Column Layout: Progress & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProgressToRank />
          <BadgeDisplay userAchievements={mockUser.achievements} />
        </div>

        {/* Quick Actions */}
        <section data-testid="quick-actions-section" className="space-y-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            {t('home.quickActions')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/user/scratch-cards"
              data-testid="scratch-cards-btn"
              className="bg-transparent border border-[#222222] hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-lg p-6 text-left group"
            >
              <div className="flex items-center justify-between mb-4">
                <Gift className="w-8 h-8 text-[#10B981]" />
                {unscratched > 0 && (
                  <span className="bg-[#10B981] text-black font-bold text-xs px-2 py-1 rounded-full">
                    {unscratched} {t('home.newBadge')}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('home.scratchCards')}</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {t('home.scratchCardsDesc')}
              </p>
            </Link>

            <Link
              to="/user/referrals"
              data-testid="invite-colleague-btn"
              className="bg-transparent border border-[#222222] hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-lg p-6 text-left group"
            >
              <UserPlus className="w-8 h-8 mb-4 text-[#10B981]" />
              <h3 className="text-lg font-bold text-white mb-2">{t('home.inviteColleague')}</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {t('home.inviteDesc')}
              </p>
            </Link>

            <button
              data-testid="find-store-btn"
              className="bg-transparent border border-[#222222] hover:border-[#10B981] hover:text-[#10B981] transition-colors rounded-lg p-6 text-left group"
            >
              <MapPin className="w-8 h-8 mb-4 text-[#10B981]" />
              <h3 className="text-lg font-bold text-white mb-2">{t('home.findStore')}</h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {t('home.findStoreDesc')}
              </p>
            </button>
          </div>
        </section>

        {/* Recent Activity Feed */}
        <ActivityFeed limit={5} />

        {/* Branded QR Code Modal */}
        <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
          <DialogContent className="bg-[#000000] border-2 border-[#10B981] text-white max-w-md shadow-[0_0_50px_rgba(16,185,129,0.3)]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white text-center">{t('home.myQrCode')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div className="bg-gradient-to-br from-[#10B981] via-[#059669] to-[#047857] p-1 rounded-xl">
                <div className="bg-white p-6 rounded-lg">
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-black text-[#000000] tracking-tight">
                      Hitex <span className="text-[#10B981]">Spares</span>
                    </h2>
                    <p className="text-[#71717A] text-xs uppercase tracking-wider mt-1">{t('brand.textileRewards')}</p>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <QRCodeSVG
                      value={mockUser.mobile_no}
                      size={200}
                      level="H"
                      includeMargin={false}
                      fgColor="#000000"
                      bgColor="#FFFFFF"
                      imageSettings={{
                        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310B981'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
                        height: 40,
                        width: 40,
                        excavate: true,
                      }}
                      data-testid="branded-qr-code"
                    />
                  </div>
                  <div className="border-t-2 border-dashed border-[#E5E7EB] pt-4 text-center">
                    <p className="text-[#000000] font-bold text-lg">{mockUser.full_name}</p>
                    <p className="text-[#10B981] font-mono text-sm font-semibold">{formatMobileNumber(mockUser.mobile_no)}</p>
                  </div>
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">{t('home.scanAtStore')}</p>
                <p className="text-[#71717A] text-xs leading-relaxed">
                  {t('home.showQrDesc')}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Withdraw Modal */}
        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">{t('home.withdrawTitle')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {/* Available Balance */}
              <div className="bg-[#10B981] bg-opacity-10 border border-[#10B981] rounded-lg p-4">
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-2">
                  {t('home.availableBalance')}
                </p>
                <p className="text-[#10B981] font-mono text-2xl sm:text-3xl font-black break-words">
                  {balanceInfo.formatted}
                </p>
                <p className="text-sm text-[#A1A1AA] mt-1">
                  {t('common.worth')} {balanceInfo.inrFormatted}
                </p>
              </div>

              {/* Conversion Rate Info */}
              <div className="bg-[#09090B] border border-[#333333] rounded-lg p-3 flex items-center justify-between">
                <span className="text-xs text-[#A1A1AA]">{t('home.conversionRate')}</span>
                <TrendingUp className="w-4 h-4 text-[#10B981]" />
              </div>

              {/* Diamonds Input */}
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  {t('home.withdrawalAmount')}
                </Label>
                <Input
                  type="number"
                  placeholder={t('home.enterAmount')}
                  value={withdrawForm.diamonds}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, diamonds: e.target.value })}
                  data-testid="withdraw-amount-input-home"
                  className="bg-[#09090B] border border-[#222222] text-white text-xl sm:text-2xl font-mono"
                />
                {withdrawForm.diamonds && (
                  <div className="bg-[#10B981]/10 border border-[#10B981] rounded-lg p-3 mt-2">
                    <p className="text-xs text-[#A1A1AA] mb-1">{t('home.youWillReceive')}</p>
                    <p className="text-2xl font-bold text-[#10B981]">
                      {formatCurrency(withdrawalINR)}
                    </p>
                  </div>
                )}
              </div>

              {/* Min/Max Limits */}
              <div className="flex justify-between text-xs text-[#71717A]">
                <span>{t('home.minWithdrawal')}</span>
                <span>{t('home.maxWithdrawal')}</span>
              </div>

              {/* UPI ID */}
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  {t('home.upiId')}
                </Label>
                <Input
                  type="text"
                  value={withdrawForm.upi_id}
                  readOnly
                  data-testid="withdraw-upi-display-home"
                  className="bg-[#09090B] border border-[#222222] text-white font-mono"
                />
              </div>

              {/* Confirm Button */}
              <Button
                onClick={handleWithdraw}
                data-testid="confirm-withdraw-btn-home"
                disabled={!withdrawForm.diamonds || parseFloat(withdrawForm.diamonds) < 2500}
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6 text-base disabled:bg-[#333333] disabled:text-[#71717A] disabled:cursor-not-allowed"
              >
                {t('home.confirmWithdrawal')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </UserLayout>
  );
}
