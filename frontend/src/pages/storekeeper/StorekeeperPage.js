import React, { useState } from 'react';
import { Search, Check, MapPin, QrCode } from 'lucide-react';
import { StorekeeperLayout } from '@/components/Layout';
import { mockUser, mockStores, mockMillNames } from '@/lib/mockData';
import { formatMobileNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function StorekeeperPage() {
  const [searchMobile, setSearchMobile] = useState('');
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [billAmount, setBillAmount] = useState('');
  const [selectedMill, setSelectedMill] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const currentStore = mockStores[0];

  const handleSearch = () => {
    if (searchMobile.length >= 10) {
      setVerifiedUser(mockUser);
    }
  };

  const handleQrScan = (scannedMobile) => {
    setSearchMobile(scannedMobile);
    setVerifiedUser(mockUser);
    setIsQrOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setVerifiedUser(null);
      setSearchMobile('');
      setBillAmount('');
      setSelectedMill('');
    }, 2000);
  };

  return (
    <StorekeeperLayout>
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Store Info */}
        <section data-testid="store-info-section" className="bg-transparent border border-[#222222] rounded-lg p-6 flex items-center justify-between">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-2">
              Current Store
            </p>
            <h2 className="text-2xl font-bold text-white mb-1">{currentStore.name}</h2>
            <p className="text-[#A1A1AA] text-sm">{currentStore.address}</p>
          </div>
          <a
            href={currentStore.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navigate-to-store-btn"
            className="bg-[#10B981] text-black hover:bg-[#059669] transition-colors rounded-md px-6 py-3 font-bold uppercase text-sm tracking-wide flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Navigate
          </a>
        </section>

        {/* Search Section */}
        <section data-testid="search-section" className="space-y-4">
          <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Search Buyer by Mobile Number
          </Label>
          <div className="flex gap-3">
            <Input
              type="tel"
              placeholder="Enter mobile number"
              value={searchMobile}
              onChange={(e) => setSearchMobile(e.target.value)}
              data-testid="mobile-search-input"
              className="flex-1 bg-[#09090B] border border-[#222222] rounded-md text-white text-2xl px-4 py-6 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono"
              autoFocus
            />
            <Button
              onClick={handleSearch}
              data-testid="search-buyer-btn"
              className="bg-[#10B981] text-black hover:bg-[#059669] px-8 font-bold uppercase tracking-wide text-sm"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
            <Button
              onClick={() => setIsQrOpen(true)}
              data-testid="scan-qr-btn"
              className="bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black px-8 font-bold uppercase tracking-wide text-sm"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Scan QR
            </Button>
          </div>
        </section>

        {/* User Verification */}
        {verifiedUser && (
          <section data-testid="user-verification-section" className="bg-transparent border border-[#10B981] rounded-lg p-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={verifiedUser.avatar_url}
                alt={verifiedUser.full_name}
                data-testid="verified-user-avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-[#10B981]"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-[#10B981]" />
                  <span className="text-[#10B981] font-bold text-sm uppercase tracking-wide">
                    Verified User
                  </span>
                </div>
                <h3 className="text-white font-bold text-2xl mb-1">
                  {verifiedUser.full_name}
                </h3>
                <p className="text-[#A1A1AA] font-mono">
                  {formatMobileNumber(verifiedUser.mobile_no)}
                </p>
              </div>
            </div>

            {/* Transaction Form */}
            <form onSubmit={handleSubmit} className="space-y-6 pt-6 border-t border-[#222222]">
              <div className="space-y-3">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Bill Amount (₹)
                </Label>
                <Input
                  type="number"
                  placeholder="Enter bill amount"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  data-testid="bill-amount-input"
                  className="bg-[#09090B] border border-[#222222] rounded-md text-white text-3xl px-4 py-6 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all font-mono"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Mill Name
                </Label>
                <Select value={selectedMill} onValueChange={setSelectedMill} required>
                  <SelectTrigger
                    data-testid="mill-name-select"
                    className="bg-[#09090B] border border-[#222222] rounded-md text-white px-4 py-6 focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
                  >
                    <SelectValue placeholder="Select mill name" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#09090B] border border-[#222222] text-white">
                    {mockMillNames.map((mill) => (
                      <SelectItem
                        key={mill}
                        value={mill}
                        className="hover:bg-[#10B981] hover:text-black cursor-pointer"
                      >
                        {mill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                data-testid="submit-transaction-btn"
                disabled={submitted}
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] py-6 font-bold uppercase tracking-wide text-base"
              >
                {submitted ? (
                  <><Check className="w-5 h-5 mr-2" />Submitted</>
                ) : (
                  'Submit Transaction'
                )}
              </Button>
            </form>
          </section>
        )}
      </div>

      {/* QR Scanner Modal */}
      <Dialog open={isQrOpen} onOpenChange={setIsQrOpen}>
        <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white text-center">Scan Customer QR</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="bg-[#222222] rounded-lg p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center space-y-4">
                <QrCode className="w-16 h-16 text-[#10B981] mx-auto" />
                <p className="text-white font-bold">QR Scanner</p>
                <p className="text-[#A1A1AA] text-sm">Position QR code within frame</p>
                <p className="text-[#71717A] text-xs">(Demo: Auto-scans mock user)</p>
              </div>
            </div>
            <Button
              onClick={() => handleQrScan('+919876543210')}
              data-testid="mock-scan-btn"
              className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
            >
              Simulate Scan (Demo)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </StorekeeperLayout>
  );
}
