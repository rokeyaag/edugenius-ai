import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, PenTool, Award, BookMarked, ShoppingBag, Bot, GraduationCap } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, language, t } = useApp();

  const tabs = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'creative', label: language === 'bn' ? 'সৃজনশীল' : 'Creative', icon: PenTool },
    { id: 'tutor', label: t('navTutor'), icon: Bot },
    { id: 'teacher', label: language === 'bn' ? 'শিক্ষক' : 'Teacher', icon: GraduationCap },
    { id: 'quiz', label: t('navQuiz'), icon: Award },
    { id: 'vault', label: t('navVault'), icon: BookMarked },
    { id: 'store', label: t('navStore'), icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-2 sm:bottom-4 left-2 right-2 sm:left-auto sm:right-auto sm:max-w-md sm:mx-auto z-40">
      <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 p-1.5 rounded-3xl shadow-2xl shadow-slate-950/40 flex items-center justify-between gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 px-1 rounded-2xl transition-all duration-300 tap-active relative cursor-pointer group ${
                isActive
                  ? 'bg-gradient-to-b from-red-600 to-rose-700 text-white shadow-lg shadow-red-600/30 scale-105 font-black'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 font-bold'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-2.5 h-2.5 bg-amber-400 rounded-full shadow-sm ring-2 ring-slate-900 animate-pulse"></span>
              )}
              <div
                className={`p-1 rounded-xl transition-transform duration-300 ${
                  isActive
                    ? 'scale-110'
                    : 'group-hover:scale-110'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[9.5px] sm:text-[10px] tracking-tight truncate max-w-[50px] leading-none ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
