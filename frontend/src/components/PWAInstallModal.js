import React from 'react';
import { Download, X, Smartphone, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const PWAInstallModal = ({ isOpen, onClose, onInstall }) => {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#09090B] border-2 border-[#10B981] text-white max-w-md shadow-[0_0_50px_rgba(16,185,129,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
            <Download className="w-6 h-6 text-[#10B981]" />
            {t('pwaInstall.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-[#10B981] rounded-2xl flex items-center justify-center">
              <span className="text-black font-black text-4xl">H</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-white">{t('pwaInstall.appName')}</h3>
            <p className="text-[#A1A1AA] text-sm leading-relaxed">
              {t('pwaInstall.description')}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 bg-[#000000] border border-[#222222] rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#A1A1AA]">{t('pwaInstall.benefit1')}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#A1A1AA]">{t('pwaInstall.benefit2')}</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
              <p className="text-sm text-[#A1A1AA]">{t('pwaInstall.benefit3')}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onInstall}
              className="bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide px-6 py-4 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              {t('pwaInstall.installButton')}
            </button>
            <button
              onClick={onClose}
              className="bg-transparent border border-[#222222] text-[#A1A1AA] hover:border-[#10B981] hover:text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              {t('pwaInstall.cancelButton')}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
