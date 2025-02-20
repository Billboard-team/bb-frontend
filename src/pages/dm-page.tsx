import { Flex } from "@chakra-ui/react";
import MessageSidebar from "@/components/message-sidebar";
import ChatPanel from "@/components/chat-panel";
import { useState } from "react";
import { Conversation } from "@/components/type";

const DM = () => {
  // Type selectedConversation as Conversation | null
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <Flex h="full" w="full">
      <MessageSidebar onSelectConversation={handleSelectConversation} />
      <ChatPanel conversation={selectedConversation} />
    </Flex>
  );
};

export default DM;
