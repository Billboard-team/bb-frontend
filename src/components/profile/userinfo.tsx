import { Box, Avatar, Text, HStack, Tag, Button } from "@chakra-ui/react";
import { User } from "@/components/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface Props {
  user: User;
  isOwnProfile?: boolean;
}

const UserInfo: React.FC<Props> = ({ user, isOwnProfile = false }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBlockStatus = async () => {
      if (!isOwnProfile) {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: "https://billboard.local",
            },
          });

          const response = await fetch(
            `http://localhost:8000/api/users/${user.name}/is-blocked/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setIsBlocked(data.is_blocked);
          }
        } catch (err) {
          console.error("Error checking block status:", err);
        }
      }
    };

    checkBlockStatus();
  }, [isOwnProfile, user.name, getAccessTokenSilently]);

  const handleBlockToggle = async () => {
    setIsLoading(true);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "https://billboard.local",
        },
      });

      const method = isBlocked ? "DELETE" : "POST";
      const url = `http://localhost:8000/api/users/${user.name}/${isBlocked ? "unblock" : "block"}/`;

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsBlocked(!isBlocked);
      }
    } catch (err) {
      console.error("Error toggling block status:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box textAlign="center">
      <Avatar.Root>
        <Avatar.Fallback name={user.name} />
      </Avatar.Root>
      <Text fontSize="2xl" fontWeight="bold" mt={2} color="bg.inverted">
        {user.name}
      </Text>
      <HStack mt={2}>
        {user.expertiseTags.map((tag, idx) => (
          <Tag.Root key={idx}>
            <Tag.Label>{tag}</Tag.Label>
          </Tag.Root>
        ))}
      </HStack>
      {isOwnProfile ? (
        <Button variant="ghost" mt={4}>
          Edit Profile
        </Button>
      ) : (
        <Button
          variant="ghost"
          mt={4}
          colorScheme={isBlocked ? "red" : "gray"}
          onClick={handleBlockToggle}
          isLoading={isLoading}
        >
          {isBlocked ? "Unblock" : "Block"}
        </Button>
      )}
    </Box>
  );
};

export default UserInfo;
