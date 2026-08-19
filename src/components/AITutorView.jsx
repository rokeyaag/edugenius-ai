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
  Layers,
  Headphones,
  Play,
  Pause,
  Copy,
  Check,
  Zap,
  HelpCircle,
  Volume2,
  Award,
  BookMarked
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
  const [activeMode, setActiveMode] = useState(isScannerOpen ? 'scanner' : 'chat');
  const [selectedSubIdForUpload, setSelectedSubIdForUpload] = useState(subjectsList[0]?.id || 'bangla-sahitya');
  const [selectedChapterTitle, setSelectedChapterTitle] = useState('all');
  const [chapterSearchQuery, setChapterSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [tutorPersona, setTutorPersona] = useState('socratic'); // 'socratic' | 'exam' | 'quick'
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  
  const activeSubObj = subjectsList.find(s => s.id === selectedSubIdForUpload) || subjectsList[0];
  const activeSubName = language === 'bn' ? (activeSubObj?.nameBn || 'বিষয়') : (activeSubObj?.nameEn || 'Subject');

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: language === 'bn' 
        ? `👋 স্বাগতম! আমি তোমার ${currentClassObj?.nameBn ? currentClassObj.nameBn.split(' (')[0] : '৯ম-১০ম শ্রেণি'} এর ডেডিকেটেড AI টিউটর।\n\n📌 পাঠ্যবইয়ের পাতার ছবি তোলো, সম্পূর্ণ PDF আপলোড করো অথবা নিচের রেডিমেড প্রম্পটে ক্লিক করে যেকোনো জটিল টপিক সহজ ভাষায় শিখে নাও!` 
        : `👋 Welcome! I am your dedicated AI Study Tutor for ${currentClassObj?.nameEn || 'Class 9-10'}.\n\nSnap a textbook photo, upload a full PDF, or tap any smart prompt below to master any topic!`,
      time: '10:30 AM',
      hints: language === 'bn' 
        ? [
            '📖 এই অধ্যায়ের মূল সারসংক্ষেপ বুঝিয়ে দাও', 
            '🎯 বোর্ড পরীক্ষার ৩টি গুরুত্বপূর্ণ সৃজনশীল প্রশ্ন দাও', 
            '📐 সকল গুরুত্বপূর্ণ সূত্র ও নিয়ম বুলেট আকারে দাও',
            '🎧 ৩ মিনিটের অডিও পডকাস্ট তৈরি করো'
          ] 
        : [
            '📖 Explain the key summary of this chapter', 
            '🎯 Give 3 essential board exam CQ questions', 
            '📐 Summarize all key equations and rules',
            '🎧 Generate a 3-minute audio podcast recap'
          ]
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

  const availableChapters = NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubIdForUpload] || [];
  const filteredChapters = availableChapters.filter(ch => {
    if (!chapterSearchQuery.trim()) return true;
    return (ch.title || '').toLowerCase().includes(chapterSearchQuery.toLowerCase());
  });

  const handleScanSample = (sample) => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResult(sample);
      showToast('✨ AI দ্বারা ডকুমেন্টের সারসংক্ষেপ ও সূত্র সফলভাবে শনাক্ত হয়েছে!', 'success');
    }, 1200);
  };

  const handleScanCurrentChapter = () => {
    const ch = availableChapters.find(c => c.title === selectedChapterTitle) || availableChapters[0];
    const chTitle = ch?.title || `${activeSubName} অধ্যায়`;
    const chSummary = ch?.summary || `${activeSubName} বিষয়ের এই অধ্যায়ের মূল ধারণা ও বোর্ড পরীক্ষার প্রশ্নোত্তর।`;
    const formulaText = ch?.lectureNotes?.[1]?.detail || `${activeSubName} এর বোর্ড স্ট্যান্ডার্ড নিয়মাবলি`;

    const generatedSample = {
      id: `live-ch-${Date.now()}`,
      classId: selectedClass,
      isPdf: false,
      fileType: 'NCTB Digital Textbook Chapter OCR',
      subject: activeSubObj?.nameEn || 'Subject',
      subjectBn: activeSubObj?.nameBn || 'বিষয়',
      subjectId: activeSubObj?.id,
      titleBn: `📖 ${chTitle}`,
      titleEn: `📖 ${chTitle}`,
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
      detectedTextBn: `বোর্ড টেক্সটবুক অধ্যায়: "${chTitle}"।\nসারসংক্ষেপ: ${chSummary}`,
      detectedTextEn: `Board Textbook Chapter: "${chTitle}".\nSummary: ${chSummary}`,
      solutionBn: `১. মূল বক্তব্য: ${chSummary}\n২. গুরুত্বপূর্ণ লেকচার নোটস:\n• ${ch?.lectureNotes?.[0]?.title || 'পটভূমি'}: ${ch?.lectureNotes?.[0]?.detail || 'বিস্তারিত পর্যালোচনা।'}\n• ${ch?.lectureNotes?.[1]?.title || 'মূল নিয়ম'}: ${ch?.lectureNotes?.[1]?.detail || 'পরীক্ষার প্রয়োজনীয় পয়েন্ট।'}\n৩. বোর্ড পরীক্ষার পরামর্শ: অধ্যায়টির অনুধাবন ও প্রয়োগমূলক অংশে পূর্ণ নম্বরের জন্য পাঠ্যবইয়ের মূল শব্দগুলো উল্লেখ করুন।`,
      solutionEn: `1. Core Overview: ${chSummary}\n2. Key Exam Lecture Points: ${formulaText}`,
      formula: formulaText,
      chapterBn: chTitle,
      chapterEn: chTitle
    };

    handleScanSample(generatedSample);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdfFile = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
      const targetSub = activeSubObj || subjectsList[0];

      const customSample = {
        id: `custom-${Date.now()}`,
        classId: selectedClass,
        isPdf: isPdfFile,
        fileType: isPdfFile ? 'PDF Document Upload' : 'Image Scan OCR',
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

    setActiveTab('vault');
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuestion;
    if (!query.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputQuestion('');
    setIsThinking(true);

    setTimeout(() => {
      let reply = '';
      const currentCh = selectedChapterTitle !== 'all' ? selectedChapterTitle : activeSubName;

      if (language === 'bn') {
        if (tutorPersona === 'socratic') {
          reply = `💡 চমৎকার প্রশ্ন! সরাসরি উত্তর নেওয়ার আগে নিজে একটু চিন্তা করো:\n\n“${currentCh}” এর প্রেক্ষাপটে "${query}" সম্পর্কিত মূল কারণ বা সূত্রটি কী হতে পারে? তুমি কী মনে করো?`;
        } else if (tutorPersona === 'exam') {
          reply = `🎯 বোর্ড পরীক্ষার দৃষ্টিকোণ থেকে "${query}" অত্যন্ত গুরুত্বপূর্ণ একটি বিষয়!\n\nপরীক্ষার খাতায় পূর্ণ নম্বর পেতে নিচের ৩টি পয়েন্ট প্যারা আকারে লিখবে:\n১. জ্ঞানমূলক অংশ: মূল সংজ্ঞা ও নির্ভুল কি-ওয়ার্ড উল্লেখ করো।\n২. অনুধাবন অংশ: কার্যকারণ সম্পর্ক স্পষ্টভাবে বুঝিয়ে লেখো।\n৩. প্রয়োগমূলক অংশ: পাঠ্যবইয়ের সূত্রের সাথে তুলনা করো।`;
        } else {
          reply = `⚡ সহজ ও দ্রুত সমাধান:\n\n"${query}" বিষয়টি মূলত “${currentCh}” এর অন্তর্ভুক্ত।\n\n📌 সারকথা: পাঠ্যবই অনুযায়ী নিয়মাবলি সঠিকভাবে অনুশীলন করলে এবং মূল সূত্রটি মনে রাখলে এই সংক্রান্ত যেকোনো প্রশ্নে ১০ এ ১০ পাওয়া সম্ভব!`;
        }
      } else {
        if (tutorPersona === 'socratic') {
          reply = `💡 Great question! Before giving the direct answer, think: In the context of "${currentCh}", what fundamental rule or formula governs "${query}"?`;
        } else if (tutorPersona === 'exam') {
          reply = `🎯 From a Board Exam perspective, "${query}" carries high weightage!\n\nStructure your answer in 3 structured points to get maximum marks!`;
        } else {
          reply = `⚡ Quick & Clear Explanation:\n\nRegarding "${query}" in "${currentCh}": Review the core principle and key definitions for solid exam performance.`;
        }
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          hints: language === 'bn' 
            ? ['💡 আরো বিস্তারিত ও সহজভাবে বোঝাও', '🎯 এখান থেকে ৩টি বোর্ড MCQ দাও', '✍️ সৃজনশীল প্রশ্নব্যাংকে নিয়ে চলো']
            : ['💡 Explain with more examples', '🎯 Generate 3 practice MCQs', '✍️ Open Creative Q&A']
        }
      ]);
      setIsThinking(false);
      earnPoints(2, language === 'bn' ? 'AI টিউটর প্রশ্ন সম্পন্ন (+২ পয়েন্ট)' : 'AI Question Asked (+2 Points)');
    }, 900);
  };

  const handleCopyMessage = (msgId, text) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(msgId);
    showToast('📋 উত্তর কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="space-y-4 pb-24 pt-2">
      
      {/* 1. Class, Subject & Chapter Selector Card (Standardized 3-Tier Master Card) */}
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
              <span>[{activeSubName}]-এর সম্পূর্ণ অধ্যায় তালিকা:</span>
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
                🌟 [{activeSubName}] সকল {availableChapters.length}টি অধ্যায় দেখুন
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
              placeholder={`[${activeSubName}] এর নাম লিখে খুঁজুন...`}
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
      {/* 2. PRIMARY AI LEARNING MODE TABS (বই স্ক্যানার | AI টিউটর চ্যাট | পডকাস্ট) */}
      {/* ============================================================== */}
      <div className="grid grid-cols-3 gap-2">
        
        {/* Tab 1: Scanner */}
        <button
          onClick={() => setActiveMode('scanner')}
          className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active ${
            activeMode === 'scanner' 
              ? 'bg-red-600 text-white ring-2 ring-red-400 shadow-md font-black' 
              : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold'
          }`}
        >
          <Camera className={`w-4 h-4 ${activeMode === 'scanner' ? 'text-amber-200' : 'text-red-600'}`} />
          <span className="text-[10px] whitespace-nowrap">বই ও PDF স্ক্যানার</span>
        </button>

        {/* Tab 2: AI Tutor Chat */}
        <button
          onClick={() => setActiveMode('chat')}
          className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active ${
            activeMode === 'chat' 
              ? 'bg-slate-900 text-white ring-2 ring-amber-400 shadow-md font-black' 
              : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold'
          }`}
        >
          <Bot className={`w-4 h-4 ${activeMode === 'chat' ? 'text-amber-400' : 'text-slate-800'}`} />
          <span className="text-[10px] whitespace-nowrap">সোক্রাটিক AI চ্যাট</span>
        </button>

        {/* Tab 3: Audio Podcast */}
        <button
          onClick={() => setActiveMode('podcast')}
          className={`p-2.5 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-sm transition-all tap-active ${
            activeMode === 'podcast' 
              ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-500 shadow-md font-black' 
              : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold'
          }`}
        >
          <Headphones className={`w-4 h-4 ${activeMode === 'podcast' ? 'text-red-900' : 'text-amber-600'}`} />
          <span className="text-[10px] whitespace-nowrap">৩-মিনিট পডকাস্ট</span>
        </button>

      </div>

      {/* ============================================================== */}
      {/* MODE 1: BOOK & PDF SMART SCANNER (LIVE AI OCR & SUMMARIZER) */}
      {/* ============================================================== */}
      {activeMode === 'scanner' && (
        <div className="space-y-4 animate-in fade-in">
          
          {/* Active Context Banner with 1-Click Fast Summarize */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 flex items-center justify-between gap-2 shadow-sm">
            <div className="flex items-center gap-2 truncate">
              <Sparkles className="w-4 h-4 text-red-600 shrink-0" />
              <div className="truncate">
                <span className="text-[10px] text-slate-500 font-bold block">বর্তমান সক্রিয় অধ্যায়:</span>
                <span className="text-xs font-black text-slate-900 truncate block">
                  {selectedChapterTitle !== 'all' ? selectedChapterTitle : `🌟 ${activeSubName} এর সকল অধ্যায়`}
                </span>
              </div>
            </div>

            <button
              onClick={handleScanCurrentChapter}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-[11px] shadow-sm shrink-0 tap-active flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-amber-200" />
              <span>১-ক্লিকে সারসংক্ষেপ</span>
            </button>
          </div>

          {/* Dual Upload Dropzone Card */}
          <div className="rounded-3xl p-5 bg-white border-2 border-red-100 text-center space-y-4 shadow-sm relative overflow-hidden">
            
            <div className="space-y-1">
              <h3 className="text-sm font-black text-slate-900 flex items-center justify-center gap-2">
                <Camera className="w-4 h-4 text-red-600" />
                <span>বইয়ের পাতা স্ক্যান অথবা PDF আপলোড করুন</span>
              </h3>
              <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                ছবি বা PDF আপলোড করলেই AI মুহূর্তের মধ্যে অধ্যায়ের মূল সারসংক্ষেপ, বোর্ড সূত্র ও মডেল সমাধান তৈরি করবে!
              </p>
            </div>

            {/* Dual Upload Buttons */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              
              {/* Photo Upload */}
              <label className="p-4 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white flex flex-col items-center justify-center gap-2 shadow-md cursor-pointer transition-all tap-active border border-red-500 group">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-all">
                  <Camera className="w-5 h-5 text-amber-200" />
                </div>
                <span className="text-xs font-black">📸 ছবি তুলুন</span>
                <span className="text-[10px] text-red-100 font-medium">ক্যামেরা বা গ্যালারি</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleCustomUpload}
                />
              </label>

              {/* PDF Document Upload */}
              <label className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 flex flex-col items-center justify-center gap-2 shadow-md cursor-pointer transition-all tap-active border border-amber-300 group">
                <div className="w-10 h-10 rounded-2xl bg-slate-950/10 flex items-center justify-center group-hover:scale-110 transition-all">
                  <FileText className="w-5 h-5 text-red-900" />
                </div>
                <span className="text-xs font-black">📄 PDF আপলোড</span>
                <span className="text-[10px] text-amber-950/80 font-bold">পুরো বই বা লেকচার শিট</span>
                <input 
                  type="file" 
                  accept=".pdf,application/pdf" 
                  className="hidden" 
                  onChange={handleCustomUpload}
                />
              </label>

            </div>

            {/* Presets Grid */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-500">অথবা সরাসরি NCTB ডেমো ফাইল দিয়ে ট্রাই করুন:</p>
              
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {PDF_PRESET_SCANS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleScanSample(preset)}
                    className="py-1.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] font-black text-amber-950 transition-all tap-active flex items-center gap-1.5 shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-600" />
                    <span>{preset.titleBn.split(':')[1] || preset.titleBn}</span>
                  </button>
                ))}

                {NCTB_PRESET_SCANS.slice(0, 2).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleScanSample(preset)}
                    className="py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] font-black text-slate-800 transition-all tap-active flex items-center gap-1.5 shadow-sm"
                  >
                    <span>📸 {preset.titleBn.split(':')[1] || preset.titleBn}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Scanning Progress HUD Animation */}
          {isScanning && (
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col items-center justify-center text-center space-y-3 shadow-xl relative overflow-hidden animate-in fade-in">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent top-0 animate-pulse"></div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-amber-400 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-amber-300">AI ডকুমেন্ট ও টেক্সট রিড করছে...</h4>
                <p className="text-xs text-slate-300 font-medium">OCR এক্সট্রাকশন, অধ্যায়ের সামারি ও বোর্ড সূত্র আলাদা করা হচ্ছে</p>
              </div>
            </div>
          )}

          {/* Extracted AI Solution Card */}
          {scanResult && !isScanning && (
            <div className="rounded-3xl p-5 bg-white border-2 border-emerald-300 space-y-4 shadow-lg animate-in zoom-in-95 duration-200">
              
              <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-2xl shrink-0">
                    {scanResult.isPdf ? '📄' : '📸'}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      ✓ সফলভাবে সম্পন্ন (OCR Processed)
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-1">
                      {language === 'bn' ? scanResult.titleBn : scanResult.titleEn}
                    </h4>
                  </div>
                </div>
              </div>

              {/* Detected Text Quote */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">শনাক্তকৃত মূল টেক্সট (Detected Text):</span>
                <p className="text-xs text-slate-700 font-mono leading-relaxed line-clamp-3">
                  "{language === 'bn' ? scanResult.detectedTextBn : scanResult.detectedTextEn}"
                </p>
              </div>

              {/* AI Concept Breakdown */}
              <div className="space-y-1.5">
                <h5 className="text-xs font-black text-red-700 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>বোর্ড স্ট্যান্ডার্ড অধ্যায় সারসংক্ষেপ ও লেকচার নোটস:</span>
                </h5>
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 text-xs text-slate-900 leading-relaxed whitespace-pre-line font-medium shadow-inner">
                  {language === 'bn' ? scanResult.solutionBn : scanResult.solutionEn}
                </div>
              </div>

              {/* Core Equation Badge */}
              {scanResult.formula && (
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between shadow-sm">
                  <span className="text-xs font-black text-amber-950 flex items-center gap-1">
                    <span>📐 মূল সূত্র / নিয়ম:</span>
                  </span>
                  <code className="text-xs font-black text-amber-950 font-mono bg-white px-2.5 py-1 rounded-xl border border-amber-300 shadow-inner">
                    {scanResult.formula}
                  </code>
                </div>
              )}

              {/* Multi-Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleSaveToVault}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-md transition-all tap-active"
                >
                  <Save className="w-4 h-4" />
                  <span>ভল্টে নোট সংরক্ষণ করুন (+২০ পয়েন্ট)</span>
                </button>

                <button
                  onClick={() => setActiveTab('creative')}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-200 transition-all tap-active"
                >
                  <span>সৃজনশীল প্রশ্নব্যাংক ➔</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 2: INTERACTIVE SOCRATIC AI TUTOR CHAT */}
      {/* ============================================================== */}
      {activeMode === 'chat' && (
        <div className="space-y-3.5 animate-in fade-in">
          
          {/* Persona Selector Bar */}
          <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-sm text-xs">
            <span className="font-black text-slate-700 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>টিউটর ধরণ:</span>
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { id: 'socratic', label: '💡 সোক্রাটিক গাইড', desc: 'ধাপে ধাপে বোঝাবে' },
                { id: 'exam', label: '🎯 বোর্ড এক্সাম', desc: 'নম্বর পাওয়ার কৌশল' },
                { id: 'quick', label: '⚡ দ্রুত সমাধান', desc: 'সংক্ষিপ্ত উত্তর' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setTutorPersona(p.id);
                    showToast(`🤖 টিউটর মোড: ${p.label}`, 'info');
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-xl font-black transition-all ${
                    tutorPersona === p.id
                      ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Contextual Chapter Prompts (One-Tap Smart Chips) */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500 px-1">💡 দ্রুত জিজ্ঞাসা করুন:</span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                `📖 "${selectedChapterTitle !== 'all' ? selectedChapterTitle.split('—')[0] : activeSubName}" এর মূল সারসংক্ষেপ বুঝিয়ে দাও`,
                `🎯 বোর্ড পরীক্ষার গুরুত্বপূর্ণ ৩টি CQ প্রশ্ন ও উত্তর দাও`,
                `📐 অধ্যায়টির সকল সূত্র ও নিয়ম একসাথে দাও`,
                `🎧 ৩ মিনিটের অডিও পডকাস্ট স্ক্রিপ্ট দাও`
              ].map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(promptText)}
                  className="py-1.5 px-3 rounded-xl bg-white hover:bg-red-50 hover:text-red-700 text-slate-800 text-[11px] font-bold whitespace-nowrap border border-slate-200 shadow-sm transition-all shrink-0 tap-active"
                >
                  {promptText}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Thread Container */}
          <div className="space-y-3 min-h-[300px] max-h-[460px] overflow-y-auto pr-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-4 rounded-3xl max-w-[88%] text-xs leading-relaxed space-y-2.5 shadow-sm relative ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-tr-none font-medium'
                      : 'bg-white text-slate-900 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>

                  {/* Copy Message Button for AI Answers */}
                  {msg.sender === 'ai' && (
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                      <span>{msg.time}</span>
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="flex items-center gap-1 text-slate-500 hover:text-slate-900 font-bold p-1 rounded-lg hover:bg-slate-100 transition-all"
                        title="Copy text"
                      >
                        {copiedMsgId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedMsgId === msg.id ? 'কপি হয়েছে' : 'কপি'}</span>
                      </button>
                    </div>
                  )}

                  {/* Suggestion Followup Hints */}
                  {msg.hints && (
                    <div className="pt-2 flex flex-wrap gap-1.5 border-t border-slate-100">
                      {msg.hints.map((hint, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(hint)}
                          className="text-[10px] bg-slate-50 hover:bg-red-50 text-red-800 hover:text-red-900 px-2.5 py-1 rounded-xl border border-slate-200 hover:border-red-200 transition-all text-left font-bold shadow-sm"
                        >
                          💬 {hint}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <User className="w-4 h-4 text-amber-300" />
                  </div>
                )}
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-amber-800 italic py-1 font-bold animate-pulse px-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>AI উত্তর তৈরি করছে...</span>
              </div>
            )}
          </div>

          {/* Floating Bottom Sticky Chat Input Bar */}
          <div className="sticky bottom-16 bg-white/95 backdrop-blur-md p-2 rounded-3xl border-2 border-red-100 shadow-xl flex items-center gap-2">
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={`"${selectedChapterTitle !== 'all' ? selectedChapterTitle.split('—')[0] : activeSubName}" সম্পর্কে প্রশ্ন লিখুন...`}
              className="flex-1 bg-transparent px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuestion.trim()}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 disabled:opacity-40 flex items-center justify-center text-white transition-all tap-active shrink-0 shadow-md"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* MODE 3: 3-MINUTE AI AUDIO PODCAST PLAYER */}
      {/* ============================================================== */}
      {activeMode === 'podcast' && (
        <div className="rounded-3xl p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white space-y-4 shadow-xl border border-slate-800 animate-in fade-in">
          
          {/* Podcast Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-red-500 flex items-center justify-center text-slate-950 text-lg font-black shadow-md">
                🎧
              </div>
              <div>
                <span className="text-[10px] font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                  ৩-মিনিট অডিও পডকাস্ট রিক্যাপ
                </span>
                <h4 className="text-xs sm:text-sm font-black text-white mt-0.5 truncate max-w-[220px]">
                  {selectedChapterTitle !== 'all' ? selectedChapterTitle : `${activeSubName} — ফুল বুক সামারি`}
                </h4>
              </div>
            </div>

            <span className="text-xs font-mono font-black text-amber-400 bg-slate-800 px-2.5 py-1 rounded-xl border border-slate-700">
              03:00 মিনিট
            </span>
          </div>

          {/* Animated Waveform Visualizer & Play Controls */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-center space-y-3 shadow-inner">
            <div className="flex items-center justify-center gap-1 h-10">
              {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75, 50, 85, 40].map((h, i) => (
                <div
                  key={i}
                  style={{ height: isPodcastPlaying ? `${h}%` : '25%' }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isPodcastPlaying ? 'bg-gradient-to-t from-red-500 to-amber-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-3 pt-1">
              <button
                onClick={() => {
                  setIsPodcastPlaying(!isPodcastPlaying);
                  showToast(isPodcastPlaying ? '⏸️ পডকাস্ট পজ করা হয়েছে' : '▶️ পডকাস্ট প্লে হচ্ছে...', 'info');
                }}
                className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-lg transition-all tap-active flex items-center gap-2"
              >
                {isPodcastPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPodcastPlaying ? 'পডকাস্ট থামান' : 'পডকাস্ট শুনুন (Play)'}</span>
              </button>
            </div>
          </div>

          {/* Transcript Preview */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              <span>পডকাস্ট স্ক্রিপ্ট ও মূল সামারি:</span>
            </span>
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700 text-xs text-slate-200 leading-relaxed space-y-2 font-medium">
              <p>
                🎙️ “প্রিয় শিক্ষার্থী, আজকের পর্বে আমরা আলোচনা করছি <strong>{selectedChapterTitle !== 'all' ? selectedChapterTitle : activeSubName}</strong> নিয়ে।
              </p>
              <p>
                বোর্ড পরীক্ষায় ভালো করতে হলে এই অধ্যায়ের মূল পটভূমি, অনুধাবনমূলক প্রশ্ন ও প্রয়োগের দিকগুলো গভীরভাবে অনুধাবন করতে হবে...”
              </p>
            </div>
          </div>

          {/* Save to Vault Action */}
          <button
            onClick={() => {
              saveToVault({
                title: `🎧 পডকাস্ট: ${selectedChapterTitle !== 'all' ? selectedChapterTitle : activeSubName}`,
                subject: activeSubObj?.nameEn || 'General Study',
                subjectBn: activeSubName,
                subjectId: activeSubObj?.id,
                classId: selectedClass,
                summary: `৩-মিনিট অডিও পডকাস্ট সামারি ও লেকচার নোটস।`,
                formula: '৩-মিনিট অডিও লেকচার',
                tags: [currentClassObj?.nameEn || 'Class', activeSubName, 'Audio Podcast']
              });
              setActiveTab('vault');
            }}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-black text-xs border border-slate-700 shadow-md transition-all tap-active flex items-center justify-center gap-1.5"
          >
            <BookMarked className="w-4 h-4" />
            <span>ভল্টে অডিও পডকাস্ট সেভ করুন (+১৫ পয়েন্ট)</span>
          </button>

        </div>
      )}

    </div>
  );
}
