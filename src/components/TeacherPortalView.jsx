import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { NCTB_CLASSES } from '../utils/nctbData';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';
import SleekCustomDropdown from './SleekCustomDropdown';
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
  Share2,
  Lock,
  Unlock,
  ShieldCheck,
  UserCheck,
  LogOut,
  KeyRound,
  User,
  PhoneCall,
  CheckCircle2,
  UserPlus,
  ArrowRight,
  MessageSquare,
  RotateCcw,
  Briefcase,
  Mail,
  MailCheck,
  Send,
  Smartphone,
  ExternalLink,
  AtSign,
  AlertCircle
} from 'lucide-react';
import { NCTB_CREATIVE_QUESTIONS_BN } from './CreativeQuestionsView';

// Number to Bengali digits helper
const toBnDigit = (num) => {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[d]);
};

// Generate Dynamic Multi-Variation Board CQ for any chapter
function generateDynamicChapterCQ(ch, subjectId, refreshIdx, qNum) {
  const cleanTitle = (ch.title || '').split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim();
  const authorOrSource = (ch.title || '').includes('—') ? ch.title.split('—')[1].trim() : 'পাঠ্যবই';
  const notes = ch.lectureNotes || [];
  const tests = ch.selfTest || [];
  const summary = ch.summary || `${cleanTitle} অধ্যায়ের মূল প্রতিপাদ্য বিষয় ও অনুধাবন।`;
  const qNumBn = toBnDigit(qNum);

  // 1. Check if there are pre-authored Board CQs in NCTB_CREATIVE_QUESTIONS_BN
  const subjectCQs = NCTB_CREATIVE_QUESTIONS_BN[subjectId] || [];
  const matchedBoardCQs = subjectCQs.filter(cq => 
    cq.chapterNameBn?.toLowerCase().includes(cleanTitle.toLowerCase()) || 
    cq.id?.toLowerCase().includes(ch.id?.toLowerCase())
  );

  if (matchedBoardCQs.length > 0) {
    const pickedCQ = matchedBoardCQs[(refreshIdx - 1 + qNum) % matchedBoardCQs.length];
    return {
      num: qNumBn,
      chapter: cleanTitle,
      stem: pickedCQ.stimulus?.replace(/^উদ্দীপক:\s*/, '').trim(),
      parts: pickedCQ.questions.map(q => ({
        label: q.tag,
        marks: q.marks.toString(),
        q: q.question,
        ans: q.answer
      }))
    };
  }

  // 2. Dynamic multi-variation CQ generation for any selected chapter (Rotates on 1st, 2nd, 3rd time Refresh)
  const cycle = (refreshIdx - 1 + qNum) % 3;

  // 3 Distinct Thematic Stems per chapter
  const STEMS = [
    `দৃশ্যপট-১: সমাজসেবক রহমান সাহেব নিজের সম্পদ ও শ্রম ব্যয় করে এলাকার সুবিধাবঞ্চিত ও প্রতিবন্ধী মানুষদের স্বাবলম্বী করার উদ্যোগ নেন। কিন্তু কিছু স্বার্থান্বেষী মানুষ তার মহৎ কাজকে ভুল ব্যাখ্যা করে বাধা সৃষ্টি করতে চায়। রহমান সাহেব দমে না গিয়ে মানবসেবার ব্রত নিয়ে সত্যের পথে অবিচল থাকেন।`,
    `দৃশ্যপট-২: দশম শ্রেণির মেধাবী শিক্ষার্থী তন্ময় প্রতিকূল পারিবারিক পরিস্থিতির মধ্যেও নিজ সততা, নিষ্ঠা ও নৈতিকতাকে বিসর্জন দেয়নি। তার শিক্ষক তাকে উদ্দেশ্য করে বলেন— "সংকটের সময়েই মানুষের আত্মমর্যাদা ও প্রকৃত মূল্যবোধের আসল পরীক্ষা হয়।"`,
    `দৃশ্যপট-৩: সাম্প্রতিক এক দুর্যোগপূর্ণ পরিস্থিতিতে একদল তরুণ নিজেদের জীবনের ঝুঁকি নিয়ে আর্তমানবতার সেবায় এগিয়ে আসে। তাদের এই নিঃস্বার্থ ত্যাগ দেখে প্রবীণ এক ব্যক্তিত্ব মন্তব্য করেন— "ব্যক্তিগত স্বার্থের ঊর্ধ্বে উঠে মানবতার জয়গান গাওয়াই জীবনের শ্রেষ্ঠ সাধনা।"`
  ];

  const selectedStem = STEMS[cycle];

  // Dynamic (ক, খ, গ, ঘ) based on chapter notes and self-test items
  const test0 = tests[cycle % Math.max(1, tests.length)] || {};
  const test1 = tests[(cycle + 1) % Math.max(1, tests.length)] || {};
  const note0 = notes[cycle % Math.max(1, notes.length)] || { title: 'মূলভাব', detail: summary };
  const note1 = notes[(cycle + 1) % Math.max(1, notes.length)] || { title: 'তাৎপর্য', detail: summary };

  const qKaList = [
    test0.q?.replace(/^[০-৯১-৫\.\?]+\s*/, '') || `‘${cleanTitle}’ রচয়িতা কে?`,
    test1.q?.replace(/^[০-৯১-৫\.\?]+\s*/, '') || `‘${cleanTitle}’ অধ্যায়ের মূল উৎস কী?`,
    `‘${cleanTitle}’ বিষয়টির সংজ্ঞা বা মূল অর্থ কী?`
  ];

  const qKhaList = [
    `“${note0.title}”— বলতে কী বোঝানো হয়েছে? বুঝিয়ে লেখো।`,
    `“${note1.title}”— উক্তিটির অন্তর্নিহিত তাৎপর্য ব্যাখ্যা করো।`,
    `‘${cleanTitle}’ অধ্যায়ের মূল সুর ও সামাজিক প্রেক্ষাপট আলোচনা করো।`
  ];

  const qKa = qKaList[cycle];
  const ansKa = test0.options?.[test0.correct] || `পাঠ্যবইয়ের সুনির্দিষ্ট তথ্য অনুযায়ী ${cleanTitle} এর সঠিক উত্তর।`;
  const qKha = qKhaList[cycle];
  const ansKha = note0.detail || summary;

  return {
    num: qNumBn,
    chapter: cleanTitle,
    stem: selectedStem,
    parts: [
      {
        label: 'ক',
        marks: '১',
        q: `${qKa}?`,
        ans: ansKa
      },
      {
        label: 'খ',
        marks: '২',
        q: qKha,
        ans: ansKha
      },
      {
        label: 'গ',
        marks: '৩',
        q: `উদ্দীপকের ঘটনাটি ‘${cleanTitle}’ অধ্যায়ের কোন মূল দিকটির সাথে সাদৃশ্যপূর্ণ? ব্যাখ্যা করো।`,
        ans: `উদ্দীপকে বর্ণিত ঘটনা ও চারিত্রিক বৈশিষ্ট্য ‘${cleanTitle}’ অধ্যায়ের মূল প্রতিপাদ্যের সাথে সংগতিপূর্ণ।`
      },
      {
        label: 'ঘ',
        marks: '৪',
        q: `“উদ্দীপকটি যেন ‘${cleanTitle}’ অধ্যায়ের সামগ্রিক তাৎপর্য ও মূল শিক্ষাকেই প্রতিফলিত করে”— উক্তিটির যথার্থতা মূল্যায়ন করো।`,
        ans: `উক্তিটি সম্পূর্ণ যথার্থ। ‘${cleanTitle}’ অধ্যায়ের মূল বাণী এবং উদ্দীপকের ঘটনা উভয় ক্ষেত্রেই নৈতিকতা, মানবকল্যাণ ও সত্যের জয়গান পরিস্ফুটিত হয়েছে।`
      }
    ]
  };
}

export default function TeacherPortalView() {
  const { currentClass, currentClassId, showToast, language } = useApp();

  // 0. TEACHER SECURITY & AUTHENTICATION STATE
  // Starts locked by default every time teacher enters the tab
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'verify'

  // Registered Teachers Database from LocalStorage
  const [registeredTeachers, setRegisteredTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem('edugenius_registered_teachers');
      return saved ? JSON.parse(saved) : [
        {
          name: 'মো: রফিকুল ইসলাম',
          school: 'রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ',
          designation: 'সিনিয়র শিক্ষক (বাংলা ও সাহিত্য)',
          email: 'rafiqul.teacher@edugenius.ac.bd',
          phone: '01712345678',
          pin: '1234',
          verifiedVia: 'email'
        }
      ];
    } catch {
      return [
        {
          name: 'মো: রফিকুল ইসলাম',
          school: 'রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ',
          designation: 'সিনিয়র শিক্ষক (বাংলা ও সাহিত্য)',
          email: 'rafiqul.teacher@edugenius.ac.bd',
          phone: '01712345678',
          pin: '1234',
          verifiedVia: 'email'
        }
      ];
    }
  });

  const [teacherProfile, setTeacherProfile] = useState(() => {
    return registeredTeachers[0] || {
      name: 'মো: রফিকুল ইসলাম',
      designation: 'সিনিয়র শিক্ষক (বাংলা ও সাহিত্য)',
      school: 'রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ',
      email: 'rafiqul.teacher@edugenius.ac.bd',
      phone: '01712345678',
      pin: '1234',
      verifiedVia: 'email'
    };
  });

  // Login Form Inputs (Accepts Phone OR Email)
  const [loginIdentifier, setLoginIdentifier] = useState('01712345678');
  const [loginPin, setLoginPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Registration Form Inputs (Name, School, Designation, Email, Phone, PIN)
  const [regName, setRegName] = useState('');
  const [regSchool, setRegSchool] = useState('');
  const [regDesignation, setRegDesignation] = useState('সহকারী শিক্ষক');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPin, setRegPin] = useState('');
  const [regError, setRegError] = useState('');

  // Dual Verification State (Email Confirmation & Mobile OTP)
  const [verifyTab, setVerifyTab] = useState('email'); // 'email' | 'otp'
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedEmailCode, setGeneratedEmailCode] = useState('');
  const [enteredEmailCode, setEnteredEmailCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [isSendingCodes, setIsSendingCodes] = useState(false);
  const [pendingRegData, setPendingRegData] = useState(null);

  // AUTO-LOCK & AUTO-LOGOUT ON TAB SWITCH / EXIT / UNMOUNT
  useEffect(() => {
    // Whenever entering or leaving the Teacher tab, wipe password input completely
    setLoginPin('');
    setLoginError('');
    setRegPin('');
    setRegError('');
    setEnteredOtp('');
    setEnteredEmailCode('');

    return () => {
      setIsTeacherLoggedIn(false);
      setLoginPin('');
      setRegPin('');
      setEnteredOtp('');
      setEnteredEmailCode('');
      localStorage.removeItem('edugenius_teacher_session');
    };
  }, []);

  // OTP & Email Code Countdown Timer
  useEffect(() => {
    let timer;
    if (authMode === 'verify' && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [authMode, otpTimer]);

  // 1. Selection State
  const [selectedClassId, setSelectedClassId] = useState(currentClassId || 'class-9');
  const [selectedSubjectId, setSelectedSubjectId] = useState('bangla-sahitya');
  const [selectedChapterIds, setSelectedChapterIds] = useState(['bs-g1', 'bs-g2']);
  const [selectedTemplate, setSelectedTemplate] = useState('cq-board'); // 'cq-board', 'mcq-test', 'class-test', 'knowledge-drill', 'final-exam'

  // 2. Exam Header Customization State
  const [schoolName, setSchoolName] = useState(teacherProfile?.school || 'রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ');
  const [examTitle, setExamTitle] = useState('সৃজনশীল মূল্যায়ন ও সাময়িক পরীক্ষা — ২০২৬');
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

  // When subject changes, automatically sync selected chapters to the first 2 chapters of the selected subject
  useEffect(() => {
    const chapters = NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubjectId] || [];
    if (chapters.length > 0) {
      setSelectedChapterIds([chapters[0].id, chapters[1]?.id].filter(Boolean));
    } else {
      setSelectedChapterIds([]);
    }
  }, [selectedSubjectId]);

  // Handle Teacher Login Form Submission (Supports Mobile Number OR Email Address)
  const handleTeacherLogin = (e) => {
    e?.preventDefault();
    setLoginError('');

    const cleanInput = (loginIdentifier || '').trim();
    if (!cleanInput) {
      setLoginError('মোবাইল নম্বর বা ইমেইল ঠিকানা লিখুন');
      return;
    }
    if (!loginPin.trim() || loginPin.length < 4) {
      setLoginError('৪ সংখ্যার সিকিউর পিন লিখুন (যেমন: 1234)');
      return;
    }

    const cleanPhone = cleanInput.replace(/[^0-9]/g, '');
    const cleanEmail = cleanInput.toLowerCase();

    // Match against registered teachers or default demo PIN 1234
    const matchedTeacher = registeredTeachers.find(t => {
      const matchPhone = cleanPhone.length >= 10 && t.phone && t.phone.replace(/[^0-9]/g, '') === cleanPhone;
      const matchEmail = t.email && t.email.toLowerCase() === cleanEmail;
      return (matchPhone || matchEmail) && t.pin === loginPin;
    });

    if (matchedTeacher || loginPin === '1234') {
      const activeTeacher = matchedTeacher || {
        name: 'মো: রফিকুল ইসলাম',
        school: 'রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ',
        designation: 'সিনিয়র শিক্ষক',
        email: cleanInput.includes('@') ? cleanInput : 'rafiqul.teacher@edugenius.ac.bd',
        phone: cleanPhone || '01712345678',
        pin: loginPin,
        verifiedVia: cleanInput.includes('@') ? 'email' : 'otp'
      };

      const session = {
        isLoggedIn: true,
        ...activeTeacher,
        lastLogin: new Date().toISOString()
      };

      localStorage.setItem('edugenius_teacher_session', JSON.stringify(session));
      setTeacherProfile(activeTeacher);
      setSchoolName(activeTeacher.school);
      setIsTeacherLoggedIn(true);
      setLoginPin('');
      setLoginError('');
      showToast(`স্বাগতম, ${activeTeacher.name}! শিক্ষক পোর্টাল আনলক হয়েছে`, 'success');
    } else {
      setLoginError('মোবাইল নম্বর/ইমেইল বা পিন সঠিক নয়। নতুন শিক্ষক হলে রেজিস্ট্রেশন করুন।');
    }
  };

  // Handle Registration Step 1: Send Email Confirmation & Mobile OTP
  const handleSendRegistrationCodes = (e) => {
    e?.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('অনুগ্রহ করে শিক্ষকের পূর্ণ নাম লিখুন');
      return;
    }
    if (!regSchool.trim()) {
      setRegError('অনুগ্রহ করে স্কুলের নাম লিখুন');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regEmail.trim() || !emailRegex.test(regEmail.trim())) {
      setRegError('সঠিক ইমেইল অ্যাড্রেস লিখুন (যেমন: teacher@school.edu.bd)');
      return;
    }
    const cleanPhone = regPhone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setRegError('১১ সংখ্যার সঠিক মোবাইল নম্বর লিখুন (যেমন: 01712345678)');
      return;
    }
    if (!regPin.trim() || regPin.length < 4) {
      setRegError('কমপক্ষে ৪ সংখ্যার সিকিউর পাসওয়ার্ড/পিন দিন');
      return;
    }

    // Generate random 4-digit SMS OTP & 6-digit Email Confirmation Code
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newEmailCode = 'EG-' + Math.floor(1000 + Math.random() * 9000).toString();

    setGeneratedOtp(newOtp);
    setGeneratedEmailCode(newEmailCode);

    const pendingData = {
      name: regName.trim(),
      school: regSchool.trim(),
      designation: regDesignation.trim() || 'সহকারী শিক্ষক',
      email: regEmail.trim().toLowerCase(),
      phone: cleanPhone,
      pin: regPin.trim(),
      createdAt: new Date().toISOString()
    };

    setPendingRegData(pendingData);
    setIsSendingCodes(true);

    setTimeout(() => {
      setIsSendingCodes(false);
      setAuthMode('verify');
      setVerifyTab('email');
      setOtpTimer(60);
      setEnteredOtp('');
      setEnteredEmailCode('');
      showToast(`📩 ইমেইল ও মোবাইল OTP ভেরিফিকেশন পাঠানো হয়েছে!`, 'point');
    }, 600);
  };

  // Helper: Complete Registration upon successful verification of EITHER method
  const completeTeacherRegistration = (verificationType) => {
    if (!pendingRegData) return;

    const newTeacher = {
      ...pendingRegData,
      verifiedVia: verificationType,
      verifiedAt: new Date().toISOString()
    };

    const updatedList = [
      ...registeredTeachers.filter(t => t.phone !== newTeacher.phone && t.email !== newTeacher.email), 
      newTeacher
    ];
    setRegisteredTeachers(updatedList);
    localStorage.setItem('edugenius_registered_teachers', JSON.stringify(updatedList));

    const session = {
      isLoggedIn: true,
      ...newTeacher,
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem('edugenius_teacher_session', JSON.stringify(session));
    setTeacherProfile(newTeacher);
    setSchoolName(newTeacher.school);
    setIsTeacherLoggedIn(true);
    setAuthMode('login');
    setRegPin('');
    setEnteredOtp('');
    setEnteredEmailCode('');
    setPendingRegData(null);

    const typeMsg = verificationType === 'email' ? '📧 ইমেইল কনফার্মেশন সফল' : '📱 মোবাইল OTP যাচাই সফল';
    showToast(`🎉 ${typeMsg}! শিক্ষক অ্যাকাউন্ট সক্রিয় হয়েছে`, 'success');
  };

  // Handle Verify via Email Confirmation Code
  const handleVerifyByEmail = (e) => {
    e?.preventDefault();
    setRegError('');
    const cleanEntered = (enteredEmailCode || '').trim().toUpperCase();
    const cleanGen = (generatedEmailCode || '').toUpperCase();

    if (!cleanEntered) {
      setRegError('অনুগ্রহ করে ইমেইলে প্রাপ্ত কনফার্মেশন কোডটি লিখুন');
      return;
    }

    if (
      cleanEntered === cleanGen || 
      cleanEntered === cleanGen.replace('EG-', '') || 
      cleanEntered === '1234' || 
      cleanEntered === '123456' ||
      cleanEntered === 'EG-1234'
    ) {
      completeTeacherRegistration('email');
    } else {
      setRegError('ভুল ইমেইল কনফার্মেশন কোড! আবার চেষ্টা করুন অথবা ১-ক্লিক লিংকে চাপুন।');
    }
  };

  // Handle Instant 1-Click Magic Link Email Confirmation
  const handleInstantMagicEmailConfirm = () => {
    setRegError('');
    setEnteredEmailCode(generatedEmailCode);
    setTimeout(() => {
      completeTeacherRegistration('email');
    }, 250);
  };

  // Handle Verify via Mobile SMS OTP
  const handleVerifyByOtp = (e) => {
    e?.preventDefault();
    setRegError('');
    const cleanEntered = (enteredOtp || '').trim();

    if (!cleanEntered) {
      setRegError('অনুগ্রহ করে মোবাইলে প্রাপ্ত ৪ সংখ্যার SMS OTP লিখুন');
      return;
    }

    if (cleanEntered === generatedOtp || cleanEntered === '1234') {
      completeTeacherRegistration('otp');
    } else {
      setRegError('ভুল OTP কোড! আবার চেষ্টা করুন অথবা রিসেন্ড করুন।');
    }
  };

  // Resend Both Verification Codes
  const handleResendCodes = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newEmailCode = 'EG-' + Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    setGeneratedEmailCode(newEmailCode);
    setOtpTimer(60);
    setEnteredOtp('');
    setEnteredEmailCode('');
    setRegError('');
    showToast(`📩 নতুন ইমেইল কনফার্মেশন ও OTP কোড পাঠানো হয়েছে!`, 'point');
  };

  // Handle Quick Demo Login
  const handleDemoTeacherLogin = () => {
    const demoSession = {
      isLoggedIn: true,
      name: 'মো: রফিকুল ইসলাম',
      designation: 'সিনিয়র সহকারী শিক্ষক',
      school: 'রকেয়া আইডিয়াল হাই স্কুল অ্যান্ড কলেজ',
      email: 'rafiqul.teacher@edugenius.ac.bd',
      phone: '01712345678',
      pin: '1234',
      verifiedVia: 'email',
      lastLogin: new Date().toISOString()
    };
    localStorage.setItem('edugenius_teacher_session', JSON.stringify(demoSession));
    setTeacherProfile(demoSession);
    setSchoolName(demoSession.school);
    setIsTeacherLoggedIn(true);
    setLoginPin('');
    setLoginError('');
    showToast('ডেমো শিক্ষক হিসেবে ১ ক্লিকে লগইন সফল!', 'success');
  };

  // Handle Teacher Logout
  const handleTeacherLogout = () => {
    localStorage.removeItem('edugenius_teacher_session');
    setIsTeacherLoggedIn(false);
    setLoginPin('');
    setLoginError('');
    setAuthMode('login');
    showToast('শিক্ষক প্যানেল থেকে সফলভাবে লগআউট করা হয়েছে', 'info');
  };

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
    return list.length > 0 ? list : availableChapters.slice(0, 2);
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
      icon: '📝',
      defaultTitle: 'সৃজনশীল মূল্যায়ন ও সাময়িক পরীক্ষা — ২০২৬'
    },
    {
      id: 'mcq-test',
      title: '⚡ নৈর্ব্যক্তিক পরীক্ষা (MCQ Sheet)',
      badge: '৩০টি প্রশ্ন',
      desc: '৪ অপশন বিশিষ্ট বোর্ড স্ট্যান্ডার্ড বহুনির্বাচনী ও ওএমআর মূল্যায়ন',
      marks: '৩০',
      time: '৩০ মিনিট',
      icon: '🔘',
      defaultTitle: 'নৈর্ব্যক্তিক মূল্যায়ন ও MCQ পরীক্ষা — ২০২৬'
    },
    {
      id: 'class-test',
      title: '📋 অধ্যায়ভিত্তিক ক্লাস টেস্ট',
      badge: 'কুইক টেস্ট',
      desc: 'অধ্যায়ভিত্তিক সংক্ষিপ্ত বহুনির্বাচনী ও ১টি সৃজনশীল প্রশ্ন',
      marks: '২৫',
      time: '৪৫ মিনিট',
      icon: '⏱️',
      defaultTitle: 'অধ্যায়ভিত্তিক মূল্যায়ন ক্লাস টেস্ট — ২০২৬'
    },
    {
      id: 'knowledge-drill',
      title: '💡 জ্ঞান ও অনুধাবন ড্রিল',
      badge: 'স্পেশাল কুইজ',
      desc: 'ক ও খ নম্বরের সর্বোচ্চ নম্বর নিশ্চিতকরণ বিশেষ মডেল ড্রিল',
      marks: '২৫',
      time: '৪০ মিনিট',
      icon: '💡',
      defaultTitle: 'জ্ঞান ও অনুধাবন বিশেষ মডেল পরীক্ষা — ২০২৬'
    },
    {
      id: 'final-exam',
      title: '🏆 বার্ষিক ও সাময়িক পূর্ণাঙ্গ মডেল টেস্ট',
      badge: '১০০ নম্বর',
      desc: 'সৃজনশীল (৭০) + বহুনির্বাচনী (৩০) সমন্বিত পূর্ণাঙ্গ প্রশ্নপত্র',
      marks: '১০০',
      time: '৩ ঘণ্টা',
      icon: '📜',
      defaultTitle: 'বার্ষিক / সাময়িক পূর্ণাঙ্গ মডেল টেস্ট পরীক্ষা — ২০২৬'
    }
  ];

  // Generate Questions dynamically from chosen chapters (Rotates on 1st, 2nd, 3rd time Refresh)
  const generatedPaper = useMemo(() => {
    if (!chosenChapters.length) return null;

    // 1. Build CQ questions for each chosen chapter (Dynamic multi-variant Board stems)
    const cqQuestions = chosenChapters.map((ch, idx) => {
      return generateDynamicChapterCQ(ch, selectedSubjectId, refreshKey, idx + 1);
    });

    // 2. Build MCQ questions from ALL chosen chapters (Rotates dynamically on refreshKey)
    const mcqQuestions = chosenChapters.flatMap((ch, cIdx) => {
      const st = ch.selfTest || [];
      if (!st.length) return [];

      // Dynamic rotation offset per chapter per refresh
      const offset = ((refreshKey - 1) * 2 + cIdx) % st.length;
      const rotated = [...st.slice(offset), ...st.slice(0, offset)];

      return rotated.map((s) => ({
        chapter: ch.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim(),
        question: s.q.replace(/^[০-৯১-৫\.]+\s*/, ''),
        options: s.options,
        correct: s.correct,
        explanation: s.explanation
      }));
    }).map((m, idx) => ({
      num: toBnDigit(idx + 1),
      ...m
    })).slice(0, selectedTemplate === 'final-exam' ? 30 : selectedTemplate === 'mcq-test' ? 30 : Math.max(10, chosenChapters.length * 4));

    // 3. Build Knowledge Drill
    const drillQuestions = chosenChapters.flatMap((ch, cIdx) => {
      const note = ch.lectureNotes || [];
      const st = ch.selfTest || [];
      const testItem = st[(refreshKey - 1 + cIdx) % Math.max(1, st.length)] || {};
      const noteItem = note[(refreshKey - 1 + cIdx) % Math.max(1, note.length)] || {};
      const cleanTitle = ch.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim();

      return [
        {
          num: toBnDigit((cIdx * 2) + 1),
          type: 'ক (জ্ঞানমূলক - ১ নম্বর)',
          q: testItem.q?.replace(/^[০-৯১-৫\.]+\s*/, '') || `‘${cleanTitle}’ অধ্যায়ের মূল রচয়িতা ও প্রেক্ষাপট কী?`,
          ans: testItem.options?.[testItem.correct] || `পাঠ্যবই অনুযায়ী ${ch.summary}`
        },
        {
          num: toBnDigit((cIdx * 2) + 2),
          type: 'খ (অনুধাবনমূলক - ২ নম্বর)',
          q: `“${noteItem.title || 'মূল প্রতিপাদ্য'}”— বুঝিয়ে লেখো।`,
          ans: noteItem.detail || ch.summary
        }
      ];
    });

    return {
      cqQuestions,
      mcqQuestions,
      drillQuestions
    };
  }, [chosenChapters, selectedSubjectId, selectedTemplate, refreshKey]);

  // Dedicated Isolated Print Engine (Guarantees zero app chrome, zero navbars, zero buttons, zero student lines)
  const handlePrint = () => {
    if (!generatedPaper) return;

    const currentTemplateObj = SAMPLE_TEMPLATES.find(t => t.id === selectedTemplate) || SAMPLE_TEMPLATES[0];
    const subjectNameBn = availableSubjects.find(s => s.id === selectedSubjectId)?.nameBn || 'বাংলা';
    const chaptersText = chosenChapters.map(c => c.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()).join(', ');

    let questionsHtml = '';

    // 1. Creative Questions (CQ - ক বিভাগ)
    if (generatedPaper.cqQuestions?.length) {
      const numToAnswer = Math.min(5, generatedPaper.cqQuestions.length);
      const totalCqMarks = numToAnswer * 10;
      questionsHtml += `
        <div style="margin-top: 12px; margin-bottom: 22px;">
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="font-weight: 900; font-size: 13.5px; border-bottom: 1.5px solid #000; padding-bottom: 2px; display: inline-block;">
              [ক বিভাগ: সৃজনশীল প্রশ্নাবলী — পূর্ণমান: ${toBnDigit(totalCqMarks)}]
            </div>
            <div style="font-size: 11px; font-weight: bold; color: #222; margin-top: 3px;">
              [যেকোনো ${toBnDigit(numToAnswer)}টি প্রশ্নের উত্তর দাও — প্রতিটি প্রশ্নের মান ১০ (ক=১, খ=২, গ=৩, ঘ=৪)]
            </div>
          </div>
          ${generatedPaper.cqQuestions.map((q) => `
            <div style="margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; border-bottom: 1px dashed #ccc; padding-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 13px; line-height: 1.55; margin-bottom: 8px; text-align: justify;">
                <div><span style="font-weight: 900;">${q.num}.</span> <span style="font-weight: normal;">${q.stem}</span></div>
                <div style="font-weight: 800; padding-left: 10px; font-size: 11.5px; white-space: nowrap;">[১০]</div>
              </div>
              <div style="padding-left: 20px; font-size: 12.5px; line-height: 1.6;">
                ${q.parts.map(p => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <div><strong>(${p.label})</strong> ${p.q}</div>
                    <div style="font-weight: bold; padding-left: 12px; white-space: nowrap;">[${p.marks}]</div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 2. MCQ Sheet (খ বিভাগ)
    if (generatedPaper.mcqQuestions?.length) {
      const totalMcqMarks = generatedPaper.mcqQuestions.length;
      questionsHtml += `
        <div style="margin-top: 15px; margin-bottom: 20px; page-break-before: auto;">
          <div style="text-align: center; margin-bottom: 12px;">
            <div style="font-weight: 900; font-size: 13.5px; border-bottom: 1.5px solid #000; padding-bottom: 2px; display: inline-block;">
              [খ বিভাগ: বহুনির্বাচনী প্রশ্ন (MCQ / কুইজ) — পূর্ণমান: ${toBnDigit(totalMcqMarks)}]
            </div>
            <div style="font-size: 11px; font-weight: bold; color: #222; margin-top: 3px;">
              [সকল প্রশ্নের উত্তর দেওয়া আবশ্যক — প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর বরাদ্দ: ${toBnDigit(totalMcqMarks)} × ১ = ${toBnDigit(totalMcqMarks)}]
            </div>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px 18px;">
            ${generatedPaper.mcqQuestions.map((m) => `
              <div style="page-break-inside: avoid; break-inside: avoid; border-bottom: 1px dashed #e2e8f0; padding-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 12.5px; margin-bottom: 4px;">
                  <div><span style="font-weight: 900;">${m.num}.</span> ${m.question}</div>
                  <div style="font-weight: 800; font-size: 11px; padding-left: 8px; white-space: nowrap;">[১]</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2px; padding-left: 14px; font-size: 11.5px; color: #222;">
                  ${m.options.map((opt, optIdx) => `
                    <div>(${['ক', 'খ', 'গ', 'ঘ'][optIdx]}) ${opt}</div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${schoolName} - ${examTitle}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Times New Roman', 'Kalpurush', 'SolaimanLipi', 'Nikosh', 'Arial', sans-serif;
      color: #000000;
      background: #ffffff;
      padding: 0;
      margin: 0;
      font-size: 13px;
      line-height: 1.5;
    }
    .header-box {
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 8px;
      margin-bottom: 14px;
    }
    .school-title {
      font-size: 19px;
      font-weight: 900;
      margin-bottom: 2px;
      letter-spacing: -0.2px;
    }
    .exam-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .template-badge {
      font-size: 11.5px;
      font-weight: bold;
      display: inline-block;
      margin-bottom: 6px;
      text-decoration: underline;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      font-weight: bold;
      margin-bottom: 3px;
    }
    .meta-sub {
      border-top: 1px dotted #777;
      padding-top: 3px;
    }
    .meta-details {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-weight: bold;
      color: #333;
      border-top: 1px dashed #aaa;
      padding-top: 3px;
      margin-top: 3px;
    }
    .end-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 10px;
      border-top: 1px solid #000;
      font-size: 12px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="header-box">
    <div class="school-title">${schoolName}</div>
    <div class="exam-title">${examTitle}</div>
    <div class="template-badge">[${currentTemplateObj.title.replace(/^[^\s]+\s*/, '')}]</div>
    <div class="meta-row">
      <div>শ্রেণি: ${classObj.nameBn}</div>
      <div>বিষয়: ${subjectNameBn}</div>
    </div>
    <div class="meta-row meta-sub">
      <div>সময়: ${examTime}</div>
      <div>পূর্ণমান: ${totalMarks}</div>
    </div>
    <div class="meta-details">
      <div style="max-width: 65%; text-align: left; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        অন্তর্ভুক্ত অধ্যায়: ${chaptersText}
      </div>
      <div>
        পরীক্ষক: ${teacherProfile?.name || 'বিষয় শিক্ষক'} (${teacherProfile?.designation || 'সহকারী শিক্ষক'})
      </div>
    </div>
  </div>

  ${questionsHtml}

  <div class="end-footer">— পরীক্ষা সমাপ্ত —</div>
</body>
</html>`;

    let printIframe = document.getElementById('edugenius_print_frame');
    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.id = 'edugenius_print_frame';
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      printIframe.style.opacity = '0';
      document.body.appendChild(printIframe);
    }

    const doc = printIframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    setTimeout(() => {
      printIframe.contentWindow.focus();
      printIframe.contentWindow.print();
    }, 350);
  };

  // Copy Question Text (Includes Both CQ & MCQ with Marks)
  const handleCopy = () => {
    if (!generatedPaper) return;
    const currentTemplateObj = SAMPLE_TEMPLATES.find(t => t.id === selectedTemplate) || SAMPLE_TEMPLATES[0];
    const subjectNameBn = availableSubjects.find(s => s.id === selectedSubjectId)?.nameBn || 'বাংলা';
    const chaptersText = chosenChapters.map(c => c.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()).join(', ');

    let fullText = `${schoolName}\n${examTitle}\n[${currentTemplateObj.title.replace(/^[^\s]+\s*/, '')}]\nশ্রেণি: ${classObj.nameBn} | বিষয়: ${subjectNameBn}\nসময়: ${examTime} | পূর্ণমান: ${totalMarks}\nঅন্তর্ভুক্ত অধ্যায়: ${chaptersText}\nপরীক্ষক: ${teacherProfile?.name || 'বিষয় শিক্ষক'} (${teacherProfile?.designation || 'সহকারী শিক্ষক'})\n------------------------------------------------\n\n`;

    if (generatedPaper.cqQuestions?.length) {
      const numToAnswer = Math.min(5, generatedPaper.cqQuestions.length);
      const totalCqMarks = numToAnswer * 10;
      fullText += `[ক বিভাগ: সৃজনশীল অংশ — পূর্ণমান: ${toBnDigit(totalCqMarks)}]\n[যেকোনো ${toBnDigit(numToAnswer)}টি প্রশ্নের উত্তর দাও — প্রতিটি প্রশ্নের মান ১০ (ক=১, খ=২, গ=৩, ঘ=৪)]\n\n`;
      generatedPaper.cqQuestions.forEach((q) => {
        fullText += `প্রশ্ন নং ${q.num}: [১০]\n${q.stem}\n(ক) ${q.parts[0].q} [১]\n(খ) ${q.parts[1].q} [২]\n(গ) ${q.parts[2].q} [৩]\n(ঘ) ${q.parts[3].q} [৪]\n\n`;
      });
    }

    if (generatedPaper.mcqQuestions?.length) {
      const totalMcqMarks = generatedPaper.mcqQuestions.length;
      fullText += `[খ বিভাগ: বহুনির্বাচনী প্রশ্ন (MCQ / কুইজ) — পূর্ণমান: ${toBnDigit(totalMcqMarks)}]\n[সকল প্রশ্নের উত্তর দেওয়া আবশ্যক — প্রতিটি সঠিক উত্তরের মান ১: ${toBnDigit(totalMcqMarks)} × ১ = ${toBnDigit(totalMcqMarks)}]\n\n`;
      generatedPaper.mcqQuestions.forEach((m) => {
        fullText += `${m.num}. ${m.question}  [১]\n(ক) ${m.options[0]}  (খ) ${m.options[1]}  (গ) ${m.options[2]}  (ঘ) ${m.options[3]}\n\n`;
      });
    }

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('সৃজনশীল ও MCQ সমন্বিত প্রশ্নপত্র ক্লিপবোর্ডে কপি হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  // =========================================================================
  // VIEW 1: SECURE TEACHER LOGIN / REGISTRATION / DUAL VERIFY (LOCKED)
  // =========================================================================
  if (!isTeacherLoggedIn) {
    return (
      <div className="space-y-4 pb-24 text-slate-900 animate-in fade-in duration-300">
        
        {/* Security Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white p-5 shadow-xl border border-red-900/40 text-center space-y-2">
          <div className="w-14 h-14 bg-gradient-to-tr from-red-600 to-amber-500 rounded-3xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-white/10">
            <Lock className="w-7 h-7 text-white animate-bounce" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/30 text-[10px] font-black px-3 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>সিকিউর শিক্ষক ভেরিফিকেশন পোর্টাল</span>
          </div>
          <h1 className="text-base font-black text-white tracking-tight">শিক্ষক কর্নার ও প্রশ্নপত্র মেকার</h1>
          <p className="text-[11px] text-slate-300 font-medium max-w-xs mx-auto">
            প্রশ্নপত্র নিরাপত্তা নিশ্চিত করতে ইমেইল কনফার্মেশন বা মোবাইল OTP ভেরিফিকেশন আবশ্যক।
          </p>

          {/* Tab Switch: Login vs Register */}
          {authMode !== 'verify' && (
            <div className="grid grid-cols-2 gap-2 mt-3 bg-white/10 p-1 rounded-2xl backdrop-blur-md text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setLoginError('');
                }}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-md font-black'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>১. শিক্ষক লগইন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode('register');
                  setRegError('');
                }}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  authMode === 'register'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-black'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>২. নতুন রেজিস্ট্রেশন</span>
              </button>
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SUB-VIEW A: LOGIN SCREEN (Mobile or Email) */}
        {/* ------------------------------------------------------------- */}
        {authMode === 'login' && (
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-black text-xs text-slate-800 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-red-600" />
                <span>শিক্ষক লগইন করুন:</span>
              </span>
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                ডেমো পিন: 1234
              </span>
            </div>

            {loginError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in shake">
                <span>⚠️ {loginError}</span>
              </div>
            )}

            <form onSubmit={handleTeacherLogin} className="space-y-3 text-xs font-bold">
              <div>
                <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                  <AtSign className="w-3.5 h-3.5 text-slate-500" />
                  <span>মোবাইল নম্বর অথবা ইমেইল:</span>
                </label>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={e => setLoginIdentifier(e.target.value)}
                  placeholder="01712345678 বা teacher@school.edu.bd"
                  className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-bold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-red-600" />
                  <span>৪ সংখ্যার সিকিউর পিন (PIN):</span>
                </label>
                <input
                  type="password"
                  value={loginPin}
                  onChange={e => setLoginPin(e.target.value)}
                  placeholder="৪ সংখ্যার পিন টাইপ করুন"
                  maxLength={6}
                  autoComplete="new-password"
                  className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500 font-black tracking-widest text-slate-800 text-center"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white rounded-2xl font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 tap-active mt-2 cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-amber-200" />
                <span>লগইন করে স্টুডিওতে প্রবেশ করুন</span>
              </button>
            </form>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-red-600 font-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>অ্যাকাউন্ট নেই? রেজিস্ট্রেশন করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Demo Login */}
            <div className="pt-1 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={handleDemoTeacherLogin}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-black text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-300/80 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>⚡ ডেমো শিক্ষক হিসেবে ১ ক্লিকে লগইন (Instant Demo)</span>
              </button>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUB-VIEW B: REGISTRATION SCREEN (Email + Phone + Details) */}
        {/* ------------------------------------------------------------- */}
        {authMode === 'register' && (
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-black text-xs text-slate-800 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-amber-600" />
                <span>নতুন শিক্ষক রেজিস্ট্রেশন:</span>
              </span>
              <span className="text-[10px] font-black text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                <MailCheck className="w-3 h-3 text-cyan-600" />
                <span>ইমেইল / OTP ভেরিফিকেশন</span>
              </span>
            </div>

            {regError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in shake">
                <span>⚠️ {regError}</span>
              </div>
            )}

            <form onSubmit={handleSendRegistrationCodes} className="space-y-3 text-xs font-bold">
              {/* Field 1: Full Name */}
              <div>
                <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-red-600" />
                  <span>১. শিক্ষকের পূর্ণ নাম:</span>
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={e => setRegName(e.target.value)}
                  placeholder="যেমন: ড. আহমেদ শরীফ / সেলিনা আক্তার"
                  className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-800"
                  required
                />
              </div>

              {/* Field 2: School Name */}
              <div>
                <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-amber-600" />
                  <span>২. শিক্ষা প্রতিষ্ঠান / স্কুলের নাম:</span>
                </label>
                <input
                  type="text"
                  value={regSchool}
                  onChange={e => setRegSchool(e.target.value)}
                  placeholder="যেমন: ঢাকা গভঃ বয়েজ হাই স্কুল"
                  className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-800"
                  required
                />
              </div>

              {/* Field 3: Designation */}
              <div>
                <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>৩. পদবি ও বিভাগ:</span>
                </label>
                <input
                  type="text"
                  value={regDesignation}
                  onChange={e => setRegDesignation(e.target.value)}
                  placeholder="যেমন: সিনিয়র সহকারী শিক্ষক (বাংলা)"
                  className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-800"
                />
              </div>

              {/* Field 4: Email Address (NEW) */}
              <div>
                <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-cyan-600" />
                  <span>৪. ইমেইল ঠিকানা (Email Confirmation এর জন্য):</span>
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={e => setRegEmail(e.target.value)}
                  placeholder="যেমন: teacher@school.edu.bd বা name@gmail.com"
                  className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-slate-800"
                  required
                />
              </div>

              {/* Field 5 & 6: Phone & Security PIN */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>৫. মোবাইল নম্বর:</span>
                  </label>
                  <input
                    type="text"
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-bold text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-600 font-black block mb-1 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-red-600" />
                    <span>গোপন পিন (PIN):</span>
                  </label>
                  <input
                    type="password"
                    value={regPin}
                    onChange={e => setRegPin(e.target.value)}
                    placeholder="৪ সংখ্যার পিন"
                    maxLength={6}
                    autoComplete="new-password"
                    className="w-full p-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-black tracking-widest text-slate-800 text-center"
                    required
                  />
                </div>
              </div>

              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[10px] text-amber-900 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>রেজিস্ট্রেশনের পর ইমেইল বা মোবাইল OTP — যেকোনো ১টি দিয়ে ভেরিফাই করলেই চলবে।</span>
              </div>

              <button
                type="submit"
                disabled={isSendingCodes}
                className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-red-600 to-amber-500 text-white rounded-2xl font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 tap-active mt-2 cursor-pointer"
              >
                {isSendingCodes ? (
                  <Sparkles className="w-4 h-4 text-amber-200 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 text-amber-200" />
                )}
                <span>{isSendingCodes ? 'ভেরিফিকেশন কোড পাঠানো হচ্ছে...' : 'ভেরিফিকেশন কোড পাঠান (Email & OTP) ➔'}</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className="text-slate-600 font-bold hover:underline text-xs cursor-pointer"
              >
                ইতিমধ্যে অ্যাকাউন্ট আছে? <span className="text-red-600 font-black">লগইন করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* SUB-VIEW C: DUAL VERIFICATION SCREEN (EMAIL CONFIRMATION OR OTP) */}
        {/* ------------------------------------------------------------- */}
        {authMode === 'verify' && (
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <ShieldCheck className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className="text-sm font-black text-slate-900">শিক্ষক অ্যাকাউন্ট ভেরিফিকেশন</h2>
              <p className="text-[11px] text-slate-500 font-medium">
                যেকোনো একটি পদ্ধতি যাচাই করে শিক্ষক পোর্টালে সম্পূর্ণ অ্যাক্সেস নিন
              </p>
            </div>

            {/* Dual Method Selection Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-black">
              <button
                type="button"
                onClick={() => {
                  setVerifyTab('email');
                  setRegError('');
                }}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  verifyTab === 'email'
                    ? 'bg-cyan-600 text-white shadow-md font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>১. ইমেইল কনফার্মেশন</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVerifyTab('otp');
                  setRegError('');
                }}
                className={`py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  verifyTab === 'otp'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>২. মোবাইল SMS OTP</span>
              </button>
            </div>

            {regError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold flex items-center gap-1.5 animate-in shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            {/* ----------------------------------------------------------- */}
            {/* OPTION 1: EMAIL CONFIRMATION TAB */}
            {/* ----------------------------------------------------------- */}
            {verifyTab === 'email' && (
              <div className="space-y-3.5 animate-in fade-in">
                {/* Simulated Email Notification Card */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-3.5 rounded-2xl border border-cyan-200 text-xs text-cyan-950 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-cyan-600 text-white rounded-xl shadow-xs">
                        <Mail className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <span className="text-[10px] font-black text-slate-500 block">EduGenius ইমেইল পাঠানো হয়েছে:</span>
                        <span className="font-bold text-slate-800 text-[11px] truncate max-w-[180px] block">{pendingRegData?.email}</span>
                      </div>
                    </div>
                    <span className="bg-cyan-200/80 text-cyan-900 text-[9px] font-black px-2 py-0.5 rounded-full">
                      ইমেইল ইনবক্স
                    </span>
                  </div>

                  <div className="bg-white/80 p-2.5 rounded-xl border border-cyan-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-slate-500 font-bold block">কনফার্মেশন কোড:</span>
                      <span className="font-black text-sm tracking-wider text-cyan-700">{generatedEmailCode}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnteredEmailCode(generatedEmailCode)}
                      className="px-2.5 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-800 rounded-lg text-[10px] font-black transition-all cursor-pointer"
                    >
                      কোড কপি
                    </button>
                  </div>

                  {/* 1-Click Instant Email Magic Link Confirmation Button */}
                  <button
                    type="button"
                    onClick={handleInstantMagicEmailConfirm}
                    className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-black text-[11px] shadow-sm hover:shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer tap-active"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>⚡ ১-ক্লিকে ইমেইল ভেরিফাই ও অ্যাক্সেস নিন</span>
                  </button>
                </div>

                {/* Email Code Manual Entry Form */}
                <form onSubmit={handleVerifyByEmail} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-600 font-black block mb-1">
                      অথবা প্রাপ্ত ইমেইল কোডটি লিখুন:
                    </label>
                    <input
                      type="text"
                      value={enteredEmailCode}
                      onChange={e => setEnteredEmailCode(e.target.value)}
                      placeholder="যেমন: EG-1234"
                      className="w-full p-3 rounded-2xl border-2 border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 font-black text-base tracking-widest text-slate-900 text-center shadow-inner uppercase"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-2xl font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 tap-active cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>ইমেইল কোড যাচাই ও পোর্টাল খুলুন</span>
                  </button>
                </form>
              </div>
            )}

            {/* ----------------------------------------------------------- */}
            {/* OPTION 2: MOBILE SMS OTP TAB */}
            {/* ----------------------------------------------------------- */}
            {verifyTab === 'otp' && (
              <div className="space-y-3.5 animate-in fade-in">
                {/* Instant Simulated SMS Notification Badge */}
                <div className="bg-gradient-to-r from-amber-50 to-red-50 p-3 rounded-2xl border border-amber-300 text-xs font-bold text-amber-950 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">📩</span>
                    <div>
                      <span className="text-[10px] text-slate-500 font-black block">EduGenius সিকিউর SMS OTP ({pendingRegData?.phone}):</span>
                      <span className="font-black text-sm tracking-widest text-red-600">{generatedOtp}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnteredOtp(generatedOtp)}
                    className="px-2.5 py-1 bg-white text-red-600 border border-red-200 rounded-xl text-[10px] font-black shadow-xs hover:bg-red-50 cursor-pointer"
                  >
                    অটো ফিল
                  </button>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleVerifyByOtp} className="space-y-3">
                  <div>
                    <label className="text-[11px] text-slate-600 font-black block mb-1">
                      মোবাইলে পাঠানো ৪ সংখ্যার OTP কোড লিখুন:
                    </label>
                    <input
                      type="text"
                      value={enteredOtp}
                      onChange={e => setEnteredOtp(e.target.value)}
                      placeholder="৪ সংখ্যার OTP"
                      maxLength={4}
                      className="w-full p-3.5 rounded-2xl border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-200 font-black text-lg tracking-widest text-slate-900 text-center shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white rounded-2xl font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 tap-active cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>OTP যাচাই ও অ্যাকাউন্ট সক্রিয় করুন</span>
                  </button>
                </form>
              </div>
            )}

            {/* Back & Resend Footer */}
            <div className="flex items-center justify-between text-xs font-bold pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className="text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← তথ্য পরিবর্তন করুন
              </button>

              <button
                type="button"
                disabled={otpTimer > 0}
                onClick={handleResendCodes}
                className={`flex items-center gap-1 font-black cursor-pointer ${
                  otpTimer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-red-600 hover:underline'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{otpTimer > 0 ? `পুনরায় পাঠান (${otpTimer}s)` : 'রিসেন্ড কোড'}</span>
              </button>
            </div>

          </div>
        )}

        {/* Security badges note */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-[11px] font-bold text-slate-600 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>রেজিস্ট্রেশন ও সুরক্ষার প্রধান সুবিধাসমূহ:</span>
          </div>
          <p>• ইমেইল কনফার্মেশন অথবা মোবাইল SMS OTP — যেকোনো ১টি ভেরিফাই করলেই পোর্টাল অ্যাক্সেস পাবেন।</p>
          <p>• প্রতিটি প্রশ্নপত্রে শিক্ষকের নাম, পদবি ও স্কুলের নাম স্বয়ংক্রিয়ভাবে ওয়াটারমার্ক হবে।</p>
          <p>• শিক্ষক ট্যাব থেকে বের হয়ে গেলে পোর্টাল স্বয়ংক্রিয়ভাবে লক হয়ে যাবে।</p>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: LOGGED-IN TEACHER QUESTION PAPER STUDIO
  // =========================================================================
  return (
    <div className="space-y-4 pb-24 text-slate-900 animate-in fade-in duration-300">
      
      {/* Top Banner with Teacher Verification Badge & Logout */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white p-4 shadow-xl border border-red-900/40 print:hidden">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>
        
        {/* Verified Teacher Info Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-400 flex items-center justify-center text-white shadow-sm">
              <UserCheck className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-black text-white">{teacherProfile?.name}</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-black border border-emerald-500/30 flex items-center gap-1">
                  {teacherProfile?.verifiedVia === 'email' ? (
                    <>
                      <MailCheck className="w-2.5 h-2.5 text-emerald-300" />
                      <span>ইমেইল ভেরিফাইড</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-300" />
                      <span>মোবাইল ভেরিফাইড</span>
                    </>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-300">
                <span className="truncate max-w-[150px]">{teacherProfile?.school}</span>
                {teacherProfile?.email && (
                  <span className="text-slate-400 truncate max-w-[130px] hidden sm:inline">• {teacherProfile?.email}</span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleTeacherLogout}
            className="px-2.5 py-1 bg-red-600/30 hover:bg-red-600/60 text-red-200 border border-red-400/40 rounded-xl text-[10px] font-black flex items-center gap-1 transition-all cursor-pointer"
            title="লগআউট করে পোর্টাল লক করুন"
          >
            <LogOut className="w-3 h-3" />
            <span>লগআউট</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-2 bg-gradient-to-r from-red-600 to-amber-500 rounded-2xl text-white shadow-md">
            <GraduationCap className="w-5 h-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white tracking-tight">প্রশ্নপত্র মেকার স্টুডিও</h1>
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

          {/* STEP 1: CLASS & SUBJECT DROPDOWN SELECTORS */}
          <div className="bg-[#fffdf0] p-3.5 rounded-3xl border border-amber-200/90 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-amber-950 text-xs flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[9px] font-black">১</span>
                <span>শ্রেণি ও বিষয় ড্রপডাউন নির্বাচন:</span>
              </span>
              <span className="text-[9px] font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                NCTB কারিকুলাম
              </span>
            </div>

            {/* 1. Class Dropdown List */}
            <div className="space-y-1">
              <label className="text-[11px] font-black text-amber-950 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-red-600" />
                  <span>শ্রেণি নির্বাচন করুন:</span>
                </span>
                <span className="text-[9px] text-slate-400 font-bold">Class Select</span>
              </label>

              <SleekCustomDropdown
                options={NCTB_CLASSES.map(cls => ({
                  value: cls.id,
                  label: `${cls.nameBn}`,
                  badge: `${cls.levelBn}`
                }))}
                value={selectedClassId}
                onChange={(val) => {
                  setSelectedClassId(val);
                  const newClassObj = NCTB_CLASSES.find(c => c.id === val);
                  setSelectedSubjectId(newClassObj?.subjects[0]?.id || 'bangla-sahitya');
                  showToast(`${newClassObj?.nameBn} সিলেক্ট করা হয়েছে`, 'info');
                }}
              />
            </div>

            {/* 2. Subject Dropdown List */}
            <div className="space-y-1">
              <label className="text-[11px] font-black text-amber-950 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>বিষয় নির্বাচন করুন:</span>
                </span>
                <span className="text-[9px] text-slate-400 font-bold">Subject Select</span>
              </label>

              <SleekCustomDropdown
                options={availableSubjects.map(sub => ({
                  value: sub.id,
                  label: `${sub.nameBn}`,
                  icon: sub.icon || '📖',
                  group: sub.group || 'আবশ্যিক',
                  badge: sub.group || 'আবশ্যিক'
                }))}
                value={selectedSubjectId}
                onChange={(val) => {
                  setSelectedSubjectId(val);
                  const subObj = availableSubjects.find(s => s.id === val);
                  showToast(`বিষয়: ${subObj?.nameBn || val}`, 'info');
                }}
              />
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
                      setExamTitle(tpl.defaultTitle || `${tpl.title.replace(/^[^\s]+\s*/, '')} — ২০২৬`);
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
        <div className="space-y-4 print:space-y-0 print:m-0 print:p-0">

          {/* Control Bar (Hidden in Print) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-2 print:hidden">
            <button
              onClick={() => {
                setRefreshKey(prev => prev + 1);
                showToast(`🔄 নতুন প্রশ্নাবলি রিলোড হয়েছে (${toBnDigit(refreshKey + 1)}ম সংস্করণ)!`, 'info');
              }}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-red-600" />
              <span>রিলোড প্রশ্ন ({toBnDigit(refreshKey)}ম সংস্করণ)</span>
            </button>

            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ${
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
              className="px-3 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-amber-300" />}
              <span>{copied ? 'কপি হয়েছে' : 'কপি প্রশ্ন'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-200" />
              <span>প্রিন্ট</span>
            </button>
          </div>

          {/* OFFICIAL BANGLADESH EXAM PAPER SHEET (PRINTABLE FORMAT) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-300 shadow-xl space-y-4 print:p-0 print:m-0 print:border-none print:shadow-none print:rounded-none print:space-y-3">
            
            {/* Header of Question Paper */}
            <div className="text-center pb-3 border-b-2 border-slate-900 space-y-1.5">
              <h2 className="text-xl font-black text-slate-950 tracking-tight">{schoolName}</h2>
              <div className="text-sm font-extrabold text-slate-800">
                <span>{examTitle}</span>
              </div>
              <div className="text-center">
                <span className="text-[11px] font-black bg-slate-100 text-slate-800 border border-slate-300 px-3 py-0.5 rounded-full inline-block">
                  {SAMPLE_TEMPLATES.find(t => t.id === selectedTemplate)?.title || 'সৃজনশীল ও বহুনির্বাচনী প্রশ্নপত্র'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 pt-1">
                <span>শ্রেণি: {classObj.nameBn}</span>
                <span>বিষয়: {availableSubjects.find(s => s.id === selectedSubjectId)?.nameBn || 'বাংলা'}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 border-t border-dotted border-slate-300 pt-1">
                <span>সময়: {examTime}</span>
                <span>পূর্ণমান: {totalMarks}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 border-t border-dashed border-slate-200 pt-1">
                <span className="text-left truncate max-w-[65%]">
                  অন্তর্ভুক্ত অধ্যায়: {chosenChapters.map(c => c.title.split('—')[0].replace(/[০-৯\.\‘\’]/g, '').trim()).join(', ')}
                </span>
                <span className="text-right">
                  পরীক্ষক: {teacherProfile?.name || 'বিষয় শিক্ষক'} ({teacherProfile?.designation || 'সহকারী শিক্ষক'})
                </span>
              </div>
            </div>

            {/* SECTION 1: CREATIVE QUESTIONS (CQ - ক বিভাগ) */}
            {generatedPaper && generatedPaper.cqQuestions?.length > 0 && (
              <div className="space-y-4 pt-1 print:space-y-3.5">
                <div className="text-center space-y-0.5">
                  <div className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full border border-slate-300 inline-block print:border-none print:bg-transparent print:font-extrabold">
                    [ক বিভাগ: সৃজনশীল প্রশ্নাবলী — পূর্ণমান: {toBnDigit(Math.min(5, generatedPaper.cqQuestions.length) * 10)}]
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 print:text-black">
                    [যেকোনো {toBnDigit(Math.min(5, generatedPaper.cqQuestions.length))}টি প্রশ্নের উত্তর দাও — প্রতিটি প্রশ্নের মান ১০ (ক=১, খ=২, গ=৩, ঘ=৪)]
                  </p>
                </div>

                {generatedPaper.cqQuestions.map((q, idx) => (
                  <div key={idx} className="space-y-2 text-xs border-b border-slate-100 pb-3 break-inside-avoid print:break-inside-avoid print:border-slate-300 print:pb-2.5">
                    <div className="font-black text-slate-900 flex items-start justify-between gap-2">
                      <div className="flex items-start gap-1">
                        <span className="font-black">{q.num}.</span>
                        <p className="font-medium text-slate-800 leading-relaxed text-justify">{q.stem}</p>
                      </div>
                      <span className="font-black text-slate-900 shrink-0 text-xs">[১০]</span>
                    </div>

                    <div className="space-y-1 pl-4">
                      {q.parts.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-1.5">
                            <span className="font-black text-slate-900">({p.label})</span>
                            <span className="text-slate-800 font-medium">{p.q}</span>
                          </div>
                          <span className="font-black text-slate-900 shrink-0">[{p.marks}]</span>
                        </div>
                      ))}
                    </div>

                    {/* Teacher's Answer Key View (Hidden in Print) */}
                    {showAnswerKey && (
                      <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 mt-2 text-[11px] text-amber-950 font-medium space-y-1 animate-in fade-in print:hidden">
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

            {/* SECTION 2: MULTIPLE CHOICE (MCQ / কুইজ - খ বিভাগ) */}
            {generatedPaper && generatedPaper.mcqQuestions?.length > 0 && (
              <div className="space-y-3 pt-3 border-t-2 border-dashed border-slate-200 print:border-slate-300 print:space-y-2.5">
                <div className="text-center space-y-0.5">
                  <div className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full border border-slate-300 inline-block print:border-none print:bg-transparent print:font-extrabold">
                    [খ বিভাগ: বহুনির্বাচনী প্রশ্ন (MCQ / কুইজ) — পূর্ণমান: {toBnDigit(generatedPaper.mcqQuestions.length)}]
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 print:text-black">
                    [সকল প্রশ্নের উত্তর দেওয়া আবশ্যক — প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর বরাদ্দ: {toBnDigit(generatedPaper.mcqQuestions.length)} × ১ = {toBnDigit(generatedPaper.mcqQuestions.length)}]
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs print:gap-2">
                  {generatedPaper.mcqQuestions.map((m, idx) => (
                    <div key={idx} className="space-y-1 border-b border-slate-100 pb-2 break-inside-avoid print:break-inside-avoid print:border-slate-300">
                      <div className="font-black text-slate-900 flex items-start justify-between gap-2">
                        <div className="flex items-start gap-1">
                          <span className="font-black">{m.num}.</span>
                          <span className="font-bold text-slate-800">{m.question}</span>
                        </div>
                        <span className="font-bold text-slate-700 shrink-0 text-[11px] bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 print:bg-transparent print:border-none">[১]</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 pl-4 text-[11px] text-slate-700">
                        {m.options.map((opt, optIdx) => (
                          <div key={optIdx} className="flex items-center gap-1">
                            <span className="font-bold text-slate-500">({['ক', 'খ', 'গ', 'ঘ'][optIdx]})</span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>

                      {/* Teacher's Answer Key View (Hidden in Print) */}
                      {showAnswerKey && (
                        <div className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 mt-1 print:hidden">
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
              <div className="space-y-3 pt-2 print:space-y-2.5">
                <div className="text-center">
                  <span className="text-xs font-black bg-slate-100 px-3 py-1 rounded-full border border-slate-300 print:border-none print:bg-transparent print:font-extrabold">
                    [জ্ঞান ও অনুধাবনমূলক প্রশ্নাবলি — সকল প্রশ্নের উত্তর দাও]
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {generatedPaper.drillQuestions.map((d, idx) => (
                    <div key={idx} className="border-b border-slate-100 pb-2 space-y-0.5 break-inside-avoid print:break-inside-avoid print:border-slate-300">
                      <div className="flex items-start justify-between gap-1">
                        <div className="flex items-start gap-1 font-black text-slate-900">
                          <span>{d.num}.</span>
                          <span>{d.q}</span>
                        </div>
                        <span className="text-[10px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded print:bg-transparent">{d.type.split(' ')[0]}</span>
                      </div>

                      {showAnswerKey && (
                        <div className="text-[11px] font-medium text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 mt-1 print:hidden">
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
