import React, { useState } from 'react';
import { Settings, Gift, Percent } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { formatDiamonds, inrToDiamonds } from '@/lib/diamondUtils';

export default function AdminSettingsPage() {
  const [scratchSettings, setScratchSettings] = useState({
    minPurchaseAmount: 25000,
    minReward: 250,
    maxReward: 1000,
    jackpotReward: 2000,
    jackpotChance: 5
  });

  const [referralSettings, setReferralSettings] = useState({
    directReferralPercent: 3,
    indirectReferralPercent: 2
  });

  const handleSaveScratchSettings = () => {
    alert('Scratch card settings saved!');
  };

  const handleSaveReferralSettings = () => {
    alert('Referral settings saved!');
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            System Settings
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Configure scratch cards, referral rewards, and platform settings.
          </p>
        </section>

        {/* Settings Tabs */}
        <Tabs defaultValue="scratch" className="w-full">
          <TabsList className="bg-[#09090B] border border-[#222222]">
            <TabsTrigger 
              value="scratch" 
              data-testid="scratch-settings-tab"
              className="data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              <Gift className="w-4 h-4 mr-2" />
              Scratch Cards
            </TabsTrigger>
            <TabsTrigger 
              value="referral"
              data-testid="referral-settings-tab"
              className="data-[state=active]:bg-[#10B981] data-[state=active]:text-black"
            >
              <Percent className="w-4 h-4 mr-2" />
              Referral Rewards
            </TabsTrigger>
          </TabsList>

          {/* Scratch Card Settings */}
          <TabsContent value="scratch" className="space-y-6 mt-6">
            <div className="bg-transparent border border-[#222222] rounded-lg p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-[#10B981]" />
                <h2 className="text-2xl font-bold text-white">Scratch Card Configuration</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Minimum Purchase */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Minimum Purchase Amount
                  </Label>
                  <Input
                    type="number"
                    value={scratchSettings.minPurchaseAmount}
                    onChange={(e) => setScratchSettings({ ...scratchSettings, minPurchaseAmount: parseInt(e.target.value) })}
                    data-testid="min-purchase-input"
                    className="bg-[#09090B] border border-[#222222] text-white text-xl font-mono"
                  />
                  <p className="text-[#71717A] text-xs">
                    Users get 1 scratch card when purchase exceeds {formatCurrency(scratchSettings.minPurchaseAmount)}
                  </p>
                </div>

                {/* Min Reward */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Minimum Reward (💎)
                  </Label>
                  <Input
                    type="number"
                    value={scratchSettings.minReward}
                    onChange={(e) => setScratchSettings({ ...scratchSettings, minReward: parseInt(e.target.value) })}
                    data-testid="min-reward-input"
                    className="bg-[#09090B] border border-[#222222] text-white text-xl font-mono"
                  />
                  <p className="text-[#71717A] text-xs">
                    Minimum bonus: {formatDiamonds(inrToDiamonds(scratchSettings.minReward))}
                  </p>
                </div>

                {/* Max Reward */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Maximum Reward (💎)
                  </Label>
                  <Input
                    type="number"
                    value={scratchSettings.maxReward}
                    onChange={(e) => setScratchSettings({ ...scratchSettings, maxReward: parseInt(e.target.value) })}
                    data-testid="max-reward-input"
                    className="bg-[#09090B] border border-[#222222] text-white text-xl font-mono"
                  />
                  <p className="text-[#71717A] text-xs">
                    Maximum bonus: {formatDiamonds(inrToDiamonds(scratchSettings.maxReward))}
                  </p>
                </div>

                {/* Jackpot Reward */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Jackpot Reward (💎)
                  </Label>
                  <Input
                    type="number"
                    value={scratchSettings.jackpotReward}
                    onChange={(e) => setScratchSettings({ ...scratchSettings, jackpotReward: parseInt(e.target.value) })}
                    data-testid="jackpot-reward-input"
                    className="bg-[#09090B] border border-[#222222] text-white text-xl font-mono"
                  />
                  <p className="text-[#71717A] text-xs">
                    Special jackpot bonus: {formatDiamonds(inrToDiamonds(scratchSettings.jackpotReward))}
                  </p>
                </div>

                {/* Jackpot Chance */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Jackpot Probability (%)
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={scratchSettings.jackpotChance}
                    onChange={(e) => setScratchSettings({ ...scratchSettings, jackpotChance: parseInt(e.target.value) })}
                    data-testid="jackpot-chance-input"
                    className="bg-[#09090B] border border-[#222222] text-white text-xl font-mono"
                  />
                  <p className="text-[#71717A] text-xs">
                    {scratchSettings.jackpotChance}% chance of jackpot
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSaveScratchSettings}
                data-testid="save-scratch-settings-btn"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6 text-base"
              >
                <Settings className="w-5 h-5 mr-2" />
                Save Scratch Card Settings
              </Button>
            </div>
          </TabsContent>

          {/* Referral Settings */}
          <TabsContent value="referral" className="space-y-6 mt-6">
            <div className="bg-transparent border border-[#222222] rounded-lg p-8 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Percent className="w-6 h-6 text-[#10B981]" />
                <h2 className="text-2xl font-bold text-white">Referral Rewards Configuration</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Direct Referral */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Direct Referral (Own Purchase)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={referralSettings.directReferralPercent}
                      onChange={(e) => setReferralSettings({ ...referralSettings, directReferralPercent: parseFloat(e.target.value) })}
                      data-testid="direct-referral-input"
                      className="bg-[#09090B] border border-[#222222] text-white text-3xl font-mono pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-[#10B981] font-mono">%</span>
                  </div>
                  <p className="text-[#71717A] text-xs">
                    Buyer earns {referralSettings.directReferralPercent}% on their own purchases
                  </p>
                </div>

                {/* Indirect Referral */}
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Indirect Referral (Commission)
                  </Label>
                  <div className="relative">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={referralSettings.indirectReferralPercent}
                      onChange={(e) => setReferralSettings({ ...referralSettings, indirectReferralPercent: parseFloat(e.target.value) })}
                      data-testid="indirect-referral-input"
                      className="bg-[#09090B] border border-[#222222] text-white text-3xl font-mono pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-[#10B981] font-mono">%</span>
                  </div>
                  <p className="text-[#71717A] text-xs">
                    Referrer earns {referralSettings.indirectReferralPercent}% on referral's purchases
                  </p>
                </div>
              </div>

              {/* Example Calculation */}
              <div className="bg-[#09090B] border border-[#10B981] border-opacity-30 rounded-lg p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
                  Example Calculation
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-white">
                    Purchase Amount: <span className="font-mono font-bold text-[#10B981]">₹50,000</span>
                  </p>
                  <p className="text-[#A1A1AA]">
                    • Buyer gets: <span className="font-mono font-bold text-white">{formatDiamonds(inrToDiamonds(50000 * (referralSettings.directReferralPercent / 100)))}</span> ({referralSettings.directReferralPercent}%)
                  </p>
                  <p className="text-[#A1A1AA]">
                    • Referrer gets: <span className="font-mono font-bold text-white">{formatDiamonds(inrToDiamonds(50000 * (referralSettings.indirectReferralPercent / 100)))}</span> ({referralSettings.indirectReferralPercent}%)
                  </p>
                </div>
              </div>

              <Button
                onClick={handleSaveReferralSettings}
                data-testid="save-referral-settings-btn"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6 text-base"
              >
                <Settings className="w-5 h-5 mr-2" />
                Save Referral Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
