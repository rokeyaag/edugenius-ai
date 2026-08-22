import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  BookOpen, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Layers,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { NCTB_OFFICIAL_FULL_PDF_BOOKS } from '../utils/nctbFullPdfBooks';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';

export default function PdfBookViewerModal({ subjectId, subjectName, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('notes-reader'); // 'notes-reader' | 'official-pdf'
  
  if (!isOpen) return null;

  const pdfMeta = NCTB_OFFICIAL_FULL_PDF_BOOKS[subjectId] || {
    nameBn: subjectName || 'পাঠ্যবই',
    classBn: 'নবম-দশম শ্রেণি ও এসএসসি',
    totalPages: 320,
    fileSize: '15.0 MB',
    pdfUrl: 'https://nctb.portal.gov.bd',
    summary: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত সম্পূর্ণ মূল পাঠ্যবই।'
  };

  const chapters = NCTB_FULL_BOOK_CHAPTERS_MAP[subjectId] || [];

  const handlePrintAll = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl shadow-inner">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  NCTB Official Full Book
                </span>
                <span className="text-[10px] font-bold text-amber-200">
                  {pdfMeta.classBn}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight">
                {pdfMeta.nameBn} — সম্পূর্ণ পাঠ্যবই ও স্টাডি গাইড PDF
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all tap-active"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('notes-reader')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'notes-reader'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>সম্পূর্ণ অধ্যায়ভিত্তিক PDF স্টাডি শিট ({chapters.length}টি অধ্যায়)</span>
            </button>

            <button
              onClick={() => setActiveTab('official-pdf')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'official-pdf'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>NCTB মূল পাঠ্যবই তথ্য ({pdfMeta.fileSize || '15 MB'})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintAll}
              className="px-3 py-1.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all flex items-center gap-1.5 shadow-sm tap-active"
              title="Print or Save as unified PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF সেভ করুন</span>
            </button>

            {pdfMeta.backupUrl && (
              <a
                href={pdfMeta.backupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 shadow-sm tap-active"
              >
                <Download className="w-3.5 h-3.5" />
                <span>NCTB PDF ডাউনলোড</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 print-container">
          
          {activeTab === 'notes-reader' ? (
            <div className="space-y-6">
              
              {/* Book Header Card */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-black text-amber-950">
                      {pdfMeta.nameBn} — ডিজিটাল ফুল বুক শিট
                    </h3>
                  </div>
                  <p className="text-xs text-amber-800 font-medium">
                    {pdfMeta.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200">
                  <span>মোট অধ্যায়: {chapters.length}টি</span>
                  <span>•</span>
                  <span>বোর্ড স্ট্যান্ডার্ড ২০২৬</span>
                </div>
              </div>

              {/* All Chapters Rendered Sequentially for 1-Click Reading & Printing */}
              <div className="space-y-6">
                {chapters.map((ch, idx) => (
                  <div 
                    key={ch.id || idx} 
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5 page-break-inside-avoid"
                  >
                    {/* Chapter Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div>
                        <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-2 py-0.5 rounded-md">
                          অধ্যায় {idx + 1} • {ch.type || 'পাঠ্যবই'}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1">
                          {ch.title}
                        </h4>
                      </div>
                    </div>

                    {/* Summary */}
                    {ch.summary && (
                      <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed font-medium">
                        <span className="font-bold text-slate-900">📌 সারসংক্ষেপ: </span>
                        {ch.summary}
                      </div>
                    )}

                    {/* Formulas / Rules */}
                    {ch.formula && (
                      <div className="text-xs text-red-900 bg-red-50/70 p-3 rounded-xl border border-red-200/80 leading-relaxed font-bold font-mono">
                        <span className="font-black text-red-700">⚡ মূল সূত্র / নিয়মাবলী: </span>
                        {ch.formula}
                      </div>
                    )}

                    {/* Lecture Notes */}
                    {ch.lectureNotes && ch.lectureNotes.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-xs font-black text-slate-900 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-red-600" />
                          <span>বিস্তারিত লেকচার নোটস:</span>
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {ch.lectureNotes.map((note, nIdx) => (
                            <div key={nIdx} className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1">
                              <h5 className="text-xs font-black text-slate-800">{note.title}</h5>
                              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">{note.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Self Test Questions */}
                    {ch.selfTest && ch.selfTest.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <span className="text-xs font-black text-slate-900 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>অধ্যায়ভিত্তিক বোর্ড মডেল প্রশ্ন ও উত্তর:</span>
                        </span>
                        <div className="space-y-1.5 text-xs text-slate-700">
                          {ch.selfTest.map((test, qIdx) => (
                            <div key={qIdx} className="p-2.5 bg-emerald-50/40 rounded-xl border border-emerald-100">
                              <p className="font-bold text-slate-900">{test.q}</p>
                              <p className="text-emerald-800 font-semibold mt-1">
                                ✅ সঠিক উত্তর: {test.options[test.correct]}
                              </p>
                              {test.explanation && (
                                <p className="text-[11px] text-slate-500 mt-0.5">
                                  💡 ব্যাখ্যা: {test.explanation}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
                📖
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-base font-black text-slate-900">
                  {pdfMeta.nameBn}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) বাংলাদেশ কর্তৃক প্রকাশিত সম্পূর্ণ ই-বুক PDF।
                </p>
              </div>

              <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px]">মোট পৃষ্ঠা</span>
                  <span className="text-sm font-black text-slate-900">{pdfMeta.totalPages} পৃষ্ঠা</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[10px]">ফাইলের সাইজ</span>
                  <span className="text-sm font-black text-slate-900">{pdfMeta.fileSize}</span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <span className="text-slate-400 block text-[10px]">কারিকুলাম</span>
                  <span className="text-sm font-black text-slate-900">NCTB 2026</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={pdfMeta.backupUrl || pdfMeta.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-200 transition-all tap-active"
                >
                  <Download className="w-4 h-4" />
                  <span>অফিসিয়াল PDF ডাউনলোড ও রিডার খুলুন</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setActiveTab('notes-reader')}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all tap-active"
                >
                  <FileText className="w-4 h-4 text-red-600" />
                  <span>অ্যাপের ভেতর সম্পূর্ণ নোট পড়ুন</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-[11px]">
            © EduGenius AI • NCTB 2026 Curriculum Standard
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-all text-xs"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
