"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Conversation } from "@/lib/types";
import { mockConversations } from "@/lib/data";
import Sidebar from "./sidebar";
import MainPanel from "./main-panel";
import DetailsPanel from "./details-panel";

interface ChatLayoutProps {
  conversations?: Conversation[];
  initialSelectedConversation?: Conversation;
  onSelectConversation?: (conversation: Conversation) => void;
  onSendMessage?: (conversationId: string, content: string) => void;
  onStartCall?: (userId: string, type: "audio" | "video") => void;
}

export default function ChatLayout({
  conversations = mockConversations,
  initialSelectedConversation = mockConversations[0],
  onSelectConversation,
  onSendMessage,
  onStartCall,
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

  // Update selected conversation when initialSelectedConversation changes
  useEffect(() => {
    if (initialSelectedConversation) {
      setSelectedConversation(initialSelectedConversation);
    }
  }, [initialSelectedConversation]);

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

  const handleStartNewConversation = async (conversation: Conversation) => {
    try {
      // Add to conversations list
      setConversationsList((prev) => [conversation, ...prev]);

      // Select the new conversation
      setSelectedConversation(conversation);

      console.log("Started new conversation:", conversation.name);
    } catch (error) {
      console.error("Failed to start new conversation:", error);
    }
  };

  const handleAudioCall = (conversationId: string) => {
    const conversation = conversationsList.find((c) => c.id === conversationId);
    if (conversation && conversation.type === "direct") {
      const userId = conversation.participants[0].id;
      console.log(`Starting audio call with user: ${userId}`);
      onStartCall?.(userId, "audio");
      // You could open a call modal or interface here
    }
  };

  const handleVideoCall = (conversationId: string) => {
    const conversation = conversationsList.find((c) => c.id === conversationId);
    if (conversation && conversation.type === "direct") {
      const userId = conversation.participants[0].id;
      console.log(`Starting video call with user: ${userId}`);
      onStartCall?.(userId, "video");
      // You could open a call modal or interface here
    }
  };

  const handleMuteToggle = (conversationId: string) => {
    // Toggle mute status
    setConversationsList((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, isMuted: !conv.isMuted } : conv,
      ),
    );

    // Update selected conversation if it's the one being toggled
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation((prev) =>
        prev ? { ...prev, isMuted: !prev.isMuted } : prev,
      );
    }

    console.log(`Toggled mute for conversation: ${conversationId}`);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div
        className={cn(
          "flex flex-col h-full border-r transition-all duration-300",
          sidebarOpen ? "w-96" : "w-0 md:w-16",
          !sidebarOpen && "overflow-hidden",
        )}
      >
        <Sidebar
          conversations={conversationsList}
          selectedConversationId={selectedConversation?.id}
          isCollapsed={!sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          onSelectConversation={handleSelectConversation}
          onStartNewConversation={handleStartNewConversation}
          onStartCall={onStartCall}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <MainPanel
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
          onAudioCall={handleAudioCall}
          onVideoCall={handleVideoCall}
          onMuteToggle={handleMuteToggle}
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
