
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CommunityFeed } from './components/CommunityFeed';
import { AILab } from './components/AILab';
import { CourtDiary } from './components/CourtDiary';
import { AcademicWorkspace } from './components/AcademicWorkspace';
import { JobBoard } from './components/JobBoard';
import { LiveHall } from './components/LiveHall';
import { LegalInsights } from './components/LegalInsights';
import { MemberDirectory } from './components/MemberDirectory';
import { Briefcase, Gavel, FileText, ExternalLink, GraduationCap, Sparkles, Video, Github, CheckCircle2 } from 'lucide-react';
import { UserRole } from './types';
import { db } from './services/database';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.ADVOCATE);
  const [isGithubConnected, setIsGithubConnected] = useState(false);

  useEffect(() => {
    db.seed();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <CommunityFeed />;
      case 'ai-lab':
        return <AILab />;
      case 'diary':
        return <CourtDiary />;
      case 'academic':
        return <AcademicWorkspace role={currentUserRole} />;
      case 'jobs':
        return <JobBoard />;
      case 'live':
        return <LiveHall role={currentUserRole} />;
      case 'insights':
        return <LegalInsights />;
      case 'directory':
        return <MemberDirectory />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="p-4 bg-slate-100 rounded-full mb-4">
              <Gavel size={48} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Module Under Construction</h3>
            <p className="text-slate-500 mt-2 max-w-xs">We're building this feature to help Vidhigya Sanghthan members connect better. Stay tuned!</p>
            <button 
              onClick={() => setActiveTab('feed')}
              className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              Back to Feed
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        currentRole={currentUserRole}
        setRole={setCurrentUserRole}
      />
      
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsSidebarOpen(false);
        }} isOpen={isSidebarOpen} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {renderContent()}
            </div>
            
            <div className="hidden lg:block lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm text-center relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900"></div>
                <div className="w-24 h-24 bg-slate-900 rounded-[2rem] mx-auto mb-4 flex items-center justify-center text-white text-3xl font-serif font-bold border-4 border-slate-50 shadow-2xl group-hover:rotate-3 transition-transform">
                  YK
                </div>
                <h3 className="font-bold text-lg">Adv. Yash Kumar</h3>
                <p className="text-slate-500 text-sm mb-1">{currentUserRole === UserRole.ADVOCATE ? 'Supreme Court Practitioner' : currentUserRole}</p>
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4">Verified Member</p>
                
                <div className="flex items-center justify-center gap-2 mb-6">
                  <button 
                    onClick={() => setIsGithubConnected(!isGithubConnected)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-all ${
                      isGithubConnected 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400'
                    }`}
                  >
                    <Github size={12} />
                    {isGithubConnected ? '@yash-legaltech' : 'Connect GitHub'}
                    {isGithubConnected && <CheckCircle2 size={10} />}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">Experience</p>
                    <p className="text-sm font-bold text-slate-800">12 Years</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">AI Score</p>
                    <p className="text-sm font-bold text-yellow-600">Expert</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-95">
                    Manage Chambers (चैम्बर प्रबंध)
                  </button>
                  <button className="w-full py-2.5 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    Public Profile
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Video size={18} className="text-red-500" />
                    Live Now (अभी लाइव)
                  </h4>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                </div>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-slate-100" onClick={() => setActiveTab('live')}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Constitutional Law</span>
                      <span className="text-[9px] font-bold text-slate-400">245 Viewers</span>
                    </div>
                    <p className="text-xs font-bold text-slate-700">Basic Structure Doctrine - Part II</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-[2.5rem] text-white shadow-2xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-blue-400">Production Stats</h4>
                  <Github size={16} className="text-slate-400" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Environment (पर्यावरण)</span>
                    <span className="font-black text-green-400 tracking-wider">CLOUD LIVE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Sync Status (सिंक)</span>
                    <span className="font-bold flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      Optimized
                    </span>
                  </div>
                </div>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/10 backdrop-blur-sm"
                >
                  <ExternalLink size={14} />
                  View Repo on GitHub
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>

      <button 
        onClick={() => setActiveTab('ai-lab')}
        className="fixed bottom-6 right-6 bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-3 z-50 group border-4 border-white shadow-slate-300"
      >
        <Sparkles className="group-hover:rotate-12 transition-transform text-yellow-500" size={24} />
        <div className="text-left hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 leading-none mb-1">Ask AI</p>
          <p className="font-bold text-sm leading-none">विधिज्ञ एआई</p>
        </div>
      </button>
    </div>
  );
};

export default App;
