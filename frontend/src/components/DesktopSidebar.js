import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, User, Receipt, DollarSign, Store, Gift, LogOut, BookOpen, UserCog, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/LanguageContext';

export const DesktopSidebar = ({ userType = 'user' }) => {
  const location = useLocation();
  const { t } = useLanguage();

  const userNavItems = [
    { path: '/user', icon: Home, label: t('nav.home'), testid: 'sidebar-nav-home' },
    { path: '/user/passbook', icon: BookOpen, label: t('nav.passbook'), testid: 'sidebar-nav-passbook' },
    { path: '/user/referrals', icon: Users, label: t('nav.referrals'), testid: 'sidebar-nav-referrals' },
    { path: '/user/leaderboard', icon: Trophy, label: t('nav.leaderboard'), testid: 'sidebar-nav-leaderboard' },
    { path: '/user/profile', icon: User, label: t('nav.profile'), testid: 'sidebar-nav-profile' }
  ];

  const adminNavItems = [
    { path: '/admin', icon: Receipt, label: t('nav.approvals'), testid: 'sidebar-nav-approvals' },
    { path: '/admin/users', icon: Users, label: t('nav.users'), testid: 'sidebar-nav-users' },
    { path: '/admin/storekeepers', icon: UserCog, label: t('nav.storekeepers'), testid: 'sidebar-nav-storekeepers' },
    { path: '/admin/payouts', icon: DollarSign, label: t('nav.payouts'), testid: 'sidebar-nav-payouts' },
    { path: '/admin/stores', icon: Store, label: t('nav.stores'), testid: 'sidebar-nav-stores' },
    { path: '/admin/gifts', icon: Gift, label: t('nav.gifts'), testid: 'sidebar-nav-gifts' },
    { path: '/admin/settings', icon: SettingsIcon, label: t('nav.settings'), testid: 'sidebar-nav-settings' }
  ];

  const navItems = userType === 'admin' ? adminNavItems : userNavItems;

  return (
    <aside 
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-[#000000] border-r border-[#222222] flex-col z-40"
      data-testid="desktop-sidebar"
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-6 border-b border-[#222222]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#10B981] rounded-md flex items-center justify-center flex-shrink-0">
            <span className="text-black font-black text-sm">H</span>
          </div>
          <h1 className="text-lg font-black tracking-tight text-white">
            {t('brand.name')} <span className="text-[#10B981]">{t('brand.accent')}</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  data-testid={item.testid}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                    isActive 
                      ? "bg-[#10B981] bg-opacity-10 text-[#10B981] border border-[#10B981]" 
                      : "text-[#A1A1AA] hover:text-white hover:bg-[#09090B] border border-transparent"
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm font-semibold tracking-wide uppercase">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[#222222]">
        <button
          data-testid="sidebar-logout-btn"
          className="flex items-center gap-3 px-3 py-3 w-full text-[#A1A1AA] hover:text-white hover:bg-[#09090B] rounded-md transition-colors border border-transparent"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-semibold tracking-wide uppercase">{t('common.logout')}</span>
        </button>
      </div>
    </aside>
  );
};
