import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import { SavedPost } from "@/components/type";

interface Props {
  savedPosts: SavedPost[];
}

const SavedPosts: React.FC<Props> = ({ savedPosts }) => {
  return (
    <Box bg="white" p={5} shadow="md" borderRadius="md" color="black">
      <Text fontSize="xl" fontWeight="bold">
        Saved Posts
      </Text>
      <VStack mt={3} align="start">
        {savedPosts.map((post) => (
          <Flex key={post.id} justify="space-between" w="100%">
            <Text>{post.title}</Text>
            <Button size="sm" colorScheme="blue" color="white">
              View
            </Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default SavedPosts;
