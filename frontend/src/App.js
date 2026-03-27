import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import '@/App.css';

// Pages
import LandingPage from '@/pages/LandingPage';

// Auth Pages
import UserAuthPage from '@/pages/auth/UserAuthPage';
import StorekeeperAuthPage from '@/pages/auth/StorekeeperAuthPage';
import AdminAuthPage from '@/pages/auth/AdminAuthPage';

// User Portal Pages
import HomePage from '@/pages/user/HomePage';
import ScratchCardsPage from '@/pages/user/ScratchCardsPage';
import PassbookPage from '@/pages/user/PassbookPage';
import ReferralsPage from '@/pages/user/ReferralsPage';
import LeaderboardPage from '@/pages/user/LeaderboardPage';
import ProfilePage from '@/pages/user/ProfilePage';
import WithdrawalHistoryPage from '@/pages/user/WithdrawalHistoryPage';
import AchievementsPage from '@/pages/user/AchievementsPage';

// Storekeeper Portal Pages
import StorekeeperPage from '@/pages/storekeeper/StorekeeperPage';

// Admin Portal Pages
import AdminApprovalsPage from '@/pages/admin/AdminApprovalsPage';
import AdminUsersPage from '@/pages/admin/AdminUsersPage';
import AdminStorekeepersPage from '@/pages/admin/AdminStorekeepersPage';
import AdminPayoutsPage from '@/pages/admin/AdminPayoutsPage';
import AdminStoresPage from '@/pages/admin/AdminStoresPage';
import AdminGiftsPage from '@/pages/admin/AdminGiftsPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#09090B',
              color: '#FFFFFF',
              border: '1px solid #10B981',
            },
          }}
        />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<UserAuthPage />} />
          <Route path="/storekeeper-login" element={<StorekeeperAuthPage />} />
          <Route path="/admin-login" element={<AdminAuthPage />} />
          
          {/* User Portal Routes */}
          <Route path="/user" element={<HomePage />} />
          <Route path="/user/scratch-cards" element={<ScratchCardsPage />} />
          <Route path="/user/passbook" element={<PassbookPage />} />
          <Route path="/user/referrals" element={<ReferralsPage />} />
          <Route path="/user/leaderboard" element={<LeaderboardPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/withdrawal-history" element={<WithdrawalHistoryPage />} />
          <Route path="/user/achievements" element={<AchievementsPage />} />

          {/* Storekeeper Portal Routes */}
          <Route path="/storekeeper" element={<StorekeeperPage />} />

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminApprovalsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/storekeepers" element={<AdminStorekeepersPage />} />
          <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
          <Route path="/admin/stores" element={<AdminStoresPage />} />
          <Route path="/admin/gifts" element={<AdminGiftsPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />

          {/* Catch all - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
