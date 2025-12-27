
import React, { useState } from 'react';
import { ClipboardList, Plus, Book, Clock, CheckCircle2, AlertCircle, FileText, Download, Shield, BookOpen } from 'lucide-react';
import { AssignmentTask, UserRole } from '../types';

const MOCK_ASSIGNMENTS: AssignmentTask[] = [
  {
    id: '1',
    title: 'Constitutional Law - Article 21 Analysis',
    description: 'Detailed research paper on the expanding horizons of the Right to Life and Personal Liberty.',
    subject: 'Constitutional Law II',
    deadline: 'Oct 30, 2024',
    status: 'Pending',
    assignedBy: 'Prof. Amrita Singh'
  },
  {
    id: '2',
    title: 'Moots Court Memo - Property Dispute',
    description: 'Drafting the Written Statement for the Respondent in the upcoming mock trial.',
    subject: 'CPC & Property Law',
    deadline: 'Oct 28, 2024',
    status: 'In Progress',
    assignedBy: 'Dr. Vikram Malhotra'
  }
];

const MOCK_RESOURCES = [
  { id: 'r1', title: 'Bharatiya Nyaya Sanhita (Bare Act)', type: 'PDF', size: '2.4 MB', category: 'Legislation' },
  { id: 'r2', title: 'Landmark Judgments 2023 Summary', type: 'DOCX', size: '1.1 MB', category: 'Case Law' },
  { id: 'r3', title: 'Principles of Jurisprudence - Notes', type: 'PDF', size: '4.8 MB', category: 'Academic' },
];

export const AcademicWorkspace: React.FC<{ role: UserRole }> = ({ role }) => {
  const [activeView, setActiveView] = useState<'assignments' | 'library'>('assignments');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Academic Workspace</h2>
          <p className="text-sm text-slate-500 font-medium">
            {role === UserRole.PROFESSOR 
              ? 'पाठ्यक्रम प्रगति और छात्र असाइनमेंट का प्रबंधन करें।' 
              : 'अपने असाइनमेंट, समय सीमा और शोध कार्यों को ट्रैक करें।'}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
            <Shield size={16} className="text-blue-500" />
            <span>Verified Content (सत्यापित)</span>
          </button>
          {role === UserRole.PROFESSOR && (
            <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md">
              <Plus size={18} />
              <span>Create New (नया बनाएं)</span>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          <button 
            onClick={() => setActiveView('assignments')}
            className={`px-8 py-4 text-sm font-bold transition-all flex flex-col items-center ${
              activeView === 'assignments' ? 'text-slate-900 border-b-2 border-slate-900 bg-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>Assignments</span>
            <span className="text-[10px] font-medium opacity-70">असाइनमेंट</span>
          </button>
          <button 
            onClick={() => setActiveView('library')}
            className={`px-8 py-4 text-sm font-bold transition-all flex flex-col items-center ${
              activeView === 'library' ? 'text-slate-900 border-b-2 border-slate-900 bg-white' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>Law Library</span>
            <span className="text-[10px] font-medium opacity-70">लॉ लाइब्रेरी</span>
          </button>
        </div>

        <div className="p-6 bg-slate-50">
          {activeView === 'assignments' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ASSIGNMENTS.map((task) => (
                <div key={task.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                      <BookOpen size={20} />
                    </div>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      task.status === 'Pending' ? 'bg-red-50 text-red-600' :
                      task.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {task.status === 'Pending' ? 'लंबित (Pending)' : 'प्रगति पर'}
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-slate-900 mb-2">{task.title}</h4>
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Deadline</p>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <Clock size={14} className="text-red-400" />
                        {task.deadline}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Professor</p>
                      <p className="text-xs font-bold text-slate-700">{task.assignedBy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_RESOURCES.map((res) => (
                <div key={res.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase">{res.type}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 mb-1 leading-tight">{res.title}</h5>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{res.category} • {res.size}</p>
                  </div>
                  <button className="mt-4 flex items-center justify-center gap-2 w-full py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">
                    <Download size={14} />
                    <span>डाउनलोड (Download)</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
