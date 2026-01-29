"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Users,
  MessageSquare,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Conversation, TabType, User } from "@/lib/types";
import Tabs from "./tabs";
import ConversationList from "./conversation-list";
import NewChatModal from "../modals/new-chat-modal";
import { startConversation } from "@/lib/data";

interface SidebarProps {
  conversations: Conversation[];
  selectedConversationId?: string;
  isCollapsed: boolean;
  onToggle: () => void;
  onSelectConversation: (conversation: Conversation) => void;
  onStartNewConversation?: (conversation: Conversation) => void;
  onStartCall?: (userId: string, type: "audio" | "video") => void;
}

export default function Sidebar({
  conversations,
  selectedConversationId,
  isCollapsed,
  onToggle,
  onSelectConversation,
  onStartNewConversation,
  onStartCall,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true;
    return (
      conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage?.content
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  // Calculate counts for tabs
  const tabCounts = useMemo(() => {
    const unreadCount = conversations.reduce(
      (sum, conv) => sum + conv.unreadCount,
      0,
    );
    const groupCount = conversations.filter(
      (conv) => conv.type === "group",
    ).length;
    const friendCount = conversations.filter(
      (conv) => conv.type === "direct",
    ).length;

    return { unreadCount, groupCount, friendCount };
  }, [conversations]);

  const handleSelectUser = (user: User) => {
    console.log("Selected user:", user.name);
    // User profile is now shown in the modal
  };

  const handleStartConversation = async (userId: string) => {
    try {
      // In a real app, this would create a new conversation in the backend
      const result = await startConversation(userId);

      if (result.success) {
        // Create a mock conversation object
        const newConversation: Conversation = {
          id: result.conversationId || `conv_${Date.now()}`,
          name: `User ${userId}`, // In real app, fetch user name
          type: "direct",
          participants: [
            { id: userId, name: `User ${userId}`, status: "online" },
          ],
          lastMessage: undefined,
          unreadCount: 0,
          isMuted: false,
          lastActivity: new Date(),
          messages: [],
        };

        // Call the parent handler
        onStartNewConversation?.(newConversation);

        console.log("Started new conversation with user:", userId);
      }
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  };

  const handleStartCall = (userId: string, type: "audio" | "video") => {
    console.log(`Starting ${type} call with user:`, userId);
    onStartCall?.(userId, type);
    // Close modal after starting call
    setIsNewChatOpen(false);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    CM
                  </span>
                </div>
                <h2 className="text-xl font-semibold">Chat Me</h2>
              </div>
              <Button size="icon" variant="ghost" onClick={onToggle}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full">
              <div className="w-7 h-7 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-md">
                  CM
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {!isCollapsed && (
          <>
            {/* Tabs */}
            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              unreadCount={tabCounts.unreadCount}
              groupCount={tabCounts.groupCount}
              friendCount={tabCounts.friendCount}
            />

            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations or messages..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4 border-b">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => setIsNewChatOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              <ConversationList
                conversations={filteredConversations}
                activeTab={activeTab}
                selectedConversationId={selectedConversationId}
                onSelectConversation={onSelectConversation}
              />
            </div>
          </>
        )}

        {/* Collapsed State */}
        {isCollapsed && (
          <div className="flex-1 flex flex-col items-center py-4 space-y-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={onToggle}
              className="mb-4"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Users className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="mt-auto"
              onClick={() => setIsNewChatOpen(true)}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      <NewChatModal
        open={isNewChatOpen}
        onOpenChange={setIsNewChatOpen}
        onSelectUser={handleSelectUser}
        onStartConversation={handleStartConversation}
        onStartCall={handleStartCall}
      />
    </>
  );
}
