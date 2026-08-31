import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, PenTool, Award, BookMarked, ShoppingBag, Bot, GraduationCap } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, setActiveTab, language } = useApp();

  const tabs = [
    { 
      id: 'home', 
      label: language === 'bn' ? 'হোম' : 'Home', 
      icon: Home,
      inactiveColor: 'text-blue-500 group-hover:text-blue-600 bg-blue-50/80',
      activeGradient: 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30',
      activeTextColor: 'text-blue-700 font-black'
    },
    { 
      id: 'creative', 
      label: language === 'bn' ? 'সৃজনশীল' : 'Creative', 
      icon: PenTool,
      inactiveColor: 'text-emerald-500 group-hover:text-emerald-600 bg-emerald-50/80',
      activeGradient: 'bg-gradient-to-tr from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/30',
      activeTextColor: 'text-emerald-700 font-black'
    },
    { 
      id: 'tutor', 
      label: language === 'bn' ? 'AI' : 'AI', 
      icon: Bot,
      inactiveColor: 'text-purple-500 group-hover:text-purple-600 bg-purple-50/80',
      activeGradient: 'bg-gradient-to-tr from-purple-600 to-violet-600 text-white shadow-md shadow-purple-500/30',
      activeTextColor: 'text-purple-700 font-black'
    },
    { 
      id: 'teacher', 
      label: language === 'bn' ? 'শিক্ষক' : 'Teacher', 
      icon: GraduationCap,
      inactiveColor: 'text-cyan-600 group-hover:text-cyan-700 bg-cyan-50/80',
      activeGradient: 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/30',
      activeTextColor: 'text-cyan-700 font-black'
    },
    { 
      id: 'quiz', 
      label: language === 'bn' ? 'কুইজ' : 'Quiz', 
      icon: Award,
      inactiveColor: 'text-amber-500 group-hover:text-amber-600 bg-amber-50/80',
      activeGradient: 'bg-gradient-to-tr from-amber-500 via-amber-600 to-orange-500 text-white shadow-md shadow-amber-500/30',
      activeTextColor: 'text-amber-700 font-black'
    },
    { 
      id: 'vault', 
      label: language === 'bn' ? 'ভল্ট' : 'Vault', 
      icon: BookMarked,
      inactiveColor: 'text-red-500 group-hover:text-red-600 bg-red-50/80',
      activeGradient: 'bg-gradient-to-tr from-red-600 via-rose-600 to-red-700 text-white shadow-md shadow-red-500/30',
      activeTextColor: 'text-red-700 font-black'
    },
    { 
      id: 'store', 
      label: language === 'bn' ? 'স্টোর' : 'Store', 
      icon: ShoppingBag,
      inactiveColor: 'text-pink-500 group-hover:text-pink-600 bg-pink-50/80',
      activeGradient: 'bg-gradient-to-tr from-fuchsia-600 to-pink-600 text-white shadow-md shadow-pink-500/30',
      activeTextColor: 'text-pink-700 font-black'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-white/95 backdrop-blur-2xl border-t md:border md:mb-3 md:rounded-3xl border-slate-200 shadow-2xl safe-area-bottom print:hidden">
      <div className="flex items-center justify-between px-1.5 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-200 tap-active relative cursor-pointer group"
            >
              {/* Colorful Dynamic Icon Badge */}
              <div
                className={`p-1.5 rounded-xl transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? `${tab.activeGradient} scale-110`
                    : `${tab.inactiveColor} group-hover:scale-105`
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Label */}
              <span 
                className={`text-[9.5px] mt-0.5 whitespace-nowrap tracking-tight transition-colors ${
                  isActive 
                    ? tab.activeTextColor 
                    : 'text-slate-600 group-hover:text-slate-900 font-semibold'
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
