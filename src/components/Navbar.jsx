import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Crown, Languages, ChevronDown, GraduationCap, Smartphone, Sparkles, Bell } from 'lucide-react';

export default function Navbar() {
  const { 
    points, 
    streak, 
    subscriptionTier, 
    setActiveTab, 
    language, 
    setLanguage, 
    currentClassObj, 
    setIsClassModalOpen,
    setIsInstallModalOpen,
    showToast,
    t 
  } = useApp();

  const toggleLanguage = () => {
    const nextLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(nextLang);
    showToast(
      nextLang === 'en' 
        ? '🇬🇧 Switched to English Version (NCTB Curriculum)!' 
        : '🇧🇩 বাংলা ভার্সনে পরিবর্তন করা হয়েছে!', 
      'info'
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full px-2 sm:px-4 pt-1.5 sm:pt-2 pb-1.5 print:hidden">
      <div className="max-w-md md:max-w-4xl lg:max-w-5xl mx-auto bg-white/95 backdrop-blur-2xl border border-slate-200/70 shadow-xl shadow-slate-200/60 rounded-3xl p-3 space-y-2.5 transition-all duration-300">
        
        {/* Top Mini Utilities Bar: Class, App Install & Language Switcher */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100/80 text-xs gap-1.5">
          
          {/* Class Selector Floating Pill */}
          <button
            onClick={() => setIsClassModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 text-slate-800 font-extrabold text-[11px] transition-all tap-active border border-slate-200/80 shadow-xs truncate cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-lg bg-red-600/10 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="truncate max-w-[120px]">
              {language === 'bn' ? (currentClassObj?.nameBn || '৯ম-১০ম শ্রেণি').split(' (')[0] : (currentClassObj?.nameEn || 'Class 9-10')}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0" />
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Install App Quick Pill */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 text-amber-950 font-extrabold text-[11px] transition-all tap-active border border-amber-300/80 shadow-xs cursor-pointer hover:shadow-sm"
              title="মোবাইলে অ্যাপ ইনস্টল করুন"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
              <span>{language === 'bn' ? '📲 অ্যাপ' : '📲 App'}</span>
            </button>

            {/* Bilingual Version Switcher Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-2xl bg-gradient-to-r from-rose-50 to-red-50 hover:from-rose-100 hover:to-red-100 text-red-700 font-extrabold text-[11px] transition-all tap-active border border-red-200/80 shadow-xs cursor-pointer hover:shadow-sm"
              title="Switch Language Version"
            >
              <Languages className="w-3.5 h-3.5 text-red-600" />
              <span className="font-bold">{language === 'bn' ? 'বাংলা' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Primary Status Dock Bar: Streak, Reward Points, Pro Badge */}
        <div className="flex items-center justify-between gap-1.5">
          
          {/* Daily Streak Flame Chip */}
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-950 bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 px-3 py-1.5 rounded-2xl border border-amber-300/70 shadow-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{streak} {t('days')}</span>
            <span className="text-xs">🔥</span>
          </div>

          {/* Reward Points Pill */}
          <button
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-1.5 text-xs font-black text-red-800 bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 hover:opacity-95 px-3.5 py-1.5 rounded-2xl border border-red-200/80 shadow-xs transition-all hover:scale-105 tap-active cursor-pointer"
          >
            <span className="text-amber-500 text-sm drop-shadow-xs">🪙</span>
            <span className="text-red-700 font-black text-xs">{points}</span>
            <span className="text-red-600/80 font-bold text-[10px] uppercase tracking-wider">{t('points')}</span>
          </button>

          {/* Pro Scholar Badge Button */}
          <button
            onClick={() => setActiveTab('store')}
            className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs shadow-md shadow-red-500/20 transition-all hover:scale-105 tap-active cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-amber-200 fill-amber-200 group-hover:rotate-12 transition-transform" />
            <span className="text-white drop-shadow-sm font-extrabold text-[11px]">
              {subscriptionTier === 'pro' ? t('proScholar') : t('freeTrial')}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
