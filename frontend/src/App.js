import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';

// User Portal Pages
import HomePage from '@/pages/user/HomePage';
import ScratchCardsPage from '@/pages/user/ScratchCardsPage';
import PassbookPage from '@/pages/user/PassbookPage';
import ReferralsPage from '@/pages/user/ReferralsPage';
import LeaderboardPage from '@/pages/user/LeaderboardPage';
import ProfilePage from '@/pages/user/ProfilePage';

// Storekeeper Portal Pages
import StorekeeperPage from '@/pages/storekeeper/StorekeeperPage';

// Admin Portal Pages
import AdminApprovalsPage from '@/pages/admin/AdminApprovalsPage';
import AdminPayoutsPage from '@/pages/admin/AdminPayoutsPage';
import AdminStoresPage from '@/pages/admin/AdminStoresPage';
import AdminGiftsPage from '@/pages/admin/AdminGiftsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/user" replace />} />
          
          {/* User Portal Routes */}
          <Route path="/user" element={<HomePage />} />
          <Route path="/user/scratch-cards" element={<ScratchCardsPage />} />
          <Route path="/user/passbook" element={<PassbookPage />} />
          <Route path="/user/referrals" element={<ReferralsPage />} />
          <Route path="/user/leaderboard" element={<LeaderboardPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />

          {/* Storekeeper Portal Routes */}
          <Route path="/storekeeper" element={<StorekeeperPage />} />

          {/* Admin Portal Routes */}
          <Route path="/admin" element={<AdminApprovalsPage />} />
          <Route path="/admin/payouts" element={<AdminPayoutsPage />} />
          <Route path="/admin/stores" element={<AdminStoresPage />} />
          <Route path="/admin/gifts" element={<AdminGiftsPage />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/user" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
