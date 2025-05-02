import { Box, SimpleGrid, Text} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface ActivityStats {
  bill_views: number;
  comments: number;
}

interface ActivityInsightsProps {
  username?: string;
}

const ActivityInsights: React.FC<ActivityInsightsProps> = ({ username }) => {
  const [stats, setStats] = useState<ActivityStats | null>(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchActivityStats = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://billboard.local",
          },
        });

        const url = username 
          ? `http://localhost:8000/api/users/${username}/activity-stats/`
          : "http://localhost:8000/api/me/activity-stats/";

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching activity stats:", err);
      }
    };

    fetchActivityStats();
  }, [getAccessTokenSilently, username]);

  return (
    <Box p={5} shadow="md" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
        Activity Insights
      </Text>
      <SimpleGrid columns={2} gap={4} mt={3}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="bg.inverted">
            {stats?.bill_views || 0}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Bills Viewed
          </Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="bg.inverted">
            {stats?.comments || 0}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Comments Posted
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ActivityInsights;
