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
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Search,
  Eye
} from 'lucide-react';
import { NCTB_OFFICIAL_FULL_PDF_BOOKS } from '../utils/nctbFullPdfBooks';
import { NCTB_FULL_BOOK_CHAPTERS_MAP } from './KnowledgeVaultView';

export default function PdfBookViewerModal({ subjectId, subjectName, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('official-pdf'); // 'official-pdf' | 'notes-reader'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [chapterFilter, setChapterFilter] = useState('');
  
  if (!isOpen) return null;

  const pdfMeta = NCTB_OFFICIAL_FULL_PDF_BOOKS[subjectId] || {
    nameBn: subjectName || 'পাঠ্যবই',
    classBn: 'নবম-দশম শ্রেণি ও এসএসসি',
    totalPages: 320,
    fileSize: '15.0 MB',
    pdfUrl: 'https://nctb.portal.gov.bd',
    backupUrl: 'https://archive.org/details/nctb-class-9-10-arabic-bangla-version',
    summary: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত সম্পূর্ণ মূল পাঠ্যবই।'
  };

  const chapters = NCTB_FULL_BOOK_CHAPTERS_MAP[subjectId] || [];

  const filteredChapters = chapters.filter(ch => 
    !chapterFilter || 
    ch.title.toLowerCase().includes(chapterFilter.toLowerCase()) ||
    (ch.summary && ch.summary.toLowerCase().includes(chapterFilter.toLowerCase()))
  );

  const handlePrintAll = () => {
    window.print();
  };

  // Construct embedded PDF viewer URL (using Google Docs PDF previewer for direct online reading)
  const embedPdfUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfMeta.pdfUrl || 'https://nctb.portal.gov.bd')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[95vh]">
        
        {/* Header */}
        <div className="p-3.5 sm:p-5 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl shadow-inner shrink-0">
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
              <h2 className="text-sm sm:text-lg font-black tracking-tight leading-tight mt-0.5">
                {pdfMeta.nameBn} — সম্পূর্ণ মূল পাঠ্যবই PDF ও পূর্ণাঙ্গ গাইড
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/25 text-white transition-all tap-active"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-2.5 sm:p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveTab('official-pdf')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'official-pdf'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>📖 সম্পূর্ণ মূল পাঠ্যবই PDF রিডার</span>
            </button>

            <button
              onClick={() => setActiveTab('notes-reader')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'notes-reader'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>📑 সকল {chapters.length}টি অধ্যায়ের স্টাডি শিট</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintAll}
              className="px-3 py-1.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-600 text-white transition-all flex items-center gap-1.5 shadow-sm tap-active cursor-pointer"
              title="Print or Save as unified PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট / PDF সেভ</span>
            </button>

            <a
              href={pdfMeta.pdfUrl || pdfMeta.backupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl font-black bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 shadow-sm tap-active cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>মূল PDF ডাউনলোড ({pdfMeta.fileSize || '15 MB'})</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 p-3 sm:p-5 space-y-4 print-container bg-slate-100/60">
          
          {activeTab === 'official-pdf' ? (
            <div className="space-y-4 h-full flex flex-col">
              
              {/* E-Book Overview Card */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl shrink-0 font-bold">
                    📄
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        ✓ Verified NCTB 2026 E-Book
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {pdfMeta.totalPages} পৃষ্ঠা • {pdfMeta.fileSize}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      {pdfMeta.nameBn}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      {pdfMeta.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
                  <a
                    href={pdfMeta.pdfUrl || pdfMeta.backupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-200 transition-all tap-active"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>ফুলস্ক্রিন PDF খুলুন</span>
                  </a>

                  <button
                    onClick={() => setActiveTab('notes-reader')}
                    className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all tap-active"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-400" />
                    <span>অধ্যায় নোটস দেখুন</span>
                  </button>
                </div>
              </div>

              {/* Live Interactive PDF Viewer Frame / Container */}
              <div className="flex-1 min-h-[520px] rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col">
                <div className="p-2 bg-slate-900 text-white flex items-center justify-between text-xs px-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-[11px] tracking-wide">
                      NCTB লাইভ ই-বুক PDF ভিউয়ার ({pdfMeta.nameBn})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={pdfMeta.backupUrl || pdfMeta.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-bold text-amber-400 hover:text-amber-300 underline flex items-center gap-1"
                    >
                      <span>বিকল্প সার্ভারে খুলুন</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Embedded Frame with fallback notice */}
                <div className="relative flex-1 w-full bg-slate-800">
                  <iframe
                    src={embedPdfUrl}
                    title={pdfMeta.nameBn}
                    className="w-full h-full border-none min-h-[500px]"
                    loading="lazy"
                  />
                  
                  {/* Floating Direct Open Overlay Bar at bottom of reader */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/90 text-white px-4 py-2 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 border border-white/15 text-xs">
                    <span className="text-[11px] font-medium hidden sm:inline">
                      সম্পূর্ণ মূল PDF ব্রাউজারে পড়তে চান?
                    </span>
                    <a
                      href={pdfMeta.pdfUrl || pdfMeta.backupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs flex items-center gap-1.5 shadow-sm tap-active"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>সরাসরি PDF ফাইল ওপেন / ডাউনলোড</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Book Header Card */}
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <h3 className="text-sm font-black text-amber-950">
                      {pdfMeta.nameBn} — সম্পূর্ণ ডিজিটাল স্টাডি গাইড
                    </h3>
                  </div>
                  <p className="text-xs text-amber-800 font-medium">
                    {pdfMeta.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-amber-900 bg-white/80 px-3 py-1.5 rounded-xl border border-amber-200 shrink-0">
                  <span>মোট অধ্যায়: {chapters.length}টি</span>
                  <span>•</span>
                  <span>বোর্ড কারিকুলাম ২০২৬</span>
                </div>
              </div>

              {/* Quick Chapter Search Filter */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={chapterFilter}
                  onChange={(e) => setChapterFilter(e.target.value)}
                  placeholder="অধ্যায়ের নাম বা বিষয়বস্তু লিখে খুঁজুন..."
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-red-500 font-medium shadow-sm"
                />
                {chapterFilter && (
                  <button
                    onClick={() => setChapterFilter('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold"
                  >
                    মুছুন
                  </button>
                )}
              </div>

              {/* All Chapters Rendered Sequentially for 1-Click Reading & Printing */}
              <div className="space-y-4">
                {filteredChapters.map((ch, idx) => (
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
                              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed font-medium">{note.detail}</p>
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
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="font-semibold text-[11px]">
            © EduGenius AI • NCTB 2026 Curriculum Standard
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all text-xs cursor-pointer shadow-sm"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
