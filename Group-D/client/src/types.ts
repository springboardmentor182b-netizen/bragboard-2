export const UserRole = {
  EMPLOYEE: 'EMPLOYEE',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; 
  secretCode?: string; 
  role: UserRoleType;
  department: string;
  points: number;
  avatar: string;
  badges: Badge[];
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_APPROVAL';
}

export interface ShoutOut {
  id: string;
  fromId: string;
  fromName: string;
  toIds: string[];
  toNames: string[];
  message: string;
  category: string;
  timestamp: Date;
  reactions: {
    like: number;
    clap: number;
    star: number;
  };
  comments: Comment[];
  sentimentScore: number;
  mood: string;
  isReported?: boolean;
  reportReason?: string;
  isEdited?: boolean;
}

export interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: Date;
  isReported?: boolean;
  reportReason?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  reactions: { emoji: string; count: number; users: string[] }[];
  comments: Comment[];
  status: 'Published' | 'Draft';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal: number;
  currentProgress: number;
  reward: string;
  deadline: string;
  isActive: boolean;
  assignedUserIds?: string[];
  image?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  itemName: string;
  cost: number;
  timestamp: Date;
}