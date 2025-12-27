import { Post, JobOpening, CourtHearing, AssignmentTask, BlogEntry, LegalNews, LiveSession, UserRole, Member } from '../types';

const API_BASE = '/api';

const MOCK_DATA = {
  posts: [
    {
      id: 'mock-1',
      author: 'Vidhigya System',
      role: UserRole.ADVOCATE,
      content: "System: Running in local-first mode. Connect a Render Web Service to enable cloud synchronization.",
      timestamp: 'System',
      likes: 0,
      comments: 0,
      tags: ['System', 'Offline']
    }
  ],
  members: [
    { id: 'm1', name: 'Adv. Yash Kumar', role: UserRole.ADVOCATE, institution: 'Supreme Court', specialization: ['Litigation'], avatar: 'YK' },
    { id: 'm2', name: 'Prof. Ved Prakash', role: UserRole.PROFESSOR, institution: 'Faculty of Law', specialization: ['Constitutional'], avatar: 'VP' }
  ],
  jobs: [
    {
      id: 'mj1',
      title: 'Legal Associate',
      organization: 'Local Chambers',
      location: 'New Delhi',
      type: 'Full-time',
      category: 'Litigation',
      deadline: 'Dec 2024',
      description: 'Simulated job data for local testing.',
      postedAt: 'Just now'
    }
  ],
  hearings: [],
  news: [
    {
      id: 'mn1',
      title: 'Digital Courts Phase III launched',
      summary: 'New e-filing portal and virtual hearing rooms now live nationwide.',
      source: 'System News',
      timestamp: 'Today',
      category: 'Judiciary',
      importance: 'Regular'
    }
  ],
  blogs: [
    {
      id: 'mb1',
      title: 'Ethics of AI in Legal Practice',
      excerpt: 'Exploring the boundary between assistance and unauthorized practice of law.',
      author: 'System Editor',
      authorRole: UserRole.PROFESSOR,
      date: 'Oct 2024',
      readTime: '5 min read',
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
      category: 'Technology',
      isVerified: true
    }
  ]
};

class DatabaseService {
  private useMock = false;

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (this.useMock && endpoint !== '/health') {
      return this.getMockData<T>(endpoint);
    }

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          this.useMock = true;
          return this.getMockData<T>(endpoint);
        }
        throw new Error(`API Error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      this.useMock = true;
      return this.getMockData<T>(endpoint);
    }
  }

  private getMockData<T>(endpoint: string): T {
    const key = endpoint.replace('/', '') as keyof typeof MOCK_DATA;
    return (MOCK_DATA[key] || []) as T;
  }

  async checkHealth(): Promise<{ status: string }> {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (res.ok) {
        this.useMock = false;
        return await res.json();
      }
    } catch (e) {}
    return { status: 'simulated' };
  }

  async getPosts(): Promise<Post[]> {
    return this.request<Post[]>('/posts');
  }

  async getMembers(): Promise<Member[]> {
    return this.request<Member[]>('/members');
  }

  async addPost(post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments'>): Promise<Post> {
    if (this.useMock) {
      const newPost = { 
        ...post, 
        id: crypto.randomUUID(), 
        timestamp: 'Just now', 
        likes: 0, 
        comments: 0 
      } as Post;
      MOCK_DATA.posts = [newPost, ...MOCK_DATA.posts];
      return newPost;
    }
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }

  async getJobs(): Promise<JobOpening[]> {
    return this.request<JobOpening[]>('/jobs');
  }

  async getHearings(): Promise<CourtHearing[]> {
    return this.request<CourtHearing[]>('/hearings');
  }

  async getNews(): Promise<LegalNews[]> {
    return this.request<LegalNews[]>('/news');
  }

  async getBlogs(): Promise<BlogEntry[]> {
    return this.request<BlogEntry[]>('/blogs');
  }

  async getAssignments(): Promise<AssignmentTask[]> { return []; }
  async getSessions(): Promise<LiveSession[]> { return []; }

  seed() {
    this.checkHealth();
  }
}

export const db = new DatabaseService();