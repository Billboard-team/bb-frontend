import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { Activity } from "@/components/type";

interface Props {
  activity: Activity;
}

const ActivityInsights: React.FC<Props> = ({ activity }) => {
  return (
    <Box bg="white" p={5} shadow="md" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" color="black">
        Activity Insights
      </Text>
      <SimpleGrid columns={3} gap={4} mt={3}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="black">
            {activity.postViews}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Post Views
          </Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="black">
            {activity.commentInteractions}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Comment Interactions
          </Text>
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="black">
            {activity.votes}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Votes
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ActivityInsights;
