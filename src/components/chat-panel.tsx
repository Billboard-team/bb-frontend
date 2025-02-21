import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { Conversation, Message } from "@/components/type";

interface ChatPanelProps {
  conversation: Conversation | null; // Can be null if no conversation is selected
}

const ChatPanel: React.FC<ChatPanelProps> = ({ conversation }) => {
  // Type the messages state with the Message interface
  const [messages, setMessages] = useState<Message[]>([]); // Start with empty array

  const [newMessage, setNewMessage] = useState<string>(""); // Type the newMessage state as string

  // Use useEffect to initialize messages when conversation changes
  useEffect(() => {
    if (conversation) {
      // Set initial messages only if conversation exists
      setMessages([
        {
          id: 1,
          sender: "Alex Johnson",
          content: "Hey! How are you doing today?",
          timestamp: "2025-02-18 14:30",
        },
        {
          id: 2,
          sender: "You",
          content: "I'm doing great! How about you?",
          timestamp: "2025-02-18 14:32",
        },
      ]);
    } else {
      setMessages([]); // Clear messages if no conversation is selected
    }
  }, [conversation]); // Re-run when conversation changes

  // Handle sending a new message (for now, just adds to local state; replace with API call later)
  const handleSendMessage = () => {
    if (newMessage.trim() && conversation) {
      // Only send if conversation exists
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toISOString().slice(0, 16).replace("T", " "), // e.g., "2025-02-19 10:15"
      };
      setMessages([...messages, newMsg]);
      setNewMessage(""); // Clear the input
      // Later, send this to the backend here
    }
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Use useRef to reference the messages container for scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Re-run when messages change

  if (!conversation) {
    return (
      <Box
        flex="1"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="gray.500"
      >
        <Text>Select a conversation to start chatting.</Text>
      </Box>
    );
  }

  return (
    <VStack
      gap={4}
      align="stretch"
      justify="space-between"
      h="full"
      maxH="100vh"
      p={4}
      flex="1"
    >
      <Text fontSize="xl" fontWeight="bold" color="white">
        {conversation.name}
      </Text>
      <Box flex="1" overflowY="auto" p={2} h="4/6">
        {" "}
        {/* Fixed height of 500px */}
        {messages.map((msg) => (
          <HStack
            key={msg.id}
            justify={msg.sender === "You" ? "flex-end" : "flex-start"}
            mb={2}
          >
            {msg.sender !== "You" && (
              <Avatar.Root size="sm" bg="gray.800" color="white">
                <Avatar.Fallback name={conversation.name} />
              </Avatar.Root>
            )}
            <Box
              bg={msg.sender === "You" ? "blue.300" : "gray.700"} // Adjust colors for dark theme
              p={3}
              borderRadius={8}
              maxW="80%" // Increased max width for wider messages
            >
              <Text color="white">{msg.content}</Text>
              <Text fontSize="xs" color="gray.400" mt={1}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Box>
          </HStack>
        ))}
        <div ref={messagesEndRef} />{" "}
        {/* Invisible div at the bottom for auto-scrolling */}
      </Box>
      <HStack w="full" bg="black">
        <Input
          value={newMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewMessage(e.target.value)
          }
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          flex="1"
          borderRadius={4}
          borderColor="gray.600"
          bg="gray.800"
          color="white"
        />
        <Button
          colorScheme="blue"
          onClick={handleSendMessage}
          ml={2}
          bg="blue.500"
          color="white"
        >
          Send
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChatPanel;
