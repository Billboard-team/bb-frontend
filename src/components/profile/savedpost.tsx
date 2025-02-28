import { Box, Text, VStack, Button, Flex } from "@chakra-ui/react";
import { SavedPost } from "@/components/type";

interface Props {
  savedPosts: SavedPost[];
}

const SavedPosts: React.FC<Props> = ({ savedPosts }) => {
  return (
    <Box p={5} shadow="md" borderRadius="md">
      <Text fontSize="xl" fontWeight="bold" color="bg.inverted">
        Saved Posts
      </Text>
      <VStack mt={3} align="start">
        {savedPosts.map((post) => (
          <Flex key={post.id} justify="space-between" w="100%">
            <Text color="bg.inverted">{post.title}</Text>
            <Button variant="surface" size="sm">
              View
            </Button>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default SavedPosts;
