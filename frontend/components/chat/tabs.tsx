"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MessageSquare, Users, User, Bell } from "lucide-react";
import { TabType } from "@/lib/types";

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  // Optional: Pass in actual counts if you have them
  unreadCount?: number;
  groupCount?: number;
  friendCount?: number;
}

export default function Tabs({
  activeTab,
  onTabChange,
  unreadCount = 42,
  groupCount = 8,
  friendCount = 10,
}: TabsProps) {
  const tabs = [
    {
      id: "all" as TabType,
      label: "All",
      icon: MessageSquare,
      badge: null,
    },
    {
      id: "unread" as TabType,
      label: "Unread",
      icon: Bell,
      badge: unreadCount,
    },
    {
      id: "groups" as TabType,
      label: "Groups",
      icon: Users,
      badge: groupCount,
    },
    {
      id: "friends" as TabType,
      label: "Friends",
      icon: User,
      badge: friendCount,
    },
  ];

  return (
    <div className="flex border-b">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const badgeColor = tab.id === "unread" ? "#dc2626" : "#2563eb"; // Red for unread, blue for others

        return (
          <Button
            key={tab.id}
            variant="ghost"
            className={cn(
              "flex-1 relative h-12 rounded-none flex-col gap-1",
              activeTab === tab.id
                ? "bg-accent text-accent-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => onTabChange(tab.id)}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs font-medium">{tab.label}</span>
            {tab.badge !== null && tab.badge > 0 && (
              <Badge
                className="absolute -top-1 -right-1 h-5 min-w-5 px-1 text-xs font-bold"
                variant="default"
                style={{ backgroundColor: badgeColor }}
              >
                {tab.badge > 99 ? "99+" : tab.badge}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
}
