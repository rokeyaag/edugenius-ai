import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import DashboardView from './components/DashboardView';
import CreativeQuestionsView from './components/CreativeQuestionsView';
import AITutorView from './components/AITutorView';
import QuizArenaView from './components/QuizArenaView';
import KnowledgeVaultView from './components/KnowledgeVaultView';
import SubscriptionStoreView from './components/SubscriptionStoreView';
import TeacherPortalView from './components/TeacherPortalView';
import PomodoroModal from './components/PomodoroModal';
import ClassSelectorModal from './components/ClassSelectorModal';
import AddSubjectModal from './components/AddSubjectModal';
import InstallAppModal from './components/InstallAppModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function AppContent() {
  const { activeTab, toastMessage, isInstallModalOpen, setIsInstallModalOpen } = useApp();

  return (
    <div className="min-h-screen bg-slate-900 md:bg-slate-100/90 flex justify-center text-slate-900 selection:bg-red-600 selection:text-white antialiased">
      
      {/* Responsive Shell Wrapper: Mobile (full width) & Desktop (sleek max-w-4xl lg:max-w-5xl with card borders) */}
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl min-h-screen flex flex-col bg-[#ffffff] md:border-x md:border-slate-200/90 md:shadow-2xl relative transition-all duration-300">
        
        {/* Top Header Navbar */}
        <Navbar />

        {/* Dynamic Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-4 animate-in slide-in-from-top-4 duration-300 pointer-events-none">
            <div className={`p-3.5 rounded-2xl border shadow-xl flex items-center gap-2.5 text-xs font-black ${
              toastMessage.type === 'point'
                ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-md'
                : toastMessage.type === 'error'
                ? 'bg-rose-50 border-rose-500 text-rose-900 shadow-md'
                : 'bg-red-50 border-red-400 text-red-950 shadow-md'
            }`}>
              {toastMessage.type === 'point' ? (
                <span className="text-base">🪙</span>
              ) : toastMessage.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span>{toastMessage.message}</span>
            </div>
          </div>
        )}

        {/* Main Viewport with proper bottom safe padding for desktop and mobile */}
        <main className="flex-1 px-3 sm:px-6 md:px-8 pt-1 pb-28 md:pb-32 bg-[#ffffff]">
          {activeTab === 'home' && <DashboardView />}
          {activeTab === 'creative' && <CreativeQuestionsView />}
          {activeTab === 'tutor' && <AITutorView />}
          {activeTab === 'teacher' && <TeacherPortalView />}
          {activeTab === 'quiz' && <QuizArenaView />}
          {activeTab === 'vault' && <KnowledgeVaultView />}
          {activeTab === 'store' && <SubscriptionStoreView />}
        </main>

        {/* Floating Modals */}
        <PomodoroModal />
        <ClassSelectorModal />
        <AddSubjectModal />
        <InstallAppModal 
          isOpen={isInstallModalOpen} 
          onClose={() => setIsInstallModalOpen(false)} 
        />

        {/* Mobile & Web Desktop App Bottom Navigation Dock */}
        <BottomNav />

      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
