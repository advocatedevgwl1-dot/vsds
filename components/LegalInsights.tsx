import React, { useState, useEffect } from 'react';
import { Newspaper, BookOpen, Bookmark, Share2, Clock, CheckCircle2, Zap, Flame, Globe, ExternalLink, ChevronRight, Gavel, Loader2 } from 'lucide-react';
import { BlogEntry, LegalNews, UserRole } from '../types';
import { db } from '../services/database';

export const LegalInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blogs' | 'news'>('blogs');
  const [blogs, setBlogs] = useState<BlogEntry[]>([]);
  const [news, setNews] = useState<LegalNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [blogData, newsData] = await Promise.all([
          db.getBlogs(),
          db.getNews()
        ]);
        setBlogs(blogData);
        setNews(newsData);
      } catch (error) {
        console.error("Failed to load insights:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Legal Insights & News</h2>
          <p className="text-sm text-slate-500">Stay ahead with professional blogs and real-time current affairs.</p>
        </div>
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'blogs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <BookOpen size={14} />
            Blogs
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'news' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Zap size={14} />
            Current Affairs
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 animate-pulse">
              <Loader2 size={48} className="text-slate-200 animate-spin mb-4" />
              <p className="text-slate-400 font-bold text-sm">Loading legal repository...</p>
            </div>
          ) : activeTab === 'blogs' ? (
            <div className="grid grid-cols-1 gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden group hover:border-slate-300 transition-all flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative aspect-video md:aspect-auto">
                    <img src={blog.coverImage} alt={blog.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                      {blog.category}
                    </div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase">
                        <Clock size={12} />
                        {blog.readTime} • {blog.date}
                      </div>
                      <button className="text-slate-300 hover:text-slate-900 transition-colors">
                        <Bookmark size={18} />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {blog.author[0]}
                        </div>
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                          {blog.author}
                          {blog.isVerified && <CheckCircle2 size={12} className="text-blue-500" />}
                        </span>
                      </div>
                      <button className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                        Read Story <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-bold">No blogs published yet.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((newsItem) => (
                <div key={newsItem.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                        newsItem.importance === 'Breaking' ? 'bg-red-600 text-white animate-pulse' : 
                        newsItem.importance === 'Trending' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {newsItem.importance}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {newsItem.category} • {newsItem.timestamp}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-slate-900 transition-colors"><Share2 size={16} /></button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                    {newsItem.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    {newsItem.summary}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                      <Globe size={14} className="text-slate-400" />
                      Source: {newsItem.source}
                    </div>
                    <button className="text-xs font-bold text-slate-900 flex items-center gap-1 hover:underline">
                      Full Coverage <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {news.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <Zap size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500 font-bold">No legal news currently available.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Flame size={20} className="text-yellow-500" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Legal Suggestion</h4>
              </div>
              <p className="text-lg font-serif italic mb-6 leading-relaxed">
                "Justice must not only be done, but must also be seen to be done."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Maxim of the Day</p>
                  <p className="text-xs font-medium text-yellow-500">Lord Hewart, 1924</p>
                </div>
                <button className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all">
                  <Bookmark size={18} />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-10">
              <Gavel size={120} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
              <Flame size={18} className="text-orange-500" />
              Trending Topics
            </h4>
            <div className="space-y-3">
              {['Bharatiya Nyaya Sanhita', 'DPDP Act 2023', 'Arbitration Reform', 'E-filing Rules', 'Right to Privacy'].map((tag) => (
                <div key={tag} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all">
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">#{tag.replace(/\s/g, '')}</span>
                  <span className="text-[10px] font-bold text-slate-400">1.2k posts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};