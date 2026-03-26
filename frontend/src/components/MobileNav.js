import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Trophy, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileNav = ({ userType = 'user' }) => {
  const location = useLocation();

  const userNavItems = [
    { path: '/user', icon: Home, label: 'Home', testid: 'mobile-nav-home' },
    { path: '/user/referrals', icon: Users, label: 'Referrals', testid: 'mobile-nav-referrals' },
    { path: '/user/leaderboard', icon: Trophy, label: 'Leaderboard', testid: 'mobile-nav-leaderboard' },
    { path: '/user/profile', icon: User, label: 'Profile', testid: 'mobile-nav-profile' }
  ];

  if (userType !== 'user') return null;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#000000] border-t border-[#222222] md:hidden"
      data-testid="mobile-bottom-nav"
    >
      <div className="grid grid-cols-4 h-16">
        {userNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              data-testid={item.testid}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive 
                  ? "text-[#10B981]" 
                  : "text-[#A1A1AA] hover:text-white active:scale-95"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium tracking-wide uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
