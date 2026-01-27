"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/lib/types";
import Sidebar from "./sidebar";
import MainPanel from "./main-panel";
import DetailsPanel from "./details-panel";

interface ChatLayoutProps {
  conversations?: Conversation[];
  initialSelectedConversation?: Conversation;
  onSelectConversation?: (conversation: Conversation) => void;
  onSendMessage?: (conversationId: string, content: string) => void;
}

export default function ChatLayout({
  conversations = [],
  initialSelectedConversation,
  onSelectConversation,
  onSendMessage,
}: ChatLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<
    Conversation | undefined
  >(initialSelectedConversation);
  const [conversationsList, setConversationsList] =
    useState<Conversation[]>(conversations);

  // Update conversations list when prop changes
  useEffect(() => {
    setConversationsList(conversations);
  }, [conversations]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    onSelectConversation?.(conversation);

    // Mark conversation as read when selected
    setConversationsList((prev) =>
      prev.map((conv) =>
        conv.id === conversation.id
          ? {
              ...conv,
              unreadCount: 0,
              lastMessage: { ...conv.lastMessage!, read: true },
            }
          : conv,
      ),
    );
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversation) return;

    const newMessage = {
      id: `msg_${Date.now()}`,
      content,
      sender: {
        id: "current-user",
        name: "You",
        status: "online" as const,
        avatar: "/avatars/you.jpg",
      },
      timestamp: new Date(),
      read: false,
      sent: true,
      type: "text" as const,
    };

    // Update selected conversation messages
    const updatedSelectedConversation = {
      ...selectedConversation,
      messages: [...(selectedConversation.messages || []), newMessage],
      lastMessage: newMessage,
      lastActivity: new Date(),
    };

    setSelectedConversation(updatedSelectedConversation);

    // Update conversations list
    setConversationsList((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation.id
          ? updatedSelectedConversation
          : conv,
      ),
    );

    // Call external handler
    onSendMessage?.(selectedConversation.id, content);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div
        className={cn(
          "flex flex-col h-full border-r transition-all duration-300",
          sidebarOpen ? "w-80" : "w-0 md:w-16",
          !sidebarOpen && "overflow-hidden",
        )}
      >
        <Sidebar
          conversations={conversationsList}
          selectedConversationId={selectedConversation?.id}
          isCollapsed={!sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onSelectConversation={handleSelectConversation}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <MainPanel
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
          isMobile={false}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleDetails={() => setDetailsOpen(!detailsOpen)}
        />
      </div>

      {/* Details Panel */}
      <div
        className={cn(
          "flex flex-col h-full border-l transition-all duration-300",
          detailsOpen ? "w-80" : "w-0",
          !detailsOpen && "overflow-hidden",
        )}
      >
        <DetailsPanel
          conversation={selectedConversation}
          isCollapsed={!detailsOpen}
          onToggle={() => setDetailsOpen(!detailsOpen)}
        />
      </div>
    </div>
  );
}
