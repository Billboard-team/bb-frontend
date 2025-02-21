export interface User {
  name: string;
  avatar: string;
  expertiseTags: string[];
}

export interface Activity {
  postViews: number;
  commentInteractions: number;
  votes: number;
}

export interface Friend {
  id: number;
  name: string;
}

export interface FriendRequest {
  id: number;
  name: string;
}

export interface BlockedUser {
  id: number;
  name: string;
}

export interface SavedPost {
  id: number;
  title: string;
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string; // e.g., "2025-02-18 14:30"
}
