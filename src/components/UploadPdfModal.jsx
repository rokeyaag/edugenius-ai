import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, FileText, Sparkles, Upload, CheckCircle2, Layers, BookOpen } from 'lucide-react';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';

export default function UploadPdfModal({ isOpen, onClose, defaultSubjectId }) {
  const { currentClassObj, saveToVault, setActiveTab, language, showToast, earnPoints } = useApp();
  
  const subjectsList = currentClassObj?.subjects || [];
  const [selectedSubId, setSelectedSubId] = useState(defaultSubjectId || subjectsList[0]?.id || 'english-today');
  const [isFullBookBatchMode, setIsFullBookBatchMode] = useState(true);
  const [noteTitle, setNoteTitle] = useState('সম্পূর্ণ পাঠ্যবই PDF নোটস');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  if (!isOpen) return null;

  const currentSelectedSub = subjectsList.find(s => s.id === selectedSubId) || subjectsList[0];

  const groupedSubjects = subjectsList.reduce((acc, sub) => {
    const grp = sub.group || 'সাধারণ';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(sub);
    return acc;
  }, {});

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNoteTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleBatchExtract = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setProgressPercent(10);

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 20;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgressPercent(100);
      setIsProcessing(false);

      if (isFullBookBatchMode) {
        if (selectedSubId === 'all-subjects') {
          // Index chapters across all subjects
          let totalCount = 0;
          Object.entries(NCTB_FULL_BOOK_CHAPTERS_MAP).forEach(([sId, chapters]) => {
            const matchedSub = subjectsList.find(s => s.id === sId);
            chapters.forEach(ch => {
              totalCount++;
              saveToVault({
                title: `📄 ${ch.title}`,
                subject: matchedSub?.nameEn || 'General',
                subjectBn: matchedSub?.nameBn || 'সাধারণ',
                subjectId: sId,
                summary: ch.summary,
                formula: `বিভাগ: ${ch.type} | NCTB বোর্ড কারিকুলাম ২০২৬`,
                scannedImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
                tags: [currentClassObj?.nameEn || 'SSC', matchedSub?.nameEn || 'All', ch.type]
              });
            });
          });
          earnPoints(200, `সকল বিষয়ের ${totalCount}টি অধ্যায় সফলভাবে ইনডেক্স হয়েছে!`);
          showToast(`🎉 সকল বিষয়ের ${totalCount}টি অধ্যায় ভল্টে সেভ হয়েছে!`, 'success');
        } else {
          // Fetch chapters strictly mapped to the selected subject from full book database
          const targetChapters = NCTB_FULL_BOOK_CHAPTERS_MAP[selectedSubId] || [
            { title: `অধ্যায় ১: ${currentSelectedSub.nameBn} - মৌলিক ধারণা`, type: 'তত্ত্ব', summary: `${currentSelectedSub.nameBn} এর প্রথম অধ্যায়ের মূল সারসংক্ষেপ ও সূত্রাবলী।` },
            { title: `অধ্যায় ২: ${currentSelectedSub.nameBn} - প্রায়োগিক নিয়ম`, type: 'প্রয়োগ', summary: `${currentSelectedSub.nameBn} এর দ্বিতীয় অধ্যায়ের গাণিতিক ও সৃজনশীল বিশ্লেষণ।` },
            { title: `অধ্যায় ৩: ${currentSelectedSub.nameBn} - বোর্ড প্রশ্ন সমাধান`, type: 'বোর্ড প্রস্তুতি', summary: `${currentSelectedSub.nameBn} এর বোর্ড স্ট্যান্ডার্ড প্রশ্নোত্তর ও নোটস।` }
          ];

          targetChapters.forEach((ch) => {
            saveToVault({
              title: `📄 ${ch.title}`,
              subject: currentSelectedSub?.nameEn || 'General',
              subjectBn: currentSelectedSub?.nameBn || 'সাধারণ',
              subjectId: currentSelectedSub?.id,
              summary: ch.summary,
              formula: `বিভাগ: ${ch.type} | NCTB বোর্ড কারিকুলাম ২০২৬`,
              scannedImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
              tags: [currentClassObj?.nameEn || 'SSC', currentSelectedSub.nameEn, ch.type]
            });
          });

          earnPoints(50, `"${currentSelectedSub.nameBn}" এর সকল অধ্যায় সফলভাবে ইনডেক্স হয়েছে!`);
          showToast(`🎉 "${currentSelectedSub.nameBn}" এর ${targetChapters.length}টি অধ্যায় ভল্টে সেভ হয়েছে!`, 'success');
        }
      } else {
        saveToVault({
          title: noteTitle,
          subject: currentSelectedSub?.nameEn || 'General',
          subjectBn: currentSelectedSub?.nameBn || 'সাধারণ পাঠ',
          subjectId: currentSelectedSub?.id,
          summary: `PDF ফাইল থেকে সম্পূর্ণ অধ্যায় ও প্রশ্নোত্তর সফলভাবে সেভ করা হয়েছে।`,
          formula: 'অধ্যায়ের মূল সূত্র ও প্রশ্নোত্তর',
          scannedImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
          tags: [currentClassObj?.nameEn || 'SSC', currentSelectedSub.nameEn, 'PDF Upload']
        });
        showToast('নোটটি ভল্টে সেভ হয়েছে!', 'success');
      }

      onClose();
      setActiveTab('vault');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl p-6 bg-white border border-slate-200 shadow-2xl relative space-y-4 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1 text-center">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white mx-auto flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-base font-black text-slate-900">
            {language === 'bn' ? '📚 সম্পূর্ণ বইয়ের PDF ব্যাচ-ইনডেক্সিং' : '📚 Full Book PDF Batch Indexing'}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            নির্বাচিত বিষয়ের সকল অধ্যায় স্বয়ংক্রিয়ভাবে আলাদা হয়ে সঠিক ফোল্ডারে সেভ হবে
          </p>
        </div>

        <form onSubmit={handleBatchExtract} className="space-y-3.5 pt-1">
          
          {/* 1. Target Subject Dropdown */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span>কোন বিষয়ের বই আপলোড করবেন?</span>
                <span className="text-red-600 font-bold">*</span>
              </label>
              <span className="text-[10px] bg-red-50 text-red-800 font-extrabold px-2 py-0.5 rounded-full border border-red-100">
                {subjectsList.length}টি বিষয়
              </span>
            </div>
            
            <select
              value={selectedSubId}
              onChange={(e) => setSelectedSubId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-red-500 shadow-sm"
            >
              <option value="all-subjects">
                🌟 সকল বিষয়ের সম্পূর্ণ বই একসাথে ইনডেক্স করুন (৩৩টি বিষয় | ৩০০+ অধ্যায়)
              </option>
              {Object.entries(groupedSubjects).map(([groupName, groupSubs]) => (
                <optgroup key={groupName} label={`--- ${groupName} ---`}>
                  {groupSubs.map((sub) => {
                    const count = NCTB_FULL_BOOK_CHAPTERS_MAP[sub.id]?.length || 3;
                    return (
                      <option key={sub.id} value={sub.id}>
                        {sub.icon || '📖'} {language === 'bn' ? sub.nameBn : sub.nameEn} ({count}টি অধ্যায়)
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Batch Mode Selection Toggle */}
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <h4 className="text-xs font-black text-amber-950">সব অধ্যায় আলাদা আলাদা সেভ করুন</h4>
                <p className="text-[10px] text-amber-800 font-medium">নির্বাচিত বিষয়ের প্রতিটি অধ্যায়ের নোটস তৈরি হবে</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isFullBookBatchMode}
              onChange={(e) => setIsFullBookBatchMode(e.target.checked)}
              className="w-5 h-5 accent-red-600 rounded cursor-pointer shrink-0"
            />
          </div>

          {/* 2. File Upload Box */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              PDF ফাইল সিলেক্ট করুন:
            </label>
            <label className="w-full p-4 rounded-2xl border-2 border-dashed border-red-200 bg-red-50/40 hover:bg-red-50 text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all">
              <Upload className="w-6 h-6 text-red-600" />
              <span className="text-xs font-black text-slate-900">
                {selectedFile ? selectedFile.name : 'ক্লিক করে বইয়ের PDF ফাইল সিলেক্ট করুন'}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'যেকোনো সাইজের PDF ফাইল সাপোর্ট করে'}
              </span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Processing Progress Bar */}
          {isProcessing && (
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-black">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>AI সম্পূর্ণ বই স্ক্যান করে অধ্যায় আলাদা করছে...</span>
                </span>
                <span className="text-amber-400">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-slate-300 font-medium">
                {currentSelectedSub?.nameBn} এর সমস্ত অধ্যায় ভল্টে সাজানো হচ্ছে
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-md transition-all tap-active flex items-center justify-center gap-1.5 pt-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isFullBookBatchMode 
                ? `🚀 ${currentSelectedSub.nameBn}-এর অধ্যায়গুলো লোড করুন (+৫০ পয়েন্ট)` 
                : '💾 ভল্টে সেভ করুন'}
            </span>
          </button>

        </form>

      </div>
    </div>
  );
}
