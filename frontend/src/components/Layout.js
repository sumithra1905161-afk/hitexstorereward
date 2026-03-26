import React from 'react';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';
import { AppHeader } from './AppHeader';

export const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <DesktopSidebar userType="user" />
      <AppHeader />
      <main className="md:ml-64 pb-20 md:pb-0 min-h-screen">
        {children}
      </main>
      <MobileNav userType="user" />
    </div>
  );
};

export const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <DesktopSidebar userType="admin" />
      <AppHeader />
      <main className="md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export const StorekeeperLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <AppHeader variant="auth" />
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};
