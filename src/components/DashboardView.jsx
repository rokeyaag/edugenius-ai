import React, { useState } from 'react';
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
  ChevronDown,
  BookOpen,
  Layers,
  Plus,
  Headphones,
  PenTool,
  FileUp,
  Award,
  Lightbulb,
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';

export default function DashboardView() {
  const { 
    currentClassObj, 
    selectedClass,
    setSelectedClass,
    classes,
    points, 
    streak, 
    setActiveTab, 
    vaultNotes, 
    setIsClassModalOpen, 
    setIsAddSubjectModalOpen, 
    showToast,
    language, 
    t 
  } = useApp();

  const subjects = currentClassObj?.subjects || [];

  // Daily Board Tips Collection
  const dailyTips = [
    {
      title: '🎯 সৃজনশীল উত্তর লেখার গোল্ডেন রুল',
      tip: 'সৃজনশীল (গ) ও (ঘ) প্রশ্নে পাঠ্যবইয়ের তত্ত্বের সাথে উদ্দীপকের তুলনামূলক বিশ্লেষণ প্যারাগ্রাফ আকারে লিখলে পূর্ণ নম্বর পাওয়া যায়।'
    },
    {
      title: '⏱️ বোর্ড পরীক্ষার সময় বণ্টন',
      tip: 'প্রতিটি ১০ নম্বরের সৃজনশীল প্রশ্নের উত্তরের জন্য ২১ মিনিট এবং প্রতিটি MCQ-এর জন্য সর্বোচ্চ ৫০ সেকেন্ড সময় নির্ধারণ করুন।'
    },
    {
      title: '💡 বাংলা ব্যাকরণ ও সূত্র মনে রাখার টিপ',
      tip: 'সন্ধি ও সমাসের ক্ষেত্রে কেবল ব্যতিক্রম শব্দগুলো খাতায় নোট করে প্রতিদিন ৩ মিনিট অডিও পডকাস্ট শুনুন।'
    }
  ];

  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  return (
    <div className="space-y-4 pb-24 pt-2 animate-in fade-in duration-200">
      
      {/* ============================================================== */}
      {/* 1. STUDENT HEADER & DAILY PROGRESS CARD */}
      {/* ============================================================== */}
      <div className="p-4 rounded-3xl bg-white border border-amber-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src="/icon-192.png?v=3" 
                alt="EduGenius AI" 
                className="w-12 h-12 rounded-2xl shadow-sm border-2 border-amber-300 object-cover" 
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[8px] text-white">
                ✓
              </span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 leading-tight flex items-center gap-1">
                <span>{language === 'bn' ? 'স্বাগতম, শিক্ষার্থী!' : 'Welcome, Scholar!'}</span>
                <span className="text-amber-500">✨</span>
              </h2>
              <button
                onClick={() => setIsClassModalOpen(true)}
                className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 mt-0.5 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-lg border border-red-100 transition-colors tap-active cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? (currentClassObj?.nameBn || '৯ম-১০ম শ্রেণি (SSC)') : (currentClassObj?.nameEn || 'Class 9-10')}</span>
                <ChevronDown className="w-3 h-3 text-red-500" />
              </button>
            </div>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1.5 rounded-2xl shadow-2xs">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <div className="text-right">
                <span className="text-[9px] text-amber-800 font-bold block leading-none">{language === 'bn' ? 'স্ট্রিক' : 'Streak'}</span>
                <span className="text-xs font-black text-amber-950">{streak} {language === 'bn' ? 'দিন' : 'd'}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200/80 px-2.5 py-1.5 rounded-2xl shadow-2xs">
              <Trophy className="w-4 h-4 text-red-600" />
              <div className="text-right">
                <span className="text-[9px] text-red-800 font-bold block leading-none">{language === 'bn' ? 'পয়েন্ট' : 'Points'}</span>
                <span className="text-xs font-black text-red-950">{points}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Goal & Progress Bar */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'bn' ? 'আজকের অধ্যয়ন অগ্রগতি:' : 'Daily Study Goal:'}</span>
            </span>
            <span className="font-black text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
              {Math.min(100, Math.max(25, (points % 100) + 15))}% সম্পন্ন
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(25, (points % 100) + 15))}%` }}
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. HERO AI LEARNING SUITE CAROUSEL */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 text-white shadow-xl space-y-3.5 border border-white/20">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="space-y-1 relative z-10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-200 animate-spin" />
              <span>NCTB AI স্মার্ট স্টাডি হাব</span>
            </span>
            <span className="text-[10px] font-bold text-amber-100 bg-black/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
              ২০২৬ কারিকুলাম
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black leading-snug tracking-tight">
            বইয়ের ছবি তুলে তাৎক্ষণিক সমাধান ও ৩ মিনিটের অডিও লেকচার!
          </h3>
          <p className="text-xs text-white/90 font-medium leading-relaxed">
            স্মার্ট AI দিয়ে মুহূর্তেই বের করুন অধ্যায়ের সারসংক্ষেপ, সূত্র, ৪-ধাপের সৃজনশীল মডেল উত্তর ও ১০ প্রশ্নের বোর্ড কুইজ।
          </p>
        </div>

        {/* Hero Quick Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 relative z-10">
          <button
            onClick={() => setActiveTab('tutor')}
            className="py-2.5 px-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-900 font-black text-xs shadow-md transition-all tap-active flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <Camera className="w-4 h-4 text-red-600" />
            <span>বই স্ক্যানার</span>
          </button>

          <button
            onClick={() => setActiveTab('creative')}
            className="py-2.5 px-3 rounded-2xl bg-slate-900/50 hover:bg-slate-900/70 backdrop-blur-md text-white font-black text-xs border border-white/20 transition-all tap-active flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <PenTool className="w-3.5 h-3.5 text-amber-300" />
            <span>সৃজনশীল CQ</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className="col-span-2 sm:col-span-1 py-2.5 px-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all tap-active flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
          >
            <BrainCircuit className="w-4 h-4 text-slate-950" />
            <span>কুইজ এরিনা</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. ESSENTIAL AI TOOLS BENTO GRID (৬টি প্রধান ফিচার) */}
      {/* ============================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-600" />
            <span>প্রধান AI স্টাডি টুলস (Quick Features):</span>
          </h4>
          <span className="text-[10px] text-slate-500 font-bold">১-ট্যাপে শুরু করুন</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          
          {/* Tool 1: Scanner */}
          <div
            onClick={() => setActiveTab('tutor')}
            className="p-3 rounded-2xl bg-gradient-to-b from-red-500 to-red-600 text-white flex flex-col items-center justify-center gap-1.5 shadow-sm border border-red-400/40 transition-all hover:-translate-y-0.5 active:translate-y-0 tap-active cursor-pointer text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-4 h-4 text-amber-200" />
            </div>
            <span className="text-[11px] font-black leading-tight">বই স্ক্যানার</span>
            <span className="text-[9px] text-red-100 font-medium">ছবি ও PDF</span>
          </div>

          {/* Tool 2: CQ Master */}
          <div
            onClick={() => setActiveTab('creative')}
            className="p-3 rounded-2xl bg-gradient-to-b from-emerald-600 to-teal-700 text-white flex flex-col items-center justify-center gap-1.5 shadow-sm border border-emerald-400/40 transition-all hover:-translate-y-0.5 active:translate-y-0 tap-active cursor-pointer text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PenTool className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="text-[11px] font-black leading-tight">সৃজনশীল CQ</span>
            <span className="text-[9px] text-emerald-100 font-medium">৪-ধাপের উত্তর</span>
          </div>

          {/* Tool 3: Quiz Arena */}
          <div
            onClick={() => setActiveTab('quiz')}
            className="p-3 rounded-2xl bg-gradient-to-b from-amber-500 to-amber-600 text-slate-950 flex flex-col items-center justify-center gap-1.5 shadow-sm border border-amber-300 transition-all hover:-translate-y-0.5 active:translate-y-0 tap-active cursor-pointer text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-950/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-4 h-4 text-slate-950" />
            </div>
            <span className="text-[11px] font-black leading-tight">কুইজ এরিনা</span>
            <span className="text-[9px] text-amber-950 font-bold">১০টি প্রশ্ন</span>
          </div>

          {/* Tool 4: Knowledge Vault */}
          <div
            onClick={() => setActiveTab('vault')}
            className="p-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col items-center justify-center gap-1.5 shadow-sm border border-slate-700 transition-all hover:-translate-y-0.5 active:translate-y-0 tap-active cursor-pointer text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookMarked className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-[11px] font-black leading-tight">নলেজ ভল্ট</span>
            <span className="text-[9px] text-slate-400 font-medium">লেকচার নোটস</span>
          </div>

          {/* Tool 5: Audio Podcast */}
          <div
            onClick={() => setActiveTab('vault')}
            className="p-3 rounded-2xl bg-gradient-to-b from-purple-600 to-indigo-700 text-white flex flex-col items-center justify-center gap-1.5 shadow-sm border border-purple-400/40 transition-all hover:-translate-y-0.5 active:translate-y-0 tap-active cursor-pointer text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Headphones className="w-4 h-4 text-purple-200" />
            </div>
            <span className="text-[11px] font-black leading-tight">অডিও পডকাস্ট</span>
            <span className="text-[9px] text-purple-100 font-medium">৩ মি. অডিও</span>
          </div>

          {/* Tool 6: Teacher Panel */}
          <div
            onClick={() => setActiveTab('teacher')}
            className="p-3 rounded-2xl bg-gradient-to-b from-cyan-600 to-blue-700 text-white flex flex-col items-center justify-center gap-1.5 shadow-sm border border-cyan-400/40 transition-all hover:-translate-y-0.5 active:translate-y-0 tap-active cursor-pointer text-center group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4 text-cyan-200" />
            </div>
            <span className="text-[11px] font-black leading-tight">শিক্ষক প্যানেল</span>
            <span className="text-[9px] text-cyan-100 font-medium">প্রশ্ন জেনারেটর</span>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. INTERACTIVE SUBJECT EXPLORER (বিষয়ভিত্তিক স্টাডি কার্ড গ্রিড) */}
      {/* ============================================================== */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div>
            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>বিষয়ভিত্তিক অধ্যয়ন ও অনুশীলন (Subjects):</span>
            </h4>
            <p className="text-[10px] text-slate-500 font-medium">যেকোনো বিষয়ে ক্লিক করে সরাসরি রিভিশন শুরু করুন</p>
          </div>
          
          <button
            onClick={() => setIsAddSubjectModalOpen(true)}
            className="text-[10px] font-black text-red-700 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-xl border border-red-200 tap-active flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>বিষয় যোগ</span>
          </button>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {subjects.slice(0, 6).map((sub) => {
            const chCount = NCTB_FULL_BOOK_CHAPTERS_MAP[sub.id]?.length || (sub.id === 'bangla-sahitya' ? 50 : 3);
            
            return (
              <div
                key={sub.id}
                onClick={() => setActiveTab('vault')}
                className="p-3 rounded-2xl bg-white hover:bg-amber-50/60 border border-slate-200 hover:border-amber-400 transition-all cursor-pointer shadow-2xs hover:shadow-xs space-y-2 tap-active group"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {sub.icon || '📖'}
                  </span>
                  <span className="text-[9px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    {chCount}টি অধ্যায়
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h5 className="text-xs font-black text-slate-900 truncate group-hover:text-red-700 transition-colors">
                    {language === 'bn' ? sub.nameBn : sub.nameEn}
                  </h5>
                  <p className="text-[9.5px] text-slate-500 font-medium">
                    {sub.group || 'আবশ্যিক বিষয়'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9.5px] text-red-600 font-bold">
                  <span>পড়া শুরু করুন</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {subjects.length > 6 && (
          <div className="text-center pt-1">
            <button
              onClick={() => setActiveTab('vault')}
              className="text-xs font-black text-slate-700 hover:text-red-700 bg-white hover:bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 shadow-2xs inline-flex items-center gap-1.5 transition-all tap-active cursor-pointer"
            >
              <span>সকল {subjects.length}টি বিষয়ের সম্পূর্ণ তালিকা দেখুন</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-600" />
            </button>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* 5. DAILY SMART BOARD EXAM CAPSULE (দৈনিক বোর্ড টিপস ও ট্রিকস) */}
      {/* ============================================================== */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-red-500/10 to-orange-500/10 border border-amber-300/80 space-y-2 shadow-2xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <span>{dailyTips[currentTipIdx].title}</span>
          </div>

          <button
            onClick={() => setCurrentTipIdx((prev) => (prev + 1) % dailyTips.length)}
            className="text-[9.5px] font-bold text-red-700 hover:text-red-800 bg-white px-2 py-0.5 rounded-lg border border-amber-200 tap-active cursor-pointer"
          >
            পরের টিপ ➔
          </button>
        </div>

        <p className="text-xs text-slate-800 font-medium leading-relaxed">
          {dailyTips[currentTipIdx].tip}
        </p>
      </div>

      {/* ============================================================== */}
      {/* 6. RECENT STUDY HISTORY & RESUME CARDS */}
      {/* ============================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'সাম্প্রতিক সংরক্ষিত নোটস ও রিভিশন' : 'Recent Study Notes'}</span>
          </h4>
          <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
            {vaultNotes.length}টি সেভ করা
          </span>
        </div>

        <div className="space-y-2">
          {vaultNotes.slice(0, 3).map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveTab('vault')}
              className="p-3.5 rounded-2xl bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 transition-all cursor-pointer shadow-2xs flex items-center justify-between gap-3 tap-active group"
            >
              <div className="space-y-1 truncate min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-red-800 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                    {language === 'bn' ? (note.subjectBn || note.subject) : note.subject}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{note.date}</span>
                </div>
                <h5 className="text-xs font-black text-slate-900 truncate group-hover:text-red-700 transition-colors">
                  {note.title}
                </h5>
                <p className="text-[11px] text-slate-600 truncate font-medium">
                  {note.summary}
                </p>
              </div>

              <div className="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center text-xs font-black shrink-0 border border-amber-300 group-hover:scale-105 transition-transform">
                🎧
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
