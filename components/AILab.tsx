
import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, FileText, Search, Loader2, Link as LinkIcon, Lock, Key, Info, Globe, ChevronRight, Camera, Image as ImageIcon, X } from 'lucide-react';
import { getLegalAdvice } from '../services/geminiService';

export const AILab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'summary' | 'draft' | 'research'>('research');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{text: string; sources: any[] } | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(true);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSetupKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const handleSearch = async () => {
    if (!query.trim() && !image) return;
    setLoading(true);
    try {
      const data = await getLegalAdvice(query || "दस्तावेज़ का विश्लेषण करें।", type, image || undefined);
      setResult(data);
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        alert("सत्र समाप्त हो गया है। कृपया अपना API Key दोबारा चुनें।");
      } else {
        alert("विश्लेषण में त्रुटि हुई। कृपया पुन: प्रयास करें।");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-[2.5rem] p-12 text-center border border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500"></div>
          <div className="w-24 h-24 bg-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-purple-600 shadow-inner">
            <Lock size={48} />
          </div>
          <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">सुरक्षित एआई लैब एक्सेस</h2>
          <p className="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed">
            उन्नत कानूनी रिसर्च मॉडल का उपयोग करने के लिए आपको अपनी स्वयं की API Key जोड़नी होगी।
          </p>
          <button 
            onClick={handleSetupKey}
            className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-3 mx-auto shadow-lg shadow-slate-200"
          >
            <Key size={20} />
            API Key चुनें (Select API Key)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
            <Sparkles size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-serif text-slate-900">विधिज्ञ एआई लैब (AI Lab)</h2>
            <p className="text-sm text-slate-500 font-medium">कानूनी विश्लेषण और दस्तावेज़ स्कैनिंग।</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { id: 'research', label: 'Research', hindi: 'रिसर्च', icon: Search },
            { id: 'summary', label: 'Summary', hindi: 'सारांश', icon: FileText },
            { id: 'draft', label: 'Drafting', hindi: 'ड्राफ्टिंग', icon: Sparkles },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setType(mode.id as any)}
              className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 transition-all ${
                type === mode.id 
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md' 
                  : 'border-slate-50 bg-slate-50 hover:border-slate-200 text-slate-600 font-medium'
              }`}
            >
              <mode.icon size={18} />
              <span className="text-xs font-bold">{mode.label}</span>
              <span className="text-[10px] opacity-70">{mode.hindi}</span>
            </button>
          ))}
        </div>

        <div className="relative mb-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={image ? "इस दस्तावेज़ के बारे में क्या जानना चाहते हैं?" : "कानूनी सवाल पूछें या नीचे से दस्तावेज़ अपलोड करें..."}
            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all resize-none"
          />
          
          <div className="absolute bottom-4 left-4 flex gap-2">
            <input 
              type="file" 
              accept="image/*" 
              hidden 
              ref={fileInputRef} 
              onChange={handleImageUpload}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 text-[10px] font-black uppercase"
            >
              <ImageIcon size={16} />
              {image ? 'फोटो बदलें' : 'दस्तावेज़ फोटो'}
            </button>
          </div>

          <button
            onClick={handleSearch}
            disabled={loading || (!query && !image)}
            className="absolute bottom-4 right-4 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            <span className="font-bold text-sm">विश्लेषण करें (Analyze)</span>
          </button>
        </div>

        {image && (
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm animate-in zoom-in-95">
            <img src={image} className="w-full h-full object-cover" alt="Scan preview" />
            <button 
              onClick={() => setImage(null)}
              className="absolute top-1 right-1 bg-slate-900/80 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              एआई का उत्तर (AI Analysis)
            </h3>
            <button 
              onClick={() => navigator.clipboard.writeText(result.text)}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 border border-slate-200 rounded-lg bg-white transition-colors"
            >
              कॉपी करें (Copy)
            </button>
          </div>
          <div className="p-8">
            <div className="prose prose-slate max-w-none prose-sm lg:prose-base whitespace-pre-wrap leading-relaxed text-slate-700">
              {result.text}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
