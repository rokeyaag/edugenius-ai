import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { translations } from '../utils/translations';
import { NCTB_CLASSES, NCTB_OFFICIAL_BOOK_NOTES } from '../utils/nctbData';

const AppContext = createContext();

// Helper to sanitize and accurately map note to correct NCTB subject
export function sanitizeVaultNote(note) {
  const title = (note.title || '').toLowerCase();
  const summary = (note.summary || '').toLowerCase();

  // 1. Bangla Sahitya (গদ্য ও পদ্য)
  if (
    title.includes('শুভা') || title.includes('বই পড়া') || title.includes('অভাগী') ||
    title.includes('পল্লীসাহিত্য') || title.includes('আম-আঁটির') || title.includes('মানুষ মুহম্মদ') ||
    title.includes('নিমগাছ') || title.includes('শিক্ষা ও মনুষ্যত্ব') || title.includes('প্রবাস বন্ধু') ||
    title.includes('মমতাদি') || title.includes('একাত্তরের দিনগুলি') || title.includes('সাহিত্যের রূপ') ||
    title.includes('বঙ্গবাণী') || title.includes('কপোতাক্ষ') || title.includes('জীবন-সঙ্গীত') ||
    title.includes('জুতা আবিষ্কার') || title.includes('মানুষ —') || title.includes('পল্লীজননী') ||
    title.includes('রানার') || title.includes('তোমাকে পাওয়ার') || title.includes('আমার পরিচয়') ||
    title.includes('সাহসী জননী')
  ) {
    return {
      ...note,
      subjectId: 'bangla-sahitya',
      subject: 'Bangla Literature',
      subjectBn: 'বাংলা সাহিত্য'
    };
  }

  // 2. Bangla Sohopath (সহপাঠ - কাকতাড়ুয়া ও বহিপীর)
  if (title.includes('কাকতাড়ুয়া') || title.includes('বহিপীর') || title.includes('সহপাঠ')) {
    return {
      ...note,
      subjectId: 'bangla-sohopath',
      subject: 'Bangla Sohopath',
      subjectBn: 'বাংলা সহপাঠ'
    };
  }

  // 3. Bangla Grammar
  if (title.includes('ব্যাকরণ') || title.includes('সন্ধি') || title.includes('সমাস') || title.includes('ধ্বনিতত্ত্ব')) {
    return {
      ...note,
      subjectId: 'bangla-grammar',
      subject: 'Bangla Grammar & Comp',
      subjectBn: 'বাংলা ভাষার ব্যাকরণ ও নির্মিতি'
    };
  }

  // 4. English For Today
  if (title.includes('english for today') || title.includes('good citizens') || title.includes('pastimes') || title.includes('unit 1')) {
    return {
      ...note,
      subjectId: 'english-today',
      subject: 'English For Today',
      subjectBn: 'English For Today'
    };
  }

  // 5. General Math
  if (title.includes('সাধারণ গণিত') || title.includes('বীজগাণিতিক') || (title.includes('গণিত') && !title.includes('উচ্চতর'))) {
    return {
      ...note,
      subjectId: 'general-math',
      subject: 'Mathematics',
      subjectBn: 'গণিত (সাধারণ)'
    };
  }

  // 6. Physics
  if (title.includes('পদার্থবিজ্ঞান') || title.includes('বল,') || title.includes('নিউটনের') || title.includes('গতিসূত্র')) {
    return {
      ...note,
      subjectId: 'physics',
      subject: 'Physics',
      subjectBn: 'পদার্থবিজ্ঞান'
    };
  }

  // 7. Chemistry
  if (title.includes('রসায়ন') || title.includes('রসায়ন') || title.includes('পরমাণুর গঠন') || title.includes('পর্যায় সারণি')) {
    return {
      ...note,
      subjectId: 'chemistry',
      subject: 'Chemistry',
      subjectBn: 'রসায়ন'
    };
  }

  // 8. Biology
  if (title.includes('জীববিজ্ঞান') || title.includes('জীবকোষ') || title.includes('সালোকসংশ্লেষণ') || title.includes('জীবনীশক্তি')) {
    return {
      ...note,
      subjectId: 'biology',
      subject: 'Biology',
      subjectBn: 'জীববিজ্ঞান'
    };
  }

  return note;
}

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('edugenius_lang') || 'bn';
  });

  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('edugenius_classes_v2026_full');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return NCTB_CLASSES.map(defaultCls => {
          const matchedSaved = parsed.find(p => p.id === defaultCls.id);
          if (matchedSaved) {
            const customOnly = (matchedSaved.subjects || []).filter(s => !defaultCls.subjects.some(ds => ds.id === s.id));
            return { ...defaultCls, subjects: [...defaultCls.subjects, ...customOnly] };
          }
          return defaultCls;
        });
      } catch (e) {
        return NCTB_CLASSES;
      }
    }
    return NCTB_CLASSES;
  });

  const [selectedClass, setSelectedClass] = useState(() => {
    return localStorage.getItem('edugenius_class') || 'class-9';
  });

  const [points, setPoints] = useState(() => {
    const saved = localStorage.getItem('edugenius_points');
    return saved !== null ? parseInt(saved, 10) : 147;
  });

  const [streak, setStreak] = useState(7);
  const [subscriptionTier, setSubscriptionTier] = useState('pro');
  const [freeTrialDaysLeft, setFreeTrialDaysLeft] = useState(5);
  const [activeTab, setActiveTab] = useState('home');
  
  // Vault notes initialized & sanitized to prevent subject mismatch
  const [vaultNotes, setVaultNotes] = useState(() => {
    const saved = localStorage.getItem('edugenius_vault_v2026_full');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeVaultNote);
        }
      } catch (e) {
        // fallback
      }
    }
    return NCTB_OFFICIAL_BOOK_NOTES.map(sanitizeVaultNote);
  });

  const [toastMessage, setToastMessage] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('edugenius_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('edugenius_class', selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    localStorage.setItem('edugenius_classes_v2026_full', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('edugenius_points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('edugenius_vault_v2026_full', JSON.stringify(vaultNotes));
  }, [vaultNotes]);

  const currentClassObj = (classes && Array.isArray(classes) && classes.length > 0)
    ? (classes.find(c => c && c.id === selectedClass) || classes[0] || NCTB_CLASSES[3] || { id: 'class-9', nameBn: '৯ম-১০ম শ্রেণি (SSC)', nameEn: 'Class 9-10 (SSC)', subjects: [] })
    : (NCTB_CLASSES[3] || { id: 'class-9', nameBn: '৯ম-১০ম শ্রেণি (SSC)', nameEn: 'Class 9-10 (SSC)', subjects: [] });

  const t = (key) => {
    const langDict = translations[language] || translations.bn;
    return langDict[key] || key;
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#f59e0b', '#10b981', '#ffffff']
      });
    } catch (err) {
      console.log('Confetti not available:', err);
    }
  };

  const loadOfficialNctbContent = () => {
    const sanitizedNotes = NCTB_OFFICIAL_BOOK_NOTES.map(sanitizeVaultNote);
    setVaultNotes(sanitizedNotes);
    triggerCelebration();
    showToast(language === 'bn' ? '🎉 সকল বিষয়ের সরকারি বইয়ের সঠিক অধ্যায় লোড হয়েছে!' : '🎉 All official NCTB textbook notes loaded!', 'success');
  };

  const addNewClass = (nameBn, nameEn, levelBn = 'কাস্টম শ্রেণি', levelEn = 'Custom Grade') => {
    const newClass = {
      id: `class-${Date.now()}`,
      nameBn: nameBn,
      nameEn: nameEn || nameBn,
      levelBn: levelBn,
      levelEn: levelEn,
      subjects: [
        { id: `sub-gen-${Date.now()}`, nameBn: 'বাংলা ও সাধারণ পাঠ', nameEn: 'Bangla & General Study', group: 'আবশ্যিক', icon: '📚' }
      ]
    };
    setClasses(prev => [...prev, newClass]);
    setSelectedClass(newClass.id);
    triggerCelebration();
    showToast(language === 'bn' ? `🎉 নতুন শ্রেণি "${nameBn}" তৈরি হয়েছে!` : `🎉 New class "${nameEn || nameBn}" created!`, 'success');
  };

  const addNewSubject = (subjectNameBn, subjectNameEn, icon = '📖', group = 'কাস্টম') => {
    const newSubId = `sub-${Date.now()}`;
    const newSubject = {
      id: newSubId,
      nameBn: subjectNameBn,
      nameEn: subjectNameEn || subjectNameBn,
      group: group,
      icon: icon
    };

    setClasses(prev => prev.map(cls => {
      if (cls.id === selectedClass) {
        return {
          ...cls,
          subjects: [...(cls.subjects || []), newSubject]
        };
      }
      return cls;
    }));

    triggerCelebration();
    showToast(language === 'bn' ? `🎉 নতুন বিষয় "${subjectNameBn}" যুক্ত হয়েছে!` : `🎉 Subject "${subjectNameEn || subjectNameBn}" added!`, 'success');
    return newSubId;
  };

  const updateNoteSubject = (noteId, newSubId, newSubNameEn, newSubNameBn) => {
    setVaultNotes(prev => prev.map(note => {
      if (note.id === noteId) {
        return {
          ...note,
          subjectId: newSubId,
          subject: newSubNameEn,
          subjectBn: newSubNameBn
        };
      }
      return note;
    }));
    triggerCelebration();
    showToast(language === 'bn' ? `নোটটি "${newSubNameBn}" ফোল্ডারে সরানো হয়েছে!` : `Note moved to "${newSubNameEn}"!`, 'success');
  };

  const earnPoints = (amount, reason) => {
    setPoints(prev => prev + amount);
    triggerCelebration();
    showToast(`🎉 +${amount} ${t('points')}! ${reason}`, 'point');
  };

  const redeemPointsForPro = (requiredPoints = 100) => {
    if (points < requiredPoints) {
      showToast(language === 'bn' ? `⚠️ আপনার ${requiredPoints} পয়েন্ট প্রয়োজন! বর্তমানে আছে ${points} পয়েন্ট।` : `⚠️ You need ${requiredPoints} points! You currently have ${points} pts.`, 'error');
      return false;
    }
    setPoints(prev => prev - requiredPoints);
    setSubscriptionTier('pro');
    triggerCelebration();
    showToast(language === 'bn' ? `💎 ১ মাসের প্রো মেম্বারশিপ আনলক হয়েছে! (-${requiredPoints} পয়েন্ট)` : `💎 Pro Scholar Membership Extended for 1 Month! (-${requiredPoints} pts)`, 'success');
    return true;
  };

  const saveToVault = (note) => {
    const sanitized = sanitizeVaultNote(note);
    const newNote = {
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      date: language === 'bn' ? 'এইমাত্র' : 'Just now',
      podcastDuration: '3:00 min',
      hasAudio: true,
      classId: selectedClass,
      ...sanitized,
    };
    setVaultNotes(prev => [newNote, ...prev]);
    earnPoints(10, language === 'bn' ? 'নলেজ ভল্টে নোট সেভ হয়েছে!' : 'Knowledge Vault Entry Saved!');
    return newNote;
  };

  const deleteFromVault = (id) => {
    setVaultNotes(prev => prev.filter(n => n.id !== id));
    showToast(language === 'bn' ? 'নোট ডিলিট করা হয়েছে' : 'Note deleted from vault', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        selectedClass,
        setSelectedClass,
        classes,
        currentClassObj,
        addNewClass,
        addNewSubject,
        updateNoteSubject,
        loadOfficialNctbContent,
        isClassModalOpen,
        setIsClassModalOpen,
        isAddSubjectModalOpen,
        setIsAddSubjectModalOpen,
        isInstallModalOpen,
        setIsInstallModalOpen,
        points,
        streak,
        subscriptionTier,
        setSubscriptionTier,
        freeTrialDaysLeft,
        activeTab,
        setActiveTab,
        vaultNotes,
        saveToVault,
        deleteFromVault,
        earnPoints,
        redeemPointsForPro,
        showToast,
        toastMessage,
        isScannerOpen,
        setIsScannerOpen,
        isPomodoroOpen,
        setIsPomodoroOpen,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
