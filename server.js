
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- Professional Legal Data Store ---
let data = {
  posts: [
    {
      id: '1',
      author: 'Adv. Rajesh Kumar',
      role: 'Advocate',
      content: "Vidhigya Sanghthan is officially running on the Cloud! Our community is now more connected than ever. Welcome to the future of legal collaboration.",
      timestamp: 'Just now',
      likes: 156,
      comments: 28,
      tags: ['LegalTech', 'CloudLaunch', 'Innovation']
    }
  ],
  members: [
    { id: '1', name: 'Adv. Rajesh Kumar', role: 'Advocate', institution: 'Supreme Court of India', specialization: ['Criminal Law', 'Constitutional Law'], avatar: 'RK' },
    { id: '2', name: 'Prof. Amrita Singh', role: 'Professor', institution: 'National Law University', specialization: ['Jurisprudence', 'Family Law'], avatar: 'AS' },
    { id: '3', name: 'Yash Vardhan', role: 'Student', institution: 'Delhi University', specialization: ['Corporate Law'], avatar: 'YV' },
    { id: '4', name: 'Adv. Sameer Verma', role: 'Advocate', institution: 'Bombay High Court', specialization: ['Intellectual Property'], avatar: 'SV' }
  ],
  jobs: [
    {
      id: '1',
      title: 'Senior Associate (M&A)',
      organization: 'AZB & Partners',
      location: 'Mumbai',
      type: 'Full-time',
      category: 'Corporate',
      deadline: 'Nov 20, 2024',
      description: 'Senior role in the Mergers & Acquisitions team for top-tier transactions.',
      postedAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Legal Research Intern',
      organization: 'Shardul Amarchand Mangaldas',
      location: 'Remote',
      type: 'Internship',
      category: 'Corporate',
      deadline: 'Oct 31, 2024',
      description: 'Support our research desk on emerging tech law regulations.',
      postedAt: 'Yesterday'
    }
  ],
  hearings: [
    {
      id: 'h1',
      caseTitle: 'State of Maharashtra vs. Digital Platforms',
      caseNumber: 'WP 1122/2024',
      court: 'Bombay High Court',
      date: 'Oct 28, 2024',
      priority: 'High',
      status: 'Pending'
    }
  ],
  news: [
    {
      id: 'n1',
      title: 'Supreme Court broadens definition of Livelihood under Art. 21',
      summary: 'A 3-judge bench has held that access to digital justice is now part of the right to livelihood.',
      source: 'Bar & Bench',
      timestamp: 'Just Now',
      category: 'Judiciary',
      importance: 'Breaking'
    }
  ],
  blogs: [
    {
      id: 'b1',
      title: 'Demystifying the Bharatiya Nyaya Sanhita (BNS)',
      excerpt: 'A comprehensive guide for trial lawyers on the procedural shifts in the new criminal code.',
      author: 'Prof. Ved Prakash',
      authorRole: 'Professor',
      date: 'Oct 22, 2024',
      readTime: '12 min read',
      coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80',
      category: 'Criminal Law',
      isVerified: true
    }
  ]
};

// --- API Endpoints ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'connected', environment: process.env.NODE_ENV || 'production', timestamp: new Date() });
});

app.get('/api/posts', (req, res) => res.json(data.posts));
app.get('/api/members', (req, res) => res.json(data.members));
app.get('/api/jobs', (req, res) => res.json(data.jobs));
app.get('/api/hearings', (req, res) => res.json(data.hearings));
app.get('/api/news', (req, res) => res.json(data.news));
app.get('/api/blogs', (req, res) => res.json(data.blogs));

app.post('/api/posts', (req, res) => {
  const newPost = { 
    ...req.body, 
    id: Date.now().toString(), 
    timestamp: 'Just now', 
    likes: 0, 
    comments: 0 
  };
  data.posts = [newPost, ...data.posts];
  res.status(201).json(newPost);
});

// --- Static File Serving ---
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Vidhigya Backend] Online on port ${PORT}`);
});
