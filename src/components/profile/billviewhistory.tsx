import { Box, Text, VStack, Button, Flex, Spinner } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface BillView {
  bill_id: number;
  bill_type: string;
  congress: number;
  bill_number: string;
  title: string;
  viewed_at: string;
}

const BillViewHistory: React.FC = () => {
  const [viewHistory, setViewHistory] = useState<BillView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViewHistory = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://billboard.local",
          },
        });

        const response = await fetch("http://localhost:8000/api/bills/view-history/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch view history");
        }

        const data = await response.json();
        setViewHistory(data.view_history);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchViewHistory();
  }, [getAccessTokenSilently]);

  if (loading) {
    return (
      <Box p={5} shadow="md" borderRadius="md">
        <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
          Recently Viewed Bills
        </Text>
        <Flex justify="center" align="center" h="100px">
          <Spinner />
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5} shadow="md" borderRadius="md">
        <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
          Recently Viewed Bills
        </Text>
        <Text color="red.500" mt={3}>{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={5} shadow="md" borderRadius="md" mb={8}>
      <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
        Recently Viewed Bills
      </Text>
      <VStack mt={3} align="start">
        {viewHistory.length === 0 ? (
          <Text color="gray.500">No bills viewed yet</Text>
        ) : (
          viewHistory.map((view) => (
            <Flex key={`${view.bill_id}-${view.viewed_at}`} justify="space-between" w="100%" align="center">
              <Box flex={1}>
                <Text color="bg.inverted" fontWeight="medium">
                  {view.bill_type}-{view.bill_number} | Congress: {view.congress}
                </Text>
                <Text color="bg.inverted" fontSize="sm" truncate>
                  {view.title}
                </Text>
                <Text color="gray.500" fontSize="xs">
                  Viewed on {new Date(view.viewed_at).toLocaleDateString()}
                </Text>
              </Box>
              <Button
                variant="surface"
                size="sm"
                ml={3}
                onClick={() => navigate(`/post/${view.bill_id}`)}
              >
                View
              </Button>
            </Flex>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default BillViewHistory; 