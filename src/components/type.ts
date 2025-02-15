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
  