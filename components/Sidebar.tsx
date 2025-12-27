
import React, { useState, useEffect } from 'react';
import { Home, ChevronRight, Calendar, GraduationCap, Briefcase, Video, Newspaper, Cpu, Users, Activity, WifiOff } from 'lucide-react';
import { db } from '../services/database';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen }) => {
  const [connStatus, setConnStatus] = useState<'online' | 'offline' | 'simulated' | 'checking'>('checking');

  useEffect(() => {
    const checkConn = async () => {
      try {
        const health = await db.checkHealth();
        if (health.status === 'connected') setConnStatus('online');
        else if (health.status === 'simulated') setConnStatus('simulated');
        else setConnStatus('offline');
      } catch (e) {
        setConnStatus('offline');
      }
    };
    checkConn();
    const interval = setInterval(checkConn, 20000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'feed', label: 'Community Feed', hindi: 'समुदाय फीड', icon: Home },
    { id: 'insights', label: 'Legal Insights', hindi: 'कानूनी समाचार', icon: Newspaper },
    { id: 'live', label: 'Live Hall', hindi: 'लाइव हॉल', icon: Video },
    { id: 'jobs', label: 'Career Hub', hindi: 'करियर और जॉब्स', icon: Briefcase },
    { id: 'diary', label: 'Court Diary', hindi: 'कोर्ट डायरी', icon: Calendar },
    { id: 'academic', label: 'Academic', hindi: 'पढ़ाई और रिसर्च', icon: GraduationCap },
    { id: 'ai-lab', label: 'Vidhigya AI Lab', hindi: 'एआई लैब', icon: Cpu },
    { id: 'directory', label: 'Members', hindi: 'सदस्य सूची', icon: Users },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <nav className="p-4 space-y-2 pt-20 lg:pt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
              activeTab === item.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3 text-left">
              <item.icon size={20} />
              <div>
                <p className="font-bold text-[13px] leading-none">{item.label}</p>
                <p className="text-[10px] opacity-70 mt-1 font-medium">{item.hindi}</p>
              </div>
            </div>
            {activeTab === item.id && <ChevronRight size={16} />}
          </button>
        ))}
      </nav>
      
      <div className="absolute bottom-6 left-4 right-4 space-y-3">
        <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            {connStatus === 'offline' ? <WifiOff size={14} className="text-red-500" /> : <Activity size={14} className="text-blue-500" />}
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">सिस्टम स्थिति</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${
              connStatus === 'online' ? 'bg-green-500 animate-pulse' : 
              connStatus === 'simulated' ? 'bg-blue-400' : 'bg-red-500'
            }`}></div>
            <span className="text-[10px] font-bold text-slate-600 capitalize">
              {connStatus === 'online' ? 'ऑनलाइन' : 'सिम्युलेटेड'}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-700 p-4 rounded-2xl text-white">
          <h4 className="font-bold text-sm mb-1 text-yellow-500">क्लाउड सिंक चालू है</h4>
          <p className="text-[10px] text-slate-300 mb-3">आपकी जानकारी सुरक्षित रूप से सेव हो रही है।</p>
          <button className="w-full py-2 bg-yellow-500 text-slate-900 text-xs font-bold rounded-lg transition-colors hover:bg-yellow-400">
            प्रीमियम लें
          </button>
        </div>
      </div>
    </aside>
  );
};
