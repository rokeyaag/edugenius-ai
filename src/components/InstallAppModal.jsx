import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Smartphone, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  PlusSquare, 
  MoreVertical,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function InstallAppModal({ isOpen, onClose }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Detect iOS Safari
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <img src="/icon-192.png?v=2" alt="EduGenius AI" className="w-12 h-12 rounded-2xl shadow-md border border-amber-300 object-cover shrink-0" />
          <div>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              মোবাইলে অ্যাপ ডাউনলোড ও ইনস্টল
            </h3>
            <p className="text-[11px] font-bold text-amber-700">EduGenius AI App Setup</p>
          </div>
        </div>

        {/* Status Card */}
        {isInstalled ? (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 flex items-center gap-2 text-xs font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>অ্যাপটি সফলভাবে আপনার ফোনে ইনস্টল করা আছে!</span>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            
            {/* Direct PWA Install Button (If supported by browser) */}
            {deferredPrompt && (
              <button
                onClick={handleInstallClick}
                className="w-full py-3 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-white rounded-2xl font-black text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 tap-active"
              >
                <Download className="w-4 h-4 text-amber-200" />
                <span>১-ক্লিকে অ্যাপ ডাউনলোড ও ইনস্টল করুন</span>
              </button>
            )}

            {/* Manual Instructions for Android & iPhone */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-2xl space-y-2.5">
              <span className="font-black text-amber-950 text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
                <span>{isIOS ? 'iPhone-এ যেভাবে ইন্সটল করবেন:' : 'Android ফোনে যেভাবে ইন্সটল করবেন:'}</span>
              </span>

              {isIOS ? (
                <div className="space-y-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">১</span>
                    <span>Safari ব্রাউজারে নিচে <Share2 className="w-3.5 h-3.5 text-blue-600 inline mx-0.5" /> <strong>Share</strong> বাটনে ট্যাপ করুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">২</span>
                    <span>নিচে স্ক্রল করে <PlusSquare className="w-3.5 h-3.5 text-slate-700 inline mx-0.5" /> <strong>"Add to Home Screen"</strong>-এ ক্লিক করুন।</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-[11px] font-medium text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">১</span>
                    <span>Chrome ব্রাউজারের উপরে ডানদিকের <MoreVertical className="w-3.5 h-3.5 text-slate-800 inline mx-0.5" /> <strong>(⋮) থ্রি-ডট মেনুতে</strong> ট্যাপ করুন।</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">২</span>
                    <span><strong>"Install app"</strong> অথবা <strong>"Add to Home screen" (হোম স্ক্রিনে যোগ করুন)</strong> বাটনে ক্লিক করুন।</span>
                  </div>
                </div>
              )}
            </div>

            {/* Local Network Info */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 space-y-1">
              <span className="font-bold text-slate-800 block">🌐 একই Wi-Fi দিয়ে মোবাইলে খুলতে:</span>
              <code className="block p-1.5 bg-white border border-slate-300 rounded-xl text-red-600 font-mono font-bold text-center text-xs select-all">
                http://192.168.0.101:5173/
              </code>
            </div>

          </div>
        )}

        {/* Footer Close */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
        >
          ঠিক আছে
        </button>

      </div>
    </div>
  );
}
