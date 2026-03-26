import React, { useState } from 'react';
import { Users, Search, Pencil, Ban, Check } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { mockUser, mockLeaderboard } from '@/lib/mockData';
import { formatCurrency, formatMobileNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminUsersPage() {
  const allUsers = [mockUser, ...mockLeaderboard];
  const [users, setUsers] = useState(allUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    mobile_no: '',
    upi_id: '',
    balance: 0
  });

  const filteredUsers = users.filter(user =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.mobile_no.includes(searchQuery)
  );

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      full_name: user.full_name,
      mobile_no: user.mobile_no,
      upi_id: user.upi_id || '',
      balance: user.balance || 0
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setUsers(prev =>
      prev.map(user =>
        user.id === editingUser.id
          ? { ...user, ...editForm }
          : user
      )
    );
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleBlock = (userId) => {
    if (window.confirm('Are you sure you want to block this user?')) {
      setUsers(prev =>
        prev.map(user =>
          user.id === userId
            ? { ...user, blocked: !user.blocked }
            : user
        )
      );
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
              User Management
            </h1>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              View and manage all registered users in the system.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
            <Input
              type="text"
              placeholder="Search by name or mobile number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="user-search-input"
              className="bg-[#09090B] border border-[#222222] text-white pl-12 py-6"
            />
          </div>
        </section>

        {/* Users List */}
        <section data-testid="users-list-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            All Users ({filteredUsers.length})
          </p>

          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                data-testid={`user-item-${user.id}`}
                className={`rounded-lg p-6 border transition-colors ${
                  user.blocked
                    ? 'border-[#EF4444] bg-[#EF4444] bg-opacity-5'
                    : 'border-[#222222] hover:border-[#10B981]'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  {/* User Info */}
                  <div className="md:col-span-2 flex items-center gap-4">
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-12 h-12 rounded-full object-cover border border-[#222222]"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1">
                        {user.full_name}
                      </h3>
                      <p className="text-[#A1A1AA] text-sm font-mono">
                        {formatMobileNumber(user.mobile_no)}
                      </p>
                    </div>
                  </div>

                  {/* UPI */}
                  <div className="md:col-span-1">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      UPI ID
                    </p>
                    <p className="text-white font-mono text-sm">
                      {user.upi_id || 'Not set'}
                    </p>
                  </div>

                  {/* Balance */}
                  <div className="md:col-span-1">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      Balance
                    </p>
                    <p className="text-[#10B981] font-mono font-bold">
                      {formatCurrency(user.balance || 0)}
                    </p>
                  </div>

                  {/* Volume */}
                  <div className="md:col-span-1">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">
                      Volume
                    </p>
                    <p className="text-white font-mono text-sm">
                      {formatCurrency(user.monthly_volume || 0)}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-1 flex gap-2 justify-end">
                    <Button
                      onClick={() => handleEdit(user)}
                      data-testid={`edit-user-${user.id}`}
                      className="bg-transparent border border-[#222222] text-white hover:border-[#10B981] hover:text-[#10B981]"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleBlock(user.id)}
                      data-testid={`block-user-${user.id}`}
                      className={user.blocked ? 'bg-[#10B981] text-black hover:bg-[#059669]' : 'bg-[#EF4444] text-white hover:bg-[#DC2626]'}
                    >
                      {user.blocked ? <Check className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Edit User Information</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Full Name
                </Label>
                <Input
                  type="text"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  data-testid="edit-user-name-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Mobile Number
                </Label>
                <Input
                  type="text"
                  value={editForm.mobile_no}
                  onChange={(e) => setEditForm({ ...editForm, mobile_no: e.target.value })}
                  data-testid="edit-user-mobile-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  UPI ID
                </Label>
                <Input
                  type="text"
                  value={editForm.upi_id}
                  onChange={(e) => setEditForm({ ...editForm, upi_id: e.target.value })}
                  data-testid="edit-user-upi-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Balance
                </Label>
                <Input
                  type="number"
                  value={editForm.balance}
                  onChange={(e) => setEditForm({ ...editForm, balance: parseFloat(e.target.value) })}
                  data-testid="edit-user-balance-input"
                  className="bg-[#09090B] border border-[#222222] text-white font-mono"
                />
              </div>
              <Button
                onClick={handleSaveEdit}
                data-testid="save-user-edit-btn"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
