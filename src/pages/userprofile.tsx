import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "@/components/profile/userinfo";
import ActivityInsights from "@/components/profile/activityinsights";
import FriendsList from "@/components/profile/friends";
import FriendRequestsBlocked from "@/components/profile/friendrequest";
import SavedPosts from "@/components/profile/savedpost";
import { Friend } from "@/components/type";
import {
  mockActivity,
  mockFriends,
  mockFriendRequests,
  mockBlockedUsers,
  mockSavedPosts,
} from "@/components/mockData/mockData";

const UserProfile = () => {
  const {
    logout,
    getAccessTokenSilently,
    user,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(true);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsLoading, setFriendsLoading] = useState(true);

  const navigate = useNavigate();
  const { username } = useParams();
  const isOwnProfile = !username;

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account?"
      )
    )
      return;
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://billboard.local" },
      });

      const res = await fetch("http://localhost:8000/api/me/delete/", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete account.");

      logout({ logoutParams: { returnTo: window.location.origin } });
    } catch (err: any) {
      console.error("Account deletion failed:", err);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: { audience: "https://billboard.local" },
      });

      const method = isFollowing ? "DELETE" : "POST";
      const res = await fetch(
        `http://localhost:8000/api/users/${username}/follow/`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to toggle follow");

      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error("Follow toggle failed:", err);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: "https://billboard.local" },
        });

        const url = isOwnProfile
          ? "http://localhost:8000/api/me/"
          : `http://localhost:8000/api/users/${username}/`;

        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        data.expertiseTags = data.expertiseTags || [];
        setUserProfile(data);

        if (!isOwnProfile) {
          const followCheck = await fetch(
            `http://localhost:8000/api/users/${username}/is-following/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (followCheck.ok) {
            const followData = await followCheck.json();
            setIsFollowing(followData.is_following);
          }
        } else {
          const friendsRes = await fetch(
            "http://localhost:8000/api/me/following/",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (friendsRes.ok) {
            const friendsData = await friendsRes.json();
            setFriends(friendsData.following || []);
          }
          setFriendsLoading(false);
        }

        setFollowLoading(false);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setProfileError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    if (isAuthenticated) fetchUserProfile();
  }, [isAuthenticated, username, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated && userProfile && isOwnProfile && !userProfile.name) {
      navigate("/complete-profile");
    }
  }, [isAuthenticated, userProfile, isOwnProfile, navigate]);

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error || profileError) {
    return (
      <Box p={10}>
        <Text color="red.500">Error: {error?.message || profileError}</Text>
      </Box>
    );
  }

  console.log({ isLoading, profileLoading });

  if (isLoading || (profileLoading && isAuthenticated)) {
    return (
      <Box p={10}>
        <Text>Loading profile…</Text>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return (
      <Box p={10} textAlign="center">
        <Text mb={4}>Please sign in to view your profile.</Text>
        <Button onClick={() => navigate("/signin")} colorScheme="teal">
          Go to Sign In Page
        </Button>
      </Box>
    );
  }

  if (isAuthenticated && user && !user.email_verified) {
    return (
      <Box p={10}>
        <Text color="orange.500">
          Please verify your email address to continue. Check your inbox!
        </Text>
        <Button
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </Button>
      </Box>
    );
  }

  return (
    <Flex direction="column" h="100vh" w="85vw" p={10} overflow="hidden">
      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="center">
          <UserInfo user={userProfile} />
        </Flex>
        <Flex flex="1" justify="right">
          <ActivityInsights activity={mockActivity} />
        </Flex>
      </Flex>

      {isOwnProfile ? (
        <>
          <Button
            mt={2}
            colorScheme="gray"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </Button>
          <Button
            mt={4}
            colorScheme="red"
            variant="outline"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </>
      ) : (
        !followLoading && ( // ✅ Only show follow/unfollow button after loading
          <Button
            mt={4}
            colorScheme={isFollowing ? "gray" : "blue"}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )
      )}

      <Box my={6} />

      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="left">
          <FriendsList friends={filteredFriends} searchQuery={""} />
        </Flex>
        <Flex flex="1" justify="right">
          <FriendRequestsBlocked
            friendRequests={mockFriendRequests}
            blockedUsers={mockBlockedUsers}
          />
        </Flex>
      </Flex>

      <Box my={6} />

      <SavedPosts savedPosts={mockSavedPosts} />
    </Flex>
  );
};

export default UserProfile;
