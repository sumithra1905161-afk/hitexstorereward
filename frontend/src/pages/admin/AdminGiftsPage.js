import React, { useState } from 'react';
import { Upload, X, Pencil } from 'lucide-react';
import { AdminLayout } from '@/components/Layout';
import { mockPrizes } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function AdminGiftsPage() {
  const [prizes, setPrizes] = useState(mockPrizes);
  const [editingPrize, setEditingPrize] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const handleImageUpload = (rank, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPrizes(prev =>
          prev.map(prize =>
            prize.rank === rank
              ? { ...prize, image_url: e.target?.result }
              : prize
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (prize) => {
    setEditingPrize(prize);
    setEditForm({ title: prize.title, description: prize.description });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setPrizes(prev =>
      prev.map(prize =>
        prize.id === editingPrize.id
          ? { ...prize, ...editForm }
          : prize
      )
    );
    setIsEditDialogOpen(false);
    setEditingPrize(null);
  };

  const handleDelete = (prizeId) => {
    if (window.confirm('Are you sure you want to delete this prize?')) {
      setPrizes(prev => prev.filter(p => p.id !== prizeId));
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-12 fade-in">
        {/* Header */}
        <section>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-3">
            Prize Management
          </h1>
          <p className="text-base text-[#A1A1AA] leading-relaxed">
            Upload and manage monthly prize images for Top 3 winners.
          </p>
        </section>

        {/* Prizes Grid */}
        <section data-testid="prizes-management-section" className="space-y-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
            Monthly Prizes
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {prizes.map((prize) => (
              <div
                key={prize.id}
                data-testid={`prize-manager-${prize.rank}`}
                className="bg-transparent border border-[#222222] rounded-lg overflow-hidden hover:border-[#10B981] transition-colors"
              >
                <div className="aspect-square overflow-hidden bg-[#09090B] relative group">
                  <img
                    src={prize.image_url}
                    alt={prize.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label
                      htmlFor={`upload-${prize.rank}`}
                      className="cursor-pointer bg-[#10B981] text-black hover:bg-[#059669] transition-colors rounded-md px-6 py-3 font-bold uppercase text-sm tracking-wide flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload New
                    </label>
                    <input
                      id={`upload-${prize.rank}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(prize.rank, e)}
                      data-testid={`upload-prize-${prize.rank}`}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#10B981] font-bold text-sm uppercase tracking-wide">
                      {prize.description}
                    </span>
                    <span className="text-[#A1A1AA] font-mono font-bold text-2xl">
                      #{prize.rank}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-4">
                    {prize.title}
                  </h3>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(prize)}
                      data-testid={`edit-prize-${prize.rank}`}
                      className="flex-1 bg-transparent border border-[#222222] text-white hover:border-[#10B981] hover:text-[#10B981]"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(prize.id)}
                      data-testid={`delete-prize-${prize.rank}`}
                      className="bg-[#EF4444] text-white hover:bg-[#DC2626]"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-transparent border border-[#222222] rounded-lg p-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold mb-3">
            Instructions
          </p>
          <ul className="space-y-2 text-[#A1A1AA] text-sm leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] mt-1">•</span>
              <span>Upload high-quality images (minimum 800x800px recommended)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] mt-1">•</span>
              <span>Supported formats: JPG, PNG, WebP</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#10B981] mt-1">•</span>
              <span>Images will be displayed on the leaderboard page for all users</span>
            </li>
          </ul>
        </section>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-[#09090B] border border-[#222222] text-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">Edit Prize Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Prize Title
                </Label>
                <Input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  data-testid="edit-prize-title-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                  Description
                </Label>
                <Input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  data-testid="edit-prize-description-input"
                  className="bg-[#09090B] border border-[#222222] text-white"
                />
              </div>
              <Button
                onClick={handleSaveEdit}
                data-testid="save-prize-edit-btn"
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
