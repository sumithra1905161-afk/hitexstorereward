import React from 'react';
import { MobileNav } from './MobileNav';
import { DesktopSidebar } from './DesktopSidebar';

export const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <DesktopSidebar userType="user" />
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
      <main className="md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export const StorekeeperLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <header className="border-b border-[#222222] h-16 flex items-center px-6">
        <h1 className="text-xl font-black tracking-tight text-white">
          Storekeeper <span className="text-[#10B981]">Portal</span> - Hitex Spares
        </h1>
      </header>
      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};
