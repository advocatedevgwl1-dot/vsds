
import React, { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock, Filter, Sparkles, Building2, Bookmark, ExternalLink } from 'lucide-react';
import { JobOpening } from '../types';
import { db } from '../services/database';

export const JobBoard: React.FC = () => {
  const [activeType, setActiveType] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState<JobOpening[]>([]);

  useEffect(() => {
    db.getJobs().then(data => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter(job => 
    (activeType === 'All' || job.type === activeType) &&
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const typeLabels: Record<string, string> = {
    'All': 'सभी',
    'Full-time': 'पूर्णकालिक',
    'Internship': 'इंटर्नशिप',
    'Clerkship': 'क्लर्कशिप'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Career Hub</h2>
          <p className="text-sm text-slate-500 font-medium">करियर हब: कानूनी पेशेवरों और छात्रों के लिए नए अवसर।</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md">
          <span>Post an Opening (नौकरी पोस्ट करें)</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="खोजें: पद, फर्म या कीवर्ड..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Full-time', 'Internship', 'Clerkship'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex flex-col items-center ${
                activeType === type 
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100'
              }`}
            >
              <span>{type}</span>
              <span className="text-[8px] opacity-70">{typeLabels[type]}</span>
            </button>
          ))}
          <button className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-500 hover:bg-slate-100 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all group p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-inner">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">{job.title}</h3>
                  <p className="text-xs font-medium text-slate-500">{job.organization}</p>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                <Bookmark size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl">
                <MapPin size={14} className="text-slate-400" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl">
                <Clock size={14} className="text-slate-400" />
                <span>{typeLabels[job.type] || job.type}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 mb-6 leading-relaxed">
              {job.description}
            </p>

            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Deadline: {job.deadline}
              </span>
              <div className="flex gap-2">
                <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm">
                  <span>विवरण देखें (View)</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="font-bold text-slate-900">कोई अवसर नहीं मिला</h3>
          <p className="text-sm text-slate-500">कृपया अपनी फ़िल्टर सेटिंग्स बदलें।</p>
        </div>
      )}
    </div>
  );
};
