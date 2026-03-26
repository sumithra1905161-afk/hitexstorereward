import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppHeader } from '@/components/AppHeader';
import { useLanguage } from '@/lib/LanguageContext';

export default function UserAuthPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [loginForm, setLoginForm] = useState({ mobile: '', otp: '' });
  const [signupForm, setSignupForm] = useState({
    full_name: '',
    mobile_no: '',
    photo: null,
    mills: [{ name: '', location: '' }]
  });
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      alert('OTP sent to ' + loginForm.mobile);
    } else {
      navigate('/user');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!signupForm.photo) {
      alert(t('auth.user.profilePhoto') + ' ' + t('auth.user.photoMandatory'));
      return;
    }
    navigate('/user');
  };

  const addMill = () => {
    setSignupForm({
      ...signupForm,
      mills: [...signupForm.mills, { name: '', location: '' }]
    });
  };

  const removeMill = (index) => {
    setSignupForm({
      ...signupForm,
      mills: signupForm.mills.filter((_, i) => i !== index)
    });
  };

  const updateMill = (index, field, value) => {
    const newMills = [...signupForm.mills];
    newMills[index][field] = value;
    setSignupForm({ ...signupForm, mills: newMills });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSignupForm({ ...signupForm, photo: file });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000]">
      <AppHeader variant="auth" />
      <div className="flex items-center justify-center p-6 pt-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
              Hitex <span className="text-[#10B981]">Spares</span>
            </h1>
            <p className="text-[#A1A1AA]">{t('brand.tagline')}</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full bg-[#09090B] border border-[#222222]">
              <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-[#10B981] data-[state=active]:text-black">
                <LogIn className="w-4 h-4 mr-2" />
                {t('auth.user.login')}
              </TabsTrigger>
              <TabsTrigger value="signup" className="flex-1 data-[state=active]:bg-[#10B981] data-[state=active]:text-black">
                <UserPlus className="w-4 h-4 mr-2" />
                {t('auth.user.signup')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    {t('auth.user.mobileNumber')}
                  </Label>
                  <Input
                    type="tel"
                    placeholder={t('auth.user.mobilePlaceholder')}
                    value={loginForm.mobile}
                    onChange={(e) => setLoginForm({ ...loginForm, mobile: e.target.value })}
                    data-testid="login-mobile-input"
                    className="bg-[#09090B] border border-[#222222] text-white py-6"
                    required
                  />
                </div>

                {otpSent && (
                  <div className="space-y-2">
                    <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                      {t('auth.user.enterOtp')}
                    </Label>
                    <Input
                      type="text"
                      placeholder={t('auth.user.otpPlaceholder')}
                      value={loginForm.otp}
                      onChange={(e) => setLoginForm({ ...loginForm, otp: e.target.value })}
                      data-testid="login-otp-input"
                      className="bg-[#09090B] border border-[#222222] text-white py-6 font-mono text-2xl tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                )}

                <Button
                  type="submit"
                  data-testid="login-submit-btn"
                  className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6"
                >
                  {otpSent ? t('auth.user.verifyLogin') : t('auth.user.sendOtp')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    {t('auth.user.fullName')} *
                  </Label>
                  <Input
                    type="text"
                    placeholder={t('auth.user.fullNamePlaceholder')}
                    value={signupForm.full_name}
                    onChange={(e) => setSignupForm({ ...signupForm, full_name: e.target.value })}
                    data-testid="signup-name-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    {t('auth.user.mobileNumber')} *
                  </Label>
                  <Input
                    type="tel"
                    placeholder={t('auth.user.mobilePlaceholder')}
                    value={signupForm.mobile_no}
                    onChange={(e) => setSignupForm({ ...signupForm, mobile_no: e.target.value })}
                    data-testid="signup-mobile-input"
                    className="bg-[#09090B] border border-[#222222] text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    {t('auth.user.profilePhoto')} * {t('auth.user.photoMandatory')}
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    data-testid="signup-photo-input"
                    className="bg-[#09090B] border border-[#222222] text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#10B981] file:text-black file:font-bold"
                    required
                  />
                  {signupForm.photo && (
                    <p className="text-[#10B981] text-xs">{t('auth.user.photoUploaded')}: {signupForm.photo.name}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-xs tracking-[0.2em] uppercase text-[#A1A1AA] font-bold">
                    {t('auth.user.millDetails')}
                  </Label>
                  {signupForm.mills.map((mill, index) => (
                    <div key={index} className="bg-[#09090B] border border-[#222222] rounded-lg p-4 space-y-3">
                      <Input
                        type="text"
                        placeholder={t('auth.user.millName')}
                        value={mill.name}
                        onChange={(e) => updateMill(index, 'name', e.target.value)}
                        data-testid={`mill-name-${index}`}
                        className="bg-[#000000] border border-[#222222] text-white"
                        required
                      />
                      <Input
                        type="text"
                        placeholder={t('auth.user.millLocation')}
                        value={mill.location}
                        onChange={(e) => updateMill(index, 'location', e.target.value)}
                        data-testid={`mill-location-${index}`}
                        className="bg-[#000000] border border-[#222222] text-white"
                        required
                      />
                      {signupForm.mills.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeMill(index)}
                          data-testid={`remove-mill-${index}`}
                          className="w-full bg-[#EF4444] text-white hover:bg-[#DC2626]"
                        >
                          {t('auth.user.removeMill')}
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addMill}
                    data-testid="add-mill-btn"
                    className="w-full bg-transparent border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-black"
                  >
                    {t('auth.user.addMill')}
                  </Button>
                </div>

                <Button
                  type="submit"
                  data-testid="signup-submit-btn"
                  className="w-full bg-[#10B981] text-black hover:bg-[#059669] font-bold uppercase tracking-wide py-6"
                >
                  {t('auth.user.createAccount')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
