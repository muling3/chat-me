"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, VolumeX, Check, CheckCheck, Pin } from "lucide-react";
import { Conversation, TabType } from "@/lib/types";

interface ConversationListProps {
  conversations: Conversation[];
  activeTab: TabType;
  selectedConversationId?: string;
  onSelectConversation: (conversation: Conversation) => void;
}

export default function ConversationList({
  conversations,
  activeTab,
  selectedConversationId,
  onSelectConversation,
}: ConversationListProps) {
  // Filter conversations based on active tab
  const filteredConversations = conversations.filter((conversation) => {
    switch (activeTab) {
      case "unread":
        return conversation.unreadCount > 0;
      case "groups":
        return conversation.type === "group";
      case "friends":
        return conversation.type === "direct";
      default:
        return true;
    }
  });

  // Group conversations
  const groupedConversations = {
    pinned: filteredConversations.filter((c) => c.isPinned),
    online: filteredConversations.filter(
      (c) => c.type === "direct" && c.participants[0]?.status === "online",
    ),
    groups: filteredConversations.filter((c) => c.type === "group"),
    recent: filteredConversations.filter(
      (c) =>
        !c.isPinned &&
        (c.type === "direct" ? c.participants[0]?.status !== "online" : true),
    ),
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      const days = Math.floor(diffInHours / 24);
      return `${days}d`;
    }
  };

  // Function to truncate text
  const truncateText = (text: string, maxLength: number = 25) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const renderConversationGroup = (
    title: string,
    conversations: Conversation[],
    showDivider = true,
  ) => {
    if (conversations.length === 0) return null;

    return (
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
          {title} ({conversations.length})
        </h4>
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              formatTime={formatTime}
              truncateText={truncateText}
              isSelected={selectedConversationId === conversation.id}
              onClick={() => onSelectConversation(conversation)}
            />
          ))}
        </div>
        {showDivider && <div className="h-4" />}
      </div>
    );
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-4">
        {/* Pinned Conversations */}
        {activeTab === "all" &&
          renderConversationGroup("Pinned", groupedConversations.pinned)}

        {/* Online Friends */}
        {activeTab === "all" &&
          renderConversationGroup("Online", groupedConversations.online)}

        {/* Group Chats */}
        {(activeTab === "all" || activeTab === "groups") &&
          renderConversationGroup("Groups", groupedConversations.groups)}

        {/* Recent Conversations */}
        {activeTab === "all" &&
          renderConversationGroup("Recent", groupedConversations.recent, false)}

        {/* All Conversations (for specific tabs) */}
        {activeTab !== "all" && (
          <div className="space-y-1">
            {filteredConversations.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                formatTime={formatTime}
                truncateText={truncateText}
                isSelected={selectedConversationId === conversation.id}
                onClick={() => onSelectConversation(conversation)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredConversations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8" />
            </div>
            <p className="font-medium mb-1">No conversations found</p>
            <p className="text-sm">
              Start a new conversation to begin chatting
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

function ConversationItem({
  conversation,
  formatTime,
  truncateText,
  isSelected,
  onClick,
}: {
  conversation: Conversation;
  formatTime: (date: Date) => string;
  truncateText: (text: string, maxLength?: number) => string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const isGroup = conversation.type === "group";
  const lastMessage = conversation.lastMessage;
  const isUserMessage = lastMessage?.sender?.id === "current-user";

  // Different max lengths for different viewports
  const getMaxLength = () => {
    if (isGroup) return 22;
    return 28;
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-accent group",
        isSelected && "bg-accent",
        conversation.unreadCount > 0 && "bg-accent/30",
      )}
    >
      <div className="relative">
        <Avatar
          className={cn(
            conversation.unreadCount > 0 && "ring-2 ring-primary/30",
            isSelected && "ring-2 ring-primary",
          )}
        >
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback
            className={cn(
              conversation.unreadCount > 0 && "bg-primary/10",
              isSelected && "bg-primary/20",
            )}
          >
            {isGroup ? (
              <Users className="h-5 w-5" />
            ) : (
              conversation.name.charAt(0)
            )}
          </AvatarFallback>
        </Avatar>
        {!isGroup && conversation.participants[0]?.status === "online" && (
          <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
        )}
        {conversation.isPinned && (
          <div
            className={cn(
              "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center",
              conversation.unreadCount > 0 ? "bg-red-500" : "bg-primary",
            )}
          >
            <Pin className="h-2 w-2 text-primary-foreground" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-sm truncate">
            {conversation.name}
            {isGroup && (
              <span className="text-muted-foreground ml-1">
                ({conversation.participants?.length || 0})
              </span>
            )}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">
              {lastMessage && formatTime(lastMessage.timestamp)}
            </span>
            {conversation.isMuted && (
              <VolumeX className="h-3 w-3 text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground truncate">
              {lastMessage ? (
                <>
                  {isUserMessage ? (
                    <span className="text-primary font-medium">You: </span>
                  ) : (
                    !isGroup && (
                      <span className="font-medium">
                        {lastMessage.sender?.name?.split(" ")[0]}:
                      </span>
                    )
                  )}{" "}
                  {truncateText(lastMessage.content, getMaxLength())}
                  {lastMessage.attachments &&
                    lastMessage.attachments.length > 0 && (
                      <span className="ml-1">📎</span>
                    )}
                </>
              ) : (
                <span className="italic">Start a conversation...</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            {isUserMessage && lastMessage?.read ? (
              <CheckCheck className="h-3 w-3 text-blue-500" />
            ) : isUserMessage && lastMessage?.sent ? (
              <Check className="h-3 w-3 text-muted-foreground" />
            ) : null}

            {/* Unread messages badge */}
            {conversation.unreadCount > 0 && (
              <Badge
                suppressHydrationWarning
                className={cn(
                  "h-5 min-w-5 px-1 text-xs font-bold transition-all",
                  conversation.unreadCount > 9 && "min-w-6 px-1.5",
                  conversation.unreadCount > 99 && "min-w-7 px-2",
                )}
                variant="default"
                style={{
                  backgroundColor:
                    conversation.unreadCount > 9
                      ? "#dc2626" // Red for high counts
                      : "#2563eb", // Blue for normal counts
                }}
              >
                {conversation.unreadCount > 99
                  ? "99+"
                  : conversation.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
