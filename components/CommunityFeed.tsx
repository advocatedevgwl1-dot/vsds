
import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, ShieldCheck, Bookmark, Loader2 } from 'lucide-react';
import { UserRole, Post } from '../types';
import { db } from '../services/database';

export const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newContent, setNewContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    const data = await db.getPosts();
    setPosts(data);
    setIsLoading(false);
  };

  const handlePost = async () => {
    if (!newContent.trim()) return;
    setIsPosting(true);
    
    await db.addPost({
      author: 'Adv. Yash Kumar',
      role: UserRole.ADVOCATE,
      content: newContent,
      tags: ['Insights', 'Discussion']
    });
    
    setNewContent('');
    await loadPosts();
    setIsPosting(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex-shrink-0 flex items-center justify-center border-2 border-yellow-500">
            <span className="text-white font-bold">YK</span>
          </div>
          <div className="flex-1">
            <textarea 
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share a legal insight or ask a question..." 
              className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-slate-900 min-h-[100px] transition-all"
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-100">Add Photo</button>
                <button className="text-xs font-bold text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-100">Tag Topic</button>
              </div>
              <button 
                onClick={handlePost}
                disabled={isPosting || !newContent.trim()}
                className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isPosting && <Loader2 size={16} className="animate-spin" />}
                {isPosting ? 'Publishing...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 animate-pulse">
            <Loader2 size={48} className="text-slate-200 animate-spin mb-4" />
            <p className="text-slate-400 font-bold text-sm">Syncing feed with cloud...</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:border-slate-300 transition-all">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-xs">
                      {post.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                        {post.role === UserRole.ADVOCATE && <ShieldCheck size={14} className="text-blue-500" />}
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{post.role} • {post.timestamp}</p>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={20} />
                  </button>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors">
                      <ThumbsUp size={18} />
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors">
                      <MessageSquare size={18} />
                      <span className="text-xs font-bold">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors">
                      <Share2 size={18} />
                    </button>
                  </div>
                  <button className="text-slate-500 hover:text-slate-900 transition-colors">
                    <Bookmark size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="font-bold text-slate-900">No posts yet</h3>
            <p className="text-sm text-slate-500">Be the first to share a legal insight with the community.</p>
          </div>
        )}
      </div>
    </div>
  );
};
