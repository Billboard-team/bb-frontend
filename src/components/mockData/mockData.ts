import { User, Activity, Friend, FriendRequest, BlockedUser, SavedPost } from "@/components/type";

export const mockUser: User = {
  name: "Alex Johnson",
  avatar: "https://via.placeholder.com/80",
  expertiseTags: ["Environment", "Technology"],
};

export const mockActivity: Activity = {
  postViews: 1245,
  commentInteractions: 342,
  votes: 78,
};

export const mockFriends: Friend[] = [
  { id: 1, name: "Jessica Smith" },
  { id: 2, name: "Michael Brown" },
  { id: 3, name: "Emily Davis" },
];

export const mockFriendRequests: FriendRequest[] = [{ id: 4, name: "Sarah Wilson" }];

export const mockBlockedUsers: BlockedUser[] = [{ id: 5, name: "Tommy Lee" }];

export const mockSavedPosts: SavedPost[] = [
  { id: 6, title: "Bill to Improve Renewable Energy Funding" },
  { id: 7, title: "Proposal for Healthcare Reform" },
  { id: 8, title: "Education System Enhancement Act" },
];
