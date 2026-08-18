import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, PenTool, Award, BookMarked, ShoppingBag, Bot } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, language, t } = useApp();

  const tabs = [
    { id: 'home', label: t('navHome'), icon: Home },
    { id: 'creative', label: language === 'bn' ? 'সৃজনশীল' : 'Creative', icon: PenTool },
    { id: 'tutor', label: t('navTutor'), icon: Bot },
    { id: 'quiz', label: t('navQuiz'), icon: Award },
    { id: 'vault', label: t('navVault'), icon: BookMarked },
    { id: 'store', label: t('navStore'), icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 py-1.5 px-2 safe-area-bottom shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-0.5 py-1 px-1 rounded-xl transition-all duration-200 tap-active relative ${
                isActive
                  ? 'text-red-600 font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 w-6 h-1 bg-gradient-to-r from-red-600 via-amber-400 to-red-600 rounded-full shadow-sm"></span>
              )}
              <div
                className={`p-1 rounded-lg transition-all ${
                  isActive
                    ? 'bg-red-50 text-red-600 ring-1 ring-red-200 shadow-sm'
                    : 'bg-transparent text-slate-500'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] tracking-tight truncate max-w-[54px]">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
