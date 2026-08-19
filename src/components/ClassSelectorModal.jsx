import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, GraduationCap, BookOpen, Plus, Sparkles } from 'lucide-react';

export default function ClassSelectorModal() {
  const { 
    isClassModalOpen, 
    setIsClassModalOpen, 
    selectedClass, 
    setSelectedClass, 
    classes,
    allClassList,
    addNewClass,
    language,
    showToast,
    t
  } = useApp();

  const classList = classes || allClassList || [];

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassLevel, setNewClassLevel] = useState('');

  if (!isClassModalOpen) return null;

  const handleSelect = (classId) => {
    setSelectedClass(classId);
    setIsClassModalOpen(false);
    showToast(language === 'bn' ? 'শ্রেণি পরিবর্তন সফল হয়েছে!' : 'Class changed successfully!', 'success');
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    addNewClass(
      newClassName.trim(),
      newClassName.trim(),
      newClassLevel.trim() || (language === 'bn' ? 'কাস্টম শ্রেণি' : 'Custom Grade')
    );

    setNewClassName('');
    setNewClassLevel('');
    setIsAddingNew(false);
    setIsClassModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl p-6 bg-white border border-slate-200 shadow-2xl relative space-y-4">
        
        {/* Close Button */}
        <button
          onClick={() => {
            setIsClassModalOpen(false);
            setIsAddingNew(false);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center border border-red-100">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-slate-900 text-center">
            {t('selectClass')}
          </h3>
          <p className="text-xs text-slate-500 text-center">
            {language === 'bn' ? 'শ্রেণি বেছে নিন অথবা নতুন ক্লাস যোগ করুন' : 'Select a grade or add your custom class'}
          </p>
        </div>

        {/* Action: Add Custom Class Form Toggle */}
        {!isAddingNew ? (
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white font-black text-xs shadow-sm transition-all tap-active flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t('btnAddClass')}</span>
          </button>
        ) : (
          /* New Class Creation Form */
          <form onSubmit={handleCreateClass} className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200 space-y-2.5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-red-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('modalAddClassTitle')}</span>
              </span>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="text-[10px] text-slate-500 hover:text-slate-800 font-bold"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
            </div>

            <input
              type="text"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder={language === 'bn' ? 'যেমন: ১১শ-১২শ শ্রেণি (HSC), এডমিশন ব্যাচ' : 'e.g. Class 11-12 (HSC), Admission'}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500"
              required
            />

            <input
              type="text"
              value={newClassLevel}
              onChange={(e) => setNewClassLevel(e.target.value)}
              placeholder={language === 'bn' ? 'বিভাগ (যেমন: বিজ্ঞান/ব্যবসায় শিক্ষা/কলা)' : 'Stream (e.g. Science / Business / Arts)'}
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md transition-all tap-active"
            >
              {t('btnCreateClass')}
            </button>
          </form>
        )}

        {/* Classes List */}
        <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
          {classList.map((cls) => {
            const isSelected = selectedClass === cls.id;
            return (
              <button
                key={cls.id}
                onClick={() => handleSelect(cls.id)}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all tap-active ${
                  isSelected
                    ? 'bg-red-50 border-red-500 text-red-950 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${
                    isSelected ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black">
                      {language === 'bn' ? cls.nameBn : cls.nameEn}
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      {language === 'bn' ? cls.levelBn : cls.levelEn} • {cls.subjects.length} {language === 'bn' ? 'টি বিষয়' : 'Subjects'}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
