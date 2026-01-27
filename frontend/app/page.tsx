"use client";

import ChatLayout from "@/components/chat/chat-layout";
import { mockConversations } from "@/lib/data";

export default function ChatPage() {
  // Select the first conversation by default
  const defaultConversation = mockConversations[0];

  const handleSelectConversation = (conversation: any) => {
    console.log("Conversation selected:", conversation.name);
    // In a real app, you would update URL or global state here
  };

  const handleSendMessage = (conversationId: string, content: string) => {
    console.log("Message sent to conversation", conversationId, ":", content);
    // In a real app, you would send to your backend API here
  };

  return (
    <ChatLayout
      conversations={mockConversations}
      initialSelectedConversation={defaultConversation}
      onSelectConversation={handleSelectConversation}
      onSendMessage={handleSendMessage}
    />
  );
}
