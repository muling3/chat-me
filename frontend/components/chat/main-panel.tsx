"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  PanelLeft,
  PanelRight,
  Phone,
  Users,
  Video,
} from "lucide-react";
import { Conversation } from "@/lib/types";
import ChatHeader from "./chat-header";
import MessageInput from "./message-input";
import MessageList from "./message-list";

interface MainPanelProps {
  conversation?: Conversation;
  onSendMessage?: (content: string) => void;
  onAudioCall?: (conversationId: string) => void;
  onVideoCall?: (conversationId: string) => void;
  onMuteToggle?: (conversationId: string) => void;
  isMobile: boolean;
  onToggleSidebar: () => void;
  onToggleDetails: () => void;
}

export default function MainPanel({
  conversation,
  onSendMessage,
  onAudioCall,
  onVideoCall,
  onMuteToggle,
  isMobile,
  onToggleSidebar,
  onToggleDetails,
}: MainPanelProps) {
  const [isTyping, setIsTyping] = useState(false);

  // Simulate typing indicator for demo
  useEffect(() => {
    if (!conversation || conversation.type === "group") return;

    // Simulate random typing events
    const typingInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }
    }, 10000);

    return () => clearInterval(typingInterval);
  }, [conversation]);

  const handleAudioCall = () => {
    if (conversation) {
      console.log(`Starting audio call with ${conversation.name}`);
      onAudioCall?.(conversation.id);
    }
  };

  const handleVideoCall = () => {
    if (conversation) {
      console.log(`Starting video call with ${conversation.name}`);
      onVideoCall?.(conversation.id);
    }
  };

  const handleMuteToggle = () => {
    if (conversation) {
      console.log(`Toggling mute for ${conversation.name}`);
      onMuteToggle?.(conversation.id);
    }
  };

  const handleViewInfo = () => {
    console.log("Viewing conversation info");
    // This would typically open the details panel or a modal
  };

  const handleMoreOptions = () => {
    console.log("Opening more options");
    // You could open a dropdown menu here
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-linear-to-b from-background to-muted/20">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Users className="h-12 w-12 text-primary/60" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold mb-2">Welcome to Chat</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Select a conversation from the sidebar or start a new chat to begin
          messaging.
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          Start New Conversation
        </Button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header - Fixed with proper spacing */}
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
      <div className="flex-1 overflow-hidden">
        <MessageList
          messages={conversation.messages || []}
          currentUserId="current-user"
          isTyping={isTyping && conversation.type === "direct"}
        />
      </div>

      {/* Input */}
      <div className="border-t p-4">
        <MessageInput
          conversationId={conversation.id}
          onSendMessage={onSendMessage}
          disabled={!conversation}
        />
      </div>
    </div>
  );
}
