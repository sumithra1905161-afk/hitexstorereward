import React, { useRef, useState, useEffect } from 'react';
import { X, Trophy, Sparkles } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export const ScratchCardModal = ({ card, isOpen, onClose, onComplete }) => {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.fillStyle = '#10B981';
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.fillStyle = '#059669';
    for (let i = 0; i < rect.width; i += 20) {
      for (let j = 0; j < rect.height; j += 20) {
        if ((i + j) % 40 === 0) {
          ctx.fillRect(i, j, 10, 10);
        }
      }
    }

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('SCRATCH HERE', rect.width / 2, rect.height / 2 - 20);
    ctx.font = 'bold 16px monospace';
    ctx.fillText('TO REVEAL', rect.width / 2, rect.height / 2 + 10);

    setScratchPercentage(0);
    setRevealed(false);
  }, [isOpen]);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(
      (x - rect.left) * scaleX,
      (y - rect.top) * scaleY,
      30 * scaleX,
      0,
      Math.PI * 2
    );
    ctx.fill();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] < 128) {
        transparent++;
      }
    }

    const percentage = (transparent / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 60 && !revealed) {
      setRevealed(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e) => {
    setIsScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (isScratching) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  const isJackpot = card?.reward_type === 'jackpot';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-[#000000] border-2 border-[#10B981] max-w-md p-0 overflow-hidden"
        data-testid="scratch-card-modal"
      >
        <button
          onClick={onClose}
          data-testid="close-scratch-modal"
          className="absolute top-4 right-4 z-50 text-white hover:text-[#10B981] transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-tighter text-white mb-2">
              Scratch & Win!
            </h2>
            <p className="text-[#A1A1AA] text-sm">
              Scratch to reveal your bonus reward
            </p>
          </div>

          <div className="relative aspect-[3/2] rounded-lg overflow-hidden border-2 border-[#222222]">
            <div className={`absolute inset-0 flex flex-col items-center justify-center ${
              isJackpot ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]' : 'bg-[#09090B]'
            }`}>
              {isJackpot && (
                <Trophy className="w-20 h-20 text-white mb-4 animate-pulse" />
              )}
              {!isJackpot && (
                <Sparkles className="w-20 h-20 text-[#10B981] mb-4" />
              )}
              <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-2">
                {isJackpot ? 'JACKPOT!' : 'You Won'}
              </p>
              <p className={`text-5xl font-mono font-black ${
                isJackpot ? 'text-white' : 'text-[#10B981]'
              }`}>
                {formatCurrency(card?.reward_amount || 0)}
              </p>
              <p className="text-[#A1A1AA] text-sm mt-4">
                Bonus Points Added!
              </p>
            </div>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: 'none' }}
            />
          </div>

          {scratchPercentage > 0 && scratchPercentage < 60 && (
            <div className="text-center">
              <p className="text-[#10B981] text-sm font-mono">
                {Math.round(scratchPercentage)}% revealed
              </p>
            </div>
          )}

          <div className="bg-[#09090B] border border-[#222222] rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#A1A1AA]">Purchase Amount:</span>
              <span className="text-white font-mono font-semibold">
                {formatCurrency(card?.purchase_amount || 0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A1A1AA]">Bill Number:</span>
              <span className="text-white font-mono text-xs">
                {card?.bill_no}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
