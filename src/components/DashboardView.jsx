import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  BookMarked, 
  Flame, 
  Trophy, 
  GraduationCap, 
  Camera, 
  BrainCircuit, 
  ArrowRight,
  FileText,
  Clock,
  Zap,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export default function DashboardView() {
  const { 
    currentClassObj, 
    points, 
    streak, 
    setActiveTab, 
    vaultNotes, 
    setIsClassModalOpen, 
    setIsAddSubjectModalOpen, 
    language, 
    t 
  } = useApp();

  const subjects = currentClassObj?.subjects || [];

  return (
    <div className="space-y-4 pb-24 pt-2">
      
      {/* 1. Header Profile & Class Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-md">
            🎓
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-tight">
              {language === 'bn' ? 'স্বাগতম, শিক্ষার্থী!' : 'Welcome, Scholar!'}
            </h2>
            <button
              onClick={() => setIsClassModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 mt-0.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? currentClassObj.nameBn : currentClassObj.nameEn}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Gamification Badges */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl shadow-sm">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
            <span className="text-xs font-black text-amber-900">{streak} {language === 'bn' ? 'দিন' : 'd'}</span>
          </div>

          <div className="flex items-center gap-1 bg-red-50 border border-red-200 px-2.5 py-1 rounded-xl shadow-sm">
            <Trophy className="w-4 h-4 text-red-600" />
            <span className="text-xs font-black text-red-900">{points}</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Quick Action Card */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white shadow-lg space-y-3">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>{language === 'bn' ? 'AI স্মার্ট স্টাডি অ্যাসিস্ট্যান্ট' : 'AI Study Assistant'}</span>
          </span>
          <h3 className="text-lg font-black leading-snug">
            {language === 'bn' ? 'বইয়ের ছবি তোলো বা PDF আপলোড করো' : 'Snap Textbook or Upload PDF'}
          </h3>
          <p className="text-xs text-white/90 font-medium">
            {language === 'bn' ? 'বোর্ড পরীক্ষার মূল সূত্র, সামারি ও ৩ মিনিটের অডিও পডকাস্ট তৈরি হবে!' : 'Get board exam chapter summary, key formulas & 3-min audio podcast!'}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setActiveTab('tutor')}
            className="flex-1 py-2.5 px-4 rounded-xl bg-white text-slate-900 font-black text-xs shadow-md hover:bg-slate-50 transition-all tap-active flex items-center justify-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-red-600" />
            <span>{language === 'bn' ? '📸 বই স্ক্যান / PDF আপলোড' : '📸 Scan / Upload PDF'}</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className="py-2.5 px-4 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-sm text-white font-bold text-xs transition-all tap-active flex items-center justify-center gap-1"
          >
            <BrainCircuit className="w-4 h-4 text-amber-300" />
            <span>{language === 'bn' ? 'কুইজ' : 'Quiz'}</span>
          </button>
        </div>
      </div>

      {/* 3. COMPACT SUBJECT BROWSER (Dropdown & Quick Chips) */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BookMarked className="w-4 h-4 text-red-600" />
            <h4 className="text-xs font-black text-slate-900">
              {language === 'bn' ? 'পাঠ্যবই ও বিষয়সমূহ' : 'Textbooks & Subjects'} ({subjects.length}টি বিষয়)
            </h4>
          </div>
          
          <button
            onClick={() => setActiveTab('vault')}
            className="text-[11px] font-bold text-red-600 hover:text-red-700 flex items-center gap-0.5"
          >
            <span>{language === 'bn' ? 'ভল্ট দেখুন' : 'Open Vault'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick Dropdown Navigator */}
        <div className="relative">
          <select
            onChange={(e) => {
              if (e.target.value) {
                setActiveTab('vault');
              }
            }}
            className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-red-500 shadow-sm cursor-pointer"
          >
            <option value="">
              🔍 {language === 'bn' ? 'যেকোনো বিষয়ে সরাসরি যেতে সিলেক্ট করুন...' : 'Select any subject to view notes...'}
            </option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.icon || '📖'} {language === 'bn' ? sub.nameBn : sub.nameEn} ({sub.group || 'সাধারণ'})
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Quick Horizontal Subject Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {subjects.slice(0, 8).map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveTab('vault')}
              className="py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-700 text-slate-700 text-xs font-bold whitespace-nowrap border border-slate-200 transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <span>{sub.icon || '📖'}</span>
              <span>{language === 'bn' ? sub.nameBn.split(' ')[0] : sub.nameEn}</span>
            </button>
          ))}
          <button
            onClick={() => setActiveTab('vault')}
            className="py-1.5 px-3 rounded-xl bg-red-600 text-white text-xs font-bold whitespace-nowrap shadow-sm shrink-0"
          >
            +{subjects.length - 8} {language === 'bn' ? 'আরও বিষয়' : 'more'}
          </button>
        </div>
      </div>

      {/* 4. Recent Study Vault Entries */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'bn' ? 'সাম্প্রতিক অধ্যায় ও নোটস' : 'Recent Study Notes'}</span>
          </h4>
          <span className="text-[10px] text-slate-500 font-bold">
            {vaultNotes.length} {language === 'bn' ? 'টি সেভ করা' : 'saved'}
          </span>
        </div>

        <div className="space-y-2">
          {vaultNotes.slice(0, 3).map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveTab('vault')}
              className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-red-200 transition-all cursor-pointer shadow-sm flex items-center justify-between gap-3 tap-active"
            >
              <div className="space-y-1 truncate">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                    {language === 'bn' ? (note.subjectBn || note.subject) : note.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{note.date}</span>
                </div>
                <h5 className="text-xs font-black text-slate-900 truncate">
                  {note.title}
                </h5>
                <p className="text-[11px] text-slate-500 truncate font-medium">
                  {note.summary}
                </p>
              </div>

              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-black shrink-0 border border-amber-200">
                🎧
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
