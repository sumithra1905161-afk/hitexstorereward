import React from 'react';
import { Trophy, Lock, ArrowLeft } from 'lucide-react';
import { UserLayout } from '@/components/Layout';
import { useLanguage } from '@/lib/LanguageContext';
import { achievements } from '@/lib/mockDataEnhanced';
import { enhancements_en, enhancements_hi } from '@/lib/translationsEnhanced';
import { useNavigate } from 'react-router-dom';

export default function AchievementsPage() {
  const { lang } = useLanguage();
  const te = lang === 'hi' ? enhancements_hi : enhancements_en;
  const navigate = useNavigate();

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-12 space-y-8 fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/user/profile')}
            className="w-10 h-10 bg-[#09090B] border border-[#222222] rounded-lg flex items-center justify-center hover:border-[#10B981] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              <Trophy className="w-8 h-8 text-[#10B981]" />
              {te.achievements.title}
            </h1>
            <p className="text-sm text-[#71717A] mt-2">
              {unlockedAchievements.length} / {achievements.length} {te.achievements.unlocked}
            </p>
          </div>
        </div>

        {/* Unlocked Achievements */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#10B981] uppercase tracking-wide">
            {te.achievements.unlocked}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-[#09090B] border-2 rounded-lg p-6 hover:scale-105 transition-transform"
                style={{ borderColor: achievement.color }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ backgroundColor: `${achievement.color}30`, border: `2px solid ${achievement.color}` }}
                  >
                    🏆
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-black text-white mb-1">
                      {lang === 'hi' ? achievement.nameHi : achievement.name}
                    </p>
                    <p className="text-sm text-[#A1A1AA] leading-relaxed mb-2">
                      {lang === 'hi' ? achievement.descriptionHi : achievement.description}
                    </p>
                    <p className="text-xs text-[#71717A]">
                      {te.achievements.unlocked}: {new Date(achievement.unlocked_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Locked Achievements */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#71717A] uppercase tracking-wide">
            {te.achievements.locked}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-[#09090B] border border-[#222222] rounded-lg p-6 hover:border-[#333333] transition-colors opacity-75"
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-[#222222]"
                  >
                    <Lock className="w-8 h-8 text-[#71717A]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xl font-black text-[#71717A] mb-1">
                      {lang === 'hi' ? achievement.nameHi : achievement.name}
                    </p>
                    <p className="text-sm text-[#71717A] leading-relaxed mb-3">
                      {lang === 'hi' ? achievement.descriptionHi : achievement.description}
                    </p>
                    {achievement.progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#71717A]">{te.achievements.progress}</span>
                          <span className="text-[#10B981] font-semibold">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-[#222222] rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-[#10B981] h-full rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </UserLayout>
  );
}
