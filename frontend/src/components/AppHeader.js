import React, { useState, useEffect } from 'react';
import { Download, Languages } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { PWAInstallModal } from '@/components/PWAInstallModal';

export const AppHeader = ({ variant = 'default' }) => {
  const { lang, toggleLang, t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowInstallModal(false);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    setShowInstallModal(true);
  };

  const handleInstall = async () => {
    if (!deferredPrompt) {
      setShowInstallModal(false);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowInstallModal(false);
  };

  const isAuth = variant === 'auth';

  return (
    <>
      <header
        data-testid="app-header"
        className={`sticky top-0 z-50 w-full border-b border-[#222222] backdrop-blur-md bg-[#000000]/90 ${
          isAuth ? '' : 'md:pl-64'
        }`}
      >
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 max-w-screen-2xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2" data-testid="header-logo">
            <div className="w-8 h-8 bg-[#10B981] rounded-md flex items-center justify-center flex-shrink-0">
              <span className="text-black font-black text-sm">H</span>
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
              {t('brand.name')} <span className="text-[#10B981]">{t('brand.accent')}</span>
            </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* PWA Install */}
            {!isInstalled && deferredPrompt && (
              <button
                onClick={handleInstallClick}
                data-testid="pwa-install-btn"
                className="flex items-center gap-1.5 bg-[#10B981] text-black font-bold text-xs uppercase tracking-wide px-3 py-2 rounded-md hover:bg-[#059669] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('common.install')}</span>
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              data-testid="language-toggle-btn"
              className="flex items-center gap-1.5 bg-transparent border border-[#333333] text-white hover:border-[#10B981] hover:text-[#10B981] font-semibold text-xs uppercase tracking-wide px-3 py-2 rounded-md transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('common.language')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* PWA Install Modal */}
      <PWAInstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstall={handleInstall}
      />
    </>
  );
};
