import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Crown, Languages, ChevronDown, GraduationCap, Smartphone, Download } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 px-3.5 py-2.5 shadow-sm">
      <div className="max-w-md mx-auto space-y-2">
        
        {/* Top Mini Utilities Bar: Class, Install App & Language Switcher */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-100 text-xs gap-1.5">
          
          {/* Class Selector Badge */}
          <button
            onClick={() => setIsClassModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-[10.5px] transition-all tap-active border border-slate-200 truncate"
          >
            <GraduationCap className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span className="truncate">{language === 'bn' ? (currentClassObj?.nameBn || '৯ম-১০ম শ্রেণি').split(' (')[0] : (currentClassObj?.nameEn || 'Class 9-10')}</span>
            <ChevronDown className="w-3 h-3 text-slate-500 shrink-0" />
          </button>

          <div className="flex items-center gap-1 shrink-0">
            {/* Install App Button */}
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-[10.5px] transition-all tap-active border border-amber-300 shadow-xs"
              title="মোবাইলে অ্যাপ ইনস্টল করুন"
            >
              <Smartphone className="w-3 h-3 text-amber-700" />
              <span>{language === 'bn' ? '📲 অ্যাপ' : '📲 App'}</span>
            </button>

            {/* Bilingual Language / Curriculum Version Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-extrabold text-[10.5px] transition-all tap-active border border-red-200 shadow-xs"
              title="Switch between Bangla Version and English Version"
            >
              <Languages className="w-3 h-3 text-red-600" />
              <span>{language === 'bn' ? 'বাংলা' : 'English'}</span>
            </button>
          </div>
        </div>

        {/* Status Elements Bar: Streak, Points, Pro Badge */}
        <div className="flex items-center justify-between gap-2">
          
          {/* Daily Streak */}
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-300 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{streak} {t('days')}</span>
            <span className="text-xs">🔥</span>
          </div>

          {/* Reward Points */}
          <button
            onClick={() => setActiveTab('store')}
            className="flex items-center gap-1.5 text-xs font-black text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-full border border-red-200 shadow-sm transition-all tap-active"
          >
            <span className="text-amber-500 text-sm">🪙</span>
            <span className="text-red-700 font-black">{points}</span>
            <span className="text-red-600 font-bold text-[10px]">{t('points')}</span>
          </button>

          {/* Pro Scholar Badge */}
          <button
            onClick={() => setActiveTab('store')}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-md transition-all hover:scale-105 tap-active"
          >
            <Crown className="w-3.5 h-3.5 text-amber-100 fill-amber-100" />
            <span className="text-white drop-shadow-sm">
              {subscriptionTier === 'pro' ? t('proScholar') : t('freeTrial')}
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}
