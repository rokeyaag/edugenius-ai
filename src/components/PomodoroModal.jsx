import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function PomodoroModal() {
  const { isPomodoroOpen, setIsPomodoroOpen, earnPoints, language, t } = useApp();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      earnPoints(10, language === 'bn' ? '২৫ মিনিটের ফোকাসড স্টাডি সম্পন্ন হয়েছে!' : 'Completed 25-Min Focus Study Session!');
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  if (!isPomodoroOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-3xl p-6 bg-white border border-slate-200 text-center space-y-5 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsPomodoroOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-1">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-black text-slate-900">{t('pomodoroTitle')}</h3>
          <p className="text-xs text-slate-500 font-medium">{t('pomodoroSub')}</p>
        </div>

        {/* Timer Display */}
        <div className="py-4">
          <div className="text-5xl font-black font-mono tracking-tight bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
            {formattedTime}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`py-3 px-6 rounded-2xl text-xs font-black flex items-center gap-2 transition-all tap-active ${
              isRunning
                ? 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                : 'bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-md'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            <span>{isRunning ? t('btnPauseSession') : t('btnStartFocus')}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 tap-active"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
          </button>
        </div>

      </div>
    </div>
  );
}
