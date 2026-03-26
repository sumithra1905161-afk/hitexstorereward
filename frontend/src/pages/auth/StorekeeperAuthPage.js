import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function StorekeeperAuthPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ mobile: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/storekeeper');
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981] rounded-full mb-4">
            <Store className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
            Storekeeper Portal
          </h1>
          <p className="text-[#A1A1AA]">Hitex Spares</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-[#09090B] border border-[#222222] rounded-lg p-8">
          <div className="space-y-2">
            <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
              Mobile Number
            </Label>
            <Input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              data-testid="storekeeper-mobile-input"
              className="bg-[#000000] border border-[#222222] text-white py-6"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              data-testid="storekeeper-password-input"
              className="bg-[#000000] border border-[#222222] text-white py-6"
              required
            />
          </div>

          <Button
            type="submit"
            data-testid="storekeeper-login-btn"
            className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
