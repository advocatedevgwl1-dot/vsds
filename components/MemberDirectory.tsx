
import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, GraduationCap, MapPin, Mail, MessageSquare, Filter, X, Send, Paperclip } from 'lucide-react';
import { Member, UserRole } from '../types';
import { db } from '../services/database';

export const MemberDirectory: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeChat, setActiveChat] = useState<Member | null>(null);

  useEffect(() => {
    db.getMembers().then(setMembers);
  }, []);

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         member.institution?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || member.role === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const roleLabels: Record<string, string> = {
    'All': 'सभी सदस्य',
    [UserRole.ADVOCATE]: 'अधिवक्ता',
    [UserRole.PROFESSOR]: 'प्राध्यापक',
    [UserRole.STUDENT]: 'छात्र'
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Member Directory</h2>
          <p className="text-sm text-slate-500 font-medium">सदस्य सूची: कानूनी विशेषज्ञों, गुरुओं और साथियों के साथ जुड़ें।</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="नाम, विशेषज्ञता या संस्थान द्वारा खोजें..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
          {['All', UserRole.ADVOCATE, UserRole.PROFESSOR, UserRole.STUDENT].map((role) => (
            <button
              key={role}
              onClick={() => setActiveFilter(role)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex flex-col items-center ${
                activeFilter === role 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              <span>{role}</span>
              <span className="text-[8px] opacity-70">{roleLabels[role]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-serif font-bold text-xl border-4 border-slate-50 shadow-inner group-hover:scale-105 transition-transform">
                {member.avatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{member.name}</h3>
                  {member.role === UserRole.ADVOCATE && <ShieldCheck size={14} className="text-blue-500" />}
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.role}</p>
                <div className="flex items-center gap-1 mt-1.5 text-[10px] text-slate-500 font-bold bg-slate-50 px-2 py-0.5 rounded-lg w-fit">
                  <MapPin size={10} />
                  {member.institution || 'स्वतंत्र अभ्यास'}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6 min-h-[50px]">
              {member.specialization?.map(spec => (
                <span key={spec} className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg font-bold border border-blue-100/50">
                  {spec}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95">
                <Mail size={14} />
                <span>प्रोफाइल</span>
              </button>
              <button 
                onClick={() => setActiveChat(member)}
                className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 border border-slate-100 transition-all active:scale-95"
              >
                <MessageSquare size={14} />
                <span>मेसेज</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Chat Panel */}
      {activeChat && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setActiveChat(null)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-serif font-bold text-lg border border-white/20">
                  {activeChat.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-base leading-none">{activeChat.name}</h4>
                  <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    अभी सक्रिय (Online)
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveChat(null)} className="p-2.5 hover:bg-white/10 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
              <div className="text-center py-4">
                <span className="text-[10px] bg-white border border-slate-200 text-slate-400 px-4 py-1.5 rounded-full font-bold uppercase tracking-widest shadow-sm">सुरक्षित बातचीत (End-to-End Encrypted)</span>
              </div>
              
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 text-sm leading-relaxed text-slate-700">
                  नमस्ते! मैंने विधिज्ञ डायरेक्टरी में आपकी प्रोफाइल देखी। मुझे नए बीएनएस (BNS) दिशा-निर्देशों पर चर्चा करना अच्छा लगेगा।
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-slate-900 p-4 rounded-2xl rounded-tr-none shadow-xl text-white text-sm leading-relaxed">
                  बिल्कुल। चलिए कल सुबह के लिए एक कॉल शेड्यूल करते हैं।
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-white">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 px-4 focus-within:ring-2 focus-within:ring-slate-900 focus-within:bg-white transition-all">
                <button className="text-slate-400 hover:text-slate-900 transition-colors"><Paperclip size={20} /></button>
                <input 
                  type="text" 
                  placeholder="अपना संदेश लिखें..." 
                  className="flex-1 bg-transparent border-none text-sm focus:ring-0 placeholder:text-slate-400"
                />
                <button className="p-2.5 bg-slate-900 text-white rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
