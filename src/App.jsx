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
    <div className="min-h-screen bg-[#edf0f5] flex justify-center text-slate-900 selection:bg-red-600 selection:text-white">
      
      {/* Mobile Shell Wrapper with Pure White Background */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#ffffff] border-x border-slate-200/90 shadow-2xl relative">
        
        {/* Top Header Navbar */}
        <Navbar />

        {/* Dynamic Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4 animate-in slide-in-from-top-4 duration-300 pointer-events-none">
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

        {/* Main Viewport */}
        <main className="flex-1 px-4 pt-1 bg-[#ffffff]">
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

        {/* Mobile App Bottom Navigation */}
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
