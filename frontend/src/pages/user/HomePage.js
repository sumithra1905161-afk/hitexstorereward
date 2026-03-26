import React, { useState } from 'react';
import { Gift, UserPlus, MapPin, QrCode as QrCodeIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { UserLayout } from '@/components/Layout';
import { mockUser, mockScratchCards } from '@/lib/mockData';
import { formatCurrency, formatMobileNumber } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function HomePage() {
  const { t } = useLanguage();
  const unscratched = mockScratchCards.filter(c => !c.scratched).length;
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [withdrawForm, setWithdrawForm] = useState({ amount: '', upi_id: mockUser.upi_id });

  const handleWithdraw = () => {
    if (parseFloat(withdrawForm.amount) > mockUser.balance) {
      alert(t('home.insufficientBalance'));
      return;
    }
    alert(`${t('home.withdrawalSubmitted')} - ${formatCurrency(parseFloat(withdrawForm.amount))} → ${withdrawForm.upi_id}`);
    setIsWithdrawOpen(false);
    setWithdrawForm({ amount: '', upi_id: mockUser.upi_id });
  };

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Balance Section */}
        <section data-testid="balance-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            {t('home.availableBalance')}
          </p>
          <h1 
            data-testid="user-balance" 
            className="text-6xl sm:text-7xl lg:text-8xl font-mono font-black text-white tracking-tighter"
          >
            {formatCurrency(mockUser.balance)}
          </h1>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                setWithdrawForm({ amount: '', upi_id: mockUser.upi_id });
                setIsWithdrawOpen(true);
              }}
              data-testid="withdraw-balance-btn"
              className="bg-[#10B981] text-black font-bold uppercase tracking-wide hover:bg-[#059669] transition-colors rounded-md px-8 py-4 text-sm"
            >
              {t('home.withdrawToUpi')}
            </button>
            <button
              onClick={() => setIsQrOpen(true)}
              data-testid="show-qr-home-btn"
              className="bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black font-bold uppercase tracking-wide transition-colors rounded-md px-8 py-4 text-sm flex items-center gap-2"
            >
              <QrCodeIcon className="w-5 h-5" />
              {t('home.showMyQr')}
            </button>
          </div>
        </section>

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

        {/* Stats Grid */}
        <section data-testid="stats-section" className="grid grid-cols-2 gap-6">
          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
              {t('home.monthlyVolume')}
            </p>
            <p className="text-3xl font-mono font-black text-white">
              {formatCurrency(mockUser.monthly_volume)}
            </p>
          </div>
          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
              {t('home.rankThisMonth')}
            </p>
            <p className="text-3xl font-mono font-black text-[#10B981]">
              #3
            </p>
          </div>
        </section>

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
              <div className="bg-[#10B981] bg-opacity-10 border border-[#10B981] rounded-lg p-4">
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-2">
                  {t('home.availableBalance')}
                </p>
                <p className="text-[#10B981] font-mono text-3xl font-black">
                  {formatCurrency(mockUser.balance)}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  {t('home.withdrawalAmount')}
                </Label>
                <Input
                  type="number"
                  placeholder={t('home.enterAmount')}
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                  data-testid="withdraw-amount-input-home"
                  className="bg-[#09090B] border border-[#222222] text-white text-2xl font-mono"
                />
              </div>
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
              <Button
                onClick={handleWithdraw}
                data-testid="confirm-withdraw-btn-home"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6 text-base"
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
