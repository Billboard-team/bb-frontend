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

// Bill Cosponsor / Congress member
export interface Cosponsor {
  bioguide_id: string;
  full_name: string;
  party: string;
  state: string;
  district?: number | null;
  is_original_cosponsor: boolean;
  sponsorship_date: string;
  url: string;
}

// Bill Cards
export interface BillCardProp {
  bill_id: number;
  title: string;
  action: string;
  action_date: string;
  description: string;
  congress: Congress;
  sponsor?: string,
  bill_type: BillType;
  bill_number: string;
  summary?: string | null;
  text?: string | null;
  url: string;
  cosponsors?: Cosponsor[];
}



//Sidebar filters
export type BillType = 'HR' | 'S' | 'SRES' | 'SJRES';
export type Congress = 119 | 118 | 117;

