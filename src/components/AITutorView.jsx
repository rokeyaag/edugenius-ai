import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NCTB_PRESET_SCANS } from '../utils/nctbData';
import { 
  Camera, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Save, 
  RefreshCw, 
  ChevronRight,
  FileText,
  GraduationCap,
  BookOpen,
  ChevronDown,
  Plus,
  Search,
  X,
  FileUp,
  Layers
} from 'lucide-react';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';

const PDF_PRESET_SCANS = [
  {
    id: 'pdf-c9-bangla',
    isPdf: true,
    fileType: 'PDF Document (18 Pages)',
    classId: 'class-9',
    subject: 'Bangla Literature & Sohopath',
    subjectBn: 'বাংলা সাহিত্য ও সহপাঠ',
    subjectId: 'bangla-sahitya',
    titleBn: '📄 NCTB ৯ম-১০ম বাংলা সহপাঠ: ‘কাকতাড়ুয়া’ ও ‘বহিপীর’.pdf',
    titleEn: '📄 NCTB Class 9-10 Bangla Sohopath: Kaktarua & Bohipir.pdf',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    detectedTextBn: 'PDF পৃষ্ঠা ১-১৮: সেলিনা হোসেনের ‘কাকতাড়ুয়া’ উপন্যাস এবং সৈয়দ ওয়ালীউল্লাহর ‘বহিপীর’ নাটক। মূল চরিত্র: বুধা, তাহেরা, বহিপীর, হাতেম আলী।',
    detectedTextEn: 'PDF Pages 1-18: Kaktarua novel and Bohipir drama with key characters and dialogues.',
    solutionBn: '১. কাকতাড়ুয়া: মুক্তিযুদ্ধভিত্তিক উপন্যাস। কিশোর বুধা সাহসী ভূমিকা রেখে পাকিস্তানি হানাদার ক্যাম্প মাইন দিয়ে উড়িয়ে দেয়।\n২. বহিপীর: কুসংস্কার ও অসম বিবাহের বিরুদ্ধে নারীর দৃঢ় প্রতিবাদী চরিত্র তাহেরা।\n৩. বোর্ড পরীক্ষার জন্য গুরুত্বপূর্ণ অনুধাবন ও সৃজনশীল প্রশ্নসমূহ চিহ্নিত করা হয়েছে।',
    solutionEn: '1. Kaktarua: Liberation War novel showing teenager Budha\'s bravery.\n2. Bohipir: Social drama protesting superstitious forced marriages.\n3. Essential exam CQ & MCQ questions extracted.',
    formula: 'উপন্যাস: কাকতাড়ুয়া | নাটক: বহিপীর',
    chapterBn: 'বাংলা সহপাঠ (উপন্যাস ও নাটক)',
    chapterEn: 'Bangla Sohopath'
  },
  {
    id: 'pdf-c9-phys',
    isPdf: true,
    fileType: 'PDF Document (14 Pages)',
    classId: 'class-9',
    subject: 'Physics',
    subjectBn: 'পদার্থবিজ্ঞান',
    subjectId: 'physics',
    titleBn: '📄 NCTB ৯ম-১০ম পদার্থবিজ্ঞান অধ্যায় ৩: বল ও নিউটনের সূত্র.pdf',
    titleEn: '📄 NCTB Class 9-10 Physics Chapter 3: Force & Laws.pdf',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80',
    detectedTextBn: 'PDF পৃষ্ঠা ১-১৪: বল, জড়তা, ভরবেগ, নিউটনের গতিসূত্রাবলী ও মহাকর্ষ বলের গাণিতিক সমস্যাবলি।',
    detectedTextEn: 'PDF Pages 1-14: Force, Inertia, Momentum, Newton\'s Laws of Motion & Gravitation Equations.',
    solutionBn: '১. সম্পূর্ণ অধ্যায়ের মূল সামারি: বলের প্রকারভেদ (স্পর্শ ও অস্পর্শ বল), ঘর্ষণ বল ও জড়তা।\n২. গাণিতিক সূত্রাবলী: F = ma, v = u + at, s = ut + ½at²\n৩. সৃজনশীল প্রশ্নের মূল টিপস: ভরবেগ সংরক্ষণশীলতা নীতি (m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂) এর অংক বোর্ড পরীক্ষায় বেশি আসে।',
    solutionEn: '1. Chapter Summary: Types of forces, inertia, friction, and momentum conservation.\n2. Key Equations: F = ma, v = u + at, s = ut + ½at²\n3. Board Exam CQ Tip: Momentum conservation problems (m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂) are heavily tested.',
    formula: 'm₁u₁ + m₂u₂ = m₁v₁ + m₂v₂',
    chapterBn: 'অধ্যায় ৩: বল (NCTB PDF Book)',
    chapterEn: 'Chapter 3: Force (NCTB PDF Book)'
  }
];

export default function AITutorView() {
  const { 
    saveToVault, 
    isScannerOpen, 
    setActiveTab, 
    earnPoints, 
    language, 
    selectedClass, 
    setSelectedClass,
    classes,
    currentClassObj,
    setIsAddSubjectModalOpen,
    showToast,
    t 
  } = useApp();

  const subjectsList = currentClassObj?.subjects || [];
  const [activeMode, setActiveMode] = useState(isScannerOpen ? 'scanner' : 'scanner');
  const [selectedSubIdForUpload, setSelectedSubIdForUpload] = useState(subjectsList[0]?.id || 'bangla-sahitya');
  const [selectedChapterTitle, setSelectedChapterTitle] = useState('all');
  const [chapterSearchQuery, setChapterSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [tutorPersona, setTutorPersona] = useState('socratic');
  
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: language === 'bn' 
        ? `হ্যালো! আমি তোমার ${currentClassObj.nameBn.split(' (')[0]} এর AI টিউটর। পাঠ্যবইয়ের পাতার ছবি তোলো, PDF লেকচার শিট আপলোড করো বা যেকোনো প্রশ্ন নিচে লেখো!` 
        : `Hello! I am your AI Tutor for ${currentClassObj.nameEn}. Snap a textbook photo, upload a PDF file, or ask any question!`,
      time: '10:30 AM',
      hints: language === 'bn' 
        ? ['বাংলা সহপাঠ ‘কাকতাড়ুয়া’ উপন্যাসের মূল ভাব বুঝিয়ে দাও', 'নিউটনের ৩য় সূত্র বাংলায় বুঝিয়ে দাও', 'বোর্ড পরীক্ষার পড়ার রুটিন দাও'] 
        : ['Explain Bangla Sohopath Kaktarua', 'Explain Newton\'s 3rd law with examples', 'SSC Board exam study plan']
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Group subjects by category (Core, Science, Commerce, Arts, etc.)
  const groupedSubjects = subjectsList.reduce((acc, sub) => {
    const grp = sub.group || 'সাধারণ';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(sub);
    return acc;
  }, {});

  const handleScanSample = (sample) => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult(sample);
    }, 1300);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdfFile = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      const targetSub = subjectsList.find(s => s.id === selectedSubIdForUpload) || subjectsList[0];

      const customSample = {
        id: `custom-${Date.now()}`,
        classId: selectedClass,
        isPdf: isPdfFile,
        fileType: isPdfFile ? 'PDF Document Upload' : 'Image Scan',
        subject: targetSub?.nameEn || 'General Study',
        subjectBn: targetSub?.nameBn || 'সাধারণ পাঠ',
        subjectId: targetSub?.id,
        titleBn: isPdfFile ? `📄 ${file.name}` : `📸 ${targetSub?.nameBn || 'পাঠ্যবই'} - ${file.name}`,
        titleEn: isPdfFile ? `📄 ${file.name}` : `📸 ${targetSub?.nameEn || 'Textbook'} - ${file.name}`,
        image: isPdfFile 
          ? 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80' 
          : URL.createObjectURL(file),
        detectedTextBn: isPdfFile 
          ? `আপনার আপলোড করা "${file.name}" PDF ফাইল থেকে "${targetSub?.nameBn || ''}" বিষয়ের সমস্ত অধ্যায়ের সূত্র ও বিষয়বস্তু সফলভাবে রিড করা হয়েছে।` 
          : `আপনার আপলোড করা ছবি থেকে "${targetSub?.nameBn || ''}" বিষয়ের মূল বিষয়বস্তু আলাদা করা হয়েছে।`,
        detectedTextEn: isPdfFile 
          ? `Successfully extracted all topics & formulas from "${file.name}" PDF for ${targetSub?.nameEn || ''}.` 
          : `Key concepts and formulas extracted from your uploaded image for ${targetSub?.nameEn || ''}.`,
        solutionBn: isPdfFile 
          ? `১. "${targetSub?.nameBn || 'বিষয়'}" এর জন্য সম্পূর্ণ PDF ডকুমেন্টের অধ্যায়ভিত্তিক সারসংক্ষেপ তৈরি হয়েছে।\n২. গুরুত্বপূর্ণ সূত্র ও অনুশীলনী আলাদা করে মার্ক করা হয়েছে।\n৩. এই PDF নোটটি আপনার ভল্টে সেভ করে আজীবনের জন্য রিভিশন দিতে পারবেন।` 
          : `১. পৃষ্ঠা থেকে মূল সংজ্ঞা ও সূত্রসমূহ শনাক্ত করা হয়েছে।\n২. সহজ ভাষায় ব্যাখ্যা প্রস্তুত করা হয়েছে।\n৩. এই নোটটি আপনার ভল্টে সংরক্ষণ করে আজীবন রিভিশন দিতে পারেন।`,
        solutionEn: isPdfFile 
          ? `1. Chapter summary generated from the PDF for ${targetSub?.nameEn || 'Subject'}.\n2. Important formulas and practice exercises highlighted.\n3. Saved to your Vault to revise anytime forever.` 
          : '1. Core definitions and equations extracted successfully.\n2. Step-by-step conceptual explanation prepared.\n3. Save to your Vault to revise anytime forever.',
        formula: isPdfFile ? 'PDF Chapter Key Formulas & Notes' : 'Exam Key Notes & Equations',
        chapterBn: isPdfFile ? 'PDF ফাইল নোটস' : 'পাঠ্যবই অনুশীলন',
        chapterEn: isPdfFile ? 'PDF File Notes' : 'Textbook Practice'
      };
      handleScanSample(customSample);
    }
  };

  const handleSaveToVault = () => {
    if (!scanResult) return;
    const targetSub = subjectsList.find(s => s.id === scanResult.subjectId || s.id === selectedSubIdForUpload) || subjectsList[0];

    saveToVault({
      title: language === 'bn' ? (scanResult.titleBn || scanResult.title) : (scanResult.titleEn || scanResult.title),
      subject: targetSub?.nameEn || scanResult.subject || 'General Study',
      subjectBn: targetSub?.nameBn || scanResult.subjectBn || 'সাধারণ পাঠ',
      subjectId: targetSub?.id || scanResult.subjectId,
      classId: selectedClass,
      summary: language === 'bn' ? (scanResult.solutionBn || scanResult.solution) : (scanResult.solutionEn || scanResult.solution),
      formula: scanResult.formula,
      scannedImage: scanResult.image,
      tags: [
        currentClassObj?.nameEn || 'Class', 
        targetSub?.nameBn || 'Subject', 
        scanResult.isPdf ? 'PDF Note' : 'Book Scan'
      ]
    });

    // Directly open the Vault so the user immediately sees it!
    setActiveTab('vault');
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuestion;
    if (!query.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: 'Just now'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputQuestion('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      if (language === 'bn') {
        if (tutorPersona === 'socratic') {
          reply = `চমৎকার প্রশ্ন! সরাসরি উত্তর দেওয়ার আগে ভাবো: "${query}" বিষয়টিতে ${currentClassObj.nameBn.split(' (')[0]} এর মূল সূত্র বা শর্তটি কী ছিল? তুমি কি মনে করতে পারছ?`;
        } else if (tutorPersona === 'exam') {
          reply = `বোর্ড পরীক্ষার পয়েন্ট অব ভিউ থেকে "${query}" অত্যন্ত গুরুত্বপূর্ণ! খাতার মার্জিনের পাশে এই ৩টি মূল পয়েন্ট বুলেট আকারে লিখে রাখো।`;
        } else {
          reply = `খুব সহজভাবে বুঝিয়ে দিচ্ছি: "${query}" বিষয়টি বুঝতে হলে পাঠ্যবইয়ের বাস্তব উদাহরণ চিন্তা করো। বিস্তারিত তোমার ভল্টেও সেভ করে রাখতে পারো!`;
        }
      } else {
        if (tutorPersona === 'socratic') {
          reply = `Great question! Before giving the direct answer, think: What is the fundamental rule or formula regarding "${query}" in ${currentClassObj.nameEn}?`;
        } else if (tutorPersona === 'exam') {
          reply = `From a board exam perspective, "${query}" is very important! Write down these 3 key points in bullet format.`;
        } else {
          reply = `Here is a clear explanation of "${query}". You can also save these notes to your Knowledge Vault!`;
        }
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: reply,
          time: 'Just now',
          hints: language === 'bn' 
            ? ['আরো বিস্তারিত ব্যাখ্যা করো', 'একটি বাস্তব উদাহরণ দাও', 'এখান থেকে ৩টি MCQ প্রশ্ন দাও']
            : ['Explain in more detail', 'Give a real-world example', 'Generate 3 MCQs from this']
        }
      ]);
      setIsThinking(false);
      earnPoints(2, language === 'bn' ? 'AI প্রশ্ন জিজ্ঞাসা করা হয়েছে' : 'AI Question Asked');
    }, 1000);
  };

  const availableChapters = NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubIdForUpload] || [];
  const filteredChapters = availableChapters.filter(ch => {
    if (!chapterSearchQuery.trim()) return true;
    return (ch.title || '').toLowerCase().includes(chapterSearchQuery.toLowerCase());
  });

  return (
    <div className="space-y-4 pb-24 pt-2">
      
      {/* 1. Class, Subject & Chapter Selector Card */}
      <div className="p-3.5 rounded-3xl bg-white border-2 border-red-100 space-y-3 shadow-sm">
        
        {/* ================= 1ST LINE: CLASS SELECTOR (শ্রেণি নির্বাচন) ================= */}
        <div className="space-y-1.5 pb-2.5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-red-600" />
              <span>শ্রেণি নির্বাচন করুন (Class):</span>
            </label>
          </div>

          <div className="relative">
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                const matchedClass = (classes || []).find(c => c.id === e.target.value);
                const firstSubId = matchedClass?.subjects?.[0]?.id || 'bangla-sahitya';
                setSelectedSubIdForUpload(firstSubId);
                setSelectedChapterTitle('all');
                setChapterSearchQuery('');
                showToast(`🎓 ${matchedClass?.nameBn || e.target.value} সিলেক্ট করা হয়েছে`, 'info');
              }}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-2xl pl-3.5 pr-9 py-2.5 text-xs text-slate-900 font-black focus:outline-none focus:border-red-500 shadow-sm transition-all cursor-pointer"
            >
              {(classes || []).map((cls) => (
                <option key={cls.id} value={cls.id}>
                  🎓 {cls.nameBn} — ({cls.subjects?.length || 0}টি বিষয়)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ================= 2ND LINE: SUBJECT SELECTOR (বিষয় নির্বাচন) ================= */}
        <div className="space-y-1.5 pb-2.5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-slate-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>বিষয় নির্বাচন করুন (Subject):</span>
            </label>
            <button
              onClick={() => setIsAddSubjectModalOpen(true)}
              className="text-[10px] font-bold text-red-700 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-lg border border-red-200 tap-active flex items-center gap-0.5"
              title="Add Custom Subject"
            >
              <Plus className="w-3 h-3" />
              <span>বিষয় যোগ</span>
            </button>
          </div>

          <div className="relative">
            <select
              value={selectedSubIdForUpload}
              onChange={(e) => {
                setSelectedSubIdForUpload(e.target.value);
                setSelectedChapterTitle('all');
                setChapterSearchQuery('');
              }}
              className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-2xl pl-3.5 pr-9 py-2.5 text-xs text-slate-900 font-black focus:outline-none focus:border-red-500 shadow-sm transition-all cursor-pointer"
            >
              {Object.entries(groupedSubjects).map(([groupName, groupSubs]) => (
                <optgroup key={groupName} label={`--- ${groupName} (${groupSubs.length}টি বিষয়) ---`}>
                  {groupSubs.map((sub) => {
                    const chCount = NCTB_FULL_BOOK_CHAPTERS_MAP[sub.id]?.length || (sub.id === 'bangla-sahitya' ? 50 : 3);
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.icon || '📖'} {language === 'bn' ? sub.nameBn : sub.nameEn} ({chCount}টি অধ্যায়)
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* ================= 3RD LINE: CHAPTER SELECTOR (অধ্যায় তালিকা) ================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-amber-950 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-700" />
              <span>[{subjectsList.find(s => s.id === selectedSubIdForUpload)?.nameBn || 'নির্বাচিত বিষয়'}]-এর সম্পূর্ণ অধ্যায় তালিকা:</span>
            </label>
          </div>

          {/* Chapter Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedChapterTitle}
              onChange={(e) => setSelectedChapterTitle(e.target.value)}
              className="w-full appearance-none bg-amber-50/70 hover:bg-amber-100/70 border border-amber-300 rounded-2xl pl-3.5 pr-9 py-2.5 text-xs text-amber-950 font-black focus:outline-none focus:border-amber-500 shadow-sm transition-all cursor-pointer"
            >
              <option value="all">
                🌟 [{subjectsList.find(s => s.id === selectedSubIdForUpload)?.nameBn || 'এই বিষয়ের'}] সকল {availableChapters.length}টি অধ্যায় দেখুন
              </option>
              {filteredChapters.map((ch, idx) => (
                <option key={ch.id || idx} value={ch.title}>
                  📖 {ch.title}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-700 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Instant Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-amber-600 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={chapterSearchQuery}
              onChange={(e) => setChapterSearchQuery(e.target.value)}
              placeholder={`[${subjectsList.find(s => s.id === selectedSubIdForUpload)?.nameBn || 'অধ্যায়'}] এর নাম লিখে খুঁজুন...`}
              className="w-full bg-white border border-amber-200 rounded-2xl pl-9 pr-8 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 transition-all font-medium shadow-inner"
            />
            {chapterSearchQuery && (
              <button
                onClick={() => setChapterSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* COMPREHENSIVE ACTION TOOLBAR (PDF আপলোড, বই স্ক্যানার, AI টিউটর) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-2">
        <label className="p-2.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active cursor-pointer">
          <FileUp className="w-4 h-4 text-red-900" />
          <span className="text-[10px] font-black">PDF আপলোড</span>
          <input 
            type="file" 
            accept=".pdf,application/pdf" 
            className="hidden" 
            onChange={handleCustomUpload}
          />
        </label>

        <label className="p-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active cursor-pointer">
          <Camera className="w-4 h-4 text-amber-200" />
          <span className="text-[10px] font-black">বই স্ক্যানার</span>
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            className="hidden" 
            onChange={handleCustomUpload}
          />
        </label>

        <button
          onClick={() => setActiveMode('chat')}
          className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active ${
            activeMode === 'chat' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-300" />
          <span className="text-[10px] font-black">AI টিউটর চ্যাট</span>
        </button>
      </div>

      {/* Mode Switcher Header */}
      <div className="flex items-center justify-between bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveMode('scanner')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${
            activeMode === 'scanner'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4 text-amber-300" />
          <span>{t('tabScanner')}</span>
        </button>

        <button
          onClick={() => setActiveMode('chat')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-black transition-all ${
            activeMode === 'chat'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-4 h-4 text-amber-300" />
          <span>{t('tabTutor')}</span>
        </button>
      </div>

      {/* ================= MODE 1: BOOK & PDF SCANNER ================= */}
      {activeMode === 'scanner' && (
        <div className="space-y-4">
          
          {/* Scanner Action Box */}
          <div className="relative overflow-hidden rounded-3xl p-5 bg-white border-2 border-red-100 text-center space-y-4 shadow-sm">
            
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('scanTitle')}</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                {t('scanDesc')}
              </p>
            </div>

            {/* Target Subject Selector with Clean Category Optgroups */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-1.5 max-w-sm mx-auto">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black text-slate-700 flex items-center gap-1">
                  <span>📌 কোন বিষয়ে আপলোড করবেন?</span>
                </label>
                <span className="text-[10px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded-full border border-red-200">
                  {subjectsList.length}টি বিষয়
                </span>
              </div>
              
              <select
                value={selectedSubIdForUpload}
                onChange={(e) => setSelectedSubIdForUpload(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-red-500 shadow-sm"
              >
                {Object.entries(groupedSubjects).map(([groupName, groupSubs]) => (
                  <optgroup key={groupName} label={`--- ${groupName} ---`}>
                    {groupSubs.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.icon || '📖'} {language === 'bn' ? sub.nameBn : sub.nameEn}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Dual Upload Triggers: Camera Photo + PDF File */}
            <div className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
              
              {/* Photo Upload */}
              <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xs font-black shadow-md cursor-pointer transition-all tap-active">
                <Camera className="w-4 h-4 text-amber-300" />
                <span>{language === 'bn' ? '📸 ছবি তুলুন' : '📸 Snap Photo'}</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleCustomUpload}
                />
              </label>

              {/* PDF Document Upload */}
              <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black shadow-md cursor-pointer transition-all tap-active border border-amber-300">
                <FileText className="w-4 h-4 text-red-700" />
                <span>{language === 'bn' ? '📄 PDF আপলোড' : '📄 Upload PDF'}</span>
                <input 
                  type="file" 
                  accept=".pdf,application/pdf" 
                  className="hidden" 
                  onChange={handleCustomUpload}
                />
              </label>

            </div>

            {/* PDF & NCTB Sample Presets */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-500">{t('orPresetText')}</p>
              
              {/* PDF Samples */}
              <div className="flex flex-col gap-1.5 max-w-xs mx-auto">
                {PDF_PRESET_SCANS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleScanSample(preset)}
                    className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] font-bold text-amber-950 transition-all tap-active flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-red-600 shrink-0" />
                      <span className="truncate max-w-[200px]">
                        {language === 'bn' ? preset.titleBn : preset.titleEn}
                      </span>
                    </div>
                    <span className="text-[9px] bg-amber-200/80 px-1.5 py-0.5 rounded font-black text-amber-900 shrink-0">
                      PDF
                    </span>
                  </button>
                ))}
              </div>

              {/* Regular Book Page Samples */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {NCTB_PRESET_SCANS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleScanSample(preset)}
                    className="py-1 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 hover:text-slate-900 transition-all tap-active flex items-center gap-1"
                  >
                    <span>{preset.subjectBn.includes('বাংলা') ? '📚' : preset.subjectBn.includes('পদার্থ') ? '⚛️' : '📐'}</span>
                    <span>{preset.titleBn.split(': ')[1] || preset.titleBn}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scanning State */}
          {isScanning && (
            <div className="p-6 rounded-3xl bg-white border border-amber-300 flex flex-col items-center justify-center text-center space-y-3 shadow-md relative overflow-hidden">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent top-0 animate-bounce"></div>
              <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-slate-900">{t('scanningText')}</h4>
                <p className="text-[11px] text-slate-600">Reading PDF Pages & Extracting Chapter Summary & Formulas</p>
              </div>
            </div>
          )}

          {/* Scan Results Card */}
          {scanResult && !isScanning && (
            <div className="rounded-3xl p-5 bg-white border border-slate-200 space-y-4 shadow-md animate-in fade-in duration-300">
              
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
                    {scanResult.isPdf ? '📄' : '📸'}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                      ✓ {scanResult.isPdf ? 'PDF Processed' : 'NCTB OCR Extracted'}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-1">
                      {language === 'bn' ? scanResult.titleBn : scanResult.titleEn}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-700">{t('detectedTextLabel')}</span>
                <p className="text-xs text-slate-700 font-mono leading-relaxed line-clamp-3">
                  "{language === 'bn' ? scanResult.detectedTextBn : scanResult.detectedTextEn}"
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-black text-red-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('solutionLabel')}</span>
                </h5>
                <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100 text-xs text-slate-900 leading-relaxed whitespace-pre-line font-medium">
                  {language === 'bn' ? scanResult.solutionBn : scanResult.solutionEn}
                </div>
              </div>

              {scanResult.formula && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900">{t('formulaLabel')}</span>
                  <code className="text-xs font-black text-amber-950 font-mono bg-white px-2 py-1 rounded-lg border border-amber-300">
                    {scanResult.formula}
                  </code>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSaveToVault}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md transition-all tap-active"
                >
                  <Save className="w-4 h-4" />
                  <span>{t('btnSaveVault')}</span>
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all tap-active"
                >
                  <span>{t('btnPracticeQuiz')}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ================= MODE 2: SOCRATIC AI TUTOR CHAT ================= */}
      {activeMode === 'chat' && (
        <div className="space-y-4">
          
          <div className="flex items-center gap-2 px-1">
            <span className="text-xs text-slate-500 font-semibold">{t('tutorStyle')}</span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'socratic', label: t('tutorSocratic') },
                { id: 'friendly', label: t('tutorFriendly') },
                { id: 'exam', label: t('tutorExam') },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setTutorPersona(p.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-full font-black transition-all ${
                    tutorPersona === p.id
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 min-h-[280px] max-h-[420px] overflow-y-auto pr-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed space-y-2 font-medium ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-br-none shadow-md font-semibold'
                      : 'bg-slate-50 text-slate-900 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.hints && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-200">
                      {msg.hints.map((hint, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(hint)}
                          className="text-[10px] bg-white hover:bg-slate-100 text-red-700 px-2 py-1 rounded-lg border border-red-200 transition-all text-left font-bold shadow-sm"
                        >
                          💬 {hint}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-amber-700 italic py-1 font-bold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>{t('aiThinking')}</span>
              </div>
            )}
          </div>

          <div className="sticky bottom-16 bg-white p-2 rounded-2xl border border-slate-200 shadow-xl flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('chatPlaceholder')}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuestion.trim()}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 disabled:opacity-40 flex items-center justify-center text-white transition-all tap-active shrink-0 shadow-md"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
