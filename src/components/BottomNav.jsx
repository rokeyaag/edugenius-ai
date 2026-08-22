import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, PenTool, Award, BookMarked, ShoppingBag, Bot, GraduationCap } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, language, t } = useApp();

  const tabs = [
    { id: 'home', label: language === 'bn' ? 'হোম' : 'Home', icon: Home },
    { id: 'creative', label: language === 'bn' ? 'সৃজনশীল' : 'Creative', icon: PenTool },
    { id: 'tutor', label: language === 'bn' ? 'টিউটর' : 'Tutor', icon: Bot },
    { id: 'teacher', label: language === 'bn' ? 'শিক্ষক' : 'Teacher', icon: GraduationCap },
    { id: 'quiz', label: language === 'bn' ? 'কুইজ' : 'Quiz', icon: Award },
    { id: 'vault', label: language === 'bn' ? 'ভল্ট' : 'Vault', icon: BookMarked },
    { id: 'store', label: language === 'bn' ? 'স্টোর' : 'Store', icon: ShoppingBag },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-2xl border-t border-slate-200 shadow-2xl safe-area-bottom">
      <div className="flex items-center justify-between px-1.5 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 tap-active relative cursor-pointer group ${
                isActive
                  ? 'text-red-600 font-black'
                  : 'text-slate-500 hover:text-slate-900 font-semibold'
              }`}
            >
              {/* Active Pill Highlight */}
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-500/25 scale-105'
                    : 'bg-transparent text-slate-500 group-hover:bg-slate-100 group-hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Label: Short, clear, no ellipsis cutting */}
              <span 
                className={`text-[9.5px] mt-0.5 whitespace-nowrap tracking-tight transition-colors ${
                  isActive 
                    ? 'text-red-700 font-black' 
                    : 'text-slate-500 group-hover:text-slate-800'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
