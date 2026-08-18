import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Crown, 
  Sparkles, 
  Check, 
  Gift, 
  Copy, 
  CheckCheck, 
  Clock
} from 'lucide-react';

export default function SubscriptionStoreView() {
  const { 
    points, 
    freeTrialDaysLeft, 
    redeemPointsForPro, 
    earnPoints, 
    showToast,
    language,
    t 
  } = useApp();

  const [copiedCode, setCopiedCode] = useState(false);
  const [referralInput, setReferralInput] = useState('');
  const [referralUsed, setReferralUsed] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('GENIUS-8842');
    setCopiedCode(true);
    showToast(language === 'bn' ? '📋 রেফারেল কোড কপি করা হয়েছে!' : '📋 Referral code copied to clipboard!', 'success');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleApplyReferral = () => {
    if (!referralInput.trim()) return;
    if (referralUsed) {
      showToast(language === 'bn' ? '⚠️ আপনি ইতিমধ্যে রেফারেল কোড ব্যবহার করেছেন।' : '⚠️ You have already redeemed a referral code.', 'info');
      return;
    }
    earnPoints(25, language === 'bn' ? 'রেফারেল বোনাস পাওয়া গেছে!' : 'Referral Bonus Claimed!');
    setReferralUsed(true);
    setReferralInput('');
  };

  const PRO_PERKS = language === 'bn' ? [
    '✨ আনলিমিটেড পাঠ্যবই OCR স্ক্যানার',
    '🧠 আনলিমিটেড সোক্রাটিক AI টিউটর চ্যাট',
    '💾 ভল্টে আজীবন আনলিমিটেড নোটস স্টোরেজ',
    '🎧 ৩ মিনিটের AI অডিও পডকাস্ট সামারি',
    '📄 ১-ক্লিকে প্রিন্টযোগ্য PDF চিট-শিট',
    '⚡ দৈনিক কুইজে ২ গুণ (2x) বোনাস পয়েন্ট'
  ] : [
    '✨ Unlimited AI Book Scanner & OCR',
    '🧠 Unlimited Socratic AI Tutor Queries',
    '💾 Infinite Cloud Storage for Knowledge Vault',
    '🎧 3-Min AI Audio Podcasts & Summaries',
    '📄 1-Click Printable PDF Cheat Sheets',
    '⚡ 2x Multiplier on Daily Quiz Points'
  ];

  return (
    <div className="space-y-4 pb-24 pt-2">
      
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
            <span>{t('storeTitle')}</span>
          </h2>
          <p className="text-xs text-slate-500">{t('storeSub')}</p>
        </div>
      </div>

      {/* Available Balance Banner */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-red-600 to-amber-500 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl backdrop-blur-sm">
            🪙
          </div>
          <div>
            <span className="text-[10px] text-yellow-200 font-black uppercase tracking-wider">{t('availableWallet')}</span>
            <h3 className="text-xl font-black text-white">{points} {t('points')}</h3>
          </div>
        </div>

        <button
          onClick={() => earnPoints(10, language === 'bn' ? 'ডেইলি চেক-ইন বোনাস!' : 'Daily Check-In Bonus!')}
          className="py-2 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-red-700 text-xs font-black shadow-sm transition-all tap-active"
        >
          {t('btnDailyBonus')}
        </button>
      </div>

      {/* Free Trial Status Card */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 space-y-2.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <h4 className="text-xs font-black text-slate-900">{t('trialStatus')}</h4>
          </div>
          <span className="text-[11px] font-black text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {freeTrialDaysLeft} {t('trialRemaining')}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {t('trialDesc')}
        </p>
      </div>

      {/* Redeem Pass for 1-Month Pro */}
      <div className="relative overflow-hidden rounded-3xl p-5 bg-white border-2 border-red-500 space-y-4 shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-black text-slate-950 bg-amber-400 px-2.5 py-0.5 rounded-full shadow-sm">
              {t('popularReward')}
            </span>
            <h3 className="text-base font-black text-slate-900">{t('proPassTitle')}</h3>
            <p className="text-xs text-slate-500">{t('proPassSub')}</p>
          </div>

          <div className="text-right">
            <span className="text-lg font-black text-red-600">100 {t('points')}</span>
            <span className="block text-[10px] text-slate-400">{language === 'bn' ? 'বা ৳৯৯/মাস' : 'or ৳99/mo'}</span>
          </div>
        </div>

        {/* Perks list */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          {PRO_PERKS.map((perk, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-black" />
              <span>{perk}</span>
            </div>
          ))}
        </div>

        {/* Redeem Button */}
        <button
          onClick={() => redeemPointsForPro(100)}
          className={`w-full py-3 px-4 rounded-2xl font-black text-xs transition-all tap-active flex items-center justify-center gap-2 ${
            points >= 100
              ? 'bg-gradient-to-r from-red-600 to-amber-500 hover:opacity-95 text-white shadow-md'
              : 'bg-slate-100 text-slate-400 border border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{points >= 100 ? t('btnRedeemPoints') : `${100 - points} ${t('btnEarnRemaining')}`}</span>
        </button>
      </div>

      {/* Refer & Earn Section */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <Gift className="w-5 h-5 text-amber-500" />
          <div>
            <h4 className="text-xs font-black text-slate-900">{t('referTitle')}</h4>
            <p className="text-[10px] text-slate-500">{t('referSub')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs text-red-700 font-black text-center">
            GENIUS-8842
          </div>
          <button
            onClick={handleCopyCode}
            className="py-2 px-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all tap-active flex items-center gap-1.5 shadow-sm"
          >
            {copiedCode ? <CheckCheck className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
            <span>{copiedCode ? t('btnCopied') : t('btnCopyCode')}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <input
            type="text"
            value={referralInput}
            onChange={(e) => setReferralInput(e.target.value)}
            placeholder={t('referPlaceholder')}
            className="flex-1 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={handleApplyReferral}
            className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 tap-active"
          >
            {t('btnClaim')}
          </button>
        </div>
      </div>

    </div>
  );
}
