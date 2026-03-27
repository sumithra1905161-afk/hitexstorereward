import React, { useState } from 'react';
import { Gift, Sparkles, Trophy } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { ScratchCardModal } from '@/components/ScratchCardModal';
import { mockScratchCards } from '@/lib/mockData';
import { formatCurrency, formatDate } from '@/lib/utils';
import { formatDiamonds, inrToDiamonds } from '@/lib/diamondUtils';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

export default function ScratchCardsPage() {
  const { t } = useLanguage();
  const [cards, setCards] = useState(mockScratchCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScratchClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleScratchComplete = () => {
    if (selectedCard) {
      setCards(prev =>
        prev.map(card =>
          card.id === selectedCard.id
            ? { ...card, scratched: true, scratched_date: new Date().toISOString() }
            : card
        )
      );
      setTimeout(() => {
        setIsModalOpen(false);
        setSelectedCard(null);
      }, 2000);
    }
  };

  const unscratched = cards.filter(c => !c.scratched);
  const scratched = cards.filter(c => c.scratched);

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            {t('scratch.title')}
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            {t('scratch.subtitle')}
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-transparent border border-[#10B981] rounded-lg p-6 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-5 h-5 text-[#10B981]" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                {t('scratch.availableCards')}
              </p>
            </div>
            <p className="text-4xl font-mono font-black text-[#10B981]">
              {unscratched.length}
            </p>
          </div>

          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-5 h-5 text-[#10B981]" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                {t('scratch.totalCardsEarned')}
              </p>
            </div>
            <p className="text-4xl font-mono font-black text-white">
              {cards.length}
            </p>
          </div>

          <div className="bg-transparent border border-[#222222] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="w-5 h-5 text-[#10B981]" />
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                {t('scratch.totalWon')}
              </p>
            </div>
            <p className="text-4xl font-mono font-black text-white">
              {formatDiamonds(inrToDiamonds(
                scratched.reduce((sum, c) => sum + c.reward_amount, 0)
              ))}
            </p>
          </div>
        </section>

        {unscratched.length > 0 && (
          <section data-testid="unscratched-cards-section" className="space-y-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
              {t('scratch.availableToScratch')} ({unscratched.length})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {unscratched.map((card) => (
                <div key={card.id} data-testid={`scratch-card-${card.id}`} className="relative group">
                  <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg p-1 shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all">
                    <div className="bg-[#000000] rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Gift className="w-8 h-8 text-[#10B981]" />
                        <span className="bg-[#10B981] text-black font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                          {t('home.newBadge')}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                          {t('scratch.purchaseAmount')}
                        </p>
                        <p className="text-2xl font-mono font-black text-white">
                          {formatCurrency(card.purchase_amount)}
                        </p>
                        <p className="text-[#71717A] text-xs font-mono">{card.bill_no}</p>
                        <p className="text-[#A1A1AA] text-xs">{formatDate(card.earned_date)}</p>
                      </div>
                      <button
                        onClick={() => handleScratchClick(card)}
                        data-testid={`scratch-btn-${card.id}`}
                        className="w-full bg-[#10B981] text-black hover:bg-[#059669] transition-colors rounded-md px-6 py-3 font-bold uppercase tracking-wide text-sm flex items-center justify-center gap-2 mt-4"
                      >
                        <Sparkles className="w-4 h-4" />
                        {t('scratch.scratchNow')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section data-testid="scratched-cards-section" className="space-y-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            {t('scratch.previouslyScratched')} ({scratched.length})
          </p>
          <div className="space-y-3">
            {scratched.map((card) => (
              <div
                key={card.id}
                data-testid={`scratched-card-${card.id}`}
                className={cn(
                  "rounded-lg p-6 border transition-colors",
                  card.reward_type === 'jackpot'
                    ? "border-[#F59E0B] bg-[#F59E0B] bg-opacity-5"
                    : "border-[#222222] hover:border-[#10B981]"
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-1 flex items-center gap-3">
                    {card.reward_type === 'jackpot' ? (
                      <Trophy className="w-6 h-6 text-[#F59E0B]" />
                    ) : (
                      <Gift className="w-6 h-6 text-[#10B981]" />
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-white font-semibold text-sm mb-1">{card.bill_no}</p>
                    <p className="text-[#A1A1AA] text-xs">
                      {t('passbook.purchaseLabel')}: {formatCurrency(card.purchase_amount)}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      {card.reward_type === 'jackpot' ? t('scratch.jackpot') : t('scratch.bonusWon')}
                    </p>
                    <p className={cn(
                      "font-mono font-bold text-xl",
                      card.reward_type === 'jackpot' ? "text-[#F59E0B]" : "text-[#10B981]"
                    )}>
                      +{formatDiamonds(inrToDiamonds(card.reward_amount))}
                    </p>
                  </div>
                  <div className="md:col-span-1 text-right">
                    <p className="text-[#A1A1AA] text-xs">{formatDate(card.scratched_date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ScratchCardModal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleScratchComplete}
        />
      </div>
    </UserLayout>
  );
}
