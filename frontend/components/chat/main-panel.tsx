"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  PanelLeft,
  PanelRight,
  Phone,
  Video,
  MoreVertical,
  Users,
} from "lucide-react";
import { Conversation } from "@/lib/types";
import ChatHeader from "./chat-header";
import MessageList from "./message-list";
import MessageInput from "./message-input";

interface MainPanelProps {
  conversation?: Conversation;
  onSendMessage?: (content: string) => void;
  isMobile: boolean;
  onToggleSidebar: () => void;
  onToggleDetails: () => void;
}

export default function MainPanel({
  conversation,
  onSendMessage,
  isMobile,
  onToggleSidebar,
  onToggleDetails,
}: MainPanelProps) {
  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Users className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">Welcome to Chat</h3>
        <p className="text-muted-foreground max-w-md">
          Select a conversation from the sidebar or start a new chat to begin
          messaging.
        </p>
        <Button className="mt-6">Start New Conversation</Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleSidebar}
            className="md:hidden"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>

          <ChatHeader conversation={conversation} />
        </div>

        <div className="flex items-center gap-2">
          {conversation.type === "direct" && (
            <>
              <Button size="icon" variant="ghost">
                <Phone className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost">
                <Video className="h-5 w-5" />
              </Button>
            </>
          )}
          {conversation.type === "group" && (
            <Button size="icon" variant="ghost">
              <Users className="h-5 w-5" />
            </Button>
          )}
          <Button size="icon" variant="ghost">
            <MoreVertical className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onToggleDetails}>
            <PanelRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList
          messages={conversation.messages || []}
          currentUserId="current-user"
        />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <MessageInput
          conversationId={conversation.id}
          onSendMessage={onSendMessage}
        />
      </div>
    </div>
  );
}
