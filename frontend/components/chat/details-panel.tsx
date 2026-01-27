"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Settings,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";
import GroupInfo from "./group-info";
import UserInfo from "./user-info";
import SharedMedia from "./shared-media";
import SettingsPanel from "./settings-panel";

interface DetailsPanelProps {
  conversation?: any;
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function DetailsPanel({
  conversation,
  isCollapsed,
  onToggle,
}: DetailsPanelProps) {
  const [activeTab, setActiveTab] = useState("info");

  if (!conversation) {
    return (
      <div
        className={cn("flex flex-col h-full", isCollapsed && "items-center")}
      >
        <div className="p-4 border-b">
          {isCollapsed ? (
            <Button size="icon" variant="ghost" onClick={onToggle}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Details</h3>
              <Button size="icon" variant="ghost" onClick={onToggle}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <p className="text-muted-foreground">
              Select a conversation to view details
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {isCollapsed ? (
          <div className="flex items-center justify-center w-full">
            <Settings className="h-5 w-5" />
          </div>
        ) : (
          <>
            <h3 className="font-semibold">Details</h3>
            <Button size="icon" variant="ghost" onClick={onToggle}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Content */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <div className="border-b px-4">
              <TabsList className="w-full">
                <TabsTrigger value="info" className="flex-1">
                  Info
                </TabsTrigger>
                <TabsTrigger value="media" className="flex-1">
                  Media
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="info" className="flex-1 p-4">
              {conversation.type === "group" ? (
                <GroupInfo conversation={conversation} />
              ) : (
                <UserInfo user={conversation.participants[0]} />
              )}
            </TabsContent>

            <TabsContent value="media" className="flex-1 p-4">
              <SharedMedia conversationId={conversation.id} />
            </TabsContent>

            <TabsContent value="settings" className="flex-1 p-4">
              <SettingsPanel conversation={conversation} />
            </TabsContent>
          </Tabs>
        </div>
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
          <Button
            size="icon"
            variant={activeTab === "info" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("info")}
          >
            <UserPlus className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant={activeTab === "media" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("media")}
          >
            <Image className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant={activeTab === "settings" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
