
import React, { useState } from 'react';
import { Video, Users, Play, Calendar, Gavel, BookOpen, Clock, Signal, Plus, MoreHorizontal, X, Maximize2, Volume2 } from 'lucide-react';
import { LiveSession, UserRole } from '../types';

const MOCK_LIVE_SESSIONS: LiveSession[] = [
  {
    id: '1',
    title: 'Constitutional Law: Basic Structure Doctrine',
    host: 'Prof. Amrita Singh',
    institution: 'NLUD',
    startTime: 'Now',
    status: 'Live',
    type: 'Lecture',
    attendeesCount: 245,
    tags: ['ConstiLaw', 'Academic']
  },
  {
    id: '2',
    title: 'Virtual Courtroom 01: Case #CRA/1024/2023',
    host: 'Hon\'ble High Court Bench',
    startTime: 'Now',
    status: 'Live',
    type: 'Court Proceeding',
    attendeesCount: 12,
    tags: ['Litigation', 'Official']
  },
  {
    id: '3',
    title: 'Drafting Commercial Contracts Workshop',
    host: 'Adv. Sameer Verma',
    startTime: 'Today, 4:00 PM',
    status: 'Upcoming',
    type: 'Webinar',
    attendeesCount: 0,
    tags: ['Skills', 'Corporate']
  }
];

export const LiveHall: React.FC<{ role: UserRole }> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'academic' | 'judicial'>('all');
  const [activeSession, setActiveSession] = useState<LiveSession | null>(null);

  const sessions = MOCK_LIVE_SESSIONS.filter(s => {
    if (activeTab === 'academic') return s.type === 'Lecture' || s.type === 'Webinar';
    if (activeTab === 'judicial') return s.type === 'Court Proceeding';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Live Hall</h2>
          <p className="text-sm text-slate-500 font-medium">लाइव हॉल: कानूनी शिक्षा और अदालत की कार्यवाही तक सीधी पहुंच।</p>
        </div>
        <div className="flex gap-2">
          {role === UserRole.PROFESSOR && (
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md">
              <Plus size={18} />
              क्लास शेड्यूल करें
            </button>
          )}
          {role === UserRole.ADVOCATE && (
            <button className="flex items-center gap-2 border-2 border-slate-900 text-slate-900 px-5 py-2 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all">
              <Gavel size={18} />
              कोर्ट रूम खोलें
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
        {[
          { id: 'all', label: 'All Activity', hindi: 'सभी गतिविधियाँ', icon: Signal },
          { id: 'academic', label: 'Academic Hall', hindi: 'अकादमिक हॉल', icon: BookOpen },
          { id: 'judicial', label: 'Judicial Hall', hindi: 'न्यायिक हॉल', icon: Gavel },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex flex-col items-center px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <tab.icon size={14} />
              {tab.label}
            </div>
            <span className="text-[8px] opacity-70 mt-0.5">{tab.hindi}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-slate-300 transition-all">
            <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>
              
              {session.status === 'Live' && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 animate-pulse uppercase tracking-wider z-20">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  Live
                </div>
              )}
              
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 z-20">
                <Users size={12} />
                {session.attendeesCount} दर्शक
              </div>

              <button 
                onClick={() => setActiveSession(session)}
                className="relative z-10 w-16 h-16 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all group-hover:scale-110 border border-white/20 active:scale-95 shadow-2xl"
              >
                <Play size={32} fill="white" className="ml-1" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                      session.type === 'Court Proceeding' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {session.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {session.title}
                  </h3>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 font-bold text-sm shadow-inner">
                  {session.host[0]}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-700">{session.host}</p>
                  <p className="text-slate-400 text-[10px] font-medium tracking-wide">{session.institution || 'आधिकारिक कार्यवाही'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                    <Calendar size={14} className="text-blue-500" />
                    {session.status === 'Live' ? 'अभी चालू है' : session.startTime}
                  </div>
                </div>
                <button 
                  onClick={() => setActiveSession(session)}
                  className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                >
                  {session.status === 'Live' ? 'अभी जुड़ें' : 'याद दिलाएं'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Simulation */}
      {activeSession && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col animate-in fade-in duration-300">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-black uppercase animate-pulse">Live</div>
              <h3 className="font-bold text-sm md:text-base truncate max-w-[200px] md:max-w-md">{activeSession.title}</h3>
            </div>
            <button onClick={() => setActiveSession(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 relative bg-black flex items-center justify-center group overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80" 
              className="w-full h-full object-cover opacity-50"
              alt="Video Background"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
            
            <div className="absolute text-center space-y-4 animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-full flex items-center justify-center mx-auto border-4 border-white/20">
                <Users size={48} className="text-white opacity-80" />
              </div>
              <p className="text-white/60 text-sm font-medium">Connecting to secure legal stream...</p>
              <div className="flex gap-2 justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-6 text-white">
                <Play size={24} fill="white" className="cursor-pointer" />
                <Volume2 size={24} className="cursor-pointer" />
                <span className="text-xs font-bold tracking-widest">00:42 / LIVE</span>
              </div>
              <Maximize2 size={24} className="text-white cursor-pointer" />
            </div>
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Video size={40} />
          </div>
          <h3 className="font-bold text-xl text-slate-900">इस हॉल में कोई सक्रिय सत्र नहीं है</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">भविष्य के व्याख्यानों और मूट्स के लिए आगामी कार्यक्रम देखें।</p>
        </div>
      )}
    </div>
  );
};
