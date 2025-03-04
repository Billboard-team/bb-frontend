import { Box, Text, VStack, Button, HStack, Badge } from "@chakra-ui/react";
import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string; // Explicitly typed as string, which can be parsed by new Date()
  unread: boolean;
}

interface MessageSidebarProps {
  onSelectConversation: (conversation: Conversation) => void; // Function that takes a Conversation and returns void
}

const MessageSidebar: React.FC<MessageSidebarProps> = ({
  onSelectConversation,
}) => {
  // Initialize conversations as a state with the Conversation interface
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: "Alex Johnson",
      lastMessage: "Hey! How are you doing today?",
      timestamp: "2025-02-18 14:30",
      unread: true,
    },
    {
      id: 2,
      name: "Sophia Patel",
      lastMessage: "I'm doing great! How about you?",
      timestamp: "2025-02-18 14:25",
      unread: false,
    },
    {
      id: 3,
      name: "Michael Chen",
      lastMessage: "Let’s catch up soon.",
      timestamp: "2025-02-18 14:20",
      unread: false,
    },
  ]);

  // Type the selectedId state as number or null
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleConversationSelect = (conversation: Conversation) => {
    // Create a new conversations array with the updated unread status
    const updatedConversations = conversations.map((conv) =>
      conv.id === conversation.id
        ? { ...conv, unread: false } // Set unread to false for the clicked conversation
        : conv
    );

    // Update the conversations state
    setConversations(updatedConversations);

    // Update the selected ID
    setSelectedId(conversation.id);

    // Pass the updated conversation to the parent
    onSelectConversation({ ...conversation, unread: false });
  };

  return (
    <Box w="300px" borderRight="1px solid" borderColor="gray.200" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Messages
      </Text>
      <VStack gap={2} align="stretch">
        {conversations
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ) // Sort by most recent using getTime()
          .map((conv) => (
            <Button
              key={conv.id}
              onClick={() => handleConversationSelect(conv)}
              variant="ghost"
              justifyContent="flex-start"
              w="full"
              p={3}
              bg={selectedId === conv.id ? "gray.100" : "transparent"}
              _hover={{ bg: "gray.100" }}
            >
              <HStack justify="space-between" w="full">
                <Text>{conv.name}</Text>
                <HStack gap={2}>
                  <Text fontSize="xs" color="gray.500">
                    {new Date(conv.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                  {conv.unread && (
                    <Badge colorScheme="red" borderRadius="full" px={2}>
                      New
                    </Badge>
                  )}
                </HStack>
              </HStack>
            </Button>
          ))}
      </VStack>
    </Box>
  );
};

export default MessageSidebar;
