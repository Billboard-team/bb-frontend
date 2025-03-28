import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "@/components/profile/userinfo";
import ActivityInsights from "@/components/profile/activityinsights";
import FriendsList from "@/components/profile/friends";
import FriendRequestsBlocked from "@/components/profile/friendrequest";
import SavedPosts from "@/components/profile/savedpost";
import { GetTokenSilentlyOptions } from "@auth0/auth0-react";

import {
  mockActivity,
  mockFriends,
  mockFriendRequests,
  mockBlockedUsers,
  mockSavedPosts,
} from "@/components/mockData/mockData";

const UserProfile = () => {
  const { getAccessTokenSilently, isAuthenticated, isLoading, error } =
    useAuth0();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account?"
      )
    )
      return;

    try {
      const options: GetTokenSilentlyOptions = {
        authorizationParams: {
          audience: "https://billboard.local",
        },
      };

      const token = await getAccessTokenSilently(options);

      const res = await fetch("http://localhost:8000/api/me/delete/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete account.");
      }
    } catch (err: any) {
      console.error("Account deletion failed:", err);
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const options: GetTokenSilentlyOptions = {
          authorizationParams: {
            audience: "https://billboard.local",
          },
        };

        const token = await getAccessTokenSilently(options);
        const res = await fetch("http://localhost:8000/api/me/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await res.json();

        data.expertiseTags = data.expertiseTags || [];
        setUserProfile(data);
      } catch (err: any) {
        console.error("Error fetching user profile:", err);
        setProfileError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    if (isAuthenticated && userProfile && !userProfile.name) {
      navigate("/complete-profile");
    }
  }, [isAuthenticated, userProfile, navigate]);

  if (isLoading || profileLoading) {
    return (
      <Box p={10}>
        <Text>Loading profile...</Text>
      </Box>
    );
  }

  if (error || profileError) {
    return (
      <Box p={10}>
        <Text color="red.500">Error: {error?.message || profileError}</Text>
      </Box>
    );
  }

  if (!isAuthenticated || !userProfile) {
    return (
      <Box p={10}>
        <Text>Please sign in to view your profile.</Text>
      </Box>
    );
  }

  return (
    <Flex direction="column" h="100vh" w="85vw" p={10} overflow="hidden">
      {/* First Row: User Info + Activity */}
      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="center">
          <UserInfo user={userProfile} />
        </Flex>
        <Flex flex="1" justify="right">
          <ActivityInsights activity={mockActivity} />
        </Flex>
      </Flex>
      <Button
        mt={4}
        colorScheme="red"
        variant="outline"
        onClick={handleDeleteAccount}
      >
        Delete Account
      </Button>

      <Box my={6} />

      {/* Second Row: Friends List + Requests/Blocked */}
      <Flex justify="space-between" w="100%">
        <Flex flex="1" justify="left">
          <FriendsList friends={mockFriends} />
        </Flex>
        <Flex flex="1" justify="right">
          <FriendRequestsBlocked
            friendRequests={mockFriendRequests}
            blockedUsers={mockBlockedUsers}
          />
        </Flex>
      </Flex>

      <Box my={6} />

      {/* Third Row: Saved Posts */}
      <SavedPosts savedPosts={mockSavedPosts} />
    </Flex>
  );
};

export default UserProfile;
