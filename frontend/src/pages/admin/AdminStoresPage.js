import React, { useState } from 'react';
import { Plus, MapPin, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { mockStores } from '@/lib/mockData';
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

export default function AdminStoresPage() {
  const [stores, setStores] = useState(mockStores);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    maps_url: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStore = {
      id: `store-${Date.now()}`,
      ...formData,
      lat: 12.9716,
      lng: 77.5946
    };
    setStores([...stores, newStore]);
    setFormData({ name: '', address: '', maps_url: '' });
    setIsDialogOpen(false);
  };

  const handleDelete = (storeId) => {
    setStores(stores.filter(s => s.id !== storeId));
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
              Store Management
            </h1>
            <p className="text-base text-[#A1A1AA] leading-relaxed">
              Manage partner store locations and Google Maps links.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                data-testid="add-store-btn"
                className="bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Store
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#09090B] border border-[#222222] text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">Add New Store</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Store Name
                  </Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    data-testid="store-name-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Address
                  </Label>
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    data-testid="store-address-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    Google Maps URL
                  </Label>
                  <Input
                    type="url"
                    value={formData.maps_url}
                    onChange={(e) => setFormData({ ...formData, maps_url: e.target.value })}
                    data-testid="store-maps-url-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  data-testid="submit-store-btn"
                  className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide"
                >
                  Add Store
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </section>

        {/* Stores List */}
        <section data-testid="stores-list-section" className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            All Stores ({stores.length})
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stores.map((store) => (
              <div
                key={store.id}
                data-testid={`store-card-${store.id}`}
                className="bg-transparent border border-[#222222] rounded-lg p-6 space-y-4 hover:border-[#10B981] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-xl mb-2">{store.name}</h3>
                    <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
                      {store.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-[#222222]">
                  <a
                    href={store.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`navigate-btn-${store.id}`}
                    className="flex-1 bg-[#10B981] text-black hover:bg-[#059669] transition-colors rounded-md px-4 py-3 font-bold uppercase text-sm tracking-wide flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Navigate
                  </a>
                  <Button
                    onClick={() => handleDelete(store.id)}
                    data-testid={`delete-store-btn-${store.id}`}
                    className="bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
