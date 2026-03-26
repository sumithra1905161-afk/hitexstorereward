import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, User, Receipt, DollarSign, Store, Gift, LogOut, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DesktopSidebar = ({ userType = 'user' }) => {
  const location = useLocation();

  const userNavItems = [
    { path: '/user', icon: Home, label: 'Home', testid: 'sidebar-nav-home' },
    { path: '/user/passbook', icon: BookOpen, label: 'Passbook', testid: 'sidebar-nav-passbook' },
    { path: '/user/referrals', icon: Users, label: 'Referrals', testid: 'sidebar-nav-referrals' },
    { path: '/user/leaderboard', icon: Trophy, label: 'Leaderboard', testid: 'sidebar-nav-leaderboard' },
    { path: '/user/profile', icon: User, label: 'Profile', testid: 'sidebar-nav-profile' }
  ];

  const adminNavItems = [
    { path: '/admin', icon: Receipt, label: 'Approvals', testid: 'sidebar-nav-approvals' },
    { path: '/admin/payouts', icon: DollarSign, label: 'Payouts', testid: 'sidebar-nav-payouts' },
    { path: '/admin/stores', icon: Store, label: 'Stores', testid: 'sidebar-nav-stores' },
    { path: '/admin/gifts', icon: Gift, label: 'Gifts', testid: 'sidebar-nav-gifts' }
  ];

  const navItems = userType === 'admin' ? adminNavItems : userNavItems;

  return (
    <aside 
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-[#000000] border-r border-[#222222] flex-col z-40"
      data-testid="desktop-sidebar"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#222222]">
        <h1 className="text-xl font-black tracking-tight text-white">
          Hitex <span className="text-[#10B981]">Spares</span>
        </h1>
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
          <span className="text-sm font-semibold tracking-wide uppercase">Logout</span>
        </button>
      </div>
    </aside>
  );
};
