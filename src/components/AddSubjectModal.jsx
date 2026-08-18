import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, BookOpen, Sparkles, Check } from 'lucide-react';

const ICONS = ['📐', '🧪', '⚛️', '🧬', '🔬', '📊', '💻', '📖', '📚', '🎨', '💼', '🌏', '🧠', '⚙️'];

export default function AddSubjectModal() {
  const { 
    isAddSubjectModalOpen, 
    setIsAddSubjectModalOpen, 
    addNewSubject, 
    currentClassObj, 
    language, 
    t 
  } = useApp();

  const [subjectName, setSubjectName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0]);

  if (!isAddSubjectModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return;

    addNewSubject(subjectName.trim(), subjectName.trim(), selectedIcon);
    setSubjectName('');
    setIsAddSubjectModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl p-6 bg-white border border-slate-200 shadow-2xl relative space-y-4">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAddSubjectModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-slate-900 text-center">
            {t('modalAddSubjectTitle')}
          </h3>
          <p className="text-xs text-slate-500 text-center">
            {language === 'bn' 
              ? `"${currentClassObj.nameBn.split(' (')[0]}" এর জন্য নতুন বিষয় তৈরি করুন` 
              : `Create new subject for ${currentClassObj.nameEn}`}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          
          {/* Subject Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">
              {t('subjectNameLabel')}
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder={language === 'bn' ? 'যেমন: হিসাববিজ্ঞান, ফিন্যান্স, পৌরনীতি...' : 'e.g. Accounting, Finance, Coding...'}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 font-medium"
              required
            />
          </div>

          {/* Emoji/Icon Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {t('selectIconLabel')}
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-2xl">
              {ICONS.map((icon, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-base transition-all tap-active ${
                    selectedIcon === icon
                      ? 'bg-red-600 text-white shadow-md scale-110'
                      : 'bg-white hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-md transition-all tap-active flex items-center justify-center gap-1.5 pt-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('btnCreateSubject')}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
