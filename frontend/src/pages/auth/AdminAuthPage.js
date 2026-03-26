import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppHeader } from '@/components/AppHeader';
import { useLanguage } from '@/lib/LanguageContext';

export default function AdminAuthPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <AppHeader variant="auth" />
      <div className="flex items-center justify-center p-6 pt-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#10B981] rounded-full mb-4">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
              {t('auth.admin.title')}
            </h1>
            <p className="text-[#A1A1AA]">Hitex Spares</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-[#09090B] border border-[#222222] rounded-lg p-8">
            <div className="space-y-2">
              <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                {t('auth.admin.email')}
              </Label>
              <Input
                type="email"
                placeholder={t('auth.admin.emailPlaceholder')}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                data-testid="admin-email-input"
                className="bg-[#000000] border border-[#222222] text-white py-6"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                {t('auth.admin.password')}
              </Label>
              <Input
                type="password"
                placeholder={t('auth.admin.passwordPlaceholder')}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                data-testid="admin-password-input"
                className="bg-[#000000] border border-[#222222] text-white py-6"
                required
              />
            </div>

            <Button
              type="submit"
              data-testid="admin-login-btn"
              className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6"
            >
              {t('auth.admin.loginBtn')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
