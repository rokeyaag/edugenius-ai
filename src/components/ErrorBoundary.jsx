import React from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('EduGenius Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white font-sans">
          <div className="max-w-md w-full p-6 rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-black text-white">অ্যাপ রিলোড প্রয়োজন</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              পেজ লোড হতে সাময়িক সমস্যা হয়েছে। নিচের বাটনে ক্লিক করে অ্যাপটি রিফ্রেশ করুন।
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs flex items-center justify-center gap-2 mx-auto shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>🔄 পেজ রিফ্রেশ করুন</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
