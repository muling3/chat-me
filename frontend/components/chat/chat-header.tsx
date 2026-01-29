"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  conversation: any;
}

export default function ChatHeader({ conversation }: ChatHeaderProps) {
  const isGroup = conversation.type === "group";

  // For groups, show participant count and online status
  // For direct messages, show user status
  const onlineCount = isGroup
    ? conversation.participants?.filter((p: any) => p.status === "online")
        .length
    : conversation.participants?.[0]?.status === "online"
      ? 1
      : 0;

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.avatar} />
          <AvatarFallback>
            {isGroup ? (
              <Users className="h-5 w-5" />
            ) : (
              conversation.name.charAt(0)
            )}
          </AvatarFallback>
        </Avatar>
        {onlineCount > 0 && (
          <div
            className={cn(
              "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background",
              // onlineCount > 0 ? "bg-green-500" : "bg-gray-400",
            )}
          />
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-lg">{conversation.name}</h2>
          {isGroup && (
            <Badge variant="outline" className="text-xs">
              {conversation.participants?.length || 0} members
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isGroup ? (
            <>
              {onlineCount > 0 ? (
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {onlineCount} online
                </span>
              ) : (
                <span>All offline</span>
              )}
              {conversation.lastActivity && (
                <>
                  <span>•</span>
                  <span>
                    Last active {formatRelativeTime(conversation.lastActivity)}
                  </span>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center gap-1">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  conversation.participants?.[0]?.status === "online" &&
                    "bg-green-500",
                  conversation.participants?.[0]?.status === "away" &&
                    "bg-yellow-500",
                  conversation.participants?.[0]?.status === "offline" &&
                    "bg-gray-400",
                )}
              />
              <span className="capitalize">
                {conversation.participants?.[0]?.status || "offline"}
              </span>
              {conversation.participants?.[0]?.lastSeen && (
                <>
                  <span>•</span>
                  <span>
                    Last seen{" "}
                    {formatRelativeTime(conversation.participants[0].lastSeen)}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60),
  );

  if (diffInMinutes < 1) return "just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "yesterday";
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}
