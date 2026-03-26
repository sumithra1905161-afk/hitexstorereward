import React, { useState } from 'react';
import { User, Phone, Wallet, TrendingUp, Pencil, Plus, X } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { mockUser } from '@/lib/mockData';
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

export default function ProfilePage() {
  const [user, setUser] = useState({
    ...mockUser,
    mills: [
      { name: 'Delhi Textile Mills', location: 'Delhi' },
      { name: 'Mumbai Fabrics Ltd', location: 'Mumbai' }
    ]
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpiOpen, setIsUpiOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  
  const [editForm, setEditForm] = useState({
    full_name: user.full_name,
    mobile_no: user.mobile_no,
    mills: user.mills
  });

  const [upiForm, setUpiForm] = useState({ upi_id: user.upi_id });
  const [withdrawForm, setWithdrawForm] = useState({ amount: '', upi_id: user.upi_id });

  const handleEditSave = () => {
    setUser({ ...user, ...editForm });
    setIsEditOpen(false);
  };

  const handleUpiSave = () => {
    setUser({ ...user, upi_id: upiForm.upi_id });
    setWithdrawForm({ ...withdrawForm, upi_id: upiForm.upi_id });
    setIsUpiOpen(false);
  };

  const handleWithdraw = () => {
    if (parseFloat(withdrawForm.amount) > user.balance) {
      alert('Insufficient balance!');
      return;
    }
    alert(`Withdrawal request of ${formatCurrency(parseFloat(withdrawForm.amount))} submitted to ${withdrawForm.upi_id}`);
    setIsWithdrawOpen(false);
    setWithdrawForm({ amount: '', upi_id: user.upi_id });
  };

  const addMill = () => {
    setEditForm({
      ...editForm,
      mills: [...editForm.mills, { name: '', location: '' }]
    });
  };

  const removeMill = (index) => {
    setEditForm({
      ...editForm,
      mills: editForm.mills.filter((_, i) => i !== index)
    });
  };

  const updateMill = (index, field, value) => {
    const newMills = [...editForm.mills];
    newMills[index][field] = value;
    setEditForm({ ...editForm, mills: newMills });
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={user.avatar_url}
            alt={user.full_name}
            data-testid="user-avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#10B981]"
          />
          <div className="flex-1">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
              {user.full_name}
            </h1>
            <p className="text-[#A1A1AA] font-mono text-base">
              {formatMobileNumber(user.mobile_no)}
            </p>
          </div>
        </section>

        {/* Profile Details */}
        <section data-testid="profile-details-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Account Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPI ID */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  UPI ID
                </p>
              </div>
              <p className="text-white font-mono text-lg">
                {user.upi_id}
              </p>
            </div>

            {/* Phone */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Mobile Number
                </p>
              </div>
              <p className="text-white font-mono text-lg">
                {formatMobileNumber(user.mobile_no)}
              </p>
            </div>

            {/* Balance */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Wallet className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Available Balance
                </p>
              </div>
              <p className="text-[#10B981] font-mono text-2xl font-black">
                {formatCurrency(user.balance)}
              </p>
            </div>

            {/* Monthly Volume */}
            <div className="bg-transparent border border-[#222222] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Monthly Volume
                </p>
              </div>
              <p className="text-white font-mono text-2xl font-black">
                {formatCurrency(user.monthly_volume)}
              </p>
            </div>
          </div>
        </section>

        {/* Mills Section */}
        <section className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            My Mills
          </p>
          <div className="space-y-3">
            {user.mills?.map((mill, index) => (
              <div key={index} className="bg-transparent border border-[#222222] rounded-lg p-4">
                <h3 className="text-white font-bold text-base">{mill.name}</h3>
                <p className="text-[#A1A1AA] text-sm">{mill.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            onClick={() => {
              setEditForm({
                full_name: user.full_name,
                mobile_no: user.mobile_no,
                mills: user.mills
              });
              setIsEditOpen(true);
            }}
            data-testid="edit-profile-btn"
            className="flex-1 bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-4"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button
            onClick={() => {
              setUpiForm({ upi_id: user.upi_id });
              setIsUpiOpen(true);
            }}
            data-testid="update-upi-btn"
            className="flex-1 bg-transparent border border-[#222222] text-white hover:border-[#10B981] hover:text-[#10B981] font-bold uppercase tracking-wide py-4"
          >
            Update UPI
          </Button>
          <Button
            onClick={() => {
              setWithdrawForm({ amount: '', upi_id: user.upi_id });
              setIsWithdrawOpen(true);
            }}
            data-testid="withdraw-btn"
            className="flex-1 bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black font-bold uppercase tracking-wide py-4"
          >
            Withdraw
          </Button>
        </section>

        {/* Edit Profile Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Edit Profile</DialogTitle>
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
                  data-testid="edit-name-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Mobile Number
                </Label>
                <Input
                  type="tel"
                  value={editForm.mobile_no}
                  onChange={(e) => setEditForm({ ...editForm, mobile_no: e.target.value })}
                  data-testid="edit-mobile-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Mill Details
                </Label>
                {editForm.mills?.map((mill, index) => (
                  <div key={index} className="bg-[#000000] border border-[#222222] rounded-lg p-4 space-y-3">
                    <Input
                      type="text"
                      placeholder="Mill Name"
                      value={mill.name}
                      onChange={(e) => updateMill(index, 'name', e.target.value)}
                      data-testid={`edit-mill-name-${index}`}
                      className="bg-[#09090B] border border-[#222222] text-white"
                    />
                    <Input
                      type="text"
                      placeholder="Mill Location"
                      value={mill.location}
                      onChange={(e) => updateMill(index, 'location', e.target.value)}
                      data-testid={`edit-mill-location-${index}`}
                      className="bg-[#09090B] border border-[#222222] text-white"
                    />
                    {editForm.mills.length > 1 && (
                      <Button
                        onClick={() => removeMill(index)}
                        data-testid={`remove-mill-edit-${index}`}
                        className="w-full bg-[#EF4444] text-white hover:bg-[#DC2626]"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Remove Mill
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  onClick={addMill}
                  data-testid="add-mill-edit-btn"
                  className="w-full bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Mill
                </Button>
              </div>

              <Button
                onClick={handleEditSave}
                data-testid="save-profile-btn"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Update UPI Modal */}
        <Dialog open={isUpiOpen} onOpenChange={setIsUpiOpen}>
          <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Update UPI ID</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  UPI ID
                </Label>
                <Input
                  type="text"
                  placeholder="yourname@paytm"
                  value={upiForm.upi_id}
                  onChange={(e) => setUpiForm({ upi_id: e.target.value })}
                  data-testid="upi-input"
                  className="bg-[#09090B] border border-[#222222] text-white font-mono"
                />
              </div>
              <Button
                onClick={handleUpiSave}
                data-testid="save-upi-btn"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
              >
                Update UPI
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Withdraw Modal */}
        <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
          <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Withdraw to UPI</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="bg-[#10B981] bg-opacity-10 border border-[#10B981] rounded-lg p-4">
                <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-2">
                  Available Balance
                </p>
                <p className="text-[#10B981] font-mono text-3xl font-black">
                  {formatCurrency(user.balance)}
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Withdrawal Amount
                </Label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawForm.amount}
                  onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                  data-testid="withdraw-amount-input"
                  className="bg-[#09090B] border border-[#222222] text-white text-2xl font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  UPI ID
                </Label>
                <Input
                  type="text"
                  value={withdrawForm.upi_id}
                  readOnly
                  data-testid="withdraw-upi-display"
                  className="bg-[#09090B] border border-[#222222] text-white font-mono"
                />
              </div>
              <Button
                onClick={handleWithdraw}
                data-testid="confirm-withdraw-btn"
                className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6 text-base"
              >
                Confirm Withdrawal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </UserLayout>
  );
}
