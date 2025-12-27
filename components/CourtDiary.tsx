
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Clock, MapPin, Gavel, Filter, ChevronRight, FileText } from 'lucide-react';
import { CourtHearing } from '../types';
import { db } from '../services/database';

export const CourtDiary: React.FC = () => {
  const [hearings, setHearings] = useState<CourtHearing[]>([]);

  useEffect(() => {
    db.getHearings().then(data => setHearings(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Professional Diary</h2>
          <p className="text-sm text-slate-500 font-medium">पेशेवर डायरी: अपनी सुनवाई और अदालती कार्यक्रमों का प्रबंधन करें।</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md">
          <Plus size={18} />
          <span>New Entry (नई प्रविष्टि)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Cases</p>
            <p className="text-sm font-bold text-slate-900">आज के केस</p>
            <p className="text-xl font-bold text-slate-900">{hearings.filter(h => h.date.includes('Oct 24')).length.toString().padStart(2, '0')}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Logged</p>
            <p className="text-sm font-bold text-slate-900">कुल दर्ज केस</p>
            <p className="text-xl font-bold text-slate-900">{hearings.length.toString().padStart(2, '0')}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-xl">
            <Gavel size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Status</p>
            <p className="text-sm font-bold text-slate-900">सिस्टम स्थिति</p>
            <p className="text-xl font-bold text-slate-900">Active</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            Upcoming Hearings (आने वाली सुनवाई)
          </h3>
          <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
            <Filter size={18} />
          </button>
        </div>
        
        <div className="divide-y divide-slate-100">
          {hearings.map((hearing) => (
            <div key={hearing.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      hearing.priority === 'High' ? 'bg-red-500' : 
                      hearing.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></span>
                    <h4 className="font-bold text-slate-900">{hearing.caseTitle}</h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><FileText size={14} /> {hearing.caseNumber}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {hearing.court}</span>
                    <span className="flex items-center gap-1.5 text-slate-900 font-bold"><Clock size={14} /> {hearing.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    hearing.status === 'Pending' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {hearing.status === 'Pending' ? 'लंबित (Pending)' : 'समाप्त'}
                  </span>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>
            </div>
          ))}

          {hearings.length === 0 && (
            <div className="p-20 text-center">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 font-bold">आपकी डायरी अभी खाली है।</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
