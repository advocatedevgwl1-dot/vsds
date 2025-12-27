
export enum UserRole {
  STUDENT = 'Student',
  ADVOCATE = 'Advocate',
  PROFESSOR = 'Professor',
  JUDICIAL_OFFICER = 'Judicial Officer'
}

export interface Post {
  id: string;
  author: string;
  role: UserRole;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

export interface BlogEntry {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorRole: UserRole;
  date: string;
  readTime: string;
  coverImage: string;
  category: string;
  isVerified: boolean;
}

export interface LegalNews {
  id: string;
  title: string;
  summary: string;
  source: string;
  timestamp: string;
  category: 'Judiciary' | 'Legislation' | 'International' | 'Corporate';
  importance: 'Breaking' | 'Trending' | 'Regular';
}

export interface CourtHearing {
  id: string;
  caseTitle: string;
  caseNumber: string;
  court: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'Adjourned' | 'Disposed';
}

export interface LiveSession {
  id: string;
  title: string;
  host: string;
  institution?: string;
  startTime: string;
  status: 'Live' | 'Upcoming' | 'Ended';
  type: 'Lecture' | 'Court Proceeding' | 'Webinar';
  attendeesCount: number;
  tags: string[];
}

export interface AssignmentTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  deadline: string;
  status: 'Pending' | 'In Progress' | 'Submitted';
  assignedBy: string;
}

export interface JobOpening {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: 'Full-time' | 'Internship' | 'Clerkship' | 'Contract';
  category: 'Litigation' | 'Corporate' | 'Academic' | 'Judiciary';
  experience?: string;
  salary?: string;
  deadline: string;
  description: string;
  postedAt: string;
}

export interface Member {
  id: string;
  name: string;
  role: UserRole;
  institution?: string;
  specialization?: string[];
  avatar: string;
  githubHandle?: string;
  isGithubConnected?: boolean;
}
