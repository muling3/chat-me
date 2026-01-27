"use client";

import React, { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCheck,
  Clock,
  MoreVertical,
  Reply,
  Heart,
  Smile,
  Download,
  Eye,
} from "lucide-react";
import { Message } from "@/lib/types";

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({
  messages,
  currentUserId,
}: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Group messages by date
  const groupedMessages = messages.reduce((groups: any, message) => {
    const date = message.timestamp.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateHeader = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isUserMessage = (senderId: string) => {
    return senderId === currentUserId;
  };

  return (
    <ScrollArea className="h-full" ref={scrollAreaRef}>
      <div className="p-4 space-y-6">
        {Object.entries(groupedMessages).map(
          ([date, dateMessages]: [string, any]) => (
            <div key={date}>
              {/* Date Separator */}
              <div className="flex items-center justify-center my-6">
                <div className="px-4 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                  {formatDateHeader(new Date(date))}
                </div>
              </div>

              {/* Messages for this date */}
              <div className="space-y-4">
                {dateMessages.map((message: Message, index: number) => {
                  const userMessage = isUserMessage(message.sender.id);
                  const showAvatar =
                    index === 0 ||
                    dateMessages[index - 1].sender.id !== message.sender.id ||
                    message.timestamp.getTime() -
                      dateMessages[index - 1].timestamp.getTime() >
                      5 * 60 * 1000; // 5 minutes

                  return (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-3 group",
                        userMessage ? "flex-row-reverse" : "flex-row",
                      )}
                    >
                      {/* Avatar */}
                      {!userMessage && showAvatar && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.sender.avatar} />
                          <AvatarFallback>
                            {message.sender.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {/* Spacer for user messages */}
                      {userMessage && <div className="w-8" />}

                      {/* Message Content */}
                      <div
                        className={cn(
                          "max-w-[70%] space-y-1",
                          userMessage && "items-end",
                        )}
                      >
                        {/* Sender name for group chats */}
                        {!userMessage && showAvatar && message.sender.name && (
                          <p className="text-xs font-medium px-2">
                            {message.sender.name}
                          </p>
                        )}

                        {/* Message bubble */}
                        <div className="flex gap-2">
                          <div
                            className={cn(
                              "rounded-2xl px-4 py-2 relative group/message transition-colors",
                              userMessage
                                ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm hover:bg-primary/90"
                                : "bg-muted rounded-tl-none hover:bg-muted/80",
                              message.type === "system" &&
                                "bg-transparent text-muted-foreground italic",
                            )}
                          >
                            {message.type === "text" && (
                              <p className="whitespace-pre-wrap">
                                {message.content}
                              </p>
                            )}

                            {message.type === "system" && (
                              <p className="text-center">{message.content}</p>
                            )}

                            {/* Message actions */}
                            <div
                              className={cn(
                                "absolute -top-6 opacity-0 group-hover/message:opacity-100 transition-opacity flex items-center gap-1",
                                userMessage ? "right-2" : "left-2",
                              )}
                            >
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                              >
                                <Reply className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                              >
                                <Heart className="h-3 w-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                              >
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Reactions */}
                          {message.reactions &&
                            message.reactions.length > 0 && (
                              <div
                                className={cn(
                                  "flex flex-wrap gap-1 mt-auto",
                                  userMessage ? "justify-end" : "justify-start",
                                )}
                              >
                                {message.reactions.map((reaction, idx) => (
                                  <div
                                    key={idx}
                                    className="px-2 py-1 bg-background border rounded-full text-xs flex items-center gap-1"
                                  >
                                    <span>{reaction.emoji}</span>
                                    <span>{reaction.users.length}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>

                        {/* Message metadata */}
                        <div
                          className={cn(
                            "flex items-center gap-2 px-2 text-xs text-muted-foreground",
                            userMessage ? "justify-end" : "justify-start",
                          )}
                        >
                          <span>{formatMessageTime(message.timestamp)}</span>

                          {userMessage && (
                            <div className="flex items-center">
                              {message.read ? (
                                <CheckCheck className="h-3 w-3 text-blue-500" />
                              ) : message.sent ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Clock className="h-3 w-3" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Spacer for other messages */}
                      {!userMessage && !showAvatar && <div className="w-8" />}
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        )}

        {/* Typing Indicator */}
        {messages.length > 0 &&
          messages[messages.length - 1].sender.id !== currentUserId && (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={messages[messages.length - 1].sender.avatar}
                />
                <AvatarFallback>
                  {messages[messages.length - 1].sender.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150" />
              </div>
            </div>
          )}

        {/* Bottom reference for scrolling */}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
