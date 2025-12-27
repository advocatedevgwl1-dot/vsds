
import React, { useState } from 'react';
import { Scale, Bell, Search, UserCircle, Menu, Github, ChevronDown, User } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, currentRole, setRole }) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onMenuClick} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 p-2 rounded-xl shadow-lg shadow-slate-200">
              <Scale className="text-yellow-500" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-serif tracking-tight leading-none text-slate-900">VIDHIGYA</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black mt-1">विधिज्ञ संगठन • Estd. 2024</p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="खोजें: धाराएं, केस कानून, सदस्य..." 
              className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="relative">
            <button 
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all"
            >
              <div className="hidden sm:block text-right mr-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Your Role (आपका रोल)</p>
                <p className="text-xs font-bold text-slate-900">{currentRole}</p>
              </div>
              <User size={18} className="text-slate-600" />
              <ChevronDown size={14} className={`text-slate-400 transition-transform ${showRoleMenu ? 'rotate-180' : ''}`} />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Switch Role</p>
                {[UserRole.ADVOCATE, UserRole.STUDENT, UserRole.PROFESSOR].map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setRole(role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between hover:bg-slate-50 ${currentRole === role ? 'text-blue-600 bg-blue-50/50' : 'text-slate-600'}`}
                  >
                    {role}
                    {currentRole === role && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button className="p-2.5 text-slate-500 hover:bg-slate-100 rounded-full relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
