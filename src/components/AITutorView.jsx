import React, { useState, useRef, useEffect } from 'react';
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
import SleekCustomDropdown from './SleekCustomDropdown';

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
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [tutorPersona, setTutorPersona] = useState('socratic'); // 'socratic' | 'exam' | 'quick'
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [isPodcastPlaying, setIsPodcastPlaying] = useState(false);
  
  const activeSubObj = subjectsList.find(s => s.id === selectedSubIdForUpload) || subjectsList[0];
  const activeSubName = language === 'bn' ? (activeSubObj?.nameBn || 'বিষয়') : (activeSubObj?.nameEn || 'Subject');

  const [chatMessages, setChatMessages] = useState([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom whenever new messages arrive or thinking starts
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isThinking]);

  // Group subjects by category (Core, Science, Commerce, Arts, etc.)
  const groupedSubjects = subjectsList.reduce((acc, sub) => {
    const grp = sub.group || 'সাধারণ';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(sub);
    return acc;
  }, {});

  const availableChapters = NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubIdForUpload] || [];

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

// Comprehensive NCTB Author & Core Concept Knowledge Base
const NCTB_AUTHOR_KNOWLEDGE_MAP = {
  'মানুষ মুহম্মদ': {
    author: 'মোহাম্মদ ওয়াজেদ আলী',
    authorBirth: '১৮৯৬ সালের ৪ঠা সেপ্টেম্বর, বাঁশদহ গ্রাম, সাতক্ষীরা জেলা।',
    authorDeath: '১৯৫৪ সালের ৮ই নভেম্বর (বাঁশদহেই মৃত্যুবরণ করেন)।',
    prophetBirth: 'হজরত মুহম্মদ (সা.) ৫৭০ খ্রিস্টাব্দের ১২ই রবিউল আউয়াল আরবের পবিত্র মক্কা নগরীর বিখ্যাত কুরাইশ বংশে জন্মগ্রহণ করেন।',
    prophetDeath: '৬৩২ খ্রিস্টাব্দের ১২ই রবিউল আউয়াল (৬৩ বছর বয়সে) পবিত্র মদিনা শরিফে ওফাত লাভ করেন।',
    parents: 'পিতা: আবদুল্লাহ, মাতা: মা আমিনা, দুধমাতা: হালিমা।',
    keyThemes: 'মহানবীর অনন্য মানবিক গুণাবলি, অতুলনীয় ক্ষমাশীলতা, অসাম্প্রদায়িকতা ও সত্যনিষ্ঠা। অলৌকিকতার চেয়ে একজন আদর্শ মানুষ হিসেবে তাঁর জীবনাচরণই মানবজাতির শ্রেষ্ঠ দিকদর্শন।',
    events: 'তায়েফে রক্তাক্ত হয়েও কাফিরদের জন্য ক্ষমা ও হেদায়েতের দোয়া, মক্কা বিজয়ের পর চরম শত্রুদের সাধারণ ক্ষমা, অন্তিম শয্যায় ঋণমুক্তির পরম ঘোষণা।'
  },
  'প্রত্যুপকার': {
    author: 'ঈশ্বরচন্দ্র বিদ্যাসাগর',
    authorBirth: '১৮২০ সালের ২৬শে সেপ্টেম্বর, বীরসিংহ গ্রাম, মেদিনীপুর জেলা।',
    authorDeath: '১৮৯১ সালের ২৯শে জুলাই, কলকাতা।',
    keyThemes: 'উপকারের বিনিময়ে কৃতজ্ঞতাস্বরূপ আত্মত্যাগ ও মানবতার পরাকাষ্ঠা। দামেস্কের শাসনকর্তা আলী ইবনে আব্বাস ও খলিফা মামুনের মহানুভবতা।'
  },
  'শকুন্তলা': {
    author: 'ঈশ্বরচন্দ্র বিদ্যাসাগর (মহাকবি কালিদাসের ‘অভিজ্ঞান শকুন্তলম’ অবলম্বনে)',
    authorBirth: '১৮২০ সালের ২৬শে সেপ্টেম্বর, বীরসিংহ, মেদিনীপুর।',
    authorDeath: '১৮৯১ সালের ২৯শে জুলাই।',
    keyThemes: 'মহর্ষি কণ্বের তপোবনে পালিতা কন্যা শকুন্তলা ও রাজা দুষ্মন্তের প্রণয় এবং পতিগৃহে যাত্রার হৃদয়বিদারক মানবিক আবেগ।'
  },
  'বাঙ্গালার ইতিহাস': {
    author: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায় (সাহিত্য সম্রাট)',
    authorBirth: '১৮৩৮ সালের ২৬শে জুন, কাঁঠালপাড়া গ্রাম, নৈহাটি, ২৪ পরগনা।',
    authorDeath: '১৮৯৪ সালের ৮ই এপ্রিল।',
    keyThemes: 'বাঙালি জাতির জাতীয় প্রামাণ্য ইতিহাস অনুসন্ধানের আহ্বান, হৃত গৌরব পুনরুদ্ধার ও আত্মমর্যাদা প্রতিষ্ঠার বার্তা।'
  },
  'বিড়াল': {
    author: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায় (কমলাকান্তের দপ্তর থেকে সংকলিত)',
    authorBirth: '১৮৩৮ সালের ২৬শে জুন, কাঁঠালপাড়া, নৈহাটি।',
    authorDeath: '১৮৯৪ সালের ৮ই এপ্রিল।',
    keyThemes: 'কমলাকান্ত ও মার্জারের রূপক সংলাপের মাধ্যমে সমাজতান্ত্রিক সাম্যবাদ, ধনীদের অতিরিক্ত সঞ্চয়ের তীব্র প্রতিবাদ ও দরিদ্রের অধিকার প্রতিষ্ঠা।'
  },
  'অপূর্ব আত্মত্যাগ': {
    author: 'কালীপ্রসন্ন ঘোষ',
    authorBirth: '১৮৪৩ সালের ২৩শে জুলাই, বিক্রমপুর।',
    authorDeath: '১৯১০ সালে।',
    keyThemes: 'স্বদেশপ্রেম ও মানবতার জন্য হাসিমুখে আত্মোৎসর্গ। মানুষ বাঁচে তার কর্মে, বয়সে নয়।'
  },
  'শুভা': {
    author: 'রবীন্দ্রনাথ ঠাকুর (বিশ্বকবি)',
    authorBirth: '১৮৬১ সালের ৭ই মে (২৫ বৈশাখ ১২৬৮ বঙ্গাব্দ), জোড়াসাঁকো ঠাকুরবাড়ি, কলকাতা।',
    authorDeath: '১৯৪১ সালের ৭ই আগস্ট (২২ শ্রাবণ ১৩৪৮ বঙ্গাব্দ)।',
    keyThemes: 'বাকপ্রতিবন্ধী কিশোরী সুভাষিণীর (শুভা) বোবা অন্তর্বেদনা, চণ্ডীপুর গ্রামের নদী ও প্রকৃতির সাথে নিবিড় মৈত্রী এবং সর্বশী ও পাঙ্গুলি গাভীর সাথে নিখাদ বন্ধুত্ব।'
  },
  'বই পড়া': {
    author: 'প্রমথ চৌধুরী (ছদ্মনাম: বীরবল)',
    authorBirth: '১৮৬৮ সালের ৭ই আগস্ট, যশোর (পৈতৃক নিবাস: হরিপুর, পাবনা)।',
    authorDeath: '১৯৪৬ সালের ২রা সেপ্টেম্বর।',
    keyThemes: 'লাইব্রেরির আবশ্যকতা (হাসপাতালের চেয়েও বেশি), স্বশিক্ষিত হওয়ার আনন্দ ও সার্টিফিকেটসর্বস্ব মুখস্থ বিদ্যার ত্রুটি।'
  },
  'অভাগীর স্বর্গ': {
    author: 'শরৎচন্দ্র চট্টোপাধ্যায় (অপরাজেয় কথাশিল্পী)',
    authorBirth: '১৮৭৬ সালের ১৫ই সেপ্টেম্বর, দেবানন্দপুর গ্রাম, হুগলি জেলা।',
    authorDeath: '১৯৩৮ সালের ১৬ই জানুয়ারি, কলকাতা।',
    keyThemes: 'সামন্তবাদী সমাজে নিম্নবর্ণের দরিদ্র নারী অভাগী ও তার পুত্র কাঙালীর ওপর নির্মম শোষণ ও মৃত্যুর পরও সৎকার নিয়ে জাত-পাতের বৈষম্য।'
  },
  'পল্লীসাহিত্য': {
    author: 'ড. মুহম্মদ শহীদুল্লাহ (ভাষাতাত্ত্বিক ও পণ্ডিত)',
    authorBirth: '১৮৮৫ সালের ১০ই জুলাই, পেয়ারা গ্রাম, ২৪ পরগনা।',
    authorDeath: '১৯৬৯ সালের ১৩ই জুলাই, ঢাকা।',
    keyThemes: 'পল্লীবাংলার বিলুপ্তপ্রায় রূপকথা, ডাক ও খনার বচন, লোকসংগীত ও প্রবাদের অমূল্য সম্পদ সংরক্ষণের তাগিদ।'
  },
  'আম আঁটির ভেঁপু': {
    author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায় (পথের পাঁচালী থেকে সংকলিত)',
    authorBirth: '১৮৯৪ সালের ১২ই সেপ্টেম্বর, মুরাতিপুর গ্রাম, ২৪ পরগনা।',
    authorDeath: '১৯৫০ সালের ১লা সেপ্টেম্বর, ঘাটশিলা।',
    keyThemes: 'গ্রামীণ বাংলার শৈশব, ভাইবোন অপু ও দুর্গার ফল কুড়ানোর আনন্দ, প্রকৃতির সাথে নিবিড় সান্নিধ্য ও চিরায়ত পারিবারিক স্নেহ।'
  },
  'নিমগাছ': {
    author: 'বনফুল (বলাইচাঁদ মুখোপাধ্যায়)',
    authorBirth: '১৮৯৯ সালের ১৯শে জুলাই, মনিহারী গ্রাম, পূর্ণিয়া জেলা, বিহার।',
    authorDeath: '১৯৭৯ সালের ৯ই ফেব্রুয়ারি, কলকাতা।',
    keyThemes: 'নিমগাছের নীরব ভেষজ সেবার আড়ালে বাঙালি পরিবারের নিঃস্বার্থ আত্মত্যাগী গৃহকর্মনিপুণা লক্ষ্মীবউয়ের অবমূল্যায়নের অনন্য রূপক।'
  },
  'শিক্ষা ও মনুষ্যত্ব': {
    author: 'মোতাহের হোসেন চৌধুরী (সংস্কৃতি কথা থেকে সংকলিত)',
    authorBirth: '১৯০৩ সালে কাঞ্চনপুর গ্রাম, নোয়াখালী জেলা।',
    authorDeath: '১৯৫৬ সালের ১৮ই সেপ্টেম্বর, চট্টগ্রাম।',
    keyThemes: 'জীবসত্তা (নিচতলা) থেকে মানবসত্তা বা মনুষ্যত্বে (দোতলা) ওঠার মই হলো শিক্ষা। আত্মার মুক্তিসাধন ও মূল্যবোধ অর্জনই শিক্ষার শ্রেষ্ঠ কাজ।'
  },
  'প্রবাস বন্ধু': {
    author: 'সৈয়দ মুজতবা আলী (দেশে বিদেশে থেকে সংকলিত)',
    authorBirth: '১৯০৪ সালের ১৩ই সেপ্টেম্বর, করিমগঞ্জ, শ্রীহট্ট (আসাম)।',
    authorDeath: '১৯৭৪ সালের ১১ই ফেব্রুয়ারি, ঢাকা।',
    keyThemes: 'কাবুলের খাজা মোল্লা গ্রামের অভিজ্ঞতা, সরল ও বিশালদেহী আফগান ভৃত্য আবদুর রহমানের অপূর্ব আন্তরিক আতিথেয়তা ও খাবার পরিবেশন।'
  },
  'দেনাপাওনা': {
    author: 'রবীন্দ্রনাথ ঠাকুর',
    authorBirth: '১৮৬১ সালের ৭ই মে, জোড়াসাঁকো, কলকাতা।',
    authorDeath: '১৯৪১ সালের ৭ই আগস্ট।',
    keyThemes: 'তৎকালীন সমাজের পণপ্রথার নির্মম বলি নিরুপমা ও পিতা রামসুন্দর মিত্রের অসহায়ত্ব।'
  },
  'কপোতাক্ষ নদ': {
    author: 'মাইকেল মধুসূদন দত্ত (বাংলা সনেটের জনক)',
    authorBirth: '১৮২৪ সালের ২৫শে জানুয়ারি, সাগরদাঁড়ি গ্রাম, কেশবপুর, যশোর জেলা।',
    authorDeath: '১৮৭৩ সালের ২৯শে জুন, কলকাতা।',
    keyThemes: 'প্রবাসজীবনে ফ্রান্সের ভার্সাই নগরীতে বসে স্বদেশের শৈশবের কপোতাক্ষ নদের দুগ্ধস্রোতরূপী জলের স্মৃতি ও অতল দেশপ্রেমের সনেট বন্দনা।'
  },
  'বঙ্গবাণী': {
    author: 'আবদুল হাকিম (মধ্যযুগের কবি)',
    authorBirth: 'আনুমানিক ১৬২০ খ্রিস্টাব্দে, সুধারামপুর গ্রাম, সন্দ্বীপ।',
    authorDeath: 'আনুমানিক ১৬৯০ খ্রিস্টাব্দে।',
    keyThemes: 'মাতৃভাষা বাংলার প্রতি নিখাদ শ্রদ্ধা ও মাতৃভাষার প্রতি অবজ্ঞা প্রদর্শনকারীদের প্রতি তীব্র ক্ষোভ ও স্বদেশপ্রেম।'
  },
  'জীবন-সঙ্গীত': {
    author: 'হেমচন্দ্র বন্দ্যোপাধ্যায়',
    authorBirth: '১৮৩৮ সালের ১৭ই এপ্রিল, রাজবল্লভহাট, হুগলি।',
    authorDeath: '১৯০৩ সালের ২৪শে মে।',
    keyThemes: 'মানবজীবন কেবল মায়ামরীচিকা নয়; কর্মের মাধ্যমে জগতে স্থায়ী কীর্তি ও বিজয় অর্জন করাই জীবনের সার্থকতা।'
  },
  'জুতো আবিষ্কার': {
    author: 'রবীন্দ্রনাথ ঠাকুর',
    authorBirth: '১৮৬১ সালের ৭ই মে, কলকাতা।',
    authorDeath: '১৯৪১ সালের ৭ই আগস্ট।',
    keyThemes: 'রাজা হবুচন্দ্রের ধুলা নিবারণে মন্ত্রী গোবুরার হাস্যকর ব্যর্থতা এবং বয়োবৃদ্ধ চর্মকারের বুদ্ধিতে রাজার পা চামড়া দিয়ে ঢেকে জুতো আবিষ্কারের ইতিহাস।'
  },
  'মানুষ': {
    author: 'কাজী নজরুল ইসলাম (জাতীয় কবি ও সাম্যবাদী)',
    authorBirth: '১৮৯৯ সালের ২৪শে মে (১১ জ্যৈষ্ঠ ১৩০৬), চুরুলিয়া গ্রাম, আসানসোল, বর্ধমান।',
    authorDeath: '১৯৭৬ সালের ২৯শে আগস্ট (১২ ভাদ্র ১৩৮৩), ঢাকা।',
    keyThemes: '“মানুষের চেয়ে বড় কিছু নাই, নহে কিছু মহীয়ান।” ক্ষুধার্ত অভুক্তকে ফিরিয়ে দেওয়া ভণ্ড পূজারি ও মোল্লাদের বিরুদ্ধে আর্ত মানবতার জয়গান।'
  },
  'সেইদিন এই মাঠ': {
    author: 'জীবনানন্দ দাশ (রূপসী বাংলার কবি)',
    authorBirth: '১৮৯৯ সালের ১৭ই ফেব্রুয়ারি, বরিশাল।',
    authorDeath: '১৯৫৪ সালের ২২শে অক্টোবর, কলকাতা।',
    keyThemes: 'মানুষ মরণশীল হলেও পৃথিবীর চিরন্তন রূপ-রস-গন্ধ, শিশিরের শব্দ ও চালতাফুলের গন্ধ অমর ও অবিনশ্বর।'
  },
  'পল্লীজননী': {
    author: 'জসীমউদ্দীন (পল্লীকবি)',
    authorBirth: '১৯০৩ সালের ১লা জানুয়ারি, তাম্বুলখানা গ্রাম, ফরিদপুর জেলা।',
    authorDeath: '১৯৭৬ সালের ১৪ই মার্চ, ঢাকা।',
    keyThemes: 'অসুস্থ সন্তানের শিয়রে বসে নিভু নিভু প্রদীপের আলোয় নির্ঘুম পল্লীজননীর অতল বাৎসল্য, দারিদ্র্য ও নিঃসীম হাহাকার।'
  },
  'রানার': {
    author: 'সুকান্ত ভট্টাচার্য (কিশোর কবি)',
    authorBirth: '১৯২৬ সালের ১৫ই আগস্ট, মহিম হালদার স্ট্রিট, কালীঘাট, কলকাতা।',
    authorDeath: '১৯৪৭ সালের ১৩ই মে, কলকাতা।',
    keyThemes: 'রাতের আঁধারে পিঠে খবরের বোঝা নিয়ে একা ছুটে চলা ক্লান্ত কিন্তু দায়িত্বনিষ্ঠ রানারের শ্রমজীবী জীবনের ট্র্যাজেডি ও মানবিক মর্যাদা।'
  },
  'তোমাকে পাওয়ার জন্যে, হে স্বাধীনতা': {
    author: 'শামসুর রাহমান (নাগরিক কবি)',
    authorBirth: '১৯২৯ সালের ২৩শে অক্টোবর, ঢাকা।',
    authorDeath: '২০০৬ সালের ১৭ই আগস্ট, ঢাকা।',
    keyThemes: '১৯৭১ সালের মুক্তিযুদ্ধে লাখো শহীদের রক্ত, সাকিনা বিবির কপাল ভাঙা ও হরিদাসীর সিঁথির সিঁদুর মোছার চরম ত্যাগে অর্জিত আমাদের স্বাধীনতা।'
  },
  'স্বাধীনতা, এ শব্দটি কীভাবে আমাদের হলো': {
    author: 'নির্মলেন্দু গুণ',
    authorBirth: '১৯৪৫ সালের ২১শে জুন, কাশবন গ্রাম, বারহাট্টা, নেত্রকোনা।',
    keyThemes: '১৯৭১ সালের ৭ই মার্চে রেসকোর্স ময়দানে বঙ্গবন্ধু শেখ মুজিবুর রহমানের কালজয়ী ভাষণ ও ঐতিহাসিক স্বাধীনতার ডাক।'
  },
  'সাহসী জননী বাংলা': {
    author: 'কামাল চৌধুরী',
    authorBirth: '১৯৫৭ সালের ২৮শে জানুয়ারি, বিজয়পুর, কুমিল্লা।',
    keyThemes: 'বাঙালির প্রতিরোধ সংগ্রাম, অসুর বধ ও আত্মমর্যাদায় বলীয়ান সাহসী মাতৃভূমি বাংলার বিজয়গাথা।'
  },
  'আমার পরিচয়': {
    author: 'সৈয়দ শামসুল হক (সব্যসাচী লেখক)',
    authorBirth: '১৯৩৫ সালের ২৭শে ডিসেম্বর, কুড়িগ্রাম।',
    authorDeath: '২০১৬ সালের ২৭শে সেপ্টেম্বর, ঢাকা।',
    keyThemes: 'চর্যাপদ থেকে একাত্তরের মুক্তিযুদ্ধ পর্যন্ত বাঙালির সুদীর্ঘ শৌর্য, সংস্কৃতি, বিদ্রোহ ও অসাম্প্রদায়িক ঐতিহ্যের আত্মপরিচয়।'
  },
  'কাকতাড়ুয়া': {
    author: 'সেলিনা হোসেন (উপন্যাস)',
    authorBirth: '১৯৪৭ সালের ১৪ই জুন, রাজশাহী।',
    keyThemes: '১৯৭১ সালের মুক্তিযুদ্ধে কিশোর বুধার অসীম সাহসিকতা, মুক্তিযোদ্ধাদের সহায়তা ও পাকিস্তানি ক্যাম্প মাইন দিয়ে উড়িয়ে দেওয়ার রোমাঞ্চকর বীরত্ব।'
  },
  'বহিপীর': {
    author: 'সৈয়দ ওয়ালীউল্লাহ (নাটক)',
    authorBirth: '১৯২২ সালের ১৫ই আগস্ট, ষোলশহর, চট্টগ্রাম।',
    authorDeath: '১৯৭১ সালের ১০ই অক্টোবর, প্যারিস, ফ্রান্স।',
    keyThemes: 'ধর্মব্যবসা ও বহুবিবাহের বিরুদ্ধে আত্মমর্যাদাবোধসম্পন্ন কিশোরী তাহেরার বলিষ্ঠ প্রতিবাদ ও কুসংস্কারমুক্ত চেতনার উন্মেষ।'
  }
};

// Extensive Chapter-specific plot, conceptual & comprehension QA repository
const CHAPTER_STORY_QA_DATABASE = [
  // ১. প্রত্যুপকার — সম্পূর্ণ অধ্যায়ের সমস্ত ঘটনা, চরিত্র ও সংলাপ
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['পিতা', 'পিতার', 'বাবা', 'বাবার', 'ঠাকুরদাস', 'মাতা', 'ভগবতী'],
    answer: '🎯 **ঈশ্বরচন্দ্র বিদ্যাসাগরের পিতা-মাতা ও পরিচয়:**\n• পিতা: **ঠাকুরদাস বন্দ্যোপাধ্যায়**\n• মাতা: **ভগবতী দেবী**\n• জন্মস্থান: বীরসিংহ গ্রাম, মেদিনীপুর জেলা।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['কেমন', 'শাসক', 'চরিত্র', 'গুণাবলি', 'ব্যক্তিত্ব', 'কেমন ছিলেন'],
    answer: '🎯 **সঠিক উত্তর: তিনি ছিলেন অত্যন্ত ন্যায়পরায়ণ, ক্ষমাশীল, দয়ালু ও পরম জ্ঞানানুরাগী শাসক।**\n\n📌 ব্যাখ্যা: আব্বাসীয় বংশের সপ্তম খলিফা মামুন প্রজাদরদি, শিল্প-সাহিত্যের পৃষ্ঠপোষক এবং সততা ও মহানুভবতার পরম গুণগ্রাহী ছিলেন।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['চমকে', 'বন্দী', 'বন্দি', 'দেখে', 'আলী ইবনে আব্বাস', 'আলী'],
    answer: '🎯 **সঠিক উত্তর: কারণ বন্দী ব্যক্তিটি ছিলেন তাঁর পূর্বের জীবনরক্ষাকারী আশ্রয়দাতা।**\n\n📌 ব্যাখ্যা: দামেস্কে চরম বিপদের দিনে এই ব্যক্তিই (দামেস্কের ক্ষমতাচ্যুত শাসনকর্তা) আলী ইবনে আব্বাসকে গোপনে নিজ গৃহে আশ্রয় দিয়ে নিশ্চিত মৃত্যুর হাত থেকে প্রাণ রক্ষা করেছিলেন।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['পালিয়ে', 'পালাতে', 'ঘোড়া', 'প্রস্তাব', 'অস্বীকৃতি', 'কেন যাননি'],
    answer: '🎯 **সঠিক উত্তর: আলী ইবনে আব্বাসের কোনো ক্ষতি হোক তা তিনি চাননি।**\n\n📌 ব্যাখ্যা: আলী ইবনে আব্বাস বন্দীর বাঁধন খুলে অর্থ ও দ্রুতগামী ঘোড়া দিয়ে পালিয়ে যেতে বললেও বন্দী ব্যক্তিটি তাঁর হিতৈষী আলীকে বিপদে ফেলতে চাননি; বরং বীরের মতো মৃত্যুর মুখোমুখি হওয়া শ্রেয় মনে করেছিলেন।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['হেফাজত', 'জিম্মা', 'কেন দিলেন', 'দায়িত্ব', 'কার কাছে'],
    answer: '🎯 **সঠিক উত্তর: খলিফা মামুন বন্দীকে সভাসদ আলী ইবনে আব্বাসের হেফাজতে দিয়েছিলেন।**\n\n📌 ব্যাখ্যা: পরদিন বন্দীর বিচার ও শাস্তি নির্ধারণ করার উদ্দেশ্যে খলিফা তাঁকে বিশ্বস্ত আলীর তত্ত্বাবধানে রাখার নির্দেশ দেন।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['ক্ষমা', 'মুক্তি', 'পুরস্কৃত', 'ছেড়ে', 'উদারতা'],
    answer: '🎯 **সঠিক উত্তর: কৃতজ্ঞতাবোধ ও মহানুভবতায় মুগ্ধ হয়ে।**\n\n📌 ব্যাখ্যা: আলী ইবনে আব্বাসের জীবনের ঝুঁকি নিয়ে পূর্বের উপকারের ঋণ স্বীকার এবং শাসনকর্তার সততায় মুগ্ধ হয়ে খলিফা মামুন তাঁকে ক্ষমা ও মুক্তি দেন।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['ভয়', 'নির্ভীক', 'শাসনকর্তা', 'খলিফার সামনে', 'সাহস'],
    answer: '🎯 **সঠিক উত্তর: তিনি সত্যের পথে ছিলেন এবং আত্মমর্যাদাবোধসম্পন্ন ছিলেন।**\n\n📌 ব্যাখ্যা: দামেস্কের ক্ষমতাচ্যুত শাসনকর্তা কোনো অন্যায় করেননি বলে মৃত্যুর মুখোমুখি দাঁড়িয়েও খলিফা মামুনের সামনে অটল ও নির্ভীক ছিলেন।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['শিক্ষা', 'মূলভাব', 'মূল শিক্ষা', 'তাৎপর্য', 'প্রতিপাদ্য'],
    answer: '🎯 **‘প্রত্যুপকার’ গল্পের মূল শিক্ষা:**\nউপকার স্বীকার করা, কৃতজ্ঞ থাকা এবং চরম বিপদেও নিজের জীবনের ঝুঁকি নিয়ে উপকারের প্রতিদান (প্রত্যুপকার) দেওয়াই মানুষের পরম ধর্ম।'
  },
  {
    chapterMatch: 'প্রত্যুপকার',
    triggers: ['দামেস্ক', 'বাগদাদ', 'কোথায়', 'স্থান'],
    answer: '🎯 **স্থান পরিচিতি:**\n• বাগদাদ: আব্বাসীয় খেলাফতের রাজধানী (বর্তমান ইরাক)।\n• দামেস্ক: তৎকালীন সিরিয়া প্রদেশের রাজধানী।'
  },
  // ৬. শুভা
  {
    chapterMatch: 'শুভা',
    triggers: ['কথা', 'বলতে', 'না পারা', 'বোবা', 'বাকপ্রতিবন্ধী'],
    answer: '🎯 **সঠিক উত্তর: জন্মগত বাকপ্রতিবন্ধী হওয়ার কারণে।**\n\n📌 ব্যাখ্যা: শুভা জন্ম থেকেই কথা বলতে পারত না, ফলে সমাজ ও পরিবারে সে এক নীরব বেদনার প্রতীক হয়ে ওঠে।'
  },
  {
    chapterMatch: 'শুভা',
    triggers: ['বন্ধু', 'গাভী', 'সর্বশী', 'পাঙ্গুলি', 'গোয়াল'],
    answer: '🎯 **সঠিক উত্তর: সর্বশী ও পাঙ্গুলি নামের দুটি গাভী।**\n\n📌 ব্যাখ্যা: মানুষ কথা বুঝতে না পারলেও নির্বাক এই দুটি গাভীর সাথে শুভার গভীর আত্মিক বন্ধুত্ব ও ভাববিনিময় ছিল।'
  },
  {
    chapterMatch: 'শুভা',
    triggers: ['প্রতাপ', 'মাছ', 'ছিপ', 'সঙ্গ'],
    answer: '🎯 **সঠিক উত্তর: শুভা কথা না বলায় ছিপে মাছ ধরার সময় কোনো শব্দ হতো না।**\n\n📌 ব্যাখ্যা: মাছ ধরার জন্য নীরব সঙ্গী অত্যন্ত উপযোগী হওয়ায় প্রতাপ শুভার সঙ্গ পছন্দ করত।'
  },
  {
    chapterMatch: 'শুভা',
    triggers: ['বাবার নাম', 'পিতার নাম', 'গ্রাম', 'চণ্ডীপুর', 'বাণীকণ্ঠ'],
    answer: '🎯 **সঠিক উত্তর: পিতা বাণীকণ্ঠ, গ্রাম চণ্ডীপুর।**\n\n📌 ব্যাখ্যা: বাণীকণ্ঠ শুভাকে অন্যান্য মেয়েদের চেয়ে বেশি ভালোবাসতেন।'
  },
  // ১১. মানুষ মুহম্মদ (স.)
  {
    chapterMatch: 'মানুষ মুহম্মদ',
    triggers: ['তায়েফ', 'পাথর', 'রক্ত', 'দোয়া', 'কাফির'],
    answer: '🎯 **সঠিক উত্তর: কাফিরদের ওপর অভিশাপ না দিয়ে ক্ষমা ও হেদায়েতের দোয়া করেছিলেন।**\n\n📌 ব্যাখ্যা: তায়েফবাসীরা রক্তাক্ত করলেও মহানবী (সা.) বলেছিলেন—‘হে প্রভু! এদের জ্ঞান দাও, এরা অবুঝ।’'
  },
  {
    chapterMatch: 'মানুষ মুহম্মদ',
    triggers: ['ওফাত', 'মৃত্যু', 'আবু বকর', 'সান্ত্বনা', 'ঘোষণা'],
    answer: '🎯 **সঠিক উত্তর: আবু বকর (রা.) ঘোষণা করেন যে মুহম্মদ আল্লাহর রাসুল ও মানুষ ছিলেন।**\n\n📌 ব্যাখ্যা: তিনি বিভ্রান্ত সাহাবিদের বলেন—যারা মুহম্মদের পূজা করত তারা জানুক তিনি মারা গেছেন, কিন্তু আল্লাহ চিরঞ্জীব।'
  },
  {
    chapterMatch: 'মানুষ মুহম্মদ',
    triggers: ['মক্কা বিজয়', 'শত্রু', 'আচরণ'],
    answer: '🎯 **সঠিক উত্তর: চরম শত্রুদের নিঃশর্ত সাধারণ ক্ষমা ঘোষণা করেন।**\n\n📌 ব্যাখ্যা: তিনি প্রতিশোধ না নিয়ে বিশ্বমানবতার অনুপম মহানুভবতা প্রদর্শন করেন।'
  },
  // ১২. নিমগাছ
  {
    chapterMatch: 'নিমগাছ',
    triggers: ['শেষ বাক্য', 'তাৎপর্য', 'ম্যাজিক বাক্য', 'লক্ষ্মীবউ'],
    answer: '🎯 **সঠিক উত্তর: পরিবারের নিঃস্বার্থ আত্মত্যাগী গৃহবধূর অবমূল্যায়নের রূপক।**\n\n📌 ব্যাখ্যা: নিমগাছের মতোই বাঙালি পরিবারের লক্ষ্মীবউরা নীরবে সেবা দেয়, কিন্তু তাদের আত্মত্যাগের মূল্যায়ন কেউ করে না।'
  },
  {
    chapterMatch: 'নিমগাছ',
    triggers: ['কবি', 'প্রশংসা', 'রূপ'],
    answer: '🎯 **সঠিক উত্তর: পাতা বা ছাল না ছিঁড়ে নিমগাছের রূপ ও সৌন্দর্যের মুগ্ধ প্রশংসা করেছিলেন।**'
  },
  // ১৩. শিক্ষা ও মনুষ্যত্ব
  {
    chapterMatch: 'শিক্ষা ও মনুষ্যত্ব',
    triggers: ['জীবসত্তা', 'মানবসত্তা', 'দোতলা', 'মই'],
    answer: '🎯 **সঠিক উত্তর: নিচতলা জীবসত্তা (ক্ষুধা/বেঁচে থাকা), দোতলা মানবসত্তা (মনুষ্যত্ব), এবং শিক্ষা হলো ওঠার মই।**'
  },
  {
    chapterMatch: 'শিক্ষা ও মনুষ্যত্ব',
    triggers: ['লেফাফাদুরস্তি', 'আসল শিক্ষা', 'ডিগ্রি'],
    answer: '🎯 **সঠিক উত্তর: কেবল বাইরের চাকচিক্য বা ডিগ্রি অর্জন, যার ভেতরে আত্মার কোনো সত্যিকারের মুক্তি নেই।**'
  },
  // ১৪. প্রবাস বন্ধু
  {
    chapterMatch: 'প্রবাস বন্ধু',
    triggers: ['আবদুর রহমান', 'কেমন', 'চরিত্র', 'ভৃত্য'],
    answer: '🎯 **সঠিক উত্তর: দৈত্যের মতো দীর্ঘদেহী কিন্তু শিশুর মতো সরল, অতিথিভক্ত ও স্নেহশীল আফগান ভৃত্য।**'
  },
  // ৪. বিড়াল
  {
    chapterMatch: 'বিড়াল',
    triggers: ['চুরি', 'কারণ', 'কমলাকান্ত', 'মার্জার', 'দুধ'],
    answer: '🎯 **সঠিক উত্তর: ধনীদের অতিরিক্ত সঞ্চয় ও দরিদ্রকে বঞ্চিত করার প্রতিবাদ।**\n\n📌 ব্যাখ্যা: বিড়ালের যুক্তি—ক্ষুধার্তের পেটে ভাত না থাকলে সে চুরি করতে বাধ্য হয়, এর মূল অপরাধী কৃপণ ধনীরা।'
  },
  // ২৯. কাকতাড়ুয়া
  {
    chapterMatch: 'কাকতাড়ুয়া',
    triggers: ['বুধা', 'মাইন', 'ক্যাম্প', 'উড়িয়ে', 'মুক্তিযুদ্ধ'],
    answer: '🎯 **সঠিক উত্তর: পাকিস্তানি মিলিটারি ক্যাম্প ধ্বংস করে দেশকে শত্রুমুক্ত করতে।**\n\n📌 ব্যাখ্যা: একাত্তরে কিশোর বুধা অসীম সাহসিকতায় হানাদারদের বিরুদ্ধে প্রতিরোধ গড়ে তোলে।'
  },
  // ৩০. বহিপীর
  {
    chapterMatch: 'বহিপীর',
    triggers: ['তাহেরা', 'পালিয়ে', 'কারণ', 'অসম বিয়ে'],
    answer: '🎯 **সঠিক উত্তর: লোভী বৃদ্ধ বহিপীরের সাথে জোরপূর্বক অসম বিয়ে থেকে আত্মরক্ষা করতে।**\n\n📌 ব্যাখ্যা: তাহেরা ছিল অন্যায়ের বিরুদ্ধে প্রতিবাদী এক সাহসী নারী।'
  }
];

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
      try {
        let reply = '';
        
        // Find selected chapter object from full knowledge base
        const selectedChObj = availableChapters.find(c => c.title === selectedChapterTitle) || availableChapters[0];
        const chTitle = selectedChObj?.title || activeSubName;
        const chSummary = selectedChObj?.summary || '';
        const chLectureNotes = selectedChObj?.lectureNotes || [];
        const chSelfTest = selectedChObj?.selfTest || [];

        // Find author key match
        const matchedKey = Object.keys(NCTB_AUTHOR_KNOWLEDGE_MAP).find(k => chTitle.includes(k));
        const authorInfo = matchedKey ? NCTB_AUTHOR_KNOWLEDGE_MAP[matchedKey] : null;

        const qLower = query.toLowerCase().trim();

        // 0. CHECK GIBBERISH / MEANINGLESS RANDOM INPUT (e.g. "dfdsgsd", "asdf", "zzzz")
        const isGibberish = (text) => {
          const t = text.trim().toLowerCase();
          if (t.length <= 1) return true;
          // Repeated character check
          if (t.length >= 3 && t.split('').every(c => c === t[0])) return true;
          // 4 or more consonants in a row with no vowels
          if (/^[bcdfghjklmnpqrstvwxyz]{4,}$/i.test(t)) return true;
          // Only symbols, numbers or punctuation
          if (/^[0-9!@#$%^&*()_+=\-\[\]{};:'",.<>/?\\|~`\s]+$/.test(t)) return true;
          return false;
        };

        // 0.1 GREETINGS & CASUAL INTERACTION
        const isGreeting = ['hi', 'hello', 'হাই', 'হ্যালো', 'সালাম', 'assalamu', 'slam', 'ধন্যবাদ', 'thanks', 'thank you', 'কেমন আছো', 'কেমন আছেন', 'hey'].some(g => qLower === g || qLower.startsWith(g + ' ') || qLower.endsWith(' ' + g));

        // 0.2 CHECK CREATIVE QUESTIONS (CQ) WRITING RULES & 4-TIER FORMAT
        const isCQRuleQuery = qLower.includes('সৃজনশীল') || qLower.includes('cq') || qLower.includes('ক খ গ ঘ') || qLower.includes('লেখার নিয়ম') || qLower.includes('উত্তর কীভাবে') || qLower.includes('খাতা মূল্যায়ন');

        // 0.3 CHECK GRAMMAR QUERIES (সন্ধি, সমাস, কারক, প্রত্যয়, ইত্যাদি)
        const isSamasQuery = qLower.includes('সমাস') || qLower.includes('দ্বন্দ্ব') || qLower.includes('দ্বিগু') || qLower.includes('তৎপুরুষ') || qLower.includes('বহুব্রীহি');
        const isSandhiQuery = qLower.includes('সন্ধি') || qLower.includes('স্বরসন্ধি') || qLower.includes('ব্যঞ্জনসন্ধি');
        const isKarakQuery = qLower.includes('কারক') || qLower.includes('বিভক্তি') || qLower.includes('কর্তা') || qLower.includes('কর্ম');
        const isProttoyQuery = qLower.includes('প্রত্যয়') || qLower.includes('উপসর্গ') || qLower.includes('অনুসর্গ');

        // 0.4 CHECK MATH & SCIENCE QUERIES
        const isMathFormulaQuery = qLower.includes('সূত্র') || qLower.includes('উৎপাদক') || qLower.includes('মান নির্ণয়') || qLower.includes('ডোমেন') || qLower.includes('পিথাগোরাস') || qLower.includes('ত্রিকোণমিতি');
        const isSciencePhysicsQuery = qLower.includes('জড়তা') || qLower.includes('নিউটন') || qLower.includes('ত্বরণ') || qLower.includes('ভরবেগ') || qLower.includes('গতি');
        const isScienceChemQuery = qLower.includes('পরমাণু') || qLower.includes('ইলেকট্রন') || qLower.includes('পর্যায় সারণি') || qLower.includes('বন্ধন') || qLower.includes('যোজ্যতা');
        const isScienceBioQuery = qLower.includes('মাইটোকনড্রিয়া') || qLower.includes('কোষ') || qLower.includes('সালোকসংশ্লেষণ') || qLower.includes('atp') || qLower.includes('রক্ত');

        // 0.5 CHECK STORY PLOT & COMPREHENSION DATABASE FIRST
        let matchedStoryQA = null;
        let highestScore = 0;

        CHAPTER_STORY_QA_DATABASE.filter(qa => chTitle.includes(qa.chapterMatch)).forEach(qa => {
          let score = 0;
          qa.triggers.forEach(tr => {
            if (qLower.includes(tr.toLowerCase())) {
              score += tr.length >= 4 ? 3 : 1.5;
            }
          });
          if (score > highestScore && score >= 3) {
            highestScore = score;
            matchedStoryQA = qa;
          }
        });

        // 1. SPECIFIC INTENT: BIRTH / DEATH / YEAR
        const isBirthQuery = qLower.includes('jonmo') || qLower.includes('জন্ম') || qLower.includes('সাল') || qLower.includes('shaley') || qLower.includes('shale') || qLower.includes('sal') || qLower.includes('kobe') || qLower.includes('কবে') || qLower.includes('birth') || qLower.includes('মৃত্যু') || qLower.includes('death');
        
        // 2. SPECIFIC INTENT: WHO WROTE / AUTHOR
        const isWhoWroteQuery = qLower.includes('kar lekha') || qLower.includes('কার লেখা') || qLower.includes('lekhok ke') || qLower.includes('লেখক কে') || qLower.includes('রচয়িতা কে') || qLower.includes('লেখক') || qLower.includes('রচয়িতা') || qLower.includes('কবি কে');

        // 3. SPECIFIC INTENT: BOOK / SOURCE
        const isSourceBookQuery = qLower.includes('কোন গ্রন্থ') || qLower.includes('উৎস') || qLower.includes('কোথা থেকে') || qLower.includes('গ্রন্থের নাম') || qLower.includes('বইয়ের নাম') || qLower.includes('সংকলিত') || qLower.includes('kon grontho');

        // 4. SPECIFIC INTENT: WORD MEANING / DEFINITION
        const isMeaningQuery = qLower.includes('ortho') || qLower.includes('অর্থ') || qLower.includes('মানে') || qLower.includes('meaning') || qLower.includes('কাকে বলে');

        // 5. SPECIFIC INTENT: SUMMARY / THEME
        const isSummaryQuery = qLower.includes('summary') || qLower.includes('সারসংক্ষেপ') || qLower.includes('মূলভাব') || qLower.includes('মূল ভাব') || qLower.includes('বক্তব্য') || qLower.includes('মূল কথা');

        // 6. SPECIFIC INTENT: QUESTIONS / CQ / MCQ
        const isQuestionQuery = qLower.includes('mcq') || qLower.includes('প্রশ্ন') || qLower.includes('question');

        // 7. SPECIFIC CHARACTER ACTIONS
        const isLifeSaverQuery = (qLower.includes('প্রাণ') || qLower.includes('জীবন') || qLower.includes('বাঁচিয়ে') || qLower.includes('রক্ষা')) && (qLower.includes('আলী') || qLower.includes('আব্বাস') || qLower.includes('কে'));
        const isKhalifaQuery = qLower.includes('খলিফা') || qLower.includes('khalifa') || qLower.includes('মামুন');

        if (isGibberish(query)) {
          reply = `🤔 দুঃখিত, আপনার বার্তাটি ("${query}") অর্থপূর্ণ কোনো প্রশ্ন হিসেবে শনাক্ত করা যায়নি।\n\n💡 **আপনি নিচের বিষয়গুলো নিয়ে আমাকে প্রশ্ন করতে পারেন:**\n• “${chTitle}”-এর সারসংক্ষেপ বা মূলভাব কী?\n• অধ্যায়ের লেখক কে এবং উৎস গ্রন্থ কী?\n• গুরুত্বপূর্ণ শব্দের অর্থ ও ব্যাকরণ ব্যাখ্যা\n• সৃজনশীল (ক, খ, গ, ঘ) লেখার নিয়মাবলী\n• বোর্ড পরীক্ষার গুরুত্বপূর্ণ প্রশ্নোত্তর`;
        } else if (isGreeting) {
          reply = `👋 **আসসালামু আলাইকুম!** আমি আপনার NCTB এআই পড়ার সাথী (AI Tutor)।\n\nবর্তমানে সিলেক্ট করা অধ্যায়: **“${chTitle}”**।\n\nআপনি আমাকে পাঠ্যবইয়ের সারসংক্ষেপ, শব্দার্থ, লেখক পরিচিতি, ব্যাকরণ বা সৃজনশীল লেখার নিয়ম নিয়ে যেকোনো প্রশ্ন করতে পারেন!`;
        } else if (isCQRuleQuery) {
          reply = `🎯 **NCTB বোর্ড স্ট্যান্ডার্ড সৃজনশীল (CQ) উত্তর লেখার নিয়মাবলী:**\n\nপ্রতিটি সৃজনশীলে মোট **১০ নম্বর** থাকে এবং ৪টি সুনির্দিষ্ট ধাপে উত্তর লিখতে হয়:\n\n📌 **(ক) জ্ঞানমূলক [১ নম্বর]:**\n• সরাসরি ১ বাক্যে তথ্য বা সঠিক সংজ্ঞা লিখবেন। কোনো ব্যাখ্যা দেওয়ার প্রয়োজন নেই।\n\n💡 **(খ) অনুধাবনমূলক [২ নম্বর] (২টি প্যারা):**\n• ১ম প্যারা (জ্ঞান): ১ বাক্যে মূল ভাব বা উত্তর।\n• ২য় প্যারা (অনুধাবন): পাঠ্যবইয়ের প্রেক্ষিতে ২-৩ বাক্যে বিশদ ব্যাখ্যা।\n\n🎯 **(গ) প্রয়োগমূলক [৩ নম্বর] (৩টি প্যারা):**\n• ১ম প্যারা (জ্ঞান): উদ্দীপকের সাথে পাঠের কোন দিকের মিল/অমিল রয়েছে তা ১ বাক্যে প্রকাশ।\n• ২য় প্যারা (অনুধাবন): পাঠ্যবইয়ের সংশ্লিষ্ট তত্ত্বের ব্যাখ্যা।\n• ৩য় প্যারা (প্রয়োগ): উদ্দীপকের চরিত্রের সাথে পাঠের তুলনামূলক বিচার।\n\n🏆 **(ঘ) উচ্চতর দক্ষতামূলক [৪ নম্বর] (৪টি প্যারা):**\n• ১ম প্যারা: চূড়ান্ত সিদ্ধান্তমূলক জ্ঞান (১ বাক্য)।\n• ২য় প্যারা: পাঠ্যবইয়ের সামগ্রিক তাৎপর্য।\n• ৩য় প্যারা: উদ্দীপকের যৌক্তিক ঘটনা পর্যালোচনা।\n• ৪র্থ প্যারা: সামগ্রিক মূল্যায়ন ও সমাপ্তি মন্তব্য।`;
        } else if (isSamasQuery) {
          reply = `🎯 **সমাস (Samas) সংক্রান্ত ব্যাকরণ নিয়ম:**\n\n• **সংজ্ঞা:** পরস্পর অর্থসঙ্গতিবিশিষ্ট দুই বা ততোধিক পদ এক পদে পরিণত হওয়াকে সমাস বলে।\n• **প্রধান সমাস ৬ প্রকার:**\n১. **দ্বন্দ্ব সমাস:** উভয় পদের অর্থ প্রধান (যেমন: পিতা ও মাতা = পিতামাতা)।\n২. **দ্বিগু সমাস:** সংখ্যাবাচক শব্দ পূর্বে থাকে (যেমন: তিন কালের সমাহার = ত্রিকাল)।\n৩. **তৎপুরুষ সমাস:** পূর্বপদের বিভক্তি লোপ পায় (যেমন: দুঃখকে প্রাপ্ত = দুঃখপ্রাপ্ত)।\n৪. **কর্মধারয় সমাস:** বিশেষণ ও বিশেষ্য পদ (যেমন: নীল যে পদ্ম = নীলপদ্ম)।\n৫. **বহুব্রীহি সমাস:** অন্য কোনো তৃতীয় অর্থ বোঝায় (যেমন: দশ আনন যার = দশানন)।\n৬. **অব্যয়ীভাব সমাস:** পূর্বপদের অব্যয়ের অর্থ প্রধান (যেমন: কূলের সমীপে = উপকূল)।`;
        } else if (isSandhiQuery) {
          reply = `🎯 **সন্ধি (Sandhi) সংক্রান্ত নিয়ম ও উদাহরণ:**\n\n• **সংজ্ঞা:** সন্নিহিত দুটি ধ্বনির মিলনকে সন্ধি বলে।\n• **প্রধান প্রকারভেদ:** ১. স্বরসন্ধি, ২. ব্যঞ্জনসন্ধি ও ৩. বিসর্গ সন্ধি।\n\n📌 **গুরুত্বপূর্ণ বোর্ড উদাহরণ:**\n• বিদ্যা + আলয় = বিদ্যালয় (অ/আ + অ/আ = আ)\n• রবি + ইন্দ্র = রবীন্দ্র (ই + ই = ঈ)\n• দিক্ + অন্ত = দিগন্ত (ক্ + অ = গ্)\n• নমঃ + কার = নমস্কার (বিসর্গ রূপান্তর)`;
        } else if (isSciencePhysicsQuery) {
          reply = `🎯 **পদার্থবিজ্ঞান: গতি, বল ও নিউটনের সূত্রাবলী:**\n\n• **জড়তা:** বস্তু যে অবস্থায় আছে চিরকাল সে অবস্থায় থাকতে চাওয়ার ধর্ম।\n• **নিউটনের গতিসূত্রাবলী:**\n১. ১ম সূত্র (জড়তা ও বলের সংজ্ঞা): বাহ্যিক বল প্রয়োগ না করলে স্থির বস্তু চিরকাল স্থির এবং গতিশীল বস্তু সুষম দ্রুতিতে সরলরেখায় চলতে থাকবে।\n২. ২য় সূত্র (বলের পরিমাপ): বস্তুর ভরবেগের পরিবর্তনের হার তার ওপর প্রযুক্ত বলের সমানুপাতিক (F = ma)।\n৩. ৩য় সূত্র (ক্রিয়া ও প্রতিক্রিয়া): প্রত্যেক ক্রিয়ারই একটি সমান ও বিপরীত প্রতিক্রিয়া আছে (F₁ = -F₂)।`;
        } else if (isScienceChemQuery) {
          reply = `🎯 **রসায়ন: পরমাণুর গঠন ও রাসায়নিক বন্ধন:**\n\n• **অষ্টক নিয়ম:** পরমাণুসমূহের সর্ববহিঃস্থ স্তরে ৮টি ইলেকট্রন অর্জনের প্রবণতা।\n• **আয়নীয় বন্ধন:** ধাতু ও অধাতুর মধ্যে ইলেকট্রন আদান-প্রদানের ফলে সৃষ্ট বন্ধন (যেমন: Na + Cl -> NaCl)।\n• **সমযোজী বন্ধন:** দুটি অধাতু পরমাণু পরস্পরের মধ্যে ইলেকট্রন শেয়ারের মাধ্যমে যে বন্ধন গঠন করে (যেমন: H₂O, CH₄, CO₂)।`;
        } else if (isScienceBioQuery) {
          reply = `🎯 **জীববিজ্ঞান: কোষ ও গুরুত্বপূর্ণ অঙ্গাণু:**\n\n• **মাইটোকনড্রিয়া (Powerhouse):** কোষের শ্বসন ও শক্তি উৎপাদন কেন্দ্র যেখানে ক্রেবস চক্রের মাধ্যমে সিংহভাগ ATP তৈরি হয়।\n• **ক্লোরোপ্লাস্ট:** সালোকসংশ্লেষণের মাধ্যমে সূর্যালোকের সাহায্যে শর্করা খাদ্য ও অক্সিজেন প্রস্তুতকারী প্লাস্টিড।\n• **রক্তের প্রধান ৩ কণিকা:** লোহিত রক্তকণিকা (অক্সিজেন পরিবহন), শ্বেত রক্তকণিকা (রোগ প্রতিরোধ), অনুচক্রিকা (রক্ত তঞ্চন/জমাট বাঁধা)।`;
        } else if (matchedStoryQA) {
          reply = matchedStoryQA.answer;
        } else if (isBirthQuery && authorInfo) {
          if (authorInfo.prophetBirth && (qLower.includes('মুহম্মদ') || qLower.includes('নবী') || qLower.includes('prophet') || !qLower.includes('ওয়াজেদ'))) {
            reply = `🎯 **হজরত মুহম্মদ (সা.)-এর জন্ম ও ওফাত:**\n• জন্ম: **৫৭০ খ্রিস্টাব্দের ১২ই রবিউল আউয়াল** (মক্কা নগরীর কুরাইশ বংশ)।\n• ওফাত: **৬৩২ খ্রিস্টাব্দের ১২ই রবিউল আউয়াল** (মদিনা শরিফ)।\n• পিতা-মাতা: পিতা আবদুল্লাহ ও মাতা মা আমিনা।`;
          } else {
            reply = `🎯 **${authorInfo.author}-এর জন্ম ও পরিচয়:**\n• জন্মসাল: **${authorInfo.authorBirth}**\n• মৃত্যু: **${authorInfo.authorDeath}**\n📖 অধ্যায়: “${chTitle}”`;
          }
        } else if (isLifeSaverQuery && chTitle.includes('প্রত্যুপকার')) {
          reply = `🎯 **সঠিক উত্তর: দামেস্কের ক্ষমতাচ্যুত শাসনকর্তা**\n\n📌 ব্যাখ্যা: দামেস্কে চরম বিপদের সময় তিনি আলী ইবনে আব্বাসকে গোপনে নিজ গৃহে আশ্রয় দিয়ে জীবন রক্ষা করেছিলেন।`;
        } else if (isKhalifaQuery && chTitle.includes('প্রত্যুপকার')) {
          reply = `🎯 **সঠিক উত্তর: আব্বাসীয় খলিফা মামুন**\n\n📌 ব্যাখ্যা: তিনি ছিলেন বাগদাদের ন্যায়পরায়ণ, ক্ষমাশীল ও জ্ঞানানুরাগী শাসক।`;
        } else if (isSourceBookQuery) {
          if (chTitle.includes('প্রত্যুপকার')) {
            reply = `🎯 **উৎস গ্রন্থ: ‘আখ্যানমঞ্জরী’ (১৮৬৮ খ্রি.)**\n\n📌 ‘প্রত্যুপকার’ গল্পটি ঈশ্বরচন্দ্র বিদ্যাসাগরের সুবিখ্যাত শিক্ষামূলক গল্পগ্রন্থ ‘আখ্যানমঞ্জরী’ থেকে সংকলিত।`;
          } else if (chTitle.includes('মানুষ মুহম্মদ')) {
            reply = `🎯 **উৎস গ্রন্থ: ‘মরুভাস্কর’**\n\n📌 মোহাম্মদ ওয়াজেদ আলীর বিখ্যাত গ্রন্থ ‘মরুভাস্কর’ থেকে ‘মানুষ মুহম্মদ (স.)’ প্রবন্ধটি সংকলিত।`;
          } else if (chTitle.includes('শুভা')) {
            reply = `🎯 **উৎস গ্রন্থ: ‘গল্পগুচ্ছ’**\n\n📌 রবীন্দ্রনাথ ঠাকুরের বিখ্যাত ‘গল্পগুচ্ছ’ থেকে ‘শুভা’ গল্পটি সংকলিত।`;
          } else {
            reply = `🎯 **উৎস:**\n“${chTitle}” পাঠ্যবইয়ের মূল সংকলন থেকে গৃহীত।`;
          }
        } else if (isMeaningQuery) {
          if (chTitle.includes('প্রত্যুপকার')) {
            reply = `🎯 **‘প্রত্যুপকার’ শব্দের অর্থ:** **উপকারের বিনিময়ে উপকার করা** (অর্থাৎ অপরের উপকারের প্রতিদান ও কৃতজ্ঞতা স্বীকার করা)।`;
          } else if (chTitle.includes('নিমগাছ')) {
            reply = `🎯 **‘নিমগাছ’ গল্পের মূল অর্থ:** পরিবারে নিঃস্বার্থভাবে সেবা দিয়ে যাওয়া গৃহকর্মনিপুণা লক্ষ্মীবউয়ের নীরব ত্যাগের রূপক।`;
          } else if (chTitle.includes('শিক্ষা ও মনুষ্যত্ব')) {
            reply = `🎯 **‘মনুষ্যত্ব’ শব্দের অর্থ:** প্রকৃত মানবীয় মূল্যবোধ ও আত্মার মুক্তি।`;
          } else {
            const meaningNote = chSelfTest.find(st => st.q.includes('অর্থ')) || chLectureNotes[0];
            reply = `🎯 **অর্থ ও তাৎপর্য:**\n${meaningNote ? (meaningNote.options ? meaningNote.options[meaningNote.correct] : meaningNote.detail) : chSummary}`;
          }
        } else if (isWhoWroteQuery && authorInfo) {
          reply = `🎯 **সঠিক উত্তর: ${authorInfo.author}**\n\n📖 অধ্যায়: “${chTitle}”`;
        } else if (isSummaryQuery) {
          reply = `📚 **“${chTitle}” সারসংক্ষেপ:**\n${chSummary}\n\n💡 মূল শিক্ষা: ${chLectureNotes[0]?.detail || 'পাঠ্যবইয়ের মূল ভাববস্তু নিয়মিত চর্চা করো।'}`;
        } else if (isQuestionQuery) {
          if (chSelfTest.length > 0) {
            const qList = chSelfTest.slice(0, 2).map((st, i) => `${i + 1}. ${st.q}\n✓ **${st.options[st.correct]}** (${st.explanation})`).join('\n\n');
            reply = `🎯 **গুরুত্বপূর্ণ বোর্ড প্রশ্নোত্তর:**\n\n${qList}`;
          } else {
            reply = `🎯 **বোর্ড প্রশ্নোত্তর:**\n১. জ্ঞানমূলক: অধ্যায়ের মূল সংজ্ঞা ও লেখকের নাম মুখস্থ করো।\n২. অনুধাবন: মূল ভাববস্তুর আলোকে সংক্ষেপে ২ প্যারায় উত্তর লেখো।`;
          }
        } else {
          let specificSt = null;
          const stopWords = ['কার', 'কে', 'কী', 'কি', 'কোন', 'কত', 'সালে', 'নাম', 'বলতে', 'হলো', 'পিতা', 'পিতার', 'মাতা', 'মাতার', 'বাবা', 'মা', 'ঈশ্বরচন্দ্র', 'বিদ্যাসাগর', 'রবীন্দ্রনাথ', 'নজরুল', 'শরৎচন্দ্র', 'বঙ্কিমচন্দ্র', 'মুহম্মদ', 'প্রত্যুপকার', 'শুভা', 'নিমগাছ'];
          
          if (chSelfTest && chSelfTest.length > 0) {
            specificSt = chSelfTest.find(st => {
              const qClean = st.q.replace(/[০-৯১-৫\.\‘\’\'\?]/g, '').toLowerCase();
              const words = qLower.split(/[\s,?.!]+/).filter(w => w.length >= 3 && !stopWords.includes(w));
              const matches = words.filter(w => qClean.includes(w));
              return matches.length >= 2;
            });
          }

          const matchedNote = chLectureNotes.find(note => {
            const noteText = `${note.title} ${note.detail}`.toLowerCase();
            const words = qLower.split(/[\s,?.!]+/).filter(w => w.length >= 3 && !stopWords.includes(w));
            return words.some(w => noteText.includes(w));
          });

          if (specificSt) {
            reply = `🎯 **সঠিক উত্তর: ${specificSt.options[specificSt.correct]}**\n\n📌 ব্যাখ্যা: ${specificSt.explanation}`;
          } else if (matchedNote) {
            reply = `🎯 **${matchedNote.title}:**\n${matchedNote.detail}\n\n📖 অধ্যায়: “${chTitle}”`;
          } else {
            reply = `🤔 দুঃখিত, আপনার প্রশ্নটি (“${query}”) স্পষ্ট নয় অথবা বর্তমান সিলেক্ট করা অধ্যায় **“${chTitle}”**-এর তথ্যের সাথে সরাসরি মেলেনি।\n\n💡 **আপনি এই অধ্যায় সম্পর্কিত নিচের যেকোনো তথ্য জানতে পারেন:**\n• অধ্যায়ের মূলভাব বা সারসংক্ষেপ কী?\n• রচয়িতা বা লেখকের পরিচিতি ও উৎস\n• গুরুত্বপূর্ণ বোর্ড প্রশ্নোত্তর\n• সৃজনশীল প্রশ্নের উত্তর লেখার কাঠামো`;
          }
        }

        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        earnPoints(2, language === 'bn' ? 'AI টিউটর উত্তর সম্পন্ন (+২ পয়েন্ট)' : 'AI Question Answered (+2 Points)');
      } catch (err) {
        console.error('AI Tutor Query Error:', err);
        setChatMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'ai',
            text: '🎯 **সঠিক উত্তর:** পাঠ্যবই অনুযায়ী তথ্য প্রস্তুত করা হয়েছে।',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } finally {
        setIsThinking(false);
      }
    }, 150);
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
              setSelectedSubIdForUpload(firstSubId);
              setSelectedChapterTitle('all');
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
              className="text-[10px] font-bold text-red-700 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded-lg border border-red-200 tap-active flex items-center gap-0.5"
              title="Add Custom Subject"
            >
              <Plus className="w-3 h-3" />
              <span>বিষয় যোগ</span>
            </button>
          </div>

          <SleekCustomDropdown
            options={Object.entries(groupedSubjects).flatMap(([groupName, groupSubs]) => 
              groupSubs.map((sub) => {
                const chCount = NCTB_FULL_BOOK_CHAPTERS_MAP[sub.id]?.length || (sub.id === 'bangla-sahitya' ? 50 : 3);
                return {
                  value: sub.id,
                  label: `${sub.icon || '📖'} ${language === 'bn' ? sub.nameBn : sub.nameEn}`,
                  badge: `${chCount}টি অধ্যায়`
                };
              })
            )}
            value={selectedSubIdForUpload}
            onChange={(val) => {
              setSelectedSubIdForUpload(val);
              setSelectedChapterTitle('all');
            }}
          />
        </div>

        {/* ================= 3RD LINE: CHAPTER SELECTOR (অধ্যায় তালিকা) ================= */}
        <div className="space-y-1">
          <label className="text-[11px] font-black text-amber-950 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>[{activeSubName}]-এর সম্পূর্ণ অধ্যায় তালিকা:</span>
          </label>

          <SleekCustomDropdown
            options={[
              {
                value: 'all',
                label: `🌟 [${activeSubName}] সকল অধ্যায় থেকে প্রশ্ন করুন`,
                badge: `${availableChapters.length}টি অধ্যায়`
              },
              ...availableChapters.map((ch, idx) => ({
                value: ch.title,
                label: `📖 ${ch.title}`,
                badge: ch.type || `অধ্যায় ${idx + 1}`
              }))
            ]}
            value={selectedChapterTitle}
            onChange={(val) => setSelectedChapterTitle(val)}
          />
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. ACTIVE VIEW MODE CONTENT (CHAT / SCANNER / PODCAST) */}
      {/* ============================================================== */}

      {/* ================= MODE 2: INTERACTIVE SOCRATIC AI TUTOR CHAT ================= */}
      {activeMode === 'chat' && (
        <div className="space-y-3 animate-in fade-in">
          
          {/* Chat Messages Thread Container */}
          <div 
            ref={chatContainerRef} 
            className="space-y-3 min-h-[200px] max-h-[380px] overflow-y-auto pr-1 scroll-smooth"
          >
            {chatMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 text-slate-400 space-y-2">
                <div className="w-12 h-12 rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center text-2xl">
                  🤖
                </div>
                <p className="text-xs font-bold text-slate-600">
                  {selectedChapterTitle !== 'all' ? `“${selectedChapterTitle.split('—')[0]}”` : activeSubName} সম্পর্কিত যেকোনো প্রশ্ন নিচে লিখুন
                </p>
              </div>
            ) : (
              chatMessages.map((msg) => (
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
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      <User className="w-4 h-4 text-amber-300" />
                    </div>
                  )}
                </div>
              ))
            )}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-amber-800 italic py-1 font-bold animate-pulse px-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                <span>AI উত্তর তৈরি করছে...</span>
              </div>
            )}

            {/* Invisible Anchor for Smooth Auto-Scroll */}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="bg-white/95 backdrop-blur-md p-2 rounded-3xl border-2 border-red-100 shadow-sm flex items-center gap-2">
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

      {/* ================= MODE 1: BOOK & PDF SMART SCANNER (LIVE AI OCR & SUMMARIZER) ================= */}
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

      {/* ============================================================== */}
      {/* 3. PRIMARY AI LEARNING MODE TABS & PERSONA RIBBON (AT BOTTOM) */}
      {/* ============================================================== */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        
        {/* 3 Mode Tabs */}
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

        {/* Persona Selector Ribbon (when in chat mode) */}
        {activeMode === 'chat' && (
          <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-sm text-xs animate-in fade-in">
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
        )}

      </div>

    </div>
  );
}
