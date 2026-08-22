import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NCTB_CLASSES } from '../utils/nctbData';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';
import { 
  GraduationCap, 
  BookOpen, 
  CheckSquare, 
  Square, 
  RefreshCw, 
  Printer, 
  Copy, 
  Check, 
  Sparkles, 
  FileText, 
  Layers, 
  Sliders, 
  Eye, 
  EyeOff, 
  School, 
  Clock, 
  Award,
  ChevronDown,
  HelpCircle,
  Settings2,
  Share2
} from 'lucide-react';

export default function TeacherPortalView() {
  const { currentClass, currentClassId, showToast, language } = useApp();

  // 1. Selection State
  const [selectedClassId, setSelectedClassId] = useState(currentClassId || 'class-9');
  const [selectedSubjectId, setSelectedSubjectId] = useState('bangla-sahitya');
  const [selectedChapterIds, setSelectedChapterIds] = useState(['bs-g1', 'bs-g2', 'bs-g6']);
  const [selectedTemplate, setSelectedTemplate] = useState('cq-board'); // 'cq-board', 'mcq-test', 'class-test', 'knowledge-drill', 'final-exam'

  // 2. Exam Header Customization State
  const [schoolName, setSchoolName] = useState('রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ');
  const [examTitle, setExamTitle] = useState('১ম সাময়িক মূল্যায়ন পরীক্ষা — ২০২৬');
  const [examTime, setExamTime] = useState('২ ঘণ্টা ৩০ মিনিট');
  const [totalMarks, setTotalMarks] = useState('৭০');
  const [difficulty, setDifficulty] = useState('board'); // 'easy', 'board', 'hard'
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [refreshKey, setRefreshKey] = useState(1);
  const [copied, setCopied] = useState(false);
  const [activeTabSub, setActiveTabSub] = useState('builder'); // 'builder' | 'preview'

  // Current selected class object & subjects
  const classObj = NCTB_CLASSES.find(c => c.id === selectedClassId) || NCTB_CLASSES[3];
  const availableSubjects = classObj?.subjects || [];

  // Available chapters for the selected subject
  const availableChapters = useMemo(() => {
    return NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubjectId] || NCTB_FULL_BOOK_CHAPTERS_MAP['bangla-sahitya'] || [];
  }, [selectedSubjectId]);

  // Handle Select All / Clear All Chapters
  const handleSelectAllChapters = () => {
    setSelectedChapterIds(availableChapters.map(c => c.id));
    showToast('সবগুলো অধ্যায় নির্বাচন করা হয়েছে', 'success');
  };

  const handleClearAllChapters = () => {
    setSelectedChapterIds([]);
    showToast('অধ্যায় নির্বাচন মুছে ফেলা হয়েছে', 'info');
  };

  const handleToggleChapter = (chId) => {
    setSelectedChapterIds(prev => 
      prev.includes(chId) ? prev.filter(id => id !== chId) : [...prev, chId]
    );
  };

  // Selected Chapter Objects
  const chosenChapters = useMemo(() => {
    const list = availableChapters.filter(c => selectedChapterIds.includes(c.id));
    return list.length > 0 ? list : availableChapters.slice(0, 3);
  }, [availableChapters, selectedChapterIds, refreshKey]);

  // 5 Ready Sample Templates Definition
  const SAMPLE_TEMPLATES = [
    {
      id: 'cq-board',
      title: '🎯 সৃজনশীল প্রশ্নপত্র (CQ Model)',
      badge: 'বোর্ড স্ট্যান্ডার্ড',
      desc: 'উদ্দীপক + ক (জ্ঞান), খ (অনুধাবন), গ (প্রয়োগ), ঘ (উচ্চতর দক্ষতা)',
      marks: '৭০',
      time: '২ ঘণ্টা ৩০ মিনিট',
      icon: '📝'
    },
    {
      id: 'mcq-test',
      title: '⚡ নৈর্ব্যক্তিক পরীক্ষা (MCQ Sheet)',
      badge: '৩০টি প্রশ্ন',
      desc: '৪ অপশন বিশিষ্ট বোর্ড স্ট্যান্ডার্ড বহুনির্বাচনী ও উত্তরপত্র',
      marks: '৩০',
      time: '৩০ মিনিট',
      icon: '🔘'
    },
    {
      id: 'class-test',
      title: '📋 অধ্যায়ভিত্তিক ক্লাস টেস্ট',
      badge: 'কুইক টেস্ট',
      desc: '৫টি জ্ঞানমূলক + ৫টি অনুধাবনমূলক + ১টি সৃজনশীল প্রশ্ন',
      marks: '২০',
      time: '৪৫ মিনিট',
      icon: '⏱️'
    },
    {
      id: 'knowledge-drill',
      title: '💡 জ্ঞান ও অনুধাবন ড্রিল',
      badge: 'স্পেশাল কুইজ',
      desc: 'ক ও খ নম্বরের ২০টি সর্বোচ্চ নম্বর নিশ্চিতকরণ প্রশ্ন',
      marks: '২৫',
      time: '৪০ মিনিট',
      icon: '💡'
    },
    {
      id: 'final-exam',
      title: '🏆 বার্ষিক ও সাময়িক পূর্ণাঙ্গ মডেল টেস্ট',
      badge: '১০০ নম্বর',
      desc: 'সৃজনশীল (৭০) + বহুনির্বাচনী (৩০) সমন্বিত পূর্ণাঙ্গ প্রশ্নপত্র',
      marks: '১০০',
      time: '৩ ঘণ্টা',
      icon: '📜'
    }
  ];

  // Generate Questions dynamically from chosen chapters
  const generatedPaper = useMemo(() => {
    if (!chosenChapters.length) return null;

    // Build CQ questions
    const cqQuestions = chosenChapters.map((ch, idx) => {
      const qNum = ['১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'][idx] || (idx + 1);
      const st = ch.selfTest || [];
      const note = ch.lectureNotes || [];
      
      const qKa = st[0]?.q?.replace(/[০-৯১-৫\.\‘\’\?]/g, '').trim() || 'উক্ত রচনার মূল বক্তব্য কী?';
      const qKha = note[1]?.detail || 'উক্ত ঘটনাটির তাৎপর্য ও মূলভাব ব্যাখ্যা করো।';

      return {
        num: qNum,
        chapter: ch.title,
        stem: `দৃশ্যপট: গ্রামের এক নিঃস্ব পরিবারে চরম বিপর্যয়ের মুখে এক প্রতিবেশী নিজের জীবনের ঝুঁকি নিয়ে তাদের পাশে দাঁড়ায়। কিন্তু পরবর্তীতে সমাজ তাদের উপকারের কথা ভুলে গিয়ে উল্টো অপবাদ দেয়।`,
        parts: [
          { label: 'ক', marks: '১', q: `‘${ch.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()}’ সম্পর্কিত: ${qKa}?`, ans: st[0]?.options?.[st[0]?.correct] || 'পাঠ্যবইয়ের সঠিক তথ্য অনুযায়ী।' },
          { label: 'খ', marks: '২', q: `“${note[0]?.title || 'মূলভাব'}”— বলতে কী বোঝানো হয়েছে? বুঝিয়ে লেখো।`, ans: qKha },
          { label: 'গ', marks: '৩', q: `উদ্দীপকের ঘটনাটি ‘${ch.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()}’ রচনার কোন দিকের সাথে সাদৃশ্যপূর্ণ? ব্যাখ্যা করো।`, ans: 'উপকার স্বীকার ও প্রতিদানের দিকটি পরিস্ফুটিত হয়েছে।' },
          { label: 'ঘ', marks: '৪', q: `“উদ্দীপকটি যেন ‘${ch.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()}’ রচনার মূল শিক্ষাকেই প্রতিফলিত করে”— উক্তিটির যথার্থতা মূল্যায়ন করো।`, ans: 'উক্তিটি সম্পূর্ণ যথার্থ কারণ উভয় ক্ষেত্রেই মানবতার জয়গান ও আত্মত্যাগের কথা বলা হয়েছে।' }
        ]
      };
    });

    // Build MCQ questions
    const mcqQuestions = chosenChapters.flatMap((ch, cIdx) => {
      const st = ch.selfTest || [];
      return st.map((s, sIdx) => ({
        num: (cIdx * 5) + sIdx + 1,
        chapter: ch.title,
        question: s.q.replace(/^[০-৯১-৫\.]+\s*/, ''),
        options: s.options,
        correct: s.correct,
        explanation: s.explanation
      }));
    }).slice(0, selectedTemplate === 'mcq-test' ? 30 : selectedTemplate === 'final-exam' ? 30 : 15);

    // Build Knowledge Drill
    const drillQuestions = chosenChapters.flatMap((ch, cIdx) => {
      const st = ch.selfTest || [];
      const note = ch.lectureNotes || [];
      return [
        {
          num: (cIdx * 2) + 1,
          type: 'ক (জ্ঞানমূলক - ১ নম্বর)',
          q: `‘${ch.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()}’ রচয়িতা কে এবং উৎস কী?`,
          ans: `রচয়িতা ও উৎস: পাঠ্যবই অনুযায়ী ${ch.summary}`
        },
        {
          num: (cIdx * 2) + 2,
          type: 'খ (অনুধাবনমূলক - ২ নম্বর)',
          q: `${note[0]?.detail || 'উক্ত অধ্যায়ের মূল প্রতিপাদ্য বিষয় আলোচনা করো।'}`,
          ans: `মূল ব্যাখ্যা: ${ch.summary}`
        }
      ];
    });

    return {
      cqQuestions,
      mcqQuestions,
      drillQuestions
    };
  }, [chosenChapters, selectedTemplate, refreshKey]);

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // Copy Question Text
  const handleCopy = () => {
    if (!generatedPaper) return;
    let fullText = `${schoolName}\n${examTitle}\nশ্রেণি: ${classObj.nameBn} | বিষয়: ${availableSubjects.find(s => s.id === selectedSubjectId)?.nameBn || 'বাংলা'}\nসময়: ${examTime} | পূর্ণমান: ${totalMarks}\n------------------------------------------------\n\n`;

    if (selectedTemplate === 'cq-board' || selectedTemplate === 'final-exam') {
      fullText += `[সৃজনশীল অংশ — যেকোনো ৫টি প্রশ্নের উত্তর দাও]\n\n`;
      generatedPaper.cqQuestions.forEach((q, i) => {
        fullText += `প্রশ্ন নং ${q.num}:\n${q.stem}\n(ক) ${q.parts[0].q} [১]\n(খ) ${q.parts[1].q} [২]\n(গ) ${q.parts[2].q} [৩]\n(ঘ) ${q.parts[3].q} [৪]\n\n`;
      });
    }

    if (selectedTemplate === 'mcq-test' || selectedTemplate === 'final-exam') {
      fullText += `[বহুনির্বাচনী প্রশ্ন (MCQ)]\n\n`;
      generatedPaper.mcqQuestions.forEach((m, i) => {
        fullText += `${m.num}. ${m.question}\n(ক) ${m.options[0]} (খ) ${m.options[1]} (গ) ${m.options[2]} (ঘ) ${m.options[3]}\n\n`;
      });
    }

    if (selectedTemplate === 'knowledge-drill' || selectedTemplate === 'class-test') {
      fullText += `[জ্ঞান ও অনুধাবন প্রশ্ন]\n\n`;
      generatedPaper.drillQuestions.forEach((d, i) => {
        fullText += `${d.num}. [${d.type}] ${d.q}\n\n`;
      });
    }

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('সম্পূর্ণ প্রশ্নপত্র ক্লিপবোর্ডে কপি হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-4 pb-24 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white p-4 shadow-xl border border-red-900/40">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-2 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white tracking-tight">শিক্ষক প্যানেল ও প্রশ্ন মেকার</h1>
              <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-black border border-amber-400/30">
                NCTB 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">শ্রেণি, বিষয় ও অধ্যায় সিলেক্ট করে নিমেষেই রেডিমেড প্রশ্নপত্র তৈরি করুন</p>
          </div>
        </div>

        {/* Action switch tabs */}
        <div className="grid grid-cols-2 gap-2 mt-3 bg-white/10 p-1 rounded-2xl backdrop-blur-md text-xs font-black">
          <button
            onClick={() => setActiveTabSub('builder')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTabSub === 'builder'
                ? 'bg-white text-slate-900 shadow-md font-black'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>১. প্রশ্নপত্র কনফিগারেশন</span>
          </button>
          <button
            onClick={() => setActiveTabSub('preview')}
            className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTabSub === 'preview'
                ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                : 'text-slate-200 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>২. লাইভ প্রশ্নপত্র ও প্রিন্ট</span>
          </button>
        </div>
      </div>

      {activeTabSub === 'builder' && (
        <div className="space-y-4">

          {/* STEP 1: CLASS & SUBJECT SELECTOR */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black">১</span>
                <span>শ্রেণি ও বিষয় নির্বাচন:</span>
              </span>
              <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-lg">
                {classObj.nameBn}
              </span>
            </div>

            {/* Class Dropdown / Pills */}
            <div className="grid grid-cols-4 gap-1.5">
              {NCTB_CLASSES.map(cls => (
                <button
                  key={cls.id}
                  onClick={() => {
                    setSelectedClassId(cls.id);
                    setSelectedSubjectId(cls.subjects[0]?.id || 'bangla-sahitya');
                    showToast(`${cls.nameBn} সিলেক্ট করা হয়েছে`, 'info');
                  }}
                  className={`py-2 px-1 rounded-xl text-[11px] font-black text-center transition-all ${
                    selectedClassId === cls.id
                      ? 'bg-red-600 text-white shadow-md ring-2 ring-red-300'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cls.nameEn.replace('Class ', 'শ্রেণি ')}
                </button>
              ))}
            </div>

            {/* Subject Selector Pills */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-bold text-slate-500">বিষয় নির্বাচন করুন:</label>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {availableSubjects.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      showToast(`বিষয়: ${sub.nameBn}`, 'info');
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                      selectedSubjectId === sub.id
                        ? 'bg-slate-900 text-white shadow-md ring-2 ring-amber-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.nameBn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* STEP 2: MULTI-CHAPTER SELECTOR */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black">২</span>
                <span>অধ্যায় নির্বাচন (কয়টি অধ্যায় থেকে প্রশ্ন হবে):</span>
              </span>
              <span className="text-[10px] font-black text-slate-700 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                {selectedChapterIds.length}টি অধ্যায় সিলেক্টেড
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pb-1 border-b border-slate-100">
              <span>যে যে অধ্যায় থেকে প্রশ্ন নিতে চান টিক দিন:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSelectAllChapters}
                  className="text-red-600 hover:underline font-black"
                >
                  সব সিলেক্ট
                </button>
                <span>•</span>
                <button
                  onClick={handleClearAllChapters}
                  className="text-slate-500 hover:underline font-black"
                >
                  রিসেট
                </button>
              </div>
            </div>

            {/* Chapter selection list */}
            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {availableChapters.map(ch => {
                const isChecked = selectedChapterIds.includes(ch.id);
                return (
                  <div
                    key={ch.id}
                    onClick={() => handleToggleChapter(ch.id)}
                    className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-red-50/80 border-red-300 text-red-950 font-bold shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate mr-2">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-red-600 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                      <span className="truncate">{ch.title}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 shrink-0 font-black text-slate-600">
                      {ch.type || 'পাঠ্য'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 3: 5 READY SAMPLE QUESTION TEMPLATES */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-800 text-xs flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black">৩</span>
                <span>৫টি স্যাম্পল প্রশ্নপত্র ফরম্যাট (পছন্দ করুন):</span>
              </span>
              <span className="text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                ৫টি রেডি ফরম্যাট
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {SAMPLE_TEMPLATES.map(tpl => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl.id);
                      setTotalMarks(tpl.marks);
                      setExamTime(tpl.time);
                      showToast(`${tpl.title} ফরম্যাট নির্বাচিত`, 'success');
                    }}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-red-50 to-amber-50 border-red-400 ring-2 ring-red-400 shadow-md'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 font-black text-xs text-slate-900">
                        <span className="text-sm">{tpl.icon}</span>
                        <span>{tpl.title}</span>
                      </div>
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white border border-red-200 text-red-600 shadow-xs">
                        {tpl.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium pl-6">{tpl.desc}</p>
                    <div className="flex items-center gap-3 pl-6 mt-1.5 text-[10px] font-black text-slate-500">
                      <span>⏱️ {tpl.time}</span>
                      <span>•</span>
                      <span>🎯 পূর্ণমান: {tpl.marks}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 4: SCHOOL & EXAM HEADER SETTINGS */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <span className="font-black text-slate-800 text-xs flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[10px] font-black">৪</span>
              <span>পরীক্ষার হেডার ও সেটিংস:</span>
            </span>

            <div className="grid grid-cols-1 gap-2 text-xs font-bold">
              <div>
                <label className="text-[10px] text-slate-500 font-black block mb-0.5">স্কুল / শিক্ষা প্রতিষ্ঠানের নাম:</label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={e => setSchoolName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-xs font-bold text-slate-800"
                  placeholder="স্কুলের নাম লিখুন..."
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-500 font-black block mb-0.5">পরীক্ষার শিরোনাম:</label>
                <input
                  type="text"
                  value={examTitle}
                  onChange={e => setExamTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-xs font-bold text-slate-800"
                  placeholder="যেমন: অর্ধবার্ষিক পরীক্ষা ২০২৬"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-black block mb-0.5">সময়:</label>
                  <input
                    type="text"
                    value={examTime}
                    onChange={e => setExamTime(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-black block mb-0.5">পূর্ণমান:</label>
                  <input
                    type="text"
                    value={totalMarks}
                    onChange={e => setTotalMarks(e.target.value)}
                    className="w-full p-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action button to generate & view */}
          <button
            onClick={() => {
              setActiveTabSub('preview');
              showToast('প্রশ্নপত্র সফলভাবে তৈরি হয়েছে!', 'success');
            }}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2 tap-active"
          >
            <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
            <span>প্রশ্নপত্র প্রিভিউ ও প্রিন্ট দেখুন ➔</span>
          </button>

        </div>
      )}

      {activeTabSub === 'preview' && (
        <div className="space-y-4">

          {/* Control Bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setRefreshKey(prev => prev + 1);
                showToast('নতুন প্রশ্ন রিলোড করা হয়েছে!', 'info');
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-red-600" />
              <span>রিলোড প্রশ্ন</span>
            </button>

            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                showAnswerKey
                  ? 'bg-amber-400 text-slate-950 font-black ring-2 ring-amber-500'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {showAnswerKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showAnswerKey ? 'উত্তরমালা লুকান' : 'উত্তরমালা দেখুন'}</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি প্রশ্ন'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-amber-200" />
              <span>প্রিন্ট</span>
            </button>
          </div>

          {/* OFFICIAL BANGLADESH EXAM PAPER SHEET (PRINTABLE FORMAT) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-xl space-y-4 print:p-0 print:border-none print:shadow-none">
            
            {/* Header of Question Paper */}
            <div className="text-center pb-3 border-b-2 border-slate-900 space-y-1">
              <h2 className="text-lg font-black text-slate-950 tracking-tight">{schoolName}</h2>
              <p className="text-xs font-extrabold text-slate-800">{examTitle}</p>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-1">
                <span>শ্রেণি: {classObj.nameBn}</span>
                <span>বিষয়: {availableSubjects.find(s => s.id === selectedSubjectId)?.nameBn || 'বাংলা'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-t border-dotted border-slate-300 pt-1">
                <span>সময়: {examTime}</span>
                <span>পূর্ণমান: {totalMarks}</span>
              </div>
            </div>

            {/* Student Info Fillup Lines */}
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 pb-2 border-b border-dashed border-slate-300">
              <span>শিক্ষার্থীর নাম: ............................................</span>
              <span>রোল: ..............</span>
              <span>শাখা: ..............</span>
            </div>

            {/* Selected Chapters Note */}
            <div className="bg-slate-50 p-2 rounded-xl text-[10px] font-bold text-slate-600 flex items-center justify-between print:hidden">
              <span>অন্তর্ভুক্ত অধ্যায়: {chosenChapters.map(c => c.title.split('—')[0]).join(', ')}</span>
              <span className="text-red-600 font-black">{chosenChapters.length}টি অধ্যায়</span>
            </div>

            {/* SECTION 1: CREATIVE QUESTIONS (CQ) */}
            {(selectedTemplate === 'cq-board' || selectedTemplate === 'final-exam' || selectedTemplate === 'class-test') && generatedPaper && (
              <div className="space-y-4 pt-1">
                <div className="text-center">
                  <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                    [সৃজনশীল প্রশ্ন — যেকোনো {chosenChapters.length > 2 ? '৫' : chosenChapters.length}টি প্রশ্নের উত্তর দাও]
                  </span>
                </div>

                {generatedPaper.cqQuestions.map((q, idx) => (
                  <div key={idx} className="space-y-2 text-xs border-b border-slate-100 pb-3">
                    <div className="font-black text-slate-900 flex items-start gap-1">
                      <span>{q.num}.</span>
                      <p className="font-medium text-slate-800 leading-relaxed text-justify">{q.stem}</p>
                    </div>

                    <div className="space-y-1 pl-4">
                      {q.parts.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-1.5">
                            <span className="font-black text-slate-900">({p.label})</span>
                            <span className="text-slate-800 font-medium">{p.q}</span>
                          </div>
                          <span className="font-black text-slate-900 shrink-0">{p.marks}</span>
                        </div>
                      ))}
                    </div>

                    {/* Teacher's Answer Key View */}
                    {showAnswerKey && (
                      <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2 text-[11px] text-amber-950 font-medium space-y-1 animate-in fade-in">
                        <span className="font-black text-amber-800 block">💡 উত্তর সংকেত ({q.chapter}):</span>
                        {q.parts.map((p, pIdx) => (
                          <div key={pIdx} className="pl-2">
                            <span className="font-bold">({p.label}) </span>
                            <span>{p.ans}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* SECTION 2: MULTIPLE CHOICE (MCQ) */}
            {(selectedTemplate === 'mcq-test' || selectedTemplate === 'final-exam') && generatedPaper && (
              <div className="space-y-3 pt-2">
                <div className="text-center">
                  <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                    [বহুনির্বাচনী প্রশ্ন (MCQ) — সঠিক উত্তরের বৃত্ত ভরাট করো]
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2.5 text-xs">
                  {generatedPaper.mcqQuestions.map((m, idx) => (
                    <div key={idx} className="space-y-1 border-b border-slate-100 pb-2">
                      <div className="font-black text-slate-900 flex items-start gap-1">
                        <span>{m.num}.</span>
                        <span className="font-bold text-slate-800">{m.question}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 pl-4 text-[11px] text-slate-700">
                        {m.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-1">
                            <span className="font-bold text-slate-500">({['ক', 'খ', 'গ', 'ঘ'][optIdx]})</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Teacher's Answer Key View */}
                      {showAnswerKey && (
                        <div className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 mt-1">
                          ✓ সঠিক উত্তর: ({['ক', 'খ', 'গ', 'ঘ'][m.correct]}) {m.options[m.correct]} ({m.explanation})
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 3: KNOWLEDGE DRILL */}
            {(selectedTemplate === 'knowledge-drill') && generatedPaper && (
              <div className="space-y-3 pt-2">
                <div className="text-center">
                  <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full border border-slate-300">
                    [জ্ঞান ও অনুধাবনমূলক প্রশ্নাবলি — সকল প্রশ্নের উত্তর দাও]
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {generatedPaper.drillQuestions.map((d, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-2 space-y-0.5">
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex items-start gap-1 font-black text-slate-900">
                          <span>{d.num}.</span>
                          <span>{d.q}</span>
                        </div>
                        <span className="text-[10px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{d.type.split(' ')[0]}</span>
                      </div>

                      {showAnswerKey && (
                        <div className="text-[11px] font-medium text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-1">
                          💡 {d.ans}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paper End Footer */}
            <div className="text-center pt-4 border-t border-slate-300 text-[11px] font-black text-slate-500">
              — পরীক্ষা সমাপ্ত —
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
