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
  ChevronDown,
  BookOpen,
  Layers,
  Plus,
  Search,
  X,
  FileUp
} from 'lucide-react';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';
import SleekCustomDropdown from './SleekCustomDropdown';

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
  const [selectedSubjectId, setSelectedSubjectId] = React.useState(subjects[0]?.id || 'bangla-sahitya');
  const [selectedChapterTitle, setSelectedChapterTitle] = React.useState('all');
  const [chapterSearchQuery, setChapterSearchQuery] = React.useState('');

  const groupedSubjects = subjects.reduce((acc, sub) => {
    const grp = sub.group || 'সাধারণ';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(sub);
    return acc;
  }, {});

  const availableChapters = NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubjectId] || [];
  const filteredChapters = availableChapters.filter(ch => {
    if (!chapterSearchQuery.trim()) return true;
    return (ch.title || '').toLowerCase().includes(chapterSearchQuery.toLowerCase());
  });

  return (
    <div className="space-y-4 pb-24 pt-2">
      
      {/* 1. Header Profile & Class Bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <img src="/icon-192.png?v=2" alt="EduGenius AI" className="w-10 h-10 rounded-2xl shadow-md border border-amber-300 object-cover" />
          <div>
            <h2 className="text-sm font-black text-slate-900 leading-tight">
              {language === 'bn' ? 'স্বাগতম, শিক্ষার্থী!' : 'Welcome, Scholar!'}
            </h2>
            <button
              onClick={() => setIsClassModalOpen(true)}
              className="flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 mt-0.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? (currentClassObj?.nameBn || '৯ম-১০ম শ্রেণি') : (currentClassObj?.nameEn || 'Class 9-10')}</span>
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

      {/* 3. Class, Subject & Chapter Selector Card */}
      <div className="p-3.5 rounded-3xl bg-[#fffdf0] border-2 border-amber-200/90 space-y-3 shadow-sm">
        
        {/* ================= 1ST LINE: CLASS SELECTOR (শ্রেণি নির্বাচন) ================= */}
        <div className="space-y-1 pb-2 border-b border-amber-200/60">
          <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-red-600" />
            <span>শ্রেণি নির্বাচন করুন (Class):</span>
          </label>

          <SleekCustomDropdown
            options={(classes || []).map((cls) => ({
              value: cls.id,
              label: `${cls.nameBn}`,
              badge: `${cls.subjects?.length || 0}টি বিষয়`
            }))}
            value={selectedClass}
            onChange={(val) => {
              setSelectedClass(val);
              const matchedClass = (classes || []).find(c => c.id === val);
              const firstSubId = matchedClass?.subjects?.[0]?.id || 'bangla-sahitya';
              setSelectedSubjectId(firstSubId);
              setSelectedChapterTitle('all');
              setChapterSearchQuery('');
              showToast(`🎓 ${matchedClass?.nameBn || val} সিলেক্ট করা হয়েছে`, 'info');
            }}
          />
        </div>

        {/* ================= 2ND LINE: SUBJECT SELECTOR (বিষয় নির্বাচন) ================= */}
        <div className="space-y-1 pb-2 border-b border-amber-200/60">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-red-600" />
              <span>বিষয় নির্বাচন করুন (Subject):</span>
            </label>
            <button
              onClick={() => setIsAddSubjectModalOpen(true)}
              className="text-[9px] font-bold text-red-700 bg-red-50 hover:bg-red-100 px-1.5 py-0.5 rounded-lg border border-red-200 tap-active flex items-center gap-0.5"
              title="Add Custom Subject"
            >
              <Plus className="w-2.5 h-2.5" />
              <span>বিষয় যোগ</span>
            </button>
          </div>

          <SleekCustomDropdown
            options={subjects.map((sub) => {
              const chCount = NCTB_FULL_BOOK_CHAPTERS_MAP[sub.id]?.length || (sub.id === 'bangla-sahitya' ? 50 : 3);
              return {
                value: sub.id,
                label: language === 'bn' ? sub.nameBn : sub.nameEn,
                icon: sub.icon || '📖',
                group: sub.group || 'আবশ্যিক',
                badge: `${chCount}টি অধ্যায়`
              };
            })}
            value={selectedSubjectId}
            onChange={(val) => {
              setSelectedSubjectId(val);
              setSelectedChapterTitle('all');
              setChapterSearchQuery('');
            }}
          />
        </div>

        {/* ================= 3RD LINE: CHAPTER SELECTOR (অধ্যায় তালিকা) ================= */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>[{subjects.find(s => s.id === selectedSubjectId)?.nameBn || 'নির্বাচিত বিষয়'}] অধ্যায় তালিকা:</span>
          </label>

          <SleekCustomDropdown
            options={[
              { value: 'all', label: `🌟 সকল ${availableChapters.length}টি অধ্যায় দেখুন` },
              ...availableChapters.map((ch) => ({
                value: ch.title,
                label: `${ch.title}`
              }))
            ]}
            value={selectedChapterTitle}
            onChange={(val) => setSelectedChapterTitle(val)}
          />

          {/* Instant Search Input */}
          <div className="relative pt-1">
            <Search className="w-3 h-3 text-amber-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={chapterSearchQuery}
              onChange={(e) => setChapterSearchQuery(e.target.value)}
              placeholder={`[${subjects.find(s => s.id === selectedSubjectId)?.nameBn || 'অধ্যায়'}] ফিল্টার করুন...`}
              className="w-full bg-white border border-amber-200 rounded-xl pl-8 pr-7 py-1.5 text-[10.5px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-all font-medium shadow-inner"
            />
            {chapterSearchQuery && (
              <button
                onClick={() => setChapterSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* COMPREHENSIVE ACTION TOOLBAR (PDF আপলোড, বই স্ক্যানার, ভল্ট) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setActiveTab('vault')}
          className="p-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active"
        >
          <FileUp className="w-4 h-4 text-red-900" />
          <span className="text-[10px] font-black">PDF আপলোড</span>
        </button>

        <button
          onClick={() => setActiveTab('tutor')}
          className="p-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active"
        >
          <Camera className="w-4 h-4 text-amber-200" />
          <span className="text-[10px] font-black">বই স্ক্যানার</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active"
        >
          <BookMarked className="w-4 h-4 text-amber-400" />
          <span className="text-[10px] font-black">নলেজ ভল্ট</span>
        </button>
      </div>

      {/* 4. Recent Study Vault Entries */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'bn' ? 'সাম্প্রতিক অধ্যায় ও নোটস' : 'Recent Study Notes'}</span>
          </h4>
          <span className="text-[10px] text-amber-800 font-bold bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
            {vaultNotes.length} {language === 'bn' ? 'টি সেভ করা' : 'saved'}
          </span>
        </div>

        <div className="space-y-2">
          {vaultNotes.slice(0, 3).map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveTab('vault')}
              className="p-3.5 rounded-2xl bg-[#fffdf0] border border-amber-200 hover:border-amber-400 transition-all cursor-pointer shadow-sm flex items-center justify-between gap-3 tap-active"
            >
              <div className="space-y-1 truncate">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black text-red-800 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                    {language === 'bn' ? (note.subjectBn || note.subject) : note.subject}
                  </span>
                  <span className="text-[10px] text-amber-700/80 font-medium">{note.date}</span>
                </div>
                <h5 className="text-xs font-black text-slate-900 truncate">
                  {note.title}
                </h5>
                <p className="text-[11px] text-slate-600 truncate font-medium">
                  {note.summary}
                </p>
              </div>

              <div className="w-8 h-8 rounded-xl bg-amber-100/80 text-amber-700 flex items-center justify-center text-xs font-black shrink-0 border border-amber-300">
                🎧
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
