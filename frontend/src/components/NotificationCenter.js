import React, { useState } from 'react';
import { Bell, CheckCircle, Award, UserPlus, Trophy, Gift, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { notifications as mockNotifications } from '@/lib/mockDataEnhanced';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const NotificationCenter = ({ isOpen, onClose }) => {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  const [notifications, setNotifications] = useState(mockNotifications);

  const iconMap = {
    withdrawal_approved: CheckCircle,
    achievement_unlocked: Award,
    referral_purchase: UserPlus,
    leaderboard_rank: Trophy,
    scratch_card: Gift
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#09090B] border border-[#222222] text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Bell className="w-6 h-6 text-[#10B981]" />
              {te.notifications.title}
            </DialogTitle>
            <button
              onClick={markAllRead}
              className="text-xs text-[#10B981] hover:text-[#059669] font-semibold uppercase tracking-wide"
            >
              {te.notifications.markAllRead}
            </button>
          </div>
        </DialogHeader>
        
        <div className="space-y-3 mt-6">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-[#333333] mx-auto mb-4" />
              <p className="text-[#71717A]">{te.notifications.noNotifications}</p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = iconMap[notification.type] || Bell;
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                    notification.read
                      ? 'bg-[#000000] border-[#222222]'
                      : 'bg-[#10B981]/10 border-[#10B981]'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${notification.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: notification.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white mb-1">
                      {lang === 'hi' ? notification.titleHi : notification.title}
                    </p>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">
                      {lang === 'hi' ? notification.messageHi : notification.message}
                    </p>
                    <p className="text-xs text-[#71717A] mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-[#10B981] rounded-full flex-shrink-0 mt-2" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
