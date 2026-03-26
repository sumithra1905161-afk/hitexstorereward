import React, { useState } from 'react';
import { UserPlus, Search, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { mockStores } from '@/lib/mockData';
import { formatMobileNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function AdminStorekeepersPage() {
  const [storekeepers, setStorekeepers] = useState([
    {
      id: 'sk-1',
      full_name: 'Ramesh Kumar',
      mobile_no: '+919876543230',
      email: 'ramesh@hitexspares.com',
      store_id: 'store-1',
      store_name: 'MG Road Store',
      active: true
    },
    {
      id: 'sk-2',
      full_name: 'Lakshmi Devi',
      mobile_no: '+919876543231',
      email: 'lakshmi@hitexspares.com',
      store_id: 'store-2',
      store_name: 'Brigade Road Store',
      active: true
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    mobile_no: '',
    email: '',
    store_id: '',
    password: ''
  });

  const filteredStorekeepers = storekeepers.filter(sk =>
    sk.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sk.mobile_no.includes(searchQuery) ||
    sk.store_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedStore = mockStores.find(s => s.id === formData.store_id);
    const newStorekeeper = {
      id: `sk-${Date.now()}`,
      ...formData,
      store_name: selectedStore?.name || '',
      active: true
    };
    setStorekeepers([...storekeepers, newStorekeeper]);
    setFormData({ full_name: '', mobile_no: '', email: '', store_id: '', password: '' });
    setIsDialogOpen(false);
  };

  const handleToggleActive = (skId) => {
    setStorekeepers(prev =>
      prev.map(sk =>
        sk.id === skId ? { ...sk, active: !sk.active } : sk
      )
    );
  };

  const handleDelete = (skId) => {
    if (window.confirm('Are you sure you want to delete this storekeeper?')) {
      setStorekeepers(prev => prev.filter(sk => sk.id !== skId));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
              Storekeeper Management
            </h1>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Add and manage storekeepers for partner locations.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                data-testid="add-storekeeper-btn"
                className="bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Storekeeper
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">Add New Storekeeper</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    data-testid="storekeeper-name-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Mobile Number
                  </Label>
                  <Input
                    type="tel"
                    value={formData.mobile_no}
                    onChange={(e) => setFormData({ ...formData, mobile_no: e.target.value })}
                    data-testid="storekeeper-mobile-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Email
                  </Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    data-testid="storekeeper-email-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Assign Store
                  </Label>
                  <Select value={formData.store_id} onValueChange={(value) => setFormData({ ...formData, store_id: value })} required>
                    <SelectTrigger data-testid="storekeeper-store-select" className="bg-[#09090B] border border-[#222222] text-white">
                      <SelectValue placeholder="Select store" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#09090B] border border-[#222222] text-white">
                      {mockStores.map((store) => (
                        <SelectItem key={store.id} value={store.id} className="hover:bg-[#10B981] hover:text-black cursor-pointer">
                          {store.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Password
                  </Label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    data-testid="storekeeper-password-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  data-testid="submit-storekeeper-btn"
                  className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
                >
                  Add Storekeeper
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>
        <section className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
            <Input
              type="text"
              placeholder="Search by name, mobile, or store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="storekeeper-search-input"
              className="bg-[#09090B] border border-[#222222] text-white pl-12 py-6"
            />
          </div>
        </section>
        <section data-testid="storekeepers-list-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            All Storekeepers ({filteredStorekeepers.length})
          </p>
          <div className="space-y-3">
            {filteredStorekeepers.map((sk) => (
              <div
                key={sk.id}
                data-testid={`storekeeper-item-${sk.id}`}
                className={`rounded-lg p-6 border transition-colors ${!sk.active ? 'border-[#EF4444] bg-[#EF4444] bg-opacity-5' : 'border-[#222222] hover:border-[#10B981]'}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h3 className="text-white font-semibold text-base mb-1">{sk.full_name}</h3>
                    <p className="text-[#A1A1AA] text-sm font-mono">{formatMobileNumber(sk.mobile_no)}</p>
                    <p className="text-[#71717A] text-xs mt-1">{sk.email}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-1">Assigned Store</p>
                    <p className="text-white font-semibold">{sk.store_name}</p>
                  </div>
                  <div className="md:col-span-1 flex gap-2 justify-end">
                    <Button
                      onClick={() => handleToggleActive(sk.id)}
                      data-testid={`toggle-storekeeper-${sk.id}`}
                      className={sk.active ? 'bg-[#EF4444] text-white hover:bg-[#DC2626]' : 'bg-[#10B981] text-black hover:bg-[#059669]'}
                    >
                      {sk.active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      onClick={() => handleDelete(sk.id)}
                      data-testid={`delete-storekeeper-${sk.id}`}
                      className="bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
